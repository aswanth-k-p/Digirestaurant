import { useState } from 'react';

const CreateMenu = ({onSave, onCancel, setShouldRefetch, categoryID}) => {

    const [Name, setName] = useState('');
    const [Description, setDescription] = useState('');
    const [Price, setPrice] = useState('');

    const [RenderMenu, setRenderMenu] = useState(false);
  return (
     <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-emerald-100 rounded-lg shadow-lg p-6 w-80">
                <h2 className="text-xl font-bold mb-4">Create Menu Item</h2>
                {categoryID===''?<><p className='p-2 m-2'>Add/Select a category first</p>
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button></>:<><input
                    type="text"
                    // pattern="^[A-Za-z\s]+$"
                    // required
                    placeholder='Name'
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border rounded mb-4"
                />
                <input
                    type="text"
                    placeholder='Description'
                    value={Description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border rounded mb-4"
                />
                <input
                    type="text"
                    placeholder='Price'
                    value={Price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3 py-2 border rounded mb-4"
                />
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {onSave({Name, Description, Price}); setRenderMenu(true); setShouldRefetch(prev=>!prev)}}
                        
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:true"
                    >
                        Save
                    </button>

                    
                </div>
                </>}
                
                
                
            </div>
        </div>
  )
}

export default CreateMenu;
