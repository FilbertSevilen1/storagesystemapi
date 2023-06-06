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

module.exports.getBorrowingByUserID = async(req,res) =>{
    try{
        const body = req.body
        console.log('Body : ',body)

        const GET_BORROWING = `SELECT * FROM ms_borrow WHERE user_id = ? and borrow_status = 'borrowing'`
        const [BORROWING] = await database.execute(GET_BORROWING, [body.user_id])

        res.status(200).send(BORROWING);
    }
    catch(error){
        console.log(error)
        res.status(500).send(error);
    }
}

module.exports.getDraft = async(req,res)=>{
    try{
        const body = req.body
        console.log(body)
        const GET_DRAFT = `SELECT * FROM ms_borrow 
        JOIN ms_borrow_detail ON ms_borrow.borrow_id = ms_borrow_detail.borrow_id 
        JOIN ms_items ON ms_items.item_id = ms_borrow_detail.item_id 
        JOIN ms_storage ON ms_storage.storage_id = ms_items.storage_id
        WHERE ms_borrow.borrow_status = 'draft' AND user_id = ?`
        const [DRAFT] = await database.execute(GET_DRAFT, [body.user_id])

        res.status(200).send(DRAFT)
    }
    catch(error){
        console.log(error)
        res.status(500).send(error)
    }
}

module.exports.getOngoing = async(req,res)=>{
    try{
        const body = req.body
        console.log(body)
        const GET_DRAFT = `SELECT * FROM ms_borrow 
        JOIN ms_borrow_detail ON ms_borrow.borrow_id = ms_borrow_detail.borrow_id 
        JOIN ms_items ON ms_items.item_id = ms_borrow_detail.item_id 
        JOIN ms_storage ON ms_storage.storage_id = ms_items.storage_id
        WHERE ms_borrow.borrow_status = 'borrowing' AND user_id = ?`
        const [DRAFT] = await database.execute(GET_DRAFT, [body.user_id])

        res.status(200).send(DRAFT)
    }
    catch(error){
        console.log(error)
        res.status(500).send(error)
    }
}


module.exports.updateDraft = async(req,res)=>{
    try{
        let body = req.body;
        console.log(body)

        const SUBMIT_DRAFT = `UPDATE ms_borrow SET borrow_location = ?, borrow_reason = ? WHERE borrow_id = ? AND (borrow_status = 'draft' OR borrow_status = 'borrowing')`
        const [DRAFT] = await database.execute(SUBMIT_DRAFT, [body.borrow_location, body.borrow_reason, body.borrow_id])

        res.status(200).send('Draft Updated')
    }
    catch(error){
        console.log(error)
        res.status(500).send(error)
    }
}

module.exports.submitDraft = async(req,res)=>{
    try{
        let body = req.body;
        console.log(body)

        const SUBMIT_DRAFT = `UPDATE ms_borrow SET borrow_status = 'borrowing', borrow_location = ?, borrow_reason = ? WHERE borrow_id = ? AND borrow_status = 'draft'`
        const [DRAFT] = await database.execute(SUBMIT_DRAFT, [body.borrow_location, body.borrow_reason, body.borrow_id])

        res.status(200).send('Items Borrowed')
    }
    catch(error){
        console.log(error)
        res.status(500).send(error)
    }
}

module.exports.cancelDraft = async(req, res)=>{
    try{
        const body = req.body

        const GET_BORROWED_STOCK = `SELECT * FROM ms_borrow_detail WHERE borrow_id = ?` 
        const [BORROWED_STOCK] = await database.execute(GET_BORROWED_STOCK, [body.borrow_id])
        console.log(BORROWED_STOCK)

        for(let i=0;i<BORROWED_STOCK.length;i++){
            const GET_STOCK = `SELECT item_stock FROM ms_items WHERE item_id = ?`
            const [STOCK] = await database.execute(GET_STOCK, [BORROWED_STOCK[i].item_id])
            console.log('stock : ',STOCK[0].item_stock, BORROWED_STOCK[i].item_count)

            const UPDATE_STOCK = `UPDATE ms_items SET item_stock = ? WHERE item_id = ?`
            const [UPDATE_INFO] = await database.execute(UPDATE_STOCK, [BORROWED_STOCK[i].item_count + STOCK[0].item_stock, BORROWED_STOCK[i].item_id])
        }

        const CANCEL_DRAFT = `UPDATE ms_borrow SET borrow_status = 'cancel' WHERE borrow_id = ? AND borrow_status = 'draft'`
        const [DRAFT] = await database.execute(CANCEL_DRAFT, [body.borrow_id])

        res.status(200).send('Draft Canceled')
    }
    catch(error){
        console.log(error)
        res.status(500).send(error)
    }
}

