import * as React from 'react';
import { useState } from "react";
import {
    Avatar,
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    Modal,
    TextField,
    IconButton,
    Typography,
    Paper,
    Menu,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Tooltip,
    AvatarGroup,
    Pagination,
} from '@mui/material';
import {
    FilterAlt as FilterAltIcon,
    Search as SearchIcon,
    MoreHoriz as MoreHorizRoundedIcon,
} from '@mui/icons-material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CreateProjectModal from '../Modal/CreateProjectModal';
import { useDispatch } from 'react-redux';
import { callDeleteProject } from './../../../redux/reducers/projects/deleteProject';
import { callGetListProject } from '../../../redux/reducers/projects/getAllProject';
import CustomSnackbar from '../../CustomSnackbar/CustomSnackbar';
import { callGetListUser } from '../../../redux/reducers/users/getUser';
import { callAsignUserProject } from '../../../redux/reducers/users/asignUserProject';
import EditProjectModal from '../Modal/EditProjectModal';
import CreateTaskModal from '../Modal/CreateTaskModal';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import AddIcon from "@mui/icons-material/Add";
import StringAvatar from '../../StringAvatar/StringAvatar';
function RowMenu({ projectId, setSnackbar, toggleDrawer2 }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [openConfirm, setOpenConfirm] = useState(false);
    const dispatch = useDispatch();
    const handleOpenConfirm = () => {
        setOpenConfirm(true);
    }
    const handleCloseConfirm = () => {
        setOpenConfirm(false);
        setAnchorEl(null);
    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = async () => {
        const result = await dispatch(callDeleteProject(projectId));
        if (result.isDelete) {
            await dispatch(callGetListProject(""))
            setSnackbar({
                open: true,
                message: "Delete project successfully!",
                severity: "success",
            });
        }
        else {
            setSnackbar({
                open: true,
                message: "Delete project failed!",
                severity: "error",
            });
        }
        setAnchorEl(null);
    };
    return (
        <>
            <IconButton
                size="small"
                color="default"
                onClick={handleClick}
                sx={{ variant: "plain", color: "neutral" }}
            >
                <MoreHorizRoundedIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    sx: { minWidth: 140 },
                }}
            >
                <MenuItem onClick={() => { toggleDrawer2(true)(projectId); setAnchorEl(null); }}>Edit</MenuItem>
                <MenuItem onClick={handleOpenConfirm} sx={{ color: "error.main" }}>
                    Delete
                </MenuItem>
                <Dialog
                    open={openConfirm}
                    onClose={handleCloseConfirm}
                    aria-labelledby="confirm-delete-title"
                    aria-describedby="confirm-delete-description"
                >
                    <DialogTitle id="confirm-delete-title">Confirm Delete</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="confirm-delete-description">
                            Are you sure you want to delete this project? This action cannot be undone.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseConfirm} color="primary">
                            Cancel
                        </Button>
                        <Button
                            onClick={async () => {
                                try {
                                    await handleDelete();
                                    handleCloseConfirm();
                                } catch (error) {
                                    console.error(error);
                                }
                            }}
                            color="error"
                            autoFocus
                        >
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
                <Divider />
            </Menu>
        </>
    );
}

