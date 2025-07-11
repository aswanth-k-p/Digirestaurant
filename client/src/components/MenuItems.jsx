import myimage from '../assets/testimage.jpg';
import CreateMenu from './CreateMenu';
import { api } from "../utils/api";
import { useState } from 'react';
import EditBoxMenu from './EditBoxMenu';
import WarningBox from './WarningBox';
import ImageUpload from './ImageUpload';
import Loader from './loading/Loader';




const MenuItems = ({ Items, categoryID, setShouldRefetch, setMenuItems, loading , setLoadingMenu}) => {

    
    const [CreateVisibility, setCreateVisibility] = useState(false);
    const [EditVisibility, setEditVisibility] = useState(false);

    const [deletevisibility, setDeletevisibility] = useState(false);
    const [IdDeleted, setIdDeleted] = useState('');
    const [ImageUploadVisibility, setImageUploadVisibility] = useState(false);

    const handleCreateVisible = () => {
        setCreateVisibility(true);
    }

    const handleCreateCancel = () => {
        setCreateVisibility(false);
    }

    const handleCreateMenu = async ({ Name, Description, Price }) => {


        await api.post(`/api/menu/items/`, { name: Name, description: Description, price: Price, category: categoryID });
        setCreateVisibility(false)
        // setShouldRefetch(prev => !prev);


    };

    const handleSave = async (data) => {
        await api.put(`/api/menu/items/${editData.id}`, { name: data.editName, description: data.editDescription, price: data.editPrice, category: categoryID })
        // Here you would typically send an API request to update the category
        // console.log('Saving:', editingId, newName);
        setShouldRefetch(prev => !prev);
        setEditVisibility(false);
        // console.log(data);
    };

    const handleCancel = () => {
        setEditVisibility(false);
    };

    const [editData, setEditData] = useState({});
    const [idForImageUpload, setidForImageUpload] = useState('');

    const handleEdit = (id, name, description, price) => {
        setEditData({ id, name, description, price });

        setEditVisibility(true);
    };

    const handleDelete = (id) => {
        setDeletevisibility(true);
        setIdDeleted(id)
    }

    const handledeleteSave = async () => {

        await api.delete(`/api/menu/items/${IdDeleted}`);
        setIdDeleted('');
        setDeletevisibility(false);
        setShouldRefetch(prev => !prev);
        // console.log(IdDeleted)
    };

    const handledeleteCancel = () => {
        setDeletevisibility(false);
    };

    const handleVisibilityChange = async (idx, MenuID, currentVisibility) => {
        // console.log(idx, CategoryID, currentVisibility)
        const newVisibility = !currentVisibility;

        await api.put(`/api/menu/items/${MenuID}`, { isHidden: newVisibility });

        setMenuItems(items =>
            items.map((item, i) =>
                i === idx ? { ...item, isHidden: newVisibility } : item
            )
        );

    }

    const handleImageChange = (id) => {

        setidForImageUpload(id);

        setImageUploadVisibility(true);

    };

    return (
        <>
            {EditVisibility && (
                <EditBoxMenu data={editData} onSave={handleSave} onCancel={handleCancel} />
            )}
            {deletevisibility && (
                <WarningBox onSave={handledeleteSave} onCancel={handledeleteCancel} />
            )}
            {ImageUploadVisibility && (
                <ImageUpload
                    itemID={idForImageUpload}
                    setImageUploadVisibility={setImageUploadVisibility}
                    setShouldRefetch={setShouldRefetch}
                />
            )}
            {CreateVisibility && (
                <CreateMenu
                    onSave={handleCreateMenu}
                    onCancel={handleCreateCancel}
                    setShouldRefetch={setShouldRefetch}
                    categoryID={categoryID}
                />
            )}
            <div className="flex flex-col items-center justify-center mt-5 ml-3">
                {/* Header */}
                <div className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 rounded-lg shadow flex justify-between h-10 w-120 p-2 text-center">
                    <span className="font-bold text-white tracking-wide">Items</span>
                    <button
                        className="bg-gradient-to-br from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white text-xl font-extrabold rounded-lg h-7 w-10 shadow transition"
                        onClick={handleCreateVisible}
                    >
                        +
                    </button>
                </div>
                {/* List */}
                <div className="bg-gradient-to-br from-green-50 via-green-100 to-green-200 rounded-lg shadow overflow-y-auto h-120 w-120 mt-1.5">
                    {loading || setLoadingMenu?<Loader />:<ul>
                        {Items.map((item, idx) => (
                            <li
                                key={idx}
                                className="px-4 py-3 border-1 flex justify-between m-2.5 rounded-lg hover:bg-green-100 transition"
                            >
                                <div className="flex justify-between w-full">
                                    <div className="flex">
                                        <div className="shrink-0 flex flex-col items-center">
                                            <img
                                                src={item.image ? item.image : myimage}
                                                alt="Image"
                                                className="shadow h-15 w-15 object-cover rounded"
                                            />
                                            <button
                                                className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white text-xs rounded h-5 w-15 shadow mt-2 transition"
                                                onClick={e => {
                                                    e.stopPropagation();
                                                    handleImageChange(item._id);
                                                }}
                                            >
                                                Change
                                            </button>
                                        </div>
                                        <div>
                                            <span className="font-bold text-green-800 ml-2 flex flex-col">
                                                {item.name}
                                                <span className="text-sm font-light mt-1 text-green-700">
                                                    {item.description}
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="font-bold text-green-900 ml-2 mr-3 text-l">
                                            ₹{item.price}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <button
                                        className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white text-sm rounded-lg h-7 w-12 shadow m-1 p-1 transition"
                                        onClick={() =>
                                            handleEdit(item._id, item.name, item.description, item.price)
                                        }
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white text-sm rounded-lg h-7 w-12 shadow m-1 p-1 transition"
                                        onClick={() => handleDelete(item._id)}
                                    >
                                        Delete
                                    </button>
                                    <div className="relative inline-block w-12 h-7 m-1">
                                        <input
                                            type="checkbox"
                                            onChange={() =>
                                                handleVisibilityChange(idx, item._id, item.isHidden)
                                            }
                                            id={`visibility-${idx}`}
                                            checked={!item.isHidden}
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
        </>

    )
}

export default MenuItems
