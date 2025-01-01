import { http } from '../../../utils/baseUrl';
import { saveLocal, saveStringLocal } from '../../../utils/config';
import { ACCESS_TOKEN, DATA_USER } from '../../../utils/constant';

export const callLogin = (data) => async () => {
    try {
        const result = await http.post("Users/signin", data);
        saveStringLocal(ACCESS_TOKEN, result.data.content.accessToken
        )
        saveLocal(DATA_USER, result.data.content)
        return true
    } catch (err) {
        return err
    }
}
