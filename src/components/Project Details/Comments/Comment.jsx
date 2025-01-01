import { Grid, Typography, Box, Avatar, Button, Modal, TextField, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { callInsertComment } from '../../../redux/reducers/comment/insertComment';

import { callGetTaskDetail } from './../../../redux/reducers/task/getTaskDetail';
import { callGetProjectDetail } from '../../../redux/reducers/projects/getProjectDetail';
import { callUpdateComment } from '../../../redux/reducers/comment/updateComment';
import { callDeleteComment } from '../../../redux/reducers/comment/deleteComment';
import CustomSnackbar from '../../CustomSnackbar/CustomSnackbar';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

export default function Comment({ task, setListProjectDetails }) {
    const [contentComment, setContentComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedCommentId, setSelectedCommentId] = useState(null);
    const [isEditingCommentId, setIsEditingCommentId] = useState(null); // Simplified state management
    const dispatch = useDispatch();
    const lstComment = useSelector((state) => state.getTaskDetail.listTaskDetail);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });
    const handleCloseSnackbar = () => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    };
    useEffect(() => {
        if (task?.taskId) {
            dispatch(callGetTaskDetail(task.taskId));
        }
    }, [dispatch, task?.taskId]);

    const handleComment = async (e) => {
        e.preventDefault();
        if (!contentComment.trim()) {
            alert("Comment cannot be empty.");
            return;
        }

        setIsSubmitting(true);
        try {
            const result = await dispatch(
                callInsertComment({ contentComment: contentComment.trim(), taskId: task.taskId })
            );
            if (result.isInsert) {
                await dispatch(callGetTaskDetail(task.taskId));
                setListProjectDetails(await dispatch(callGetProjectDetail(task.projectId)));
            }
            setContentComment("");
        } catch (error) {
            console.error("Error adding comment:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const [editingContent, setEditingContent] = useState("");

    const handleEditComment = (commentId, currentContent) => {
        setIsEditingCommentId(commentId);
        setEditingContent(currentContent);
    };

    const handleSaveEdit = async (commentId) => {
        if (!editingContent.trim()) {
            setEditingContent(editingContent)
            setIsEditingCommentId(null);
            return;
        }

        try {
            const result = await dispatch(callUpdateComment(commentId, editingContent.trim()));
            if (result.isUpdated) {
                setSnackbar({
                    open: true,
                    message: "Updated comment successfully",
                    severity: "success"
                });
            }
            else {
                setSnackbar({
                    open: true,
                    message: "Error update comment",
                    severity: "error"
                });
            }
            await dispatch(callGetTaskDetail(task.taskId));
            setIsEditingCommentId(null);
            setEditingContent("");
        } catch (error) {
            setSnackbar({
                open: true,
                message: "Error updating comment",
                severity: "error"
            });
        }
    };

    const handleEditCancel = () => {
        setIsEditingCommentId(null); // Reset editing state when canceled
        setEditingContent(""); // Clear editing content
    };

    const handleOpenDeleteModal = (commentId) => {
        setSelectedCommentId(commentId);
        setOpenDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false);
    };

    const handleDeleteComment = async () => {
        try {
            const result = await dispatch(callDeleteComment(selectedCommentId));
            if (result.isDeleted) {
                setSnackbar({
                    open: true,
                    message: "Deleted comment successfully",
                    severity: "success"
                });
                await dispatch(callGetTaskDetail(task.taskId));
            }
            else {
                setSnackbar({
                    open: true,
                    message: "Error deleting comment",
                    severity: "error"
                });
            }
        } catch (error) {
            setSnackbar({
                open: true,
                message: "Error deleting comment",
                severity: "error"
            });
        }
        handleCloseDeleteModal();
    };

    if (!task) return null;

    return (
        <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Comments
            </Typography>
            <Box sx={{ mb: 2 }}>
                <Box
                    sx={{
                        maxHeight: 300,
                        overflowY: "auto",
                    }}
                >
                    {lstComment?.lstComment?.map((comment, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 2,
                            }}
                        >
                            <Avatar src={comment.avatar} alt={comment.name} />
                            <Box sx={{ ml: 2 }}>
                                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                                    {comment.name}
                                </Typography>
                                {isEditingCommentId === comment.id ? (
                                    <TextField
                                        multiline
                                        variant="outlined"
                                        value={editingContent}
                                        onChange={(e) => setEditingContent(e.target.value)}
                                        fullWidth
                                        size='small'
                                        sx={{
                                            border: "none"
                                        }}
                                    />
                                ) : (
                                    <Typography variant="body2">{comment.commentContent}</Typography>
                                )}
                            </Box>
                            <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                                {isEditingCommentId === comment.id ? (
                                    <>
                                        <IconButton color="primary" onClick={() => handleSaveEdit(comment.id)}>
                                            <CheckIcon />
                                        </IconButton>
                                        <IconButton color="default" onClick={handleEditCancel}>
                                            <CloseIcon />
                                        </IconButton>
                                    </>
                                ) : (
                                    <>
                                        <IconButton color="primary" onClick={() => handleEditComment(comment.id, comment.commentContent)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton color="error" onClick={() => handleOpenDeleteModal(comment.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </>
                                )}
                            </Box>
                        </Box>
                    ))}
                    <Modal open={openDeleteModal} onClose={handleCloseDeleteModal}>
                        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", bgcolor: "background.paper", boxShadow: 24, p: 4, borderRadius: 2, minWidth: 300 }}>
                            <Typography variant="h6" sx={{ mb: 2 }}>Confirm</Typography>
                            <Typography sx={{ mb: 3 }}>Do you want to delete this comment?</Typography>
                            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                                <Button variant="outlined" onClick={handleCloseDeleteModal}>Cancel</Button>
                                <Button variant="contained" color="error" onClick={handleDeleteComment}>Confirm</Button>
                            </Box>
                        </Box>
                    </Modal>
                </Box>
                <TextField
                    fullWidth
                    placeholder="Add a comment..."
                    multiline
                    rows={2}
                    onChange={(e) => setContentComment(e.target.value)}
                    value={contentComment}
                    sx={{ mt: 1 }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 1 }}
                    onClick={handleComment}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Adding..." : "Add Comment"}
                </Button>
            </Box>
            <CustomSnackbar
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                onClose={handleCloseSnackbar}
            />
        </Grid>
    );
}



