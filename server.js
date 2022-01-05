const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var multer = require('multer')
const app = express();

app.use(cors());
/* parse requests of content-type - application/json */
app.use(bodyParser.json());
/* parse requests of content-type - application/x-www-form-urlencoded */
app.use(bodyParser.urlencoded({ extended: true }));


/* database import for initialisation */
const db = require("./app/models");
const TR_Users = db.TR_Users;

/* fetch current database */
db.sequelize.sync();

/* drop en resync with database */
// db.sequelize.sync({force: true}).then(() => {
// 	TR_Users.bulkCreate([{ID_User: 'delcroix', Name:'delcroix L'}, {'ID_User': 'fantino', Name:'fantino M'}])
// });

/* routing  */
require('./app/routes/event.routes.js')(app);
require('./app/routes/slots.routes.js')(app);
require('./app/routes/notifications.routes.js')(app);

/* set port, listen for requests */
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});