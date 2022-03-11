import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ShelfItem from '../ShelfItem/ShelfItem';

function ShelfPage() {
  const dispatch = useDispatch();

  const shelf = useSelector(store => store.shelf);

  const [newItem, setNewItem] = useState('')
  const [newImage, setNewImage] = useState('')

  useEffect(() => {
    dispatch({ type: 'FETCH_SHELF' })
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch({ type: 'ADD_ITEM', payload: { description: newItem, image_url: newImage } });
    setNewItem('');
    setNewImage('');
  }

  return (
    <div className="container">
      <h2>Shelf</h2>
      <form onSubmit={handleSubmit}>
        <input onChange={(e) => setNewItem(e.target.value)} value={newItem} type="text" placeholder="Enter Item" />
        <input onChange={(e) => setNewImage(e.target.value)} value={newImage} type="text" placeholder="Enter Image URL" />
        <input type="submit" />
      </form>
      <p>All of the available items can be seen here.</p>

      {shelf.map((item, i) => (
        <ShelfItem
          key={i}
          item={item}
        />
      ))}
    </div >
  );
}

export default ShelfPage;
