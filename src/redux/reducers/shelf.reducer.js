


const shelfReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_SHELF':
        return action.payload;
}
}

export default shelfReducer