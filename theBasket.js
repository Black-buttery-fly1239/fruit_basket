const { Pool } = require("pg");

module.exports = (pool, fruitBasket) => {

    async function baskets(fruit_name,qty,price) {
        await pool.query('insert into fruit_basket(fruit_name, qty, price) values($1, $2, $3)', [fruit_name,qty,price])
    }

    async function getFruit(fruit_name) {
        const fruit = await pool.query('select * from fruit_basket where fruit_name =$1', [fruit_name]);
        return fruit.rows;
    }
    
    
    async function updateFruit(fruit_name,qty,price){
        const fruit = await pool.query('select * from fruit_basket where fruit_name =$1', [fruit_name])
        if (fruit.rowCount === 0) {
            await pool.query('insert into fruit_basket  (fruit_name,qty,price) values($1,$2,$3)', [fruit_name,qty,price])
        } else {
            await pool.query('update fruit_basket  set qty = qty + qty where fruit_name = $1', [fruit_name])
        }
    }

    async function getprice(fruit_basket) {
        const priceResult = await pool.query('select sum(price) from fruit_basket where fruit_name = $1', [fruit_basket]);
            return priceResult.rows;

    }

    async function getqty(fruit_basket) {
        const qtyResult = await pool.query('select sum(qty) from fruit_basket where fruit_name = $1', [fruit_basket]);
        if (qtyResult) {
            return qtyResult.rows;
        }
        return [];
    }


    return {
        getqty,
        baskets,
        getFruit,
        getprice,
        updateFruit
    }
}