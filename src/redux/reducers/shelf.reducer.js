
const shelfReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_SHELF':
      //   console.log(action.payload)
      return action.payload;
    default:
      return state;
  }

}
// shelf will be on the redux state at:
// state.shelf
export default shelfReducer