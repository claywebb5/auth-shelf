import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';


function ShelfPage() {
  const dispatch = useDispatch();

  const shelf = useSelector(store => store.shelfReducer);

  useEffect(() => {
    dispatch({type: 'SET_SHELF'})
  }, []);
  return (
    <div className="container">
      <h2>Shelf</h2>
      <p>All of the available items can be seen here.</p>
 
      {shelf.map((item, i) => (
        <div key={i}>
          <h3>Description {item.description}</h3>
          <img src={item.image_url}></img>
        </div>
      ))}
        
    </div>
  );
}

export default ShelfPage;
