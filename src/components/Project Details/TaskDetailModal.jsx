import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { callGetListTaskType } from '../../redux/reducers/task/getAllTaskType';
import { callGetListPiority } from '../../redux/reducers/task/getAllPiority';
import { callGetListStatus } from '../../redux/reducers/task/getAllStatus';
import { callGetListProject } from '../../redux/reducers/projects/getAllProject';
import { callGetListUserByProjectId } from '../../redux/reducers/users/getUserByProjectId';
import { isEqual } from 'lodash';
import { Autocomplete, Avatar, Box, Button, Dialog, DialogContent, DialogTitle, FormControl, FormHelperText, FormLabel, Input, MenuItem, Slider, TextField, Typography } from '@mui/material';
import { Grid } from '@mui/joy';
import CustomSnackbar from '../CustomSnackbar/CustomSnackbar';
import { callEditTask } from './../../redux/reducers/task/editTask';
import { callGetProjectDetail } from '../../redux/reducers/projects/getProjectDetail';
import CircularProgressWithLabel from '../CircularProgressWithLabel/CircularProgressWithLabel';
import { validateForm } from '../../utils/formValidation';
import Comment from './Comments/Comment';

export default function TaskDetailModal({ open, onClose, task, projectId, setListProjectDetails }) {
    const dispatch = useDispatch();
    const [listUser, setListUser] = useState([]);
    const [progress, setProgress] = useState(10);
    const [loading, setLoading] = useState(false);
    const listStatus = useSelector((state) => state.getAllStatus.listStatus) || [];
    const listPriority = useSelector((state) => state.getAllPiority.listPiority) || [];
    const listTaskType = useSelector((state) => state.getAllTaskType.listTaskType) || [];
    const [errors, setErrors] = useState({});
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });
    const handleCloseSnackbar = () => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    };
    // Khởi tạo state
    const [formValues, setFormValues] = useState({
        taskId: "",
        projectId: "",
        taskName: "",
        description: "",
        statusId: "",
        originalEstimate: "",
        timeTrackingSpent: "",
        timeTrackingRemaining: "",
        typeId: "",
        priorityId: "",
        listUserAsign: [],
    });
    useEffect(() => {
        if (task) {
            const initialValues = {
                taskId: task.taskId,
                projectId: task.projectId,
                taskName: task.taskName,
                description: task.description,
                statusId: Number(task.statusId),
                originalEstimate: task.originalEstimate,
                timeTrackingSpent: task.timeTrackingSpent,
                timeTrackingRemaining: task.timeTrackingRemaining,
                typeId: task.taskTypeDetail.id,
                priorityId: task.priorityTask.priorityId,
                listUserAsign: task.assigness.map((assignee) => assignee.id),
            };

            setFormValues(initialValues);
            setPrevValues(initialValues);
        }
    }, [task]);

    useEffect(() => {
        if (open) {
            const fetchData = async () => {
                dispatch(callGetListTaskType);
                dispatch(callGetListPiority);
                dispatch(callGetListStatus);
                dispatch(callGetListProject(""));
                if (projectId) {
                    try {
                        const listUserProject = await dispatch(callGetListUserByProjectId(projectId));
                        if (listUserProject && Array.isArray(listUserProject)) {
                            setListUser(listUserProject);
                        } else if (listUserProject?.status === 400) {
                            setListUser([]);
                        } else {
                            setListUser([]);
                        }
                    } catch (error) {
                        setListUser([]);
                    }
                } else {
                    setListUser([]);
                }
            }
            fetchData();
        }
    }, [dispatch, open, projectId]);
    const [prevValues, setPrevValues] = useState(formValues);
    useEffect(() => {
        if (!open) return;
        if (isEmpty(formValues)) return;
        if (isEqual(prevValues, formValues)) return;

        async function fetchData() {
            let isMounted = true;
            setLoading(true);
            const validationErrors = validateForm(formValues); // Truyền formValues vào hàm validate
            setErrors(validationErrors);

            if (Object.keys(validationErrors).length > 0) {
                setLoading(false);
                return;
            }
            try {
                const result = await dispatch(callEditTask(formValues));
                if (result.isUpdate) {
                    for (let i = 15; i <= 90; i += 15) {
                        if (!isMounted) return;
                        await new Promise((resolve) => setTimeout(resolve, 100));
                        setProgress(i);
                    }

                    if (isMounted) setProgress(100);
                    setSnackbar({
                        open: true,
                        message: "Task updated successfully",
                        severity: "success",
                    });

                    if (isMounted) setPrevValues(formValues);
                    setTimeout(() => {
                        if (isMounted) {
                            setProgress(0);
                        }
                    }, 2000);
                    const rs = await dispatch(callGetProjectDetail(projectId));
                    setListProjectDetails(rs)
                }
            } catch (error) {
                setSnackbar({
                    open: true,
                    message: "An error occurred. Please try again later.",
                    severity: "error",
                });
            } finally {
                if (isMounted) {
                    setLoading(false);
                    setTimeout(() => setProgress(0), 500);
                }
            }
            return () => {
                isMounted = false;
            };
        }

        fetchData();
    }, [formValues, prevValues, projectId, open]);
    function isEmpty(obj) {
        if (!obj) return true;
        return Object.values(obj).every((value) => value === "" || value === null || value === undefined);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };
    const handleFormValueChange = (field) => (event, newValue) => {
        setFormValues((prev) => ({
            ...prev,
            [field]: newValue !== undefined
                ? (newValue === '' ? 0 : Number(newValue)) // Xử lý slider
                : (event.target.value === '' ? 0 : Number(event.target.value)) // Xử lý input
        }));
    };
    const handleSliderChange = handleFormValueChange('originalEstimate');
    const handleSliderChangeTimeTrackingSpent = handleFormValueChange('timeTrackingSpent');
    const handleSliderChangeTimeTrackingRemain = handleFormValueChange('timeTrackingRemaining');

    const handleChangeOriginalEstimate = handleFormValueChange('originalEstimate');
    const handleChangeTimeTrackingSpent = handleFormValueChange('timeTrackingSpent');
    const handleChangeTimeTrackingRemain = handleFormValueChange('timeTrackingRemaining');
    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
                {loading && (
                    <Box
                        sx={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: 1300,
                        }}
                    >
                        <CircularProgressWithLabel value={progress} />
                    </Box>
                )}
                {/* Tiêu đề */}
                <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }} >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <TextField
                            name="typeId"
                            variant="outlined"
                            select
                            value={formValues.typeId || ""}
                            defaultValue={formValues.typeId || ""}
                            onChange={handleChange}
                            size='small'
                            error={!!errors.typeId}
                            helperText={errors.typeId}
                        >
                            {listTaskType.map((tt) => (
                                <MenuItem key={tt.id} value={tt.id}>
                                    {tt.taskType}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Typography variant="subtitle4">{formValues.taskName || ""}</Typography>
                    </Box>
                    <Box>
                    </Box>
                </DialogTitle>
                {/* Nội dung */}
                <DialogContent>
                    <Grid container spacing={2} justifyContent={"center"}>
                        {/* Bên trái - 6 phần dành cho bình luận */}
                        <Comment
                            task={task}
                            setListProjectDetails={setListProjectDetails}
                        />
                        {/* Bên phải - 4 phần dành cho chi tiết task với chỉnh sửa */}
                        <Grid item xs={6}>
                            <Typography variant="subtitle1" sx={{ mb: 2 }}>
                                Task Details
                            </Typography>
                            <TextField
                                fullWidth
                                label="Task Name"
                                variant="outlined"
                                margin="normal"
                                name="taskName"
                                value={formValues.taskName}
                                onChange={handleChange}
                                error={!!errors.taskName}
                                helperText={errors.taskName}
                            />
                            <TextField
                                fullWidth
                                label="Description"
                                variant="outlined"
                                margin="normal"
                                name="description"
                                multiline
                                rows={4}
                                value={formValues.description}
                                onChange={handleChange}
                                error={!!errors.description}
                                helperText={errors.description}
                            />
                            <TextField
                                name='priorityId'
                                label='Priority'
                                variant='outlined'
                                select
                                fullWidth
                                value={formValues.priorityId}
                                onChange={handleChange}
                                error={!!errors.priorityId}
                                helperText={errors.priorityId}
                            >
                                {listPriority.map((pio, index) => (
                                    <MenuItem key={index} value={pio.priorityId}>
                                        {pio.priority}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                fullWidth
                                label="Status"
                                variant="outlined"
                                margin="normal"
                                name="statusId"
                                select
                                value={formValues.statusId}
                                onChange={handleChange}
                                error={!!errors.statusId}
                                helperText={errors.statusId}
                            >
                                {listStatus.map((stt, index) => (
                                    <MenuItem key={index} value={stt.statusId}>
                                        {stt.statusName}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Grid container item xs={12} sx={{ alignItems: 'center' }}>
                                <Grid item xs>
                                    <FormControl fullWidth>
                                        <FormLabel htmlFor="original-estimate-slider">Original Estimate</FormLabel>
                                        <Slider
                                            id="original-estimate-slider"
                                            value={Number(formValues.originalEstimate)}
                                            onChange={handleSliderChange}
                                            aria-labelledby="original-estimate-slider"
                                            max={200}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item>
                                    <FormControl error={!!errors.originalEstimate} fullWidth>
                                        <Input
                                            value={formValues.originalEstimate}
                                            name="originalEstimate"
                                            onChange={handleChangeOriginalEstimate}
                                            inputProps={{
                                                step: 5,
                                                min: 0,
                                                type: 'number',
                                                'aria-labelledby': 'input-slider',
                                            }}
                                        />
                                        {errors.originalEstimate && (
                                            <FormHelperText>{errors.originalEstimate}</FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                            </Grid>
                            {/* Time Tracking Spent */}
                            <Grid container item xs={12} sx={{ alignItems: 'center' }}>
                                <Grid item xs>
                                    <FormControl fullWidth>
                                        <FormLabel htmlFor="time-tracking-spent-slider">Time Tracking Spent</FormLabel>
                                        <Slider
                                            id="time-tracking-spent-slider"
                                            value={Number(formValues.timeTrackingSpent)}
                                            onChange={handleSliderChangeTimeTrackingSpent}
                                            aria-labelledby="time-tracking-spent-slider"
                                            max={formValues.originalEstimate - formValues.timeTrackingRemaining}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item>
                                    <FormControl error={!!errors.timeTrackingSpent} fullWidth>
                                        <Input
                                            value={formValues.timeTrackingSpent}
                                            name="timeTrackingSpent"
                                            onChange={handleChangeTimeTrackingSpent}
                                            inputProps={{
                                                step: 5,
                                                min: 0,
                                                max: formValues.originalEstimate - formValues.timeTrackingRemaining,
                                                type: 'number',
                                                'aria-labelledby': 'input-slider',
                                            }}
                                        />
                                        {errors.timeTrackingSpent && (
                                            <FormHelperText>{errors.timeTrackingSpent}</FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                            </Grid>
                            {/* Time Tracking remain */}
                            <Grid container item xs={12} sx={{ alignItems: 'center' }}>
                                <Grid item xs>
                                    <FormControl error={!!errors.timeTrackingRemain} fullWidth>
                                        <FormLabel htmlFor="time-tracking-remain-slider">Time Tracking Remain</FormLabel>
                                        <Slider
                                            id="time-tracking-remain-slider"
                                            value={Number(formValues.timeTrackingRemaining)}
                                            onChange={handleSliderChangeTimeTrackingRemain}
                                            aria-labelledby="time-tracking-Remain-slider"
                                            max={formValues.originalEstimate - formValues.timeTrackingSpent}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item>
                                    <FormControl fullWidth>
                                        <Input
                                            value={formValues.timeTrackingRemaining}
                                            name="timeTrackingRemain"
                                            onChange={handleChangeTimeTrackingRemain}
                                            inputProps={{
                                                step: 5,
                                                min: 0,
                                                max: formValues.timeTrackingRemaining - formValues.timeTrackingSpent,
                                                type: 'number',
                                                'aria-labelledby': 'input-slider',
                                            }}
                                        />
                                        {errors.timeTrackingRemain && (
                                            <FormHelperText>{errors.timeTrackingRemain}</FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                            </Grid>
                            {/* List user */}
                            <Grid item xs={12}>
                                <Autocomplete
                                    multiple
                                    options={listUser || []} // Đặt mặc định là mảng rỗng nếu `listUser` là undefined/null
                                    getOptionLabel={(option) => option?.name || "Unknown"}
                                    value={formValues.listUserAsign?.map((userId) =>
                                        listUser?.find((user) => user.userId === userId) || null
                                    )}
                                    onChange={(event, selectedOptions) => {
                                        setFormValues((prev) => ({
                                            ...prev,
                                            listUserAsign: selectedOptions.map((option) => option.userId),
                                        }));
                                        if (selectedOptions.length > 0 && errors.listUserAsign) {
                                            setErrors((prev) => ({
                                                ...prev,
                                                listUserAsign: undefined,
                                            }));
                                        }
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            name="listUserAsign"
                                            variant="outlined"
                                            label="Assign user"
                                            error={!!errors.listUserAsign}
                                            helperText={errors.listUserAsign}
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>

            </Dialog>
            <CustomSnackbar
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                onClose={handleCloseSnackbar}
            />
        </>

    );
};
