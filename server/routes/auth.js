import express from "express";
import { Router } from "express";
import {register, login, getProfile, editProfile} from '../controllers/authController.js'
import { authenticate } from "../middlewares/authenticate.js";



const router=Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.put('/editprofile', editProfile);

//private route

// Protected routes
router.get('/profile', authenticate, getProfile);



// module.exports = router;

export default router;
