/* Path for notifications */

module.exports = function(app){
	
	const notificationsController = require("../controller/notifications.controller.js");

	app.post('/notification/newBooking', (req, res) => {
	  new notificationsController.Notifications().sendMailNotification(req.body.mailTo,req.body.userName,req.body.dateBooked);
	})

}