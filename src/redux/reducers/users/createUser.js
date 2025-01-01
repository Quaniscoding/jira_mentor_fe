import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../../utils/baseUrl';
import { history } from '../../../utils/history';
const initialState = {

}
const createUser = createSlice({
    name: "createUser",
    initialState,
    reducers: {}
});

export const { } = createUser.actions

export default createUser.reducer

export const callCreateUser = (userLogin) => async () => {
    try {
        const result = await http.post("/Users/signup", userLogin)
        return { message: result.data.message }
    } catch (err) {
        return { message: err.response.data.message }
    }
}
