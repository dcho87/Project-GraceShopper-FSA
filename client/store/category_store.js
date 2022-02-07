import axios from "axios";

export const categories = (state = [], action) => {
  if (action.type === "LOAD_CATEGORIES") {
    return action.categories;
  }

  if (action.type === "UPDATE_CATEGORY") {
    return state.map(
      (category) =>
        (category.id = action.category.id ? action.category : category)
    );
  }

  if (action.type === "DELETE_CATEGORY") {
    console.log(state);
    return state.filter((category) => category.id !== action.category.id);
  }

  if (action.type === "CREATE_CATEGORY") {
    return [...state, action.category];
  }

  return state;
};

export const fetchCategories = () => {
  return async (dispatch) => {
    const categories = (await axios.get("/api/categories")).data;
    dispatch({
      type: "LOAD_CATEGORIES",
      categories,
    });
  };
};