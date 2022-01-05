class slotsMiddleware {

    /* For each day available, build slots array */
    createSlots(res, daysAvailable, slotsBooked){

        // Init slots array
        var slots = new Object();
        // index to increment each day into as a new array
        var dayArrayIndex = 0;

        // For each day available, build slots array
        for (var i = 0; i <= daysAvailable.length - 1; i++) {

            // pick the Date of the next occurence of the day we are looking for
            var currentDay = new Date(this.findNextAvailableDate(daysAvailable[i]['DayOfWeek']));

            console.log('currentDay', new Date(currentDay));

            // fullfilling slot for the 3 next occurence of the date
            slots = this.fillSlotsForThisDay(currentDay, daysAvailable[i], slotsBooked, slots, dayArrayIndex++);
            slots = this.fillSlotsForThisDay(currentDay.setDate(currentDay.getDate() + 7), daysAvailable[i], slotsBooked, slots, dayArrayIndex++);
            slots = this.fillSlotsForThisDay(currentDay.setDate(currentDay.getDate() + 7), daysAvailable[i], slotsBooked, slots, dayArrayIndex++);

        }
        res.status(200).send({message: 'Get Event Slot Availability Sucess', slots: slots});
    }

    findNextAvailableDate(dayOfWeek){
         // Catching the Date of the available day(s)
        var today = new Date();
        var dateDiff = today.getDay() - dayOfWeek;

        // If the available day is before the current date do if, otherwise else
        if(dateDiff >= 0){
            var dayFinder = 7 - dateDiff;
            var currentDay = today.setDate(today.getDate() + dayFinder);
        }
        else{
            var dayFinder = Math.abs(dateDiff);
            var currentDay = today.setDate(today.getDate() + dayFinder);
        }

        // return Date of the next occurance of the availble day
        return currentDay;
    }

    fillSlotsForThisDay(currentDay, daysAvailable, slotsBooked, slots, dayArrayIndex){

         // Getting number of slots depending on the event duration
        var timeAvailableRange = (daysAvailable['Available_To'] - daysAvailable['Available_From'])*60;
        var numberOfSlots = timeAvailableRange / daysAvailable['TF_Event']['Event_Duration'];

        // Init time at availability MIN
        var timeSlot = daysAvailable['Available_From']*60;

        // Init first part of the array with the day we are currently fullfilling
        slots[dayArrayIndex] = new Object();
        slots[dayArrayIndex]['Date'] = new Date(currentDay).toISOString().slice(0, 10).toString();
        slots[dayArrayIndex]['Date_Day'] = daysAvailable['Day'];
        slots[dayArrayIndex]['Availability'] = new Object();

        // For each slot, pushing the time HH:mm and if the slot is available. numberOfSlot - 1 to avoid a appointment above MAX range
        for (var y = 0; y <= numberOfSlots - 1; y++) {

            // Incremente timeSlot from MIN to MAX
            timeSlot += daysAvailable['TF_Event']['Event_Duration'];

            // Turn timeSlot from minute to hours
            var slotToPush = (parseInt(timeSlot/60)<10?'0'+parseInt(timeSlot/60):parseInt(timeSlot/60))+':'+(timeSlot%60<10?timeSlot%60+'0':timeSlot%60);


            // Compare current timeSlot to slots already booked by users for this event
            var slotAvailable = 1;

            // Looking over each slots already booked
            for (var z = slotsBooked.length - 1; z >= 0; z--) {

                // formatting date and slotTime to compare themselves
                var dateBooked = new Date((slotsBooked[z]['Date_Booked']).toString()).toISOString().split('T')[0];
                var slotBooked = (slotsBooked[z]['Date_Booked']).toString().substr(16,5);

                // If Date and slotTime is equal, this slot is already booked, then break to go to next slot.
                if((currentDay == dayBooked) && (slotToPush == slotBooked)) {
                    slotAvailable = 0;
                    break;
                }
            }

            // finally init and fullfilling the array with the data, go to next slot
            slots[dayArrayIndex]['Availability'][y] = new Object();
            slots[dayArrayIndex]['Availability'][y]['Slot_Time'] = slotToPush;
            slots[dayArrayIndex]['Availability'][y]['Slot_Availability'] = slotAvailable;

        }

        return slots;
    }

}

module.exports = {slotsMiddleware};