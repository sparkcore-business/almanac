/* Import sequelize modules */
const db = require("../models");
const { Op } = require("sequelize");
var sequelize = require('sequelize');

/* Import used tables */
const TF_Event_Availability = db.TF_Event_Availability;
const TF_Booking = db.TF_Booking;
const TF_Events = db.TF_Events;

/* Import du module de notification */
const notificationsController = require("./notifications.controller.js");

/* Import des middlewares */
const slotsMiddleware = require("../middlewares/slots.middleware.js");

class Slots{

    constructor(req, res){
        this.req = req;
        this.res = res;
    }

    /* List of current slots booked of each events, for a given user*/
    getSlotsBooked(){
        TF_Booking.findAll({
            attributes: ['ID_Event', 'User_Name', 'User_Phone','User_Mail', [sequelize.fn('date_format', sequelize.col('Date_Booked'), '%d/%m/%Y %H:%i'), 'Date_Booked']],
            include: [{ 
                attributes: ['ID_User', 'Event_Name', 'Event_Duration'],
                model: TF_Events,
                where: {
                    ID_User: this.req.body.currentUser
                }
            }],
            order: [['createdAt', 'DESC']]
        })
        .then(slotsBooked => {
            this.res.status(200).send({ message: "Get Booked Slots Success", slotsBooked: slotsBooked})
        })
        .catch(err => {this.res.status(500).send({ message: "Get Booked Slots ERROR - F_getSlotsBooked", err})})
    }

    /* Book an event at a speficique time */
    setSlot(){
        TF_Booking.create({
            ID_Event: this.req.body.ID_Event,
            User_Name: this.req.body.userName,
            User_Phone: this.req.body.userPhone,
            User_Mail: this.req.body.userMail,
            Date_Booked: this.req.body.dateBooked
            })
        .then(event => {

            TF_Events.findOne({
              where: { ID_Event: event.ID_Event }
            }).then(event => {
                new notificationsController.Notifications().sendMailNotification(event.Event_Mail, this.req.body.userName, this.req.body.dateBooked);
                this.res.status(200).send({ message: "Create Slot Success"})
            }).catch(err => {this.res.status(500).send({ message: "Create Slot ERROR - F_setSlot", err})})

        })
        .catch(err => {this.res.status(500).send({ message: "Create Slot ERROR - F_setSlot", err})})
    }


    /* get available slots for a given event */
    getEventAvailableSlots(){

        TF_Event_Availability.findAll({
            attributes: ['ID_Event', 'Day', 'DayOfWeek', 'Available_From', 'Available_To'],
            where: {
              [Op.and]: [{ ID_Event: this.req.body.ID_Event }, {Available: 1}]
            },
            include: [{ 
                attributes: ['Event_Duration'],
                model: TF_Events
            }],
            order: [['createdAt', 'ASC']]
        })
        .then(daysAvailable => {

            TF_Booking.findAll({
                attributes: ['ID_Event', 'Date_Booked'],
                include: [{ 
                    attributes: ['ID_User'],
                    model: TF_Events,
                    where: { ID_User: this.req.body.ID_User }
                }],
                order: [['createdAt', 'DESC']]
            })
            .then(slotsBooked => {
                var slots = new slotsMiddleware.slotsMiddleware().createSlots(this.res, daysAvailable, slotsBooked);
            })
            .catch(err => {this.res.status(500).send({ message: "Get Event Slot Availability ERROR - F_getEventAvailableSlots", err})})

        })
        .catch(err => {this.res.status(500).send({ message: "Get Event Slot Availability ERROR - F_getEventAvailableSlots", err})})
    }

}

module.exports = {Slots};