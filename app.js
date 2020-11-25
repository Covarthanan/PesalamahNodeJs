const express = require('express');
const cors = require('cors')
const nodemailer = require('nodemailer');
const bodyParser = require("body-parser");

//const hostname = '127.0.0.1';
const app = express();
//app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.use(cors());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
     res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})

const port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
    console.log(`Server running at port : ${port}/`);
});

app.get("/", (req, res) => {
    res.send("<h1>Pesalamah !</h1>");
    sendmail();
})

app.post("/sendmail", (req, res) => {
    console.log("Request Came");
    let User = req.body;
    console.log("User "+User.mail);
    console.log("working");
    sendmail(User, info => {
       // console.log(`The Mail has been Send and the id is ${info.messageId}`);
        console.log("info " + info);
        console.log("user "+ User);
        res.send(info);
    })
})

async function sendmail(user) {

    //Step 1
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'noreplypesalamah@gmail.com',
            pass: 'vennila34'
        }
    });

    //Step 2 
    let mailOptions = {
        from: 'noreplypesalamah@gmail.com',
        to: user.mail,
        subject: user.subject,
        html: `<html>
                <head>
                 <title>Your Token</title>
                    <style>
                    h1{
                        color:#a7c957;
                        font-size:35px;
                    }
                    h2{
                        color:#345a09;
                    }
                    div{
                        color:#345a09;
                    }
                    </style>
                </head>
                  <body style="border:5px solid #345a09;text-align:center;border-radius: 12px;">
                    <h2 style="padding-top: 20px;font-size: 25px;">Welcome to Pesalamah!</h2>
                    <p style="color:#345a09;">Your have successfully created account.<br/>Please enter the verification code to verify your gmail.<br/>And be ready to have fun.</p>
                    <div>----------------------------------------------------------------------------</div>
                    <div>
                        <h1>${user.otp}<h1>
                    </div>
                    <div>----------------------------------------------------------------------------</div>    
                    <h5 style="color:#345a09;">Thanks you for choosing Pesalamah!</h5>
                    <h6 style="color:#345a09;">Pesalamah! Messenger</h6>
                  </body>
                </html>`
    }
    //brindhaalbertkennady@gmail.com
    //Step 3

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log("Error Occurs", err);
        } else {
            console.log("Mail has been Sent");
        }
    });
}

