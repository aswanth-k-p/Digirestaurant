import { Restaurant } from "../models/Restaurant.js";
import QRCode from "qrcode";



const generateQRCode = async (req, res) => {


    const upload_preset = process.env.upload_preset;
    const cloud_name = process.env.cloud_name;

    

    



    const restaurant = await Restaurant.findById(req.restaurant.id);

    if (!restaurant) {
        return res.status(404).json({
            success: false,
            message: 'Restaurant not found'
        });
    }
    const VITE_CLIENT_URI=process.env.VITE_CLIENT_URI
    const menuUrl = `${VITE_CLIENT_URI}/menu/${restaurant._id}`;
    



    try {
        const qrCodeData = await QRCode.toDataURL(menuUrl);
        const data = new FormData();
        data.append("file", qrCodeData);
        data.append("upload_preset", upload_preset);
        data.append("cloud_name", cloud_name);

        const result = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
            method: "POST",
            body: data
        })
        const uploadedURL = await result.json();



        restaurant.qrCode = uploadedURL.url;
        await restaurant.save();

       res.status(200).json({
            success: true,
            qrCode: restaurant.qrCode,
            menuUrl
        });

    } catch (error) {
        console.error('Generate QR code error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }



}


export { generateQRCode }