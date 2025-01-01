import { http } from '../../../utils/baseUrl';
export const callAsignUserProject = (data) => async () => {
    try {
        const result = await http.post("/Project/assignUserProject", data);
        return { isAssigned: true, message: result.data.message }
    } catch (err) {
        return { isAssigned: false, message: err.response.data.message }
    }
}