/** load model */
const seatModel = require(`../models/index`).seat
const userModel = require(`../models/index`).user
const eventModel = require(`../models/index`).event
const ticketModel = require(`../models/index`).ticket

/** load Operation from Sequelize */
const Op = require(`sequelize`).Op


/** create function for add new ticket */
exports.addTicket = async (request, response) => {

    /** prepare date for bookedDate */
    const today = new Date()

    const bookedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`

    /** prepare data from request */
    const { eventID, seats } = request.body

    /** get userID from logged-in user */
    const userID = request.user.userID

    try {

        /** Create seat records for the chosen seats */
        const seatIDs = await Promise.all(
            seats.map(async seat => {

                const { rowNum, seatNum } = seat

                const createdSeat = await seatModel.create({
                    eventID,
                    rowNum,
                    seatNum,
                    status: 'true'
                })

                return createdSeat.seatID
            })
        )

        /** Create ticket records */
        const tickets = await ticketModel.bulkCreate(
            seatIDs.map(seatID => ({
                eventID,
                userID,
                seatID,
                bookedDate
            }))
        )

        return response.status(201).json({
            success: true,
            data: tickets,
            message: `Tickets have been created`
        })

    } catch (error) {

        return response.json({
            success: false,
            message: error.message
        })
    }
}


/** create function for read all data */
exports.getAllTicket = async (request, response) => {

    /** prepare where condition */
    let whereCondition = {}

    /**
     * If the logged-in user is not admin,
     * only show tickets belonging to that user
     */
    if (request.user.role !== "admin") {
        whereCondition.userID = request.user.userID
    }

    /** get ticket data */
    let tickets = await ticketModel.findAll({
        where: whereCondition,

        include: [
            {
                model: eventModel,
                attributes: ['eventName', 'eventDate', 'venue']
            },
            {
                model: userModel,
                attributes: ['firstName', 'lastName']
            },
            {
                model: seatModel,
                attributes: ['rowNum', 'seatNum']
            }
        ]
    })

    return response.json({
        success: true,
        data: tickets,
        message: `Tickets have been loaded`
    })
}


/** create function for filter ticket by ID */
exports.ticketByID = async (request, response) => {

    /** get ticketID from parameter */
    let ticketID = request.params.id

    /** prepare where condition */
    let whereCondition = {
        ticketID: {
            [Op.substring]: ticketID
        }
    }

    /**
     * If the logged-in user is not admin,
     * only allow them to see their own ticket
     */
    if (request.user.role !== "admin") {
        whereCondition.userID = request.user.userID
    }

    /** get ticket data */
    let tickets = await ticketModel.findAll({
        where: whereCondition,

        include: [
            {
                model: eventModel,
                attributes: ['eventName', 'eventDate', 'venue']
            },
            {
                model: userModel,
                attributes: ['firstName', 'lastName', 'email']
            },
            {
                model: seatModel,
                attributes: ['rowNum', 'seatNum']
            }
        ]
    })

    return response.json({
        success: true,
        data: tickets,
        message: `Tickets have been loaded`
    })
}