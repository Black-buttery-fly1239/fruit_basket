let assert = require("assert");
let basket = require("../theBasket");
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123@localhost:5432/my_fruitbasket_test';

const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});


describe('The my_fruit_basket_tests database', async function () {

    const fruitBasket = await basket(pool);
    beforeEach(async function () {
        await pool.query('delete from fruit_basket');
    });

    it('should be able to add the fruit_name from to fruit_basket', async function () {


        await fruitBasket.baskets('Apple', 1, 3.00);
        await fruitBasket.baskets('Banana', 1, 4.00);
        
        var getIt = await fruitBasket.getFruit('Apple','Banana')
        assert.equal(getIt[0].fruit_name, 'Apple','Banana')
    });

    it('should be abble to update the qty', async function () {

        await fruitBasket.baskets('Apple', 1, 3.00);
        await fruitBasket.baskets('Banana', 1, 4.00);

        await fruitBasket.updateFruit(['Apple', 1, 3.00]);
        await fruitBasket.updateFruit(['Banana', 1, 4.00]);

        let theupdate = await fruitBasket.getFruit('Apple', 'Banana')
        assert.deepEqual(1, theupdate[0].qty);


    });

    it('should be able to show the total price for a given fruit basket which is apple', async function () {

        await fruitBasket.baskets('Apple', 1, 3.00);
        
        await fruitBasket.getprice('Apple', 1, 3.00);
        let theSum = await fruitBasket.getFruit('Apple')
        
        assert.deepEqual(3.00, theSum[0].price);


    });

    it('should be able to show the total price for a given fruit basket which is Banana', async function () {

        await fruitBasket.baskets('Banana', 1, 4.00);
        await fruitBasket.getprice('Banana', 1, 4.00);
        
        let theSum = await fruitBasket.getFruit('Banana')

        assert.deepEqual(4.00, theSum[0].price);

    });

    it('should be able to show the qty of the fruit_basket for a given fruit type (Apple)', async function () {

        await fruitBasket.baskets('Apple', 1, 3.00);
        await fruitBasket.getqty('Banana', 1, 4.00);
        let theQty = await fruitBasket.getFruit('Apple', 'Banana')
   
        assert.deepEqual(1, theQty[0].qty);
    });


});1