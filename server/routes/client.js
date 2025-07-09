const express = require("express");


const {
  checkValidDataRegister,
} = require("../middleware/authMiddleware");

const protectFromCookie = require("../middleware/cookieChecker")
const { isValidEmail } = require("../utils/index");
const Client = require("../model/client");

const clientRouter = express.Router();






//  get client
clientRouter.get("/get-clients" , protectFromCookie , async(req, res) =>{
    try {
        const userId = req?.user?.id;
        const allClients = await Client.find({userId})
        // console.log(allClients)

        return res.status(200).json({
            status:200,
            msg:"Fetched succesfully",
            data:allClients,
            error:""
        })
        
    } catch (error) {
        res.status(400).json({
            status: 400,
            msg: "Fetching client failed",
            error: error.message,
            data: {},
          })
    }
})


module.exports = clientRouter;
