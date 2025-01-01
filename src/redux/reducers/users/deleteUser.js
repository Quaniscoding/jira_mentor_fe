import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../../utils/baseUrl';

const initialState = {

}

const deleteUser = createSlice({
    name: "deleteUser",
    initialState,
    reducers: {}
});

export const { } = deleteUser.actions

export default deleteUser.reducer
export const callDeleteUser = (userId) => async () => {
    try {
        const result = await http.delete(`/Users/deleteUser/${userId}`)
        return { message: result.data.message }
    } catch (err) {
        return { message: err.response.data.message }
    }
}
