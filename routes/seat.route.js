const express = require("express")
const app = express()

const seatController = require("../controllers/seat.controller")
/** load function from auth-controller */
const { authorize } = require('../controllers/auth.controller')

/** load function from role-validation */
const {IsUser, IsAdmin} = require('../middlewares/role-validation')

app.get("/",authorize,seatController.getAllSeat)
app.get("/:key",authorize,seatController.findSeat)
app.post("/",authorize,seatController.addSeat)
app.put("/:id",authorize,seatController.updateSeat)
app.delete("/:id",authorize,seatController.deleteSeat)

module.exports=app