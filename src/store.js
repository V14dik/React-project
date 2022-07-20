import { createStore } from 'redux';

const INCREMENT = 'counter/increment';

function counterReducer(state = { value: 0 }, action) {
  switch (action.type) {
    case INCREMENT:
      return { value: state.value + action.payload };
    case 'counter/decremented':
      return { value: state.value - 1 };
    default:
      return state;
  }
}

let store = createStore(counterReducer);
export const selectCount = (state) => {
  //   console.log(state);
  return state.value;
};

export const increment = (amount) => {
  console.log(amount);
  return {
    type: INCREMENT,
    payload: amount,
  };
};

export default store;
