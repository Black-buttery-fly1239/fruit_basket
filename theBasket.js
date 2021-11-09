const { Pool } = require("pg");

module.exports = (pool, fruitBasket) => {

    async function addfruit(fruit_name, price) {


        //find all the fruit baskets for a given fruit type
        const fruit = await pool.query('select * from fruit_basket  where fruit_name = $1', [fruit_name]);
        //create(this mean insert) a new fruit basket for a given fruit type,qty & price 
        if (fruit.rowCount === 0) {
            await pool.query('insert into fruit_basket  (fruit_name,qty,price) values($1,$2,$3)', [fruit_name,1 ,price])
        } else {
            //update the number of fruit in given basket
            await pool.query('update fruit_basket  set qty = qty + 1 where fruit_name = $1', [fruit_name, price])
        }

    }

    

    // async function selectQty(quantityy) {
        //show the sum of the total of the fruit baskets for a given fruit type

    //     const theQty = await pool.query('update fruit_basket se ')
    // }

    // async function selectFruit(fruit_name){
    // //     var fruit = ('select * from fruit_basket where fruit_name = $1', [fruit_name])
    // //     return fruit.rows;
    // // }


    async function getfruit() {
        const result = await pool.query('select fruit_name from fruit_basket');

        if (result) {
            return result.rows;
        }
        return [];
    }

    async function getprice(price) {
        const priceResult = await pool.query('select sum(price) from fruit_basket where price = $1', [price]);
        // if (priceResult) {
            return priceResult.rows;
        // }
        // return [];
    }

    async function getqty(qty) {
        const qtyResult = await pool.query('select qty from fruit_basket where qty = $1', [qty]);
        if (qtyResult) {
            return qtyResult.rows;
        }
        return [];
    }

    return {
        getqty,
        addfruit,
        selectQty,
        // selectPrice,
        getfruit,
        getprice
        // selectFruit
    }
}