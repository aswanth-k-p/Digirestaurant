
import { useState } from 'react';

const EditBoxMenu = ({ data, onSave, onCancel }) => {

    const [editName, setEditName] = useState(data.name);
    const [editDescription, setEditDescription] = useState(data.description);
    const [editPrice, setEditPrice] = useState(data.price);

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-emerald-100 rounded-lg shadow-lg p-6 w-80">
                <h2 className="text-xl font-bold mb-4">Edit Category</h2>
                <label>Name</label>
                <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-3 py-2 border rounded mb-4"
                />
                <label>Description</label>
                <input
                    type="text"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full px-3 py-2 border rounded mb-4"
                />
                <label>Price</label>
                <input
                    type="text"
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
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
                        onClick={() => onSave({editName, editDescription, editPrice, data})}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
  )
}

export default EditBoxMenu
