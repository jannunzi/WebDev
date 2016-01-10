var braintree = require("braintree");

var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY
});

module.exports = function(app){

    app.post("/checkout", checkout);
    app.get("/client_token", getClientToken);

    function getClientToken (req, res) {
        gateway.clientToken.generate({}, function (err, response) {
            res.send(response.clientToken);
        });
    }

    function checkout(req, res) {
        var nonceFromTheClient = req.body.payment_method_nonce;
        var customer = req.body;

        gateway.customer.create({
            firstName: customer.firstName,
            lastName: customer.lastName,
            company: customer.company,
            email: customer.email,
            phone: customer.phone,
            fax: customer.fax,
            website: customer.website
            //,paymentMethodNonce: nonceFromTheClient
        }, function (err, result) {
            console.log("CUSTOMER CALLBACK");
            console.log(result);
            //result.success;
            //// true
            //
            //result.customer.id;
            // e.g. 494019

            var customer = result.customer;

            gateway.paymentMethod.create({
                customerId: customer.id,
                paymentMethodNonce: nonceFromTheClient
            }, function (err, result) {

                var paypalAccount = result.paypalAccount;
                var paymentMethod = result.paymentMethod;

                gateway.subscription.create({
                    paymentMethodToken: paymentMethod.token,
                    planId: "cs5610planId"
                }, function (err, result) {

                    res.send(result);

                });
            });
        });

        //gateway.transaction.sale({
        //    amount: '10.00',
        //    paymentMethodNonce: nonceFromTheClient,
        //}, function (err, result) {
        //
        //});

        //var body = req.body;
        //res.json(body);
    }
}
