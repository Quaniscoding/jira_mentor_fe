import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../../utils/baseUrl';

const initialState = {

}

const deleteTask = createSlice({
    name: 'deleteTask',
    initialState,
    reducers: {}
});

export const { } = deleteTask.actions

export default deleteTask.reducer
export const callDeleteTask = (taskId) => async () => {
    try {
        const result = await http.delete(`/project/deleteTask/${taskId}`)
        return { isDelete: true, message: result.data.message }
    } catch (err) {
        return { isDelete: false, message: err.response.data.message }
    }
}