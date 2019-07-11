const persistDataLocally = store => next => action => {
    next(action);
    sessionStorage['reduxStore'] = JSON.stringify(store.getState());
    console.log('Local Storage:', sessionStorage['reduxStore']);
  }
  
  export default persistDataLocally;