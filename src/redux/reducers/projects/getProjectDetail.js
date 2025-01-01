import { http } from '../../../utils/baseUrl';


export const callGetProjectDetail = (idProject) => async () => {
    try {
        const result = await http.get(`/Project/getProjectDetail?id=${idProject}`)
        return result.data.content
    } catch (err) {
        return err
    }
}
