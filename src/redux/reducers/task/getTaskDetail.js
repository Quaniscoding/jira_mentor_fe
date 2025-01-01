/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../../utils/baseUrl';

const initialState = {
    listTaskDetail: []
}

const getTaskDetail = createSlice({
    name: "getTaskDetail",
    initialState,
    reducers: {
        getlistTaskDetail: (state, { type, payload }) => {
            state.listTaskDetail = payload;
        }
    }
});

export const { getlistTaskDetail } = getTaskDetail.actions

export default getTaskDetail.reducer
export const callGetTaskDetail = (taskId) => async (dispatch) => {
    try {
        const result = await http.get(`/Project/getTaskDetail?taskId=${taskId}`)
        dispatch(getlistTaskDetail(result.data.content));
        return result.data.content;
    } catch (err) {
        return { message: err.response.data }
    }
}