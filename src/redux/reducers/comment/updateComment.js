import { http } from '../../../utils/baseUrl'
export const callUpdateComment = (commentId, contentComment) => async () => {
    try {
        const result = await http.put(`/Comment/updateComment?id=${commentId}&contentComment=${contentComment}`)
        return { isUpdated: true, message: result.data.message }
    } catch (err) {
        return err
    }
}