const e = require('express');
const express = require('express');
const rout = express.Router("");
const userData =  require ('../Schema/UserData');


rout.post("/signup", async (req, res) => {
    const User = userData.find({ username: req.body.username }, async (err, data) => {
        if (data) {
            const Getter = data
            if (Getter == "") {
                const Person = userData.find({ email: req.body.email }, async (err, edata) => {
                    const Active = edata;
                    if (Active == "") {
                        const register = new userData({
                            username: req.body.username,
                            email: req.body.email,
                            password: req.body.password
                        })
                        await register.save();
                        res.json({
                            status : 1,
                            message: "Registered Successfully ! please Login..."
                        });
                    }
                    else {
                        res.json({
                            status : 0,
                            error: "email already exist ! Please use another mail Id"
                        })
                    }
                })
            }
            else {
                res.json({
                    status : 0,
                    error: "Username Already exist ! Please use another mail Id"
                })
            }
        }
    })
})



rout.post("/signin", async (req, res) => {
    const Us = userData.find({ email: req.body.email }, (err, data) => {
        if (data) {
            const UDatas = data
            if (UDatas == "") {
                res.json({
                    status: 0,
                    error: "user Not found ! please try again"
                })
            } else {
                userData.findOne({ email: req.body.email }, (err, data) => {
                    if (data.password == req.body.password) {
                        res.json({
                            status : 1,
                            message : "Login Successfully",
                        })
                    }
                    else {
                        res.json({
                            status: 0,
                            error: "Invalid password ! try again..."
                        })
                    }
                })
            }
        }
    })
})


rout.post("/getdata", async (req,res) => {
    try {

        const email = req.body.email;

        if(email != ''){
            const result = await userData.findOne({email : email})
            if(result != null){
                res.json({
                    status : 1,
                    message : "Success",
                    result
                })
            }else{
                res.json({
                    status : 0,
                    message : "Data Not Found"
                })
            }
        }else{
            res.json({
                status : 0,
                message : "User not Not Found"
            })
        }
        
    } catch (error) {
        console.log(error);
        res.json({
            status : 0,
            message : "Server Error"
        })
    }
})

rout.get("/", (req,res) => {
    res.send("connected")
})

rout.post("/userupdate/:id", async (req,res) => {
    try {
        
        const username = req.body.username
        const email = req.body.email
        const age = req.body.age
        const dob = req.body.dob
        const gender = req.body.gender
        const phoneno = req.body.phoneno

        await userData.findByIdAndUpdate({_id : req.params.id},{
            $set : {
                username,
                email,
                age,
                dob,
                gender,
                phoneno
            }
        }).then((data) => {
            res.json({
                status : 1,
                message : "Successfully Updated"
            })
        }).catch((err) => {
            console.log(err);
            res.json({
                status : 0,
                message : "Do Not Update"
            })
        })

    } catch (error) {
        console.log(err)
        res.json({
            status : 0,
            message : "Server Error"
        })
    }
})

module.exports = rout