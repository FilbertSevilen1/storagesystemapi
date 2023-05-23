const database = require('../config').promise()
module.exports.getAllStorages = async(req,res) =>{
    try{
        const GET_STORAGE = 'SELECT * FROM ms_storage'
        const [STORAGE] = await database.execute(GET_STORAGE);
        
        res.status(200).send(STORAGE)
    }
    catch(error){
        console.log(error)
        res.status(500).send(error);
    }
}