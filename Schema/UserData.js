const express = require('express');
const { default: mongoose } = require('mongoose');

const CDatas = mongoose.Schema;

const clientDetail = new CDatas({
    username : {
        type : String,
        default : ''
    },
    email : {
        type : String,
        default : ''
    },
    password : {
        type : String,
        default : ''
    },
    age : {
        type : String,
        default : ''
    },
    gender : {
        type : String,
        default : ''
    },
    dob : {
        type : String,
        default : ''
    },
    phoneno : {
        type : String,
        default : ''
    }
});

const userData = mongoose.model("client", clientDetail);

module.exports = userData;