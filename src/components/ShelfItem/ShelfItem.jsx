import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

function ShelfItem({ item }) {

    const dispatch = useDispatch();

    const [isEditable, setIsEditable] = useState('false')
    const [editItem, setEditItem] = useState(item.description)
    const [editImage, setEditImage] = useState(item.image_url)

    // ---------------------------------------------------------------------------------------- //
    // Local Functions                                                                          //
    // ---------------------------------------------------------------------------------------- //

    function handleDelete(item) {
        console.log('Deleting:', item);
        dispatch({
            type: 'DELETE_ITEM',
            payload: item
        })
    }

    function handleSaveEdit() {
        console.log('in handleSaveEdit');
        dispatch({
            type: 'UPDATE_ITEM',
            payload: {id: item.id, description: editItem, image_url: editImage}
        })
        setIsEditable(!isEditable);
    }

    function handleEditClick() {
        setIsEditable(!isEditable);
    }

    // ---------------------------------------------------------------------------------------- //
    // Return                                                                                   //
    // ---------------------------------------------------------------------------------------- //

    return (
        <div className="shelf-item">
            <div>Description: <b>{item.description}</b></div>
            <img src={item.image_url} />
            <br />
            {
                isEditable ?
                    <>
                        {/* Displays when IS NOT Editable */}
                        <button onClick={() => handleDelete(item)}>Delete</button>
                        <button onClick={handleEditClick}>Edit</button>
                    </>
                    :
                    <>
                        {/* Display when IS Editable */}
                        <button onClick={handleSaveEdit}>Save</button>
                        <button onClick={handleEditClick}>Cancel</button>
                        <br />
                        <input onChange={(e) => setEditItem(e.target.value)} value={editItem} type="text" placeholder="Enter Item" />
                        <input onChange={(e) => setEditImage(e.target.value)} value={editImage} type="text" placeholder="Enter Image URL" />
                    </>
            }
        </div>
    )
}

export default ShelfItem;