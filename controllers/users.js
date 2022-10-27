
const Users = require("../models/users")
const uuid = require('uuid')
const { hashPassword } = require('../utils/crypto')


const postUser = async (req, res) => {


    try {

        const { name, email, password } = req.body;

        if(name&&email&&password){
            const newUser = await Users.create({
                id: uuid.v4(),
                password: hashPassword(password),
                email,
                name
            })
            res.status(201).json(newUser);
        }else{
            res.status(400).json({
                message: "All fields must be completed",
                fields: {
                  name: "string",
                  email: "example@example.com",
                  password: "string"
                },
              });
        }
        
    } catch (err) {
        res.status(400).json(err.message);
    }




}


module.exports = {
    postUser
}