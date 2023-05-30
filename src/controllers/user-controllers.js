const database = require('../config').promise()
const {registerSchema, loginSchema} = require("../helpers/schema-validation")
const bcrypt = require('bcrypt')
module.exports.loginUser = async(req,res) => {
    const body = req.body
    try{
        // const {error} = loginSchema.validate(body)
        // if(error){
        //     return res.status(400).send(error.message)
        // }
        const GET_USER_BY_USERNAME = `SELECT * FROM ms_users WHERE user_name = ?`
        const [USER] = await database.execute(GET_USER_BY_USERNAME, [body.username])
        if(!USER.length){
            return res.status(404).send("Username or Password is incorrect")
        }
        const hashpassword = await bcrypt.compare(body.password, USER[0].user_password)
        if(!hashpassword){
            return res.status(404).send("Username or Password is incorrect")
        }
        else{
            delete USER[0].user_password
            return res.status(200).send(USER)
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).send(error)
    }
}
module.exports.registerUser = async(req,res) =>{
    try{
        const body = req.body;
        console.log(body)

        const CHECK_USER = `SELECT * FROM ms_users WHERE user_name = ?`
        const [USER] = await database.execute(CHECK_USER, [body.username]);
        if(USER.length){
            res.status(400).send("Username already exists");
        }
        
        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(body.password, salt)

        const INSERT_USER = `
            INSERT INTO ms_users (user_name, user_password, user_gender, user_role, user_birthday) VALUES (?, ?, ?, ?, ?)
        `
        const [INFO] = await database.execute(INSERT_USER, [body.username, hashpassword, body.gender, "User", body.birthday])

        res.status(200).send(INFO)
    }
    catch(error){
        console.log(error)
        res.status(500).send(error)
    }
}
module.exports.keepLogin = async(req,res)=>{
    const body = req.body
    try{
        // const {error} = loginSchema.validate(body)
        // if(error){
        //     return res.status(400).send(error.message)
        // }
        const GET_USER_BY_USERNAME = `SELECT * FROM ms_users WHERE user_id = ?`
        const [USER] = await database.execute(GET_USER_BY_USERNAME, [body.user_id])

        delete USER[0].user_password
        return res.status(200).send(USER)
        }    
    catch(error){
        console.log(error)
        return res.status(500).send(error)
    }
}
module.exports.getAllUsers = async(req,res) =>{
    try{
        const GET_USERS = 'SELECT * FROM users LIMIT 999'
        const [USER] = await database.execute(GET_USERS);
        
        for(let i=0;i<USER.length;i++){
            delete USER[i].user_password
        }
        res.status(200).send(USER)
    }
    catch(error){
        console.log(error)
        res.status(500).send(error);
    }
}

module.exports.getUserById = async(req,res) =>{
    let body = req.body
    try{
        const GET_USER_BY_ID = 'SELECT * FROM users WHERE users.user_id = ?'
        const [USER] = await database.execute(GET_USER_BY_ID,[body.id]);
        
        for(let i=0;i<USER.length;i++){
            delete USER[i].user_password
        }
        res.status(200).send(USER)
    }
    catch(error){
        console.log(error)
        res.status(500).send(error);
    }
}