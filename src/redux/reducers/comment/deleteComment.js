import { http } from "../../../utils/baseUrl"

export const callDeleteComment = (commentId) => async () => {
    try {
        const result = await http.delete(`/Comment/deleteComment?idComment=${commentId}`)
        return { isDeleted: true, message: result.data.message }
    } catch (err) {
        return err
    }
}