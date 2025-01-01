import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../../utils/baseUrl';

const initialState = {
    listUser: []
}

const getUserByProjectId = createSlice({
    name: "getUserByProjectId",
    initialState,
    reducers: {
        getListUserByProjectId: (state, { type, payload }) => {
            state.listUser = payload;
        }
    }
});

export const { getListUserByProjectId } = getUserByProjectId.actions

export default getUserByProjectId.reducer
export const callGetListUserByProjectId = (id) => async (dispatch) => {
    try {
        const result = await http.get(`/Users/getUserByProjectId?idProject=${id}`);
        dispatch(getListUserByProjectId(result.data.content));
        // return { getUser: true, message: result.data.message }
        return result.data.content
    } catch (err) {
        return err
        // if (err.response.status == 404) {
        //     return { getUser: false, message: err.response.data.message }
        // };
    }
}
