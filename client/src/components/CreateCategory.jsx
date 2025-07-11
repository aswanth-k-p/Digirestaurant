import { useState } from 'react';

const CreateCategory = ({onSave, onCancel}) => {

    const [Name, setName] = useState('');
    
  return (
     <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-emerald-100 rounded-lg shadow-lg p-6 w-80">
                <h2 className="text-xl font-bold mb-4">Create Category</h2>
                <input
                    type="text"
                    placeholder='Category Name'
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
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
                        onClick={() => onSave(Name)}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
  )
}

export default CreateCategory
