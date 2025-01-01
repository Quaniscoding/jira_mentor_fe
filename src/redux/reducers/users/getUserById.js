import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../../utils/baseUrl";

const initialState = {
  listUserById: [],
};

const getUserById = createSlice({
  name: "getUserById",
  initialState,
  reducers: {
    getListUserById: (state, { type, payload }) => {
      state.listUserById = payload;
    },
  },
});

export const { getListUserById } = getUserById.actions;

export default getUserById.reducer;
export const callGetListUserById = (id) => async (dispatch) => {
  try {
    const result = await http.get(`/User/getUserById/${id}`);
    dispatch(getListUserById(result.data.content));
    return {
      isUserAsign: true,
      message: result.data.message,
      payload: result.data.content,
    };
  } catch (err) {
    if (err.response.status == 404) {
      return { isUserAsign: false, message: err.response.data.message };
    }
  }
};
