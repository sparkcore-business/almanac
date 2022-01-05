/* Import sequelize module */
const db = require("../models");
const { Op } = require("sequelize");

/* Import used tables */
const TF_Events = db.TF_Events;
const TF_Event_Availability = db.TF_Event_Availability;

class Event{

    constructor(req, res){
        this.req = req;
        this.res = res;
    }

    /* A user create a new event / calendar */
    setEvent(){

        TF_Events.create({
            ID_User: this.req.body.currentUser,
            Event_Name: this.req.body.eventName,
            Event_Mail: this.req.body.eventMail,
            Event_Duration: this.req.body.eventDuration,
            })
        .then(event => {

            // Could be upgraded to not insert unavailable days
            try{
                for (let i = 1; i < 8; i++) {
                      TF_Event_Availability.create({
                        ID_Event: event.ID_Event,
                        Day: this.req.body.eventAvailablity[i]['Day'],
                        DayOfWeek: this.req.body.eventAvailablity[i]['DayOfWeek'],
                        Available: this.req.body.eventAvailablity[i]['Available'],
                        Available_From: this.req.body.eventAvailablity[i]['TimeFrom'],
                        Available_To: this.req.body.eventAvailablity[i]['TimeTo']
                    })
                }
                this.res.status(200).send({ message: "Create Event Success"})
            }catch(err){
                this.res.status(500).send({ message: "Create Event ERROR - F_setEvent", err})
            }

        })
        .catch(err => {this.res.status(500).send({ message: "Create Event ERROR - F_setEvent", err})})


    }

    /* Getting events */
    getEventsAvailable(){

        TF_Events.findAll({
            attributes: ['ID_User', 'ID_Event', 'Event_Name', 'Event_Duration'],
            where :{
            [Op.not]: [{ ID_User: this.req.body.currentUser }]
            },
            order: [['createdAt', 'DESC']]
        })
        .then(EventsAvailable => {
            this.res.status(200).send({ message: "Get Events Success", events: EventsAvailable})
        })
        .catch(err => {this.res.status(500).send({ message: "Get Events Available ERROR - F_getEventsAvailable", err})})

    }

}

module.exports = {Event};