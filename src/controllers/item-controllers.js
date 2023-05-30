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

        const INSERT_DATA = `INSERT INTO ms_items (item_name, item_type, storage_id, item_stock) VALUES (?, ?, ?, ?)`
        const [ITEMS] = await database.execute(INSERT_DATA, [body.item_name, body.item_type, body.storage_id, body.item_stock]);

        res.status(200).send("Insert Success")
    }
    catch(error){
        console.log(error)
        res.status(500).send(error);
    }
}

module.exports.addItemToBorrow = async(req,res) =>{
    try{
        const body = req.body
        console.log(body)
        const CHECK_EXISTING_CART = `SELECT * FROM ms_borrow WHERE user_id = ? AND borrow_status = 'draft'`
        const [CART] = await database.execute(CHECK_EXISTING_CART, [body.user_id])

        let borrow_id = null;

        if(CART.length){
            borrow_id = CART[0].borrow_id
        }
        else{
            const CHECK_EXISTING_CART_COUNT = `SELECT * FROM ms_borrow ORDER BY borrow_id DESC LIMIT 1`
            const [COUNT] = await database.execute(CHECK_EXISTING_CART_COUNT)
            borrow_id = COUNT[0].borrow_id+1
        }

        const CHECK_CART_DETAIL = `SELECT * FROM ms_borrow_detail WHERE borrow_id = ? AND item_id = ?`
        const [CART_DETAIL] = await database.execute(CHECK_CART_DETAIL, [borrow_id, body.item_id]);
        console.log("CART STOCK : ",CART_DETAIL)

        if(CART_DETAIL.length){
            const GET_STOCK = `SELECT * FROM ms_items WHERE item_id = ?`
            const [GET_INFO] = await database.execute(GET_STOCK, [body.item_id])

            console.log("Get INFO : ", GET_INFO[0].item_stock-1)

            if(GET_INFO[0].item_stock<=0){
                return res.status(400).send("Barang Tidak Tersedia")
            }

            const UPDATE_STOCK_INSERT = `UPDATE ms_items SET item_stock = ? WHERE item_id = ?`
            const [UPDATE_INFO] = await database.execute(UPDATE_STOCK_INSERT, [GET_INFO[0].item_stock-1, body.item_id])

            const UPDATE_STOCK = `UPDATE ms_borrow_detail SET item_count = ? WHERE item_id = ?`
            const [INFO] = await database.execute(UPDATE_STOCK, [CART_DETAIL[0].item_count + 1, body.item_id])
            return res.status(200).send("Update Success")
        }
        else{
            const CHECK_CART_DETAIL_COUNT = `SELECT * FROM ms_borrow_detail ORDER BY borrow_detail_id DESC LIMIT 1`
            const [DETAIL_COUNT] = await database.execute(CHECK_CART_DETAIL_COUNT)
            console.log("COUNT : ", DETAIL_COUNT)

            const GET_STOCK = `SELECT * FROM ms_items WHERE item_id = ?`
            const [GET_INFO] = await database.execute(GET_STOCK, [body.item_id])

            console.log("Get INFO : ", GET_INFO)

            if(GET_INFO[0].item_stock<=0){
                return res.status(400).send("Barang Tidak Tersedia")
            }

            const UPDATE_STOCK = `UPDATE ms_items SET item_stock = ?  WHERE ms_items.item_id = ?`
            const [UPDATE_INFO] = await database.execute(UPDATE_STOCK, [GET_INFO[0].item_stock-1, body.item_id])


            const INSERT_DATA = `INSERT INTO ms_borrow_detail (borrow_detail_id, item_id, borrow_id, item_count) VALUES (?,?,?,?)`
            const [INSERT_INFO] = await database.execute(INSERT_DATA, [DETAIL_COUNT[0].borrow_detail_id + 1, body.item_id, borrow_id, 1])

            
            return res.status(200).send("Insert Success");
        }
    }
    catch(error){
        console.log(error)
        res.status(500).send(error)
    }
}