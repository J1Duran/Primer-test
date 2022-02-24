var express = require('express');
const path = require('path');
const fetch = require('node-fetch');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname + '/../views/index.html'));
});


router.post("/client-token", async (req, res) => {
    const url = `${process.env["PRIMER-API-URL"]}/auth/client-token`;
    const response = await fetch(url, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "X-Api-Key": process.env["PRIMER-API-KEY"],
        },
    });
    const json = await response.json();
    return res.send(json);
});

router.post("/authorize", async (req, res) => {
    const {token} = req.body;
    const url = `${process.env["PRIMER-API-URL"]}/payments`;
    const response = await fetch(url, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "X-Api-Key": process.env["PRIMER-API-KEY"],
        },
        body: JSON.stringify({
            amount: 700,
            currencyCode: "USD",
            orderId: "invoice1",
            paymentInstrument: {
                token: token,
            },
        }),
    })
    return res.send(await response.json);
})
module.exports = router;
