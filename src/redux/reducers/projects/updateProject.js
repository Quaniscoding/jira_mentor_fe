// import { history } from '../../../utils/history';
import { http } from './../../../utils/baseUrl';

export const callUpdateProject = (projectId, data) => async () => {
    try {
        const result = await http.put(`/Project/updateProject?projectId=${projectId}`, data);
        return { isUpdate: true, message: result.data.message }
    } catch (err) {
        return err
    }
}