import { http } from '../../../utils/baseUrl';

export const callGetListComment = (taskId) => async () => {
    try {
        const result = await http.get(`/Comment/getAll?taskId=${taskId}`);
        return result.data.content;
    } catch (err) {
        return err
    }
}