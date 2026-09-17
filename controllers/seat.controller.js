const seatModel = require("../models").seat
const Op = require("sequelize").Op

exports.getAllSeat = async (req,res)=>{
    try{
        const seat = await seatModel.findAll()

        return res.json({
            success:true,
            data:seat,
            message:"All seat loaded"
        })

    }catch(err){
        return res.json({
            success:false,
            message:err.message
        })
    }
}
exports.findSeat = async(req,res)=>{

    let keyword = req.params.key

    let seat = await seatModel.findAll({
        where:{
            [Op.or]:[
                {
                    rowNum:{
                        [Op.substring]:keyword
                    }
                },
                {
                    seatNum:{
                        [Op.substring]:keyword
                    }
                }
            ]
        }
    })

    return res.json({
        success:true,
        data:seat
    })
}
exports.addSeat = async(req,res)=>{

    try{

        let data = {
            eventID:req.body.eventID,
            rowNum:req.body.rowNum,
            seatNum:req.body.seatNum,
            status:req.body.status
        }

        await seatModel.create(data)

        return res.json({
            success:true,
            message:"Seat inserted"
        })

    }catch(err){

        return res.json({
            success:false,
            message:err.message
        })

    }

}
exports.updateSeat = async(req,res)=>{

    try{

        let id=req.params.id

        let data={
            eventID:req.body.eventID,
            rowNum:req.body.rowNum,
            seatNum:req.body.seatNum,
            status:req.body.status
        }

        await seatModel.update(data,{
            where:{
                seatID:id
            }
        })

        return res.json({
            success:true,
            message:"Seat updated"
        })

    }catch(err){

        return res.json({
            success:false,
            message:err.message
        })

    }

}
exports.deleteSeat = async(req,res)=>{

    try{

        let id=req.params.id

        await seatModel.destroy({
            where:{
                seatID:id
            }
        })

        return res.json({
            success:true,
            message:"Seat deleted"
        })

    }catch(err){

        return res.json({
            success:false,
            message:err.message
        })

    }

}