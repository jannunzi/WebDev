var braintree = require("braintree");

var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: "tcjtq7fcjbttnfb5",
    publicKey: "3yfhgcysvp6dzxw8",
    privateKey: "c4c214a0904450885fae523afdfb47a9"
});

module.exports = function(app){

    console.log("ewq");

    app.post("/checkout", checkout);
    app.get("/client_token", getClientToken);

    function getClientToken (req, res) {
        gateway.clientToken.generate({}, function (err, response) {
            res.send(response.clientToken);
        });
    }

    function checkout(req, res) {
        var nonceFromTheClient = req.body.payment_method_nonce;

        gateway.transaction.sale({
            amount: '10.00',
            paymentMethodNonce: nonceFromTheClient,
        }, function (err, result) {

        });

        //var body = req.body;
        //res.json(body);
        res.send(req.body);
    }
}
