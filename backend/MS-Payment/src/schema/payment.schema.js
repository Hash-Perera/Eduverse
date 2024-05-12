const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({

    course:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    userName:{
        type: String
    },
    price:{
        type: Number
    },
    session_id : {
        type : String
    }
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Payment", paymentSchema);