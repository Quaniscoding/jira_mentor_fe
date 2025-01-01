import React, { useEffect, useState } from "react";
import {
    Box,
    Paper,
    Typography,
    Tooltip,
    Avatar,
} from "@mui/material";
import { callUpdateStatusTask } from "../../redux/reducers/task/updateStatusTask";
import { useDispatch } from "react-redux";
import CustomSnackbar from "../CustomSnackbar/CustomSnackbar";
import './css/style.css'
export default function KanbanBoard({ listProjectDetails, onTaskClick, setLoading, setProgress }) {
    const [boardData, setBoardData] = useState([]);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });
    const handleCloseSnackbar = () => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    };
    const dispatch = useDispatch();

    useEffect(() => {
        if (listProjectDetails?.lstTask) {
            setBoardData(listProjectDetails.lstTask);
        }
    }, [listProjectDetails]);

    const handleDragStart = (e, taskIndex, statusIndex) => {
        if (taskIndex === undefined || statusIndex === undefined) {
            console.error("Invalid drag data");
            return;
        }

        const dragData = JSON.stringify({ taskIndex, statusIndex });
        e.target.classList.add("dragging");
        e.dataTransfer.setData("draggedTask", dragData);
    };


    const handleDragOver = (e) => {
        e.preventDefault(); // Cho phép thả
        e.currentTarget.classList.add("drag-over");
        setTimeout(() => {
            e.currentTarget.classList.remove("drag-over");
        }, 300);
    };
    const handleDragLeave = (e) => {
        e.currentTarget.classList.remove("drag-over"); // Xóa lớp CSS khi rời khỏi vùng thả
    };
    const handleDrop = async (e, dropStatusIndex) => {
        const draggedTaskData = e.dataTransfer.getData("draggedTask");
        if (!draggedTaskData) {
            console.error("No task data found in drag event");
            return;
        }

        const draggedTask = JSON.parse(draggedTaskData);
        const { taskIndex, statusIndex } = draggedTask;

        if (taskIndex === undefined || statusIndex === undefined) {
            console.error("Invalid task data");
            return;
        }

        const newBoardData = [...boardData];
        const draggedItem = newBoardData[statusIndex].lstTaskDeTail[taskIndex];

        newBoardData[statusIndex].lstTaskDeTail.splice(taskIndex, 1);

        newBoardData[dropStatusIndex].lstTaskDeTail.push(draggedItem);
        let isMounted = true;
        setLoading(true);
        setProgress(10);
        try {
            for (let i = 10; i <= 90; i += 10) {
                await new Promise((resolve) => setTimeout(resolve, 100));
                if (isMounted) setProgress(i);
            }
            const result = await dispatch(callUpdateStatusTask({ taskId: draggedItem.taskId, statusId: newBoardData[dropStatusIndex].statusId }));
            if (isMounted) setProgress(100);
            if (result.isUpdate) {
                setSnackbar({
                    open: true,
                    message: "Status of task updated successfully",
                    severity: "success",
                });
            }
            setBoardData(newBoardData);
        } catch (error) {
            console.error("Error updating task status:", error);
        } finally {
            if (isMounted) {
                setLoading(false);
                setTimeout(() => setProgress(0), 500);
            }
        }
        document.querySelectorAll(".dragging").forEach((el) => el.classList.remove("dragging"));
        e.currentTarget.classList.remove("drag-over");

        // Đảm bảo hiệu ứng 'drag-over' tự động biến mất
        setTimeout(() => {
            e.currentTarget.classList.remove("drag-over");
        }, 300);
        return () => {
            isMounted = false;
        };

    };



    return (
        <Box
            display="flex"
            flexWrap="wrap" // Cho phép các phần tử xuống hàng
            justifyContent="space-between"
            sx={{
                gap: 2,
                p: 2,
                // Sử dụng media queries để điều chỉnh bố cục trên các kích thước màn hình khác nhau
                "@media (max-width: 600px)": {
                    flexDirection: "column", // Chuyển thành cột trên màn hình nhỏ
                    gap: 1, // Giảm khoảng cách
                    p: 1, // Giảm padding
                },
            }}
        >
            {boardData.map((item, statusIndex) => (
                <Paper
                    key={statusIndex}
                    elevation={3}
                    sx={{
                        flex: 1,
                        minHeight: "200px",
                        p: 2,
                        borderRadius: 2,
                        overflow: "hidden",
                        transition: "background-color 0.3s",
                        // Điều chỉnh chiều rộng cho mobile
                        "@media (max-width: 600px)": {
                            width: "100%", // Full width trên màn hình nhỏ
                        },
                    }}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, statusIndex)}
                >
                    <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold", mb: 2 }}
                    >
                        {item.statusName.toUpperCase()}
                    </Typography>
                    {item.lstTaskDeTail.map((task, taskIndex) => (
                        <Box
                            key={taskIndex}
                            sx={{
                                mb: 2,
                                p: 2,
                                borderRadius: 1,
                                boxShadow: 1,
                                cursor: "grab",
                                // Điều chỉnh padding và margin cho mobile
                                "@media (max-width: 600px)": {
                                    p: 1,
                                    mb: 1,
                                },
                            }}
                            draggable
                            onDragStart={(e) =>
                                handleDragStart(e, taskIndex, statusIndex)
                            }
                            onClick={() => onTaskClick(task)}
                        >
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                {task.taskName}
                            </Typography>
                            <Typography
                                variant="body2"
                                color={
                                    task.priorityTask?.priority === "High"
                                        ? "error"
                                        : task.priorityTask?.priority === "Medium"
                                            ? "warning"
                                            : "textSecondary"
                                }
                            >
                                {task.priorityTask?.priority}
                            </Typography>
                            <Box
                                mt={1}
                                mb={1}
                                dangerouslySetInnerHTML={{ __html: task.description }}
                            />
                            <Box display="flex" mt={1} sx={{ gap: 1 }}>
                                {task.assigness.map((assignee, index) => (
                                    <Tooltip key={index} title={assignee.name}>
                                        <Avatar
                                            src={assignee.avatar}
                                            alt={assignee.name}
                                            sx={{
                                                width: 32,
                                                height: 32,
                                                // Điều chỉnh kích thước avatar trên màn hình nhỏ
                                                "@media (max-width: 600px)": {
                                                    width: 24,
                                                    height: 24,
                                                },
                                            }}
                                        />
                                    </Tooltip>
                                ))}
                            </Box>
                            <Typography
                                variant="caption"
                                sx={{ mt: 1, color: "text.secondary" }}
                            >
                                {task.lstComment.length} comments
                            </Typography>
                        </Box>
                    ))}
                </Paper>
            ))}
            <CustomSnackbar
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                onClose={handleCloseSnackbar}
            />
        </Box>

    );
}