// eslint-disable-next-line react/prop-types
function MainTable({ listProject, toggleDrawer2 }) {
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });
    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };
    const categories = [
        { id: 1, name: "Dự án phần mềm" },
        { id: 2, name: "Dự án web" },
        { id: 3, name: "Dự án di động" },
    ];
    const navigate = useNavigate()
    return (
        <Paper
            sx={{
                mt: 2,
                overflow: 'auto',
                minHeight: { xs: "400px", sm: "750px" }, // Chiều cao tối thiểu thay đổi theo màn hình
                boxShadow: 3,
                borderRadius: 2,
            }}
        >
            <Table stickyHeader>
                <TableHead>
                    <TableRow sx={{ bgcolor: "primary.main" }}>
                        <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Project name</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Creator</TableCell>
                        <TableCell sx={{ fontWeight: "bold", display: { xs: "none", sm: "table-cell" } }}>
                            Description
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Members</TableCell>
                        <TableCell sx={{ fontWeight: "bold", display: { xs: "none", md: "table-cell" } }}>
                            Category
                        </TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listProject?.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{
                                "&:nth-of-type(odd)": {
                                    bgcolor: "grey.50", // Màu nền xen kẽ
                                },
                                "&:hover": {
                                    bgcolor: "grey.100", // Hiệu ứng hover
                                },
                            }}
                        >
                            <TableCell>{row.id}</TableCell>
                            <TableCell>
                                <a
                                    className="pointer-event"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        navigate(`/projectDetails/${row.id}`);
                                    }}
                                    href="#"
                                    style={{
                                        cursor: "pointer",
                                        textDecoration: "none",
                                        color: "primary.main",
                                        fontWeight: 500,
                                    }}
                                >
                                    {row.projectName}
                                </a>
                            </TableCell>
                            <TableCell>{row.creator.name}</TableCell>
                            <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                                {row.description}
                            </TableCell>
                            <TableCell sx={{ display: "flex" }}>
                                <HandleAssignUserToProject
                                    row={row}
                                    projectId={row.id}
                                    setSnackbar={setSnackbar}
                                />
                            </TableCell>
                            <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                                {categories.find((category) => category.id === row.categoryId)?.name}
                            </TableCell>
                            <TableCell>
                                <RowMenu
                                    projectId={row.id}
                                    handleCloseSnackbar={handleCloseSnackbar}
                                    setSnackbar={setSnackbar}
                                    toggleDrawer2={toggleDrawer2}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <CustomSnackbar
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                onClose={handleCloseSnackbar}
            />
        </Paper>

    )
}
function HandleAssignUserToProject({ row, projectId, setSnackbar }) {
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [visibleUsers, setVisibleUsers] = useState(10);
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState("");
    const dispatch = useDispatch();
    useEffect(() => {
        async function fetchData(keyword = "") {
            try {
                const result = await dispatch(callGetListUser(keyword));
                setFilteredUsers(result.result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, [dispatch]);

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleSearchChange = (event) => {
        const keyword = event.target.value;
        setSearchKeyword(keyword);

        async function fetchFilteredData() {
            try {
                const result = await dispatch(callGetListUser(keyword));
                setFilteredUsers(result.result.slice(0, 10));
                setVisibleUsers(10);
            } catch (error) {
                console.error("Error fetching filtered data:", error);
            }
        }
        fetchFilteredData();
    };
    const handleShowMore = () => {
        setVisibleUsers((prevVisible) => prevVisible + 10);
    };
    const assignUserToProject = async (user) => {
        const result = await dispatch(callAsignUserProject({ projectId: projectId, userId: user }))
        if (result.isAssigned) {
            setSnackbar({
                open: true,
                message: "Assigned user to project successfully!",
                severity: "success",
            });
        }
        else {
            setSnackbar({
                open: true,
                message: "Assigned user to project failed!",
                severity: "error",
            });
        }
        await dispatch(callGetListProject(""))
        setAnchorEl(null);
    }
    const [openModal, setOpenModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleOpenModal = (userId) => {
        setSelectedUser(userId);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedUser(null);
    };

    const handleConfirmAssign = () => {
        assignUserToProject(selectedUser);
        handleCloseModal();
    };

    return (
        <>
            <AvatarGroup
                max={4}
                spacing="medium"
                sx={{
                    "& .MuiAvatar-root": {
                        border: "2px solid #fff",
                        width: 40,
                        height: 40,
                        fontSize: "1rem",
                    },
                }}
            >
                {row.members && row.members.length > 0
                    ? row.members.map((user, index) => (
                        <Tooltip key={index} title={user?.name}>
                            <Avatar {...StringAvatar(user?.name)} />
                        </Tooltip>
                    ))
                    : null}
            </AvatarGroup>
            <Avatar
                onClick={handleOpenMenu}
                sx={{
                    cursor: "pointer",
                    bgcolor: "primary.main",
                    "&:hover": {
                        bgcolor: "primary.dark",
                    },
                }}
            >
                <AddIcon sx={{ color: "white" }} />
            </Avatar>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                PaperProps={{
                    style: { maxHeight: 400, width: "300px" },
                }}
                sx={{
                    "& .MuiMenu-paper": {
                        boxShadow: 3,
                        borderRadius: 2,
                    },
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <MenuItem disableRipple sx={{ p: 1.5 }}>
                    <TextField
                        fullWidth
                        placeholder="Search users"
                        value={searchKeyword}
                        onChange={handleSearchChange}
                        variant="outlined"
                        size="small"
                        onKeyDown={(e) => e.stopPropagation()}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                bgcolor: "background.paper",
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "primary.main",
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "primary.main",
                                },
                            },
                        }}
                    />
                </MenuItem>
                {filteredUsers.slice(0, visibleUsers).map((user, index) => (
                    <MenuItem
                        key={index}
                        onClick={() => handleOpenModal(user.userId)}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            "&:hover": {
                                bgcolor: "grey.100",
                            },
                        }}
                    >
                        <Avatar
                            {...StringAvatar(user?.name)}
                            sx={{
                                marginRight: 2,
                                width: 32,
                                height: 32,
                                fontSize: "0.875rem",
                            }}
                        />
                        {user.name}
                    </MenuItem>
                ))}
                {/* Modal */}
                <Modal open={openModal} onClose={handleCloseModal}>
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            bgcolor: "background.paper",
                            boxShadow: 24,
                            p: 4,
                            borderRadius: 2,
                            minWidth: 300,
                        }}
                    >
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Confirm
                        </Typography>
                        <Typography sx={{ mb: 3 }}>
                            Do you want to add this user to your project?
                        </Typography>
                        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                            <Button variant="outlined" onClick={handleCloseModal}>
                                Cancel
                            </Button>
                            <Button variant="contained" color="primary" onClick={handleConfirmAssign}>
                                Confirm
                            </Button>
                        </Box>
                    </Box>
                </Modal>
                {visibleUsers < filteredUsers.length && (
                    <MenuItem disableRipple>
                        <Button
                            onClick={handleShowMore}
                            fullWidth
                            sx={{
                                textTransform: "none",
                                color: "primary.main",
                                "&:hover": {
                                    bgcolor: "primary.light",
                                },
                            }}
                        >
                            Show More
                        </Button>
                    </MenuItem>
                )}
            </Menu>
        </>

    )
}
function PaginationComponent({ currentPage, itemsPerPage, totalItems, onPageChange }) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const totalPagesToShow = 10;

    const handlePageClick = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const visiblePages = [];
    if (totalPages <= totalPagesToShow) {
        for (let i = 1; i <= totalPages; i++) {
            visiblePages.push(i);
        }
    } else {
        visiblePages.push(1);
        if (currentPage > 4) visiblePages.push("...");
        for (let i = Math.max(2, currentPage - 2); i <= Math.min(totalPages - 1, currentPage + 2); i++) {
            visiblePages.push(i);
        }
        if (currentPage < totalPages - 3) visiblePages.push("...");
        visiblePages.push(totalPages);
    }

    return (
        <Box
            sx={{
                pt: 2,
                pb: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                flexWrap: 'wrap',
            }}
        >
            {/* Previous Button */}
            <Button
                size="small"
                variant="outlined"
                color="inherit"
                startIcon={<KeyboardArrowLeftIcon />}
                onClick={handlePrevious}
                disabled={currentPage === 1}
                sx={{
                    display: { xs: 'none', sm: 'inline-flex' },
                }}
            >
                Previous
            </Button>

            {/* Page Number Buttons */}
            {visiblePages.map((page, index) => (
                page === "..." ? (
                    <span
                        key={`ellipsis-${index}`}
                        size="small"
                        variant="outlined"
                        disabled
                        sx={{
                            width: 32,
                            height: 32,
                            border: '1px solid',
                            borderColor: 'action.disabled',
                            color: 'text.primary',
                            bgcolor: 'transparent',
                        }}
                    >
                        ...
                    </span>
                ) : (
                    <IconButton
                        key={page} // Use page number as key
                        size="small"
                        color={currentPage === page ? 'primary' : 'default'}
                        onClick={() => handlePageClick(page)}
                        sx={{
                            border: '1px solid',
                            borderColor: currentPage === page ? 'primary.main' : 'action.disabled',
                            bgcolor: currentPage === page ? 'primary.main' : 'transparent',
                            color: currentPage === page ? 'white' : 'text.primary',
                            '&:hover': {
                                bgcolor: currentPage === page ? 'primary.dark' : 'action.hover',
                            },
                            width: 32,
                            height: 32,
                            margin: 0.5, // Add spacing between page numbers
                        }}
                    >
                        {page}
                    </IconButton>
                )
            ))}

            {/* Next Button */}
            <Button
                size="small"
                variant="outlined"
                color="inherit"
                endIcon={<KeyboardArrowRightIcon />}
                onClick={handleNext}
                disabled={currentPage === totalPages}
                sx={{
                    display: { xs: 'none', sm: 'inline-flex' }, // Hide on small screens
                }}
            >
                Next
            </Button>
        </Box>
    );
}
// eslint-disable-next-line react/prop-types
export default function DashboardTable({ listProject, searchQuery, setSearchQuery }) {

    const [openDrawerCreateProject, setOpenDrawerCreateProject] = useState(false);
    const [openDrawerCreateTask, setOpenDrawerCreateTask] = useState(false);
    const [openDrawerEditProject, setOpenDrawerEditProject] = useState(false);
    const [projectId, setProjectId] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const filteredProjects = listProject.filter((project) =>
        project.projectName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const itemsPerPage = 10;
    const totalItems = filteredProjects.length;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProjects = filteredProjects.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const toggleDrawer1 = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpenDrawerCreateProject(open);
    };
    const toggleDrawer2 = (open) => (projectId) => {
        setProjectId(projectId);
        setOpenDrawerEditProject(open);
    };
    const toggleDrawer3 = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpenDrawerCreateTask(open);
    };
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value)
        setCurrentPage(1);
    }
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    flexWrap: 'wrap',
                    gap: 1.5,
                    alignItems: { xs: 'stretch', sm: 'center' },
                }}
            >
                <FormControl size="small" sx={{ flex: 1, minWidth: { xs: '100%', sm: 'auto' } }}>
                    <TextField
                        size="small"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        InputProps={{
                            startAdornment: <SearchIcon sx={{ mr: 1 }} />,
                        }}
                    />
                </FormControl>
                <Button
                    variant="outlined"
                    size="small"
                    onClick={toggleDrawer1(true)}
                    sx={{
                        minWidth: { xs: '100%', sm: 'auto' },
                    }}
                >
                    Create project
                </Button>
                <Button
                    variant="outlined"
                    size="small"
                    onClick={toggleDrawer3(true)}
                    sx={{
                        minWidth: { xs: '100%', sm: 'auto' },
                    }}
                >
                    Create task
                </Button>
            </Box>

            <MainTable
                listProject={paginatedProjects}
                toggleDrawer2={toggleDrawer2}
            />
            <PaginationComponent
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                totalItems={totalItems}
                onPageChange={handlePageChange}
            />
            <CreateProjectModal
                openDrawerCreateProject={openDrawerCreateProject}
                toggleDrawer={toggleDrawer1}
                setOpenDrawerCreateProject={setOpenDrawerCreateProject} />
            <EditProjectModal
                openDrawerEditProject={openDrawerEditProject}
                toggleDrawer2={toggleDrawer2}
                setOpenDrawerEditProject={setOpenDrawerEditProject}
                projectId={projectId}
            />
            <CreateTaskModal
                projectId={projectId}
                openDrawerCreateTask={openDrawerCreateTask}
                toggleDrawer={toggleDrawer3}
                setOpenDrawerCreateTask={setOpenDrawerCreateTask} />
        </>
    );
}
