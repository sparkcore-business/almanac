/* Path for Event queries. An event could be named calendar aswell */

module.exports = function(app){

	const eventController = require("../controller/events.controller.js");

	app.post('/set/event', (req, res) => {
	  new eventController.Event(req, res).setEvent();
	})

	app.post('/get/eventsAvailable', (req, res) => {
	  new eventController.Event(req, res).getEventsAvailable();
	})

}