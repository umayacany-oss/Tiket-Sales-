const express = require("express")
const app = express()

const cors = require("cors")
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const userRoute = require("./routes/user.route")
const diskonRoute = require("./routes/diskon.route")
const eventRoute = require("./routes/event.route")
const seatRoute = require("./routes/seat.route")
const ticketRoute = require("./routes/ticket.route")
const auth = require(`./routes/auth.route`)

app.use("/user", userRoute)
app.use("/diskon", diskonRoute)
app.use("/event", eventRoute)
app.use("/seat", seatRoute)
app.use("/ticket", ticketRoute)
app.use(`/auth`, auth)

app.listen(8000,()=>{
    console.log("Server jalan")
})