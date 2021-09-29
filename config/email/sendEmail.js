var fs = require("fs");
var nodemailer = require("nodemailer");
var ejs = require("ejs");


// var transporter = nodemailer.createTransport({
//     host: 'smtpout.secureserver.net',
//     name:   'www.conamorejewels.com',
//     port: 465,
//     secure: true,
//     auth: {
//         user: 'contact@conamorejewels.com',
//         pass: 'Dheeraj&Eddhita'
//     }
// });

var transporter = nodemailer.createTransport({
    host: 'smtpout.secureserver.net',
    port: 587,
    auth: {
        user: 'info@instantmenu.co',
        pass: 'instantmenu@2021'
    }
});

// var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     host: 'smtp.gmail.com',
//     auth: {
//         user: 'infocubics.work@gmail.com',
//         pass: 'InfoCubics@1997'
//     }
// });

ejs.renderFile(__dirname + "/test.ejs", { name: 'Stranger' }, function (err, data) {
if (err) {
    console.log(err);
} else {
    var mainOptions = {
        from: '"Tester" testmail@zoho.com',
        to: "darshan.kateshiya22@gmail.com",
        subject: 'Hello, world',
        // html: data
    };
    // console.log("html data ======================>", mainOptions.html);
    transporter.sendMail(mainOptions, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log('Message sent: ' + info.response);
        }
    });
}

});