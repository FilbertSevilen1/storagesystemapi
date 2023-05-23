const database = require('../config').promise()
module.exports.getAllItems = async(req,res) =>{
    try{
        const body = req.body
        const limit = Number(req.query._limit) || 10
        const page = Number(req.query._page) || 1
        const offset = (page - 1) * limit
        console.log(body)

        const GET_ITEMS = `SELECT * FROM ms_items JOIN ms_storage ON ms_items.storage_id = ms_storage.storage_id WHERE ms_items.item_name LIKE '%${body.item_name}%' LIMIT ${database.escape(offset)}, ${database.escape(limit)}`
        const [ITEMS] = await database.execute(GET_ITEMS);

        console.log()

        const GET_TOTAL = `SELECT COUNT(*) AS total FROM ms_items`;
        let [TOTAL] = await database.execute(GET_TOTAL)
        
        const data = {
            item: ITEMS,
            total: TOTAL[0].total
        }

        res.status(200).send(data)
    }
    catch(error){
        console.log(error)
        res.status(500).send(error);
    }
}

module.exports.insertItem = async(req,res) =>{
    try{
        const body = req.body
        console.log(body)

        const GET_ITEMS = `INSERT INTO ms_items (item_name, item_type, storage_id, item_stock) VALUES (?, ?, ?, ?)`
        const [ITEMS] = await database.execute(GET_ITEMS, [body.item_name, body.item_type, body.storage_id, body.item_stock]);

        res.status(200).send("Insert Success")
    }
    catch(error){
        console.log(error)
        res.status(500).send(error);
    }
}