module.exports.returnItems = async(req, res)=>{
    try{
        const body = req.body

        const GET_BORROWED_STOCK = `SELECT * FROM ms_borrow_detail WHERE borrow_id = ?` 
        const [BORROWED_STOCK] = await database.execute(GET_BORROWED_STOCK, [body.borrow_id])
        console.log(BORROWED_STOCK)

        for(let i=0;i<BORROWED_STOCK.length;i++){
            const GET_STOCK = `SELECT item_stock FROM ms_items WHERE item_id = ?`
            const [STOCK] = await database.execute(GET_STOCK, [BORROWED_STOCK[i].item_id])
            console.log('stock : ',STOCK[0].item_stock, BORROWED_STOCK[i].item_count)

            const UPDATE_STOCK = `UPDATE ms_items SET item_stock = ? WHERE item_id = ?`
            const [UPDATE_INFO] = await database.execute(UPDATE_STOCK, [BORROWED_STOCK[i].item_count + STOCK[0].item_stock, BORROWED_STOCK[i].item_id])
        }

        const CANCEL_DRAFT = `UPDATE ms_borrow SET borrow_status = 'returned' WHERE borrow_id = ? AND borrow_status = 'borrowing'`
        const [DRAFT] = await database.execute(CANCEL_DRAFT, [body.borrow_id])

        res.status(200).send('Item Successfully Returned')
    }
    catch(error){
        console.log(error)
        res.status(500).send(error)
    }
}

module.exports.removeItemFromBorrow = async(req,res) =>{
    try{
        const body = req.body
        console.log(body)

        //check stock
        const GET_STOCK = `SELECT item_stock FROM ms_items WHERE item_id = ?`
        const [GET_INFO] = await database.execute(GET_STOCK,[body.item_id]);
        console.log(GET_INFO[0].item_stock)

        //get Detail Stock
        const GET_DETAIL_STOCK = `SELECT item_count FROM ms_borrow_detail WHERE item_id = ? AND borrow_id = ?`
        const [GET_DETAIL_INFO] = await database.execute(GET_DETAIL_STOCK,[body.item_id, body.borrow_id]);
        console.log(GET_DETAIL_INFO[0].item_count)

        //update stock
        const UPDATE_STOCK = `UPDATE ms_items SET item_stock = ? WHERE item_id = ?`
        const [UPDATE_INFO] = await database.execute(UPDATE_STOCK, [GET_INFO[0].item_stock + 1, body.item_id])

        const UPDATE_DETAIL_STOCK = `UPDATE ms_borrow_detail SET item_count = ? WHERE item_id = ?`
        const [UPDATE_DETAIL_INFO] = await database.execute(UPDATE_DETAIL_STOCK, [GET_DETAIL_INFO[0].item_count - 1, body.item_id])

        if(GET_DETAIL_INFO[0].item_count<=1){
        const SET_SAFE_FALSE = `SET SQL_SAFE_UPDATES = 0;`
        const [SET_SAFE_INFO_FALSE] = await database.execute(SET_SAFE_FALSE)

        const DELETE_ITEM = `DELETE FROM ms_borrow_detail WHERE item_id = ? AND borrow_id = ?`
        const [REMOVE_INFO] = await database.execute(DELETE_ITEM, [body.item_id, body.borrow_id])

        }
        res.status(200).send('Item Removed')
    }
    catch(error){
        console.log(error)
        res.status(500).send(error)
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
            console.log('id: ', borrow_id)
            const CREATE_NEW_BORROW = `INSERT INTO ms_borrow (borrow_id, user_id, borrow_location, borrow_reason, borrow_status) VALUES (?, ?, ?, ?, ?)`
            const [CREATE_INFO] = await database.execute(CREATE_NEW_BORROW,[borrow_id, body.user_id, "", "", "draft"])
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