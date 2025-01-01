import { http } from '../../../utils/baseUrl';

export const callDeleteProject = (idProject) => async () => {
    try {
        const result = await http.delete(`/Project/deleteProject?projectId=${idProject}`);
        return { isDelete: true, message: result.data.message }
    } catch (err) {
        return { isDelete: false, message: err.response.data.message }
    }
}