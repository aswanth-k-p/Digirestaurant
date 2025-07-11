import { Router } from "express";
// import { authenticate } from "../middlewares/authenticate";
import { createCategory } from "../controllers/menuController.js";
import { getCategories } from "../controllers/menuController.js";
import { updateCategory } from "../controllers/menuController.js";
import { deleteCategory } from "../controllers/menuController.js";
import { getPublicMenu } from "../controllers/menuController.js";
import { getMenuItems } from "../controllers/menuController.js";
import { deleteMenuItem } from "../controllers/menuController.js";
import { toggleMenuItemVisibility } from "../controllers/menuController.js";
import { createMenuItem } from "../controllers/menuController.js";
import { updateMenuItem } from "../controllers/menuController.js";
import { authenticate } from "../middlewares/authenticate.js";
import { getMenuItemsPerCategory } from "../controllers/menuController.js";
import { updateImage } from "../controllers/menuController.js";





const router=Router();


// Public route for customers to view menu
router.get('/public/:restaurantId', getPublicMenu);

// Protected routes for restaurant owners
// Categories
router.post('/categories', authenticate, createCategory);
router.get('/categories', authenticate, getCategories);
router.put('/categories/:id', authenticate, updateCategory);
router.delete('/categories/:id', authenticate, deleteCategory);

//To get menu item for a specific category
router.get('/categories/:categoryID', getMenuItemsPerCategory);

// Menu items
router.post(
  '/items', 
  authenticate,  
  createMenuItem
);
router.get('/items', authenticate, getMenuItems);
router.put(
  '/items/:id', 
  authenticate, 
  updateMenuItem
);
router.delete('/items/:id', authenticate, deleteMenuItem);
router.patch(
  '/items/:id/toggle-visibility', 
  authenticate, 
  toggleMenuItemVisibility
);
router.patch(
  '/items/:id/upload-image', 
  authenticate, 
  updateImage
);

// module.exports = router;
export default router;
