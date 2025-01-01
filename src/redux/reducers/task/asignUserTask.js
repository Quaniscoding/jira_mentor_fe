import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../../utils/baseUrl';

const initialState = {

}

const asignUserTask = createSlice({
    name: "asignUserTask",
    initialState,
    reducers: {}
});

export const { } = asignUserTask.actions

export default asignUserTask.reducer

export const callAsignUserTask = (data) => async () => {
    try {
        const result = await http.post('/project/assignUserTask', data)
        return { isAsign: true, message: result.data.message }
    } catch (err) {
        return { isAsign: false, message: err.response.data.message }
    }
}