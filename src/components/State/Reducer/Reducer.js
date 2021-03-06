export const initialState = {
  user: null,
  userDocs: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case "REMOVE_FROM_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item].filter((item) => item.id !== action.item.id),
      };
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_USER_DOCS":
      return {
        ...state,
        userDocs: action.userDocs,
      };
    default:
      return state;
  }
};
