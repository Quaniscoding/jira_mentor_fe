import { http } from '../../../utils/baseUrl';

export const callUpdateStatusTask = (data) => async () => {
    try {
        const result = await http.put(`/Project/updateStatus`, data)
        return { isUpdate: true, message: result.data.message }
    } catch (err) {
        return { isUpdate: false, message: err.response.data.message }
    }
}