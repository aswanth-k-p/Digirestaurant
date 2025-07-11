import { useEffect, useState } from "react"
import { api } from "../utils/api";
import EditBox from "./EditBox";
import WarningBox from "./WarningBox";
import CreateCategory from "./CreateCategory";
import MenuItems from "./MenuItems";
import Loader from "./loading/Loader";



const Menu = () => {
    
    const [categories, setCategories] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [shouldRefetch, setShouldRefetch] = useState(false);
    const[setLoadingMenu, setSetLoadingMenu]=useState(false);


    useEffect(() => { fetchData() }, [shouldRefetch]);
    //     useEffect(() => {
    //   console.log("Categories changed:", categories);
    // }, [categories]);

    const [Editvisibility, setEditvisibility] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [editingName, setEditingName] = useState('');

    const [deletevisibility, setDeletevisibility] = useState(false)
    const [IdDeleted, setIdDeleted] = useState('');

    const [CreateVisibility, setCreateVisibility] = useState(false);
    

    const handleEdit = (id, name) => {
        setEditingId(id);
        setEditingName(name);
        setEditvisibility(true);
    };

    const handleCancel = () => {
        setEditvisibility(false);
    };

    const handleSave = async (newName) => {
        await api.put(`/api/menu/categories/${editingId}`, { name: newName })
        // Here you would typically send an API request to update the category
        // console.log('Saving:', editingId, newName);
        setShouldRefetch(prev => !prev);
        setEditvisibility(false);
    };

    const handleDelete = (id) => {
        setDeletevisibility(true);
        setIdDeleted(id)
    };
    const handledeleteCancel = () => {
        setDeletevisibility(false);
    };
    const handledeleteSave = async () => {

        await api.delete(`/api/menu/categories/${IdDeleted}`);
        setIdDeleted('');
        setDeletevisibility(false);
        setShouldRefetch(prev => !prev);
    };

    const handleCreateCategory = async (Name) => {
        await api.post(`/api/menu/categories/`, { name: Name });
        setCreateVisibility(false)
        setShouldRefetch(prev => !prev);
    };

    const handleCreateCancel = () => {
        setCreateVisibility(false);
    }
    const handleCreateVisible = () => {
        setCreateVisibility(true);
    }

    const [categoryID, setCategoryID] = useState('');

    // useEffect(() => { fetchMenu() }, [shouldRefetchMenu]);


    const fetchMenu = async (categoryID) => {

        // const initial_category=categories;
        // console.log(initial_category)

        try{
                setSetLoadingMenu(true);
                    if (typeof categoryID === "undefined") {
            // console.log(initial_category);



            // if(initial_category && initial_category.length > 0 && initial_category[0]._id){
            //     console.log('inside the next if')
            //     const idofcategory=initial_category[0]._id;
            //     const categoriesRestest = await api.get(`${import.meta.env.VITE_SERVER_URI}/api/menu/categories/${idofcategory}`);
            //     setMenuItems(categoriesRestest.data.menuItems);
            // }else{
            //     setMenuItems([]);
            // }


        } else {
            
            const categoriesRestest = await api.get(`/api/menu/categories/${categoryID}`);
            setMenuItems(categoriesRestest.data.menuItems);
            setCategoryID(categoryID)

        }
        }catch(err){
            console.error('Error fetching data:', err);
        }finally{
            setSetLoadingMenu(false);
        }




    }

    const fetchData = async () => {
        try {
            setLoading(true);
            
            const categoriesRes = await api.get(`/api/menu/categories`);
            
            // const menuItemsRes = await api.get('${import.meta.env.VITE_SERVER_URI}/api/menu/items');
            const categoriesArr = categoriesRes.data.categories;
            // const idofcategory=categoriesRes.data.categories[0]._id;
            // console.log(idofcategory)
            setCategories(categoriesArr);




            

            await fetchMenuInitially(categoriesArr);

            // await fetchMenu()

            // setMenuItems(menuItemsRes.data.menuItems);
            // console.log(categoriesRes.data);
            // console.log(categories);
            // const categoriesRestest = await api.get(`${import.meta.env.VITE_SERVER_URI}/api/menu/categories/${idofcategory}`);
            // setMenuItems(categoriesRestest.data.menuItems);

        } catch (err) {
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    }

    const fetchMenuInitially = async (categories) => {

        try{
            // setSetLoadingMenu(true);
            if (categories && categories.length > 0 && categories[0]._id) {
            const idofcategory = categories[0]._id;
           
            const categoriesRestest = await api.get(`/api/menu/categories/${idofcategory}`);
            setMenuItems(categoriesRestest.data.menuItems);
            setSetLoadingMenu(false)
        } else {
            setMenuItems([]);
        }

        }catch(err){
            console.error('Error fetching data:', err);
        }finally{
            // setSetLoadingMenu(false);
        }
        
    }





    const handleVisibilityChange = async (idx, CategoryID, currentVisibility) => {
        // console.log(idx, CategoryID, currentVisibility)
        const newVisibility = !currentVisibility;

        await api.put(`/api/menu/categories/${CategoryID}`, { isHidden: newVisibility });

        setCategories(items =>
            items.map((item, i) =>
                i === idx ? { ...item, isHidden: newVisibility } : item
            )
        );

    }

    return (


        <>
            {Editvisibility && (
                <EditBox name={editingName} onSave={handleSave} onCancel={handleCancel} />
            )}
            {deletevisibility && (
                <WarningBox onSave={handledeleteSave} onCancel={handledeleteCancel} />
            )}
            {CreateVisibility && (
                <CreateCategory onSave={handleCreateCategory} onCancel={handleCreateCancel} />
            )}
            <div className="flex items-center justify-center mt-5">
                <div className="flex flex-col items-center justify-center mt-5">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 flex rounded-lg shadow justify-between h-10 w-100 p-2 m-1.5">
                        <span className="font-bold text-white tracking-wide">Category</span>
                        <button
                            className="bg-gradient-to-br from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white text-xl font-extrabold rounded-lg h-7 w-10 shadow transition"
                            onClick={handleCreateVisible}
                        >
                            +
                        </button>
                    </div>
                    {/* List */}
                    
                    <div className="bg-gradient-to-br from-green-50 via-green-100 to-green-200 rounded-lg shadow overflow-y-auto h-120 w-100 mt-1.5">
                        {loading?<Loader/>:<ul>
                            {categories.map((category, idx) => (
                                <li
                                    key={idx}
                                    className="px-4 py-3 border-1 m-2.5 rounded-lg hover:bg-green-100 flex justify-between items-center transition"
                                    onClick={() => {fetchMenu(category._id)}}
                                >
                                    <span className="font-bold text-green-800">{category.name}</span>
                                    <div className="flex items-center">
                                        <button
                                            className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white text-sm rounded-lg h-7 w-15 shadow m-1 p-1 transition"
                                            onClick={e => {
                                                e.stopPropagation();
                                                handleEdit(category._id, category.name);
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white text-sm rounded-lg h-7 w-15 shadow m-1 p-1 transition"
                                            onClick={e => {
                                                e.stopPropagation();
                                                handleDelete(category._id);
                                            }}
                                        >
                                            Delete
                                        </button>
                                        <div className="relative inline-block w-11 h-8 m-1">
                                            <input
                                                type="checkbox"
                                                onChange={e => {
                                                    e.stopPropagation();
                                                    handleVisibilityChange(idx, category._id, category.isHidden);
                                                }}
                                                id={`visibility-${idx}`}
                                                checked={!category.isHidden}
                                                className="peer appearance-none w-12 h-7 bg-green-200 rounded-lg checked:bg-green-500 cursor-pointer transition-colors duration-300"
                                            />
                                            <label
                                                htmlFor={`visibility-${idx}`}
                                                className="absolute top-0 left-0 w-6 h-7 bg-white rounded-lg border border-green-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-green-600 cursor-pointer"
                                            ></label>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>}
                        
                    </div>
                </div>
                <MenuItems
                    Items={menuItems}
                    categoryID={categoryID}
                    setShouldRefetch={setShouldRefetch}
                    setMenuItems={setMenuItems}
                    loading={loading}
                    setLoadingMenu={setLoadingMenu}
                />
            </div>
        </>


    )
}

export default Menu
