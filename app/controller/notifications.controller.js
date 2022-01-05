class Notifications {

    /* Send Email notification with MailJet API */
    sendMailNotification(mailTo, userName, dateBooked){
        console.log("MAIL PARAMS: ",mailTo, userName, dateBooked);
        const mailjet = require ('node-mailjet')
        .connect('4f5c73bf055f367dc931b598f49bf6a1', '92f1fbe9415c0eab166fef09b54e7f7b')
        const request = mailjet
        .post("send", {'version': 'v3.1'})
        .request({
        "Messages":[
          {
            "From": {
              "Email": "noreply.sparkcore.business@gmail.com"
            },
            "To": [
              {
                "Email": mailTo
              }
            ],
            "Subject": "Almanac - New Booking",
            "HTMLPart": userName+" à réserver un crénau le "+dateBooked+".",
          }
        ]
        })
        request
        .then((result) => {
            this.res.status(200).send({message: "Notification Mail Sucess"});
        })
        .catch((err) => {
            this.res.status(500).send({message: "Notification Mail ERROR - F_sendMailNotification", err});
        })

    }

}

module.exports = {Notifications};