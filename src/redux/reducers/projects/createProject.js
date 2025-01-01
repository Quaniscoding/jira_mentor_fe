import { http } from '../../../utils/baseUrl';

export const callCreateProject = (data) => async () => {
    try {
        const result = await http.post("/Project/createProjectAuthorize", data)
        return { isCreate: true, message: result.data.message }
    } catch (err) {
        return { isCreate: false, message: err.response.data.message }
    }
}