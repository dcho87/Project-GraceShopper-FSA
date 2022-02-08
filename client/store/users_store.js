import axios from "axios";

export const users = (state = [], action) => {
  if (action.type === "LOAD_USERS") {
    return action.users;
  }

  // if (action.type === "UPDATE_USER") {
  //   return state.map(
  //     (user) => (user.id = action.user.id ? action.user : user)
  //   );
  // }

  // if (action.type === "DELETE_USER") {
  //   console.log(state);
  //   return state.filter((product) => product.id !== action.product.id);
  // }

  // if (action.type === "CREATE_PRODUCT") {
  //   return [...state, action.products];
  // }

  return state;
};

export const fetchUsers = () => {
  return async (dispatch) => {
    const users = (await axios.get("/api/users")).data;
    dispatch({
      type: "LOAD_USERS",
      users,
    });
  };
};
