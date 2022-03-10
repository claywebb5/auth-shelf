import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
// import {useDispatch} from 'react-redux';


function ShelfPage() {
  const dispatch = useDispatch();

  const shelf = useSelector(store => store.shelf);
  const [newItem, setNewItem] = useState('')

  useEffect(() => {
    dispatch({type: 'FETCH_SHELF'})
  }, []);

  // function handleClick() {
  //   console.log('Clicked');
  //   dispatch({type: 'SET_SHELF'});
  // }
  // console.log('Shelf is:', shelf);

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch({type: 'ADD_ITEM', payload: newItem});
  }
  
  return (
    <div className="container">
      <h2>Shelf</h2>
      <form onSubmit = {handleSubmit}>
	      <input onChange = {(e)=> setNewItem(e.target.value)} type="text" placeholder= "Enter Item" />
	      <input type="submit" />
      </form>
      <p>All of the available items can be seen here.</p>
      {/* <button onClick={handleClick}>Get items</button> */}
 
      {shelf.map((item, i) => (
        
        <div key={i}>
            <h3>Description {item.description}</h3>
            <img src={item.image_url} />
        </div>
        
      ))} 
        
    </div>
  );
}

export default ShelfPage;
