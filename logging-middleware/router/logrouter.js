const express = require("express")

const router = express.Router()

router.post("/", (req,res)=>{
    const logData = req.body
    console.log("Received Log:")
    console.log(logData)
    res.send("log stored successfully")

})

module.exports = router
