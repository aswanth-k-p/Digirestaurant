

const WarningBox = ({onSave, onCancel}) => {
  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-emerald-100 rounded-lg shadow-lg p-6 w-80 ">
                <h3 className="text-xl font-bold mb-4">Are you sure want to delete the item?</h3>

                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onSave()}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        Yes
                    </button>
                </div>

            </div>
      
    </div>
  )
}

export default WarningBox
