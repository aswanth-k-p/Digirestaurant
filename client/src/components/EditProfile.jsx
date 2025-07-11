
import { useState } from 'react';
import { api } from '../utils/api';

import { useAuth } from '../contexts/useAuth';

const EditProfile = ({restaurantdetails, setShowEdit, setShouldRefetch}) => {

  const { restaurant } = useAuth();

  const onSave=async()=>{

    

      
     await api.put(`/api/auth/editprofile`, { email:restaurant.email, name:editName, address:editAddress, phone:editPhone})
            
            
            setShouldRefetch(prev => !prev);
            setShowEdit(false);
  }

    const [editName, setEditName] = useState(restaurantdetails.name);
    const [editAddress, setEditAddress] = useState(restaurantdetails.address);
    const [editPhone, setEditPhone] = useState(restaurantdetails.phone);

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-emerald-100 rounded-lg shadow-lg p-6 w-80">
                <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
                <label>Name</label>
                <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-3 py-2 border rounded mb-4"
                />
                <label>Address</label>
                <input
                    type="text"
                    value={editAddress}
                    onChange={(e) => setEditAddress(e.target.value)}
                    className="w-full px-3 py-2 border rounded mb-4"
                />
                <label>Phone</label>
                <input
                    type="text"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full px-3 py-2 border rounded mb-4"
                />
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={()=>setShowEdit(false)}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onSave()}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
  )
}

export default EditProfile
