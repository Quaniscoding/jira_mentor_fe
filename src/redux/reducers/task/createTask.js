import { http } from '../../../utils/baseUrl';

export const callCreateTask = (data) => async () => {
    try {
        const result = await http.post("/Project/createTask", data)
        return { isCreate: true, message: result.data.message }
    } catch (err) {
        console.log(err);
        return { isCreate: false, message: err.response.data.message }
    }
}