
import { Restaurant } from '../models/Restaurant.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const register=async (req, res)=>{

    try{
        const {name, email, password, address, phone, logo }=req.body;

        const emailExists= await Restaurant.findOne({email});

        if(emailExists){
            return res.status(400).json({
                success: false,
                message: 'Email already in use'
            })
        }

        const hashedPassword= await bcrypt.hash(password, 10);
        const restaurant=new Restaurant({
            name,
            email,
            password: hashedPassword,
            address,
            phone,
            logo,
        });

        await restaurant.save();

        const token = jwt.sign(
            { id: restaurant._id },
            process.env.JWT_SECRET,
            { expiresIn: '2d' }
        )

        res.status(201).json(
            {
                success: true,
                token,
                restaurant: {
                    id: restaurant._id,
                    name: restaurant.name,
                    email: restaurant.email
                }
            }
        );

    }catch(error) {
        console.error('Registration error', error);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })

    }

    
};

const login= async (req, res)=>{

    try{

        const {email, password}=req.body;
        const restaurantExists= await Restaurant.findOne({email});

        if(!restaurantExists){
            return res.status(401).json(
                {
                    success:false,
                    message:'Invalid email or password',
                }
            )
        }

        const match=await bcrypt.compare(password, restaurantExists.password);

        if(!match){

            return res.status(401).json(
                {
                    success: false,
                    message: 'Invalid email or password',
                }
            )

        }

        const token = jwt.sign(
            { id: restaurantExists._id },
            process.env.JWT_SECRET,
            { expiresIn: '2d' }
        );

        res.status(200).json({
            success: true,
            token,
            restaurant: {
                id: restaurantExists._id,
                name: restaurantExists.name,
                email: restaurantExists.email,
                qrCode: restaurantExists.qrCode

            }
        });


    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });

    }

}

// Get restaurant profile
const getProfile = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.restaurant.id).select('-password');

        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: 'Restaurant not found'
            });
        }

        res.status(200).json({
            success: true,
            restaurant
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// edit profile

const editProfile = async (req, res) => {
    try {
        const {email}=req.body;
        const restaurant = await Restaurant.findOne({email});

        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: 'Restaurant not found'
            });
        }
        const {name, address, phone, logo }=req.body;

         // Update fields

        
        restaurant.name = name || restaurant.name;
        restaurant.address = address !== undefined ? address : restaurant.address;
        restaurant.phone = phone !== undefined ? phone : restaurant.phone;
        restaurant.logo = logo !== undefined ? logo : restaurant.logo;
        

        await restaurant.save();

        res.status(200).json({
            success: true,
            restaurant
        });
    } catch (error) {
        console.error('Edit profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};


export { register, login, getProfile, editProfile };