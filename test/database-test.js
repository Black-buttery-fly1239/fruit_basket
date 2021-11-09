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

describe('The my_fruit_basket_tests database', function () {
    beforeEach(async function () {
        await pool.query('delete from fruit_basket');
    });

    it('should be able to get the fruit_name from the fruit_basket', async function () {

        const fruitBasket = basket(pool);

        await fruitBasket.addfruit('Banana', 4.00);
        assert.deepEqual([{ fruit_name: 'Banana' }], await fruitBasket.getfruit());
    });

    it('should be able to show the total price for a given fruit basket', async function () {

        const fruitBasket = basket(pool);

        await fruitBasket.addfruit('Banana', 4.00);
        assert.deepEqual([{ sum: 4.00 }], await fruitBasket.getprice(4.00));
    });

    it('should be able to show the qty of the fruit_basket for a given fruit type', async function () {

        const fruitBasket = basket(pool);

        await fruitBasket.addfruit('Banana', 4.00);
        assert.deepEqual([{ qty: 1 }], await fruitBasket.getqty(1));
    });


});