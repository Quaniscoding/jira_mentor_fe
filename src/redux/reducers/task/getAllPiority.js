import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../../utils/baseUrl';

const initialState = {
    listPiority: []
}

const getAllPiority = createSlice({
    name: "getAllPiority",
    initialState,
    reducers: {
        getlistPiority: (state, { type, payload }) => {
            state.listPiority = payload;
        }
    }
});

export const { getlistPiority } = getAllPiority.actions

export default getAllPiority.reducer

export const callGetListPiority = async (dispatch) => {
    try {
        const result = await http.get(`/Priority/getAll`)
        dispatch(getlistPiority(result.data.content));
    } catch (err) {
        return err
    }

}
