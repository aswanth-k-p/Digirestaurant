import { Category } from "../models/Category.js";
import { MenuItem } from "../models/MenuItem.js";
import { Restaurant } from "../models/Restaurant.js";


const createCategory = async (req, res) => {

    try {
        const { name, order } = req.body;

        const category = new Category({
            name,
            restaurant: req.restaurant.id,
            order: order || 0
        });

        await category.save();

        res.status(201).json({
            success: true,
            category
        });

    } catch (error) {

        console.error('Create category error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });

    }
}

const getCategories = async (req, res) => {

    try {
        const categories = await Category.find({ restaurant: req.restaurant.id })
            .sort({ order: 1, name: 1 });

        res.status(200).json({
            success: true,
            categories
        });
    } catch (error) {
        console.error('Get categories error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
}

const updateCategory = async (req, res) => {

    try {
        const { name, order, isHidden } = req.body;

        const category = await Category.findOneAndUpdate(
            { _id: req.params.id, restaurant: req.restaurant.id },
            { name, order, isHidden},
            { new: true }
        );
        
        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        res.status(200).json({
            success: true,
            category
        });
    } catch (error) {
        console.error('Update category error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
}

const deleteCategory = async (req, res) => {

    try {
        const category = await Category.findOneAndDelete({
            _id: req.params.id,
            restaurant: req.restaurant.id
        });

        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        // Also delete all menu items in this category
        await MenuItem.deleteMany({ category: req.params.id });

        res.status(200).json({
            success: true,
            message: 'Category and all its menu items deleted'
        });
    } catch (error) {
        console.error('Delete category error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
}

// Menu Items CRUD

const createMenuItem = async (req, res) => {

    try {

        const { name, description, price, category, isHidden, order, image } = req.body;
        
        if(category===''){
            return res.status(404).json({
                success: false,
                message: 'Add/Select a category'
            });
        }
        // Verify category belongs to restaurant
        const categoryDoc = await Category.findOne({
            _id: category,
            restaurant: req.restaurant.id
        });

        if (!categoryDoc) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        const menuItem = new MenuItem({
            name,
            description,
            price,
            category,
            restaurant: req.restaurant.id,
            isHidden: isHidden || false,
            order: order || 0,
            image,
        });

        await menuItem.save();

        res.status(201).json({
            success: true,
            menuItem
        });

    } catch (error) {

        console.error('Create menu item error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });

    }
}

const getMenuItems = async (req, res) => {

    try {
        const menuItems = await MenuItem.find({ restaurant: req.restaurant.id })
            .populate('category', 'name')
            .sort({ 'category': 1, 'order': 1, 'name': 1 });

        res.status(200).json({
            success: true,
            menuItems
        });
    } catch (error) {
        console.error('Get menu items error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }

}

const getMenuItemsPerCategory = async (req, res) => {

    try {
        
        const { categoryID } = req.params;
        const menuItems = await MenuItem.find({ category: categoryID })
            // .populate('category', 'name')
            // .sort({ 'category': 1, 'order': 1, 'name': 1 });
            // console.log(menuItems)

        res.status(200).json({
            success: true,
            menuItems
        });
        // console.log(req.params.categoryID);

        // res.status(200).json({
        //     success: true,
        //     message: 'success',
        //     // data: req.params
        
        
    
    // });


    } catch (error) {
        console.error('Get menu items error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }

}

const updateMenuItem = async (req, res) => {

    try {
        const { name, description, price, category, isHidden, order, image } = req.body;

        // Verify category belongs to restaurant
        if (category) {
            const categoryDoc = await Category.findOne({
                _id: category,
                restaurant: req.restaurant.id
            });

            if (!categoryDoc) {
                return res.status(404).json({
                    success: false,
                    message: 'Category not found'
                });
            }
        }

        const menuItem = await MenuItem.findOne({
            _id: req.params.id,
            restaurant: req.restaurant.id
        });

        if (!menuItem) {
            return res.status(404).json({
                success: false,
                message: 'Menu item not found'
            });
        }

        // Update fields
        menuItem.name = name || menuItem.name;
        menuItem.description = description !== undefined ? description : menuItem.description;
        menuItem.price = price || menuItem.price;
        menuItem.category = category || menuItem.category;
        menuItem.isHidden = isHidden !== undefined ? isHidden : menuItem.isHidden;
        menuItem.order = order !== undefined ? order : menuItem.order;
        menuItem.image = image !== undefined ? image : menuItem.image;

        await menuItem.save();

        res.status(200).json({
            success: true,
            menuItem
        });


    } catch (error) {

        console.error('Update menu item error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });

    }
}

const deleteMenuItem = async (req, res) => {

    try {
        const menuItem = await MenuItem.findOneAndDelete({
            _id: req.params.id,
            restaurant: req.restaurant.id
        });

        if (!menuItem) {
            return res.status(404).json({
                success: false,
                message: 'Menu item not found'
            });
        }

        // Delete image if exists Need to check this how to delete the image from cloudinary
        // if (menuItem.image) {
        //   const imagePath = path.join(__dirname, '..', menuItem.image);
        //   if (fs.existsSync(imagePath)) {
        //     fs.unlinkSync(imagePath);
        //   }
        // }

        // await menuItem.remove();

        res.status(200).json({
            success: true,
            message: 'Menu item deleted'
        });
    } catch (error) {
        console.error('Delete menu item error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }

}

// Toggle menu item visibility
const toggleMenuItemVisibility = async (req, res) => {
    try {
        const menuItem = await MenuItem.findOne({
            _id: req.params.id,
            restaurant: req.restaurant.id
        });

        if (!menuItem) {
            return res.status(404).json({
                success: false,
                message: 'Menu item not found'
            });
        }

        menuItem.isHidden = !menuItem.isHidden;
        await menuItem.save();

        res.status(200).json({
            success: true,
            menuItem
        });
    } catch (error) {
        console.error('Toggle visibility error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

//uploading image

const updateImage = async (req, res) => {
    try{
        const menuItem = await MenuItem.findOne({
            _id: req.params.id,
            restaurant: req.restaurant.id
        });

        if (!menuItem) {
            return res.status(404).json({
                success: false,
                message: 'Menu item not found'
            });
        }
        const {image}=req.body;

        menuItem.image = image;

        await menuItem.save();

        res.status(200).json({
            success: true,
            menuItem
        });

    }catch(error){
         
        res.status(500).json({
            success: false,
            message: 'Server error'
        });

    }
}


// Get public menu for a restaurant
const getPublicMenu = async (req, res) => {
    try {
        const { restaurantId } = req.params;


        // Find restaurant
        const restaurant = await Restaurant.findById(restaurantId);


        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: 'Restaurant not found'
            });
        }

        // Get categories
        const categories = await Category.find({ restaurant: restaurantId, isHidden: false })
            .sort({ order: 1, name: 1 });

        // Get visible menu items
        const menuItems = await MenuItem.find({
            restaurant: restaurantId,
            isHidden: false
        }).sort({ order: 1, name: 1 });

        // Group menu items by category
        const menu = categories.map(category => {
            const items = menuItems.filter(item =>
                item.category.toString() === category._id.toString()
            );

            return {
                category: {
                    id: category._id,
                    name: category.name,
                    isHidden:category.isHidden
                },
                items: items.map(item => ({
                    id: item._id,
                    name: item.name,
                    description: item.description,
                    price: item.price,
                    image: item.image,
                    isHidden: item.isHidden
                    
                }))
            };
        }).filter(category => category.items.length > 0);

        res.status(200).json({
            success: true,
            restaurant: {
                id: restaurant._id,
                name: restaurant.name,
                logo: restaurant.logo,
                address: restaurant.address,
                phone: restaurant.phone
            },
            menu
        });
    } catch (error) {
        console.error('Get public menu error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};


export { createCategory, getCategories, updateCategory, deleteCategory, createMenuItem, getMenuItems, updateMenuItem, deleteMenuItem, toggleMenuItemVisibility, getPublicMenu, getMenuItemsPerCategory, updateImage }