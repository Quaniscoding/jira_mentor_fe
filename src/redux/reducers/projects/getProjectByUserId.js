import { http } from '../../../utils/baseUrl';

export const callGetListProjectByUserId = (userId) => async () => {
    try {
        const result = await http.get(`/project/getProjectByUserId?userId=${userId}`);
        return result.data.content; 
    } catch (err) {
        return err;
    }
};
