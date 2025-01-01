
import { http } from '../../../utils/baseUrl';

export const callDeleteUserFromProject = (data) => async () => {
    try {
        const result = await http.post("/Project/removeUserFromProject", data);
        return { isDelete: true, message: result.data.message }
    } catch (err) {
        return { isDelete: false, message: err.response.data.message }
    }
}