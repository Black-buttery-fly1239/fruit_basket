const { Pool } = require("pg");

module.exports = (pool, fruitBasket) => {

    async function baskets(fruit_name,qty,price) {
        await pool.query('insert into fruit_basket(fruit_name, qty, price) values($1, $2, $3)', [fruit_name,qty,price])
    }

    async function getFruit(fruit_name) {
        const fruit = await pool.query('select * from fruit_basket where fruit_name =$1', [fruit_name]);
        return fruit.rows;
    }
    
    
    async function updateFruit(fruit_name,qty){
            await pool.query('update fruit_basket  set qty = qty + $2 where fruit_name = $1', [fruit_name,qty])
      
    }

    async function getprice(fruit_name) {
        const priceResult = await pool.query('select sum(price) from fruit_basket where fruit_name = $1', [fruit_name]);
            return priceResult.rows;

    }

    async function getqty(fruit_name) {
        const qtyResult = await pool.query('select sum(qty) from fruit_basket where fruit_name = $1', [fruit_name]);
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