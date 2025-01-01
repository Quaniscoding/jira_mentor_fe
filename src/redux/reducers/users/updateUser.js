import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../../utils/baseUrl';
import { history } from '../../../utils/history';

const initialState = {

}

const updateUser = createSlice({
    name: "updateUser",
    initialState,
    reducers: {}
});

export const { } = updateUser.actions

export default updateUser.reducer
export const callUpdateUser = (data) => async () => {
    try {
        const result = await http.put("/Users/editUser", data)
        history.push("/user")
        return { isUpdate: true, message: result.data.message }
    } catch (err) {
        return { isUpdate: false, message: err.response.data.message }
    }
}