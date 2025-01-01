import { http } from '../../../utils/baseUrl';

export const callGetListUser = (keyWord) => async () => {
    try {
        if (keyWord) {
            const result = await http.get(`/Users/getUser?keyWord=${keyWord}`);
            return { result: result.data.content, message: result.data.message }
        }
        else {
            const result = await http.get(`/Users/getUser`);
            return { result: result.data.content, message: result.data.message }
        }
    } catch (err) {
        return { err }
    }
}
