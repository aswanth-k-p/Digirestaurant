import mongoose from "mongoose";


const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        default: ''
    },
    qrCode: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    }
}, { timestamps: true });

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
// module.exports = Restaurant;
export {Restaurant};