import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../../utils/baseUrl';

const initialState = {
    listStatus: []
}

const getAllStatus = createSlice({
    name: "getAllStatus",
    initialState,
    reducers: {
        // eslint-disable-next-line no-unused-vars
        getlistStatus: (state, { type, payload }) => {
            state.listStatus = payload;
        }
    }
});

export const { getlistStatus } = getAllStatus.actions

export default getAllStatus.reducer

export const callGetListStatus = async (dispatch) => {
    try {
        const result = await http.get(`/status/getAll`)
        dispatch(getlistStatus(result.data.content));
    } catch (err) {
        return err
    }

}
