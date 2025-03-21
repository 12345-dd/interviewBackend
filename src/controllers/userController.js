const userSchema = require("../models/userModel");
const Encrypt = require("../utils/Encrypt");

const registerUser = async(req,res) => {
    try{
        req.body.password = await Encrypt.encryptPassword(req.body?.password);
        const newUser = await userSchema.create(req.body);
        if(newUser){
            res.status(200).json({
                message:"User Registered Successfully",
                data:newUser
            })
        } else {
            res.status(404).json({
                message:"Error in Registering User"
            })
        }
    }catch(err){
        res.status(500).json({
            message:"Internal Server Error",
            data:err
        })
    }
}

const loginUser = async(req,res) => {
    try{
        const {email,password} = req.body;
        const user = await userSchema.findOne({email:email});

        if(user !== null){
            const isMatch = await Encrypt.comparePassword(password,user.password);
            if(isMatch){
                res.status(200).json({
                    message:"Login Successfully",
                    data:user
                })
            } else {
                res.status(401).json({
                    message:"Invalid Credential"
                })
            }
        } else {
            res.status(404).json({
                message:"User Not Found"
            })
        }
    } catch(err){
        res.status(500).json({
            message:"Internal Server Error",
            data:err
        })
    }
}


const getAllPeers = async(req,res) => {
    try{
        const peers = await userSchema.find({},"name email");
        if(peers){
            res.status(200).json({
                message:"Geeting All Peers Successfully",
                data:peers
            })
        } else {
            res.status(404).json({
                message:"Error in getting Peers"
            })
        }
    } catch(err){
        res.status(500).json({
            message:"Internal Server Error",
            data:err
        })
    }
}

module.exports = {
    registerUser,
    loginUser,
    getAllPeers,
}