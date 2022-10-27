
const Users = require("../models/users")
const {comparePassword} = require('../utils/crypto')
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../database/config');

const loginUser = async (req,res) => {

    try {
        const{email,password}=req.body;
        const user = await Users.findOne({
            where:{email}
        })
        if(user){
            const verifyPassword = comparePassword(password, user.password)
            if(verifyPassword){
                // res.status(200).json(user)
                const token = jwt.sign({
                    id: user.id,
                    email: user.email,
                }, jwtSecret)
                res.status(200).json({
                    message: 'Correct Credentials',
                    token
                })
            }else{
                res.status(404).json({message:"Contraseña incorrecta"})
            }
        }else{
            res.status(404).json({message:"No existe ese usuario"})
        }
        
        
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}



module.exports = {
    loginUser
}