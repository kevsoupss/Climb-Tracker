const mongoose = require("mongoose")

const Schema = mongoose.Schema 

const climbSchema = new Schema({
    title: {type: String, required: true},
    desc: {type: String, required: true},
    isStarred: {type: Boolean, required: false},
    userId: {type: String, required: true},
    title: {type: String, required: true},
    link: {type: String, required: true},
    createdOn: {type: Date, default: new Date().getTime()},
    vlevel: {type: String, required: true}
})

module.exports = mongoose.model("Climb", climbSchema)