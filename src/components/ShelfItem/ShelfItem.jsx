import { useState } from 'react';



function ShelfItem({ item }) {

    const [isEditable, setIsEditable] = useState('false')
    const [newItem, setNewItem] = useState(item.description)
    const [newImage, setNewImage] = useState(item.image_url)

    console.log('isEditable', isEditable);

    function handleDelete(item) {
        console.log('Deleting:', item);
        dispatch({
            type: 'DELETE_ITEM',
            payload: item
        })
    }

    function handleEdit() {
        setIsEditable(!isEditable);
    }

    function handleSaveEdit(item) {
        console.log('in handleSaveEdit');
        dispatch({
            type: 'UPDATE_ITEM',
            payload: item
        })
        setIsEditable(!isEditable);
    }

    return (
        <div>
            <h3>Description {item.description}</h3>
            <img src={item.image_url} />
            <br />
            {
                isEditable ?
                    <>
                        {/* Displays when IS NOT Editable */}
                        <button onClick={() => handleDelete(item)}>Delete</button>
                        <button onClick={handleEdit}>Edit</button>
                    </>
                    :
                    <>
                        {/* Display when IS Editable */}
                        <button onClick={() => handleSaveEdit(item)}>Save</button>
                        <button onClick={handleEdit}>Cancel</button>
                        <br/>
                        <input onChange={(e) => setNewItem(e.target.value)} value={newItem} type="text" placeholder="Enter Item" />
                        <input onChange={(e) => setNewImage(e.target.value)} value={newImage} type="text" placeholder="Enter Image URL" />
                    </>
            }
        </div>
    )
}

export default ShelfItem;