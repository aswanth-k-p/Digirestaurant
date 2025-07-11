import React, { useState } from 'react'
import { api } from '../utils/api';

import { useAuth } from '../contexts/useAuth';
const LogoUpload = ({setShowUpload, setShouldRefetch}) => {

    const { restaurant } = useAuth();
    const upload_preset="Digirestaurant";
    const cloud_name="dory5zzia";

    const [Image, setImage]=useState({});
    const [Loading, setLoading]=useState(false);

    const handleUpload=async (Image)=>{

        const email=restaurant.email;
        
        const file=Image;
        if(!file) return

        setLoading(true);

        const data=new FormData();
        data.append("file", file);
        data.append("upload_preset", upload_preset);
        data.append("cloud_name", cloud_name);

        
       const res= await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
            method:"POST",
            body: data
        })
        const uploadedURL= await res.json();
        // console.log(uploadedURL)
        await api.put(`/api/auth/editprofile`, { logo:uploadedURL.url, email:email})
        
        setLoading(false);
        setShouldRefetch(prev => !prev);
        setShowUpload(false);
    }

    
  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-emerald-100 rounded-lg shadow-lg p-6 w-80">
                <h2 className="text-xl font-bold mb-4">Upload Image</h2>
                <input
                    type="file"
                    placeholder='Image'
                    
                    onChange={(e)=>setImage(e.target.files[0])}
                    className="w-full px-3 py-2 border rounded mb-4"
                />
                
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={()=>{setShowUpload(false)}}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => handleUpload(Image)}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        {Loading? "Saving": "Save"}
                    </button>
                </div>
            </div>
        </div>
  )
}

export default LogoUpload
