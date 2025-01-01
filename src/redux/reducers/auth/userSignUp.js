import { http } from '../../../utils/baseUrl';

export const callSignUp = (data) => async () => {
    try {
        await http.post("/Users/signup", data)
        return true
    } catch (err) {
        return err
    }
}
