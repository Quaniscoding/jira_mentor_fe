import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../../utils/baseUrl';

const initialState = {
    projectCategory: [],
    projectCategoryWithId: []
}

const getProjectCategory = createSlice({
    name: "getProjectCategory",
    initialState,
    reducers: {
        getListProjectCategory: (state, { type, payload }) => {
            state.projectCategory = payload
        },
        getProjectCategoryName: (state, { type, payload }) => {
            state.projectCategoryWithId = payload
        }
    }
});

export const { getListProjectCategory, getProjectCategoryName } = getProjectCategory.actions

export default getProjectCategory.reducer
export const callGetProjectCategory = (projectCategoryId) => async (dispatch) => {
    try {
        if (projectCategoryId) {
            const apiGetProjectCategory = await http.get(`/projectCategory/getProjectCategory?projectCategoryId=${projectCategoryId}`)
            dispatch(getProjectCategoryName(apiGetProjectCategory.data.content))
        }
        else {
            const apiGetProjectCategory = await http.get(`/projectCategory/getProjectCategory`)
            dispatch(getListProjectCategory(apiGetProjectCategory.data.content))
        }
    } catch (err) {
        console.log(err);
    }
}