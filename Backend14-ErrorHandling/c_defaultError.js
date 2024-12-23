// We can also set default error status and error message in response if our code gets error somewhere 

let express = require("express");
const app = express();

app.listen(8080, () => {
    console.log("App listening on port number : 8080");

})

app.get("/api", (req, res) => {

    let { token } = req.query;
    if (token === "giveaccess") {
        res.send("Welcome!");
    }


})



app.get("/err", (req, res) => {
    abcd = abcd;
})
//here as we will go on the route /err we will get an error as here abc is not defined.In this case express's default error handler will generate an error and send it as response but we can also set our own default error like here below as our compiler will hit this error then it will search for a middleware that will be handling this error , like here below our error handling middleware is doing.
app.use((err, req, res, next) => {
    let { status=401, message="Some error occured"} = err;//here we have setted our own status and message that we will send to client side as a response
    //Our error does not contian any error status code then 401 will be setted as its status code and if this error does not send any message about the error then this message will be setted as error message.
    res.status(status).send(message);
    //here as we call status method of res then our compilor understands that it is an error message.

    //in current case as we will call for /err route then it will create an error that 'abcd is not defined'.But it will not return any status code.So 401 will be setted as status code but as here this error contains message 'abcd is not defined' so it will be setted as message.
})