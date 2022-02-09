import axios from "axios";

export const users = (state = [], action) => {
  if (action.type === "LOAD_USERS") {
    return action.users;
  }

  if (action.type === "UPDATE_USER") {
    return state.map((user) => (user.id = action.user.id ? action.user : user));
  }

  if (action.type === "DELETE_USER") {
    console.log(state);
    return state.filter((user) => user.id !== action.user.id);
  }

  if (action.type === "CREATE_USER") {
    return [...state, action.user];
  }

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

export const createUser = (user) => {
  return async (dispatch) => {
    const user_ = await axios.post(`/api/users`, {
      user,
    });
    dispatch({ type: "CREATE_USER", user_ });
  };
};

export const destroyUser = (userId) => {
  return async (dispatch) => {
    const user_ = await axios.delete(`/api/users/${userId}`);
    dispatch({ type: "DELETE_USER", user_ });
  };
};

export const editUser = (userId, user) => {
  return async (dispatch) => {
    const user_ = await axios.put(`/api/users/${userId}`, {
      user,
    });
    dispatch({ type: "UPDATE_USER", user_ });
  };
};
