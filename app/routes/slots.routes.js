/* Path for Slots queries. A Slot is a appointment taken on a event / calendar  */

module.exports = function(app){

	const slotsController = require("../controller/slots.controller.js");

	app.post('/get/event/slotsAvailable', (req, res) => {
	  new slotsController.Slots(req, res).getEventAvailableSlots();
	})

	app.post('/get/slotsBooked', (req, res) => {
	  new slotsController.Slots(req, res).getSlotsBooked();
	})

	app.post('/set/slot', (req, res) => {
	  new slotsController.Slots(req, res).setSlot();
	})

}