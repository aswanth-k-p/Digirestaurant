import { Restaurant } from "../models/Restaurant.js";
import jwt from 'jsonwebtoken';



const authenticate= async(req, res, next)=>{
    try {

        const token = req.header('Authorization')?.split(" ")[1];
        
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No token, authorization denied'
            });
        }
        
       

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // console.log(decoded, token)
        const restaurant = await Restaurant.findById(decoded.id);

        if (!restaurant) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token'
            });
        }

        // Attach restaurant to request
        req.restaurant = {
            id: restaurant._id
        };

        next();

    } catch (error) {
        console.error('Authentication error:', error);
        res.status(401).json({
            success: false,
            message: 'Invalid token'
        });
    }
}

export {authenticate};