import React, { useEffect, useState } from 'react'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { callGetProjectDetail } from '../../redux/reducers/projects/getProjectDetail';
import CircularProgressWithLabel from '../CircularProgressWithLabel/CircularProgressWithLabel';
import {
  Box, Breadcrumbs, Link
} from "@mui/material";
import KanbanBoard from './KanbanBoard';
import TaskDetailModal from './TaskDetailModal';
import HandleAssignUserToProject from './HandleAssignUserToProject';
export default function ProjectDetails() {
  const { id: projectId } = useParams();
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
  const [listProjectDetails, setListProjectDetails] = useState([])

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
    setModalOpen(false);
  };

  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      setLoading(true);
      setProgress(15);
      try {
        for (let i = 10; i <= 90; i += 15) {
          await new Promise((resolve) => setTimeout(resolve, 100));
          if (isMounted) setProgress(i);
        }
        const result = await dispatch(callGetProjectDetail(projectId));
        setListProjectDetails(result)
        if (isMounted) setProgress(100);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
          setTimeout(() => setProgress(0), 500);
        }
      }
    }
    fetchData();

    return () => {
      isMounted = false;
    };
  }, [dispatch, debouncedSearchQuery])
  return (
    <Box
      component="main"
      className="MainContent"
      sx={{
        px: { xs: 2, md: 6 },
        pt: {
          xs: "calc(12px + var(--Header-height))",
          sm: "calc(12px + var(--Header-height))",
          md: 3,
        },
        height: "100vh",
        gap: 1,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
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
              backgroundColor: "rgba(255, 255, 255, 0.8)",
            }}
          >
            <CircularProgressWithLabel value={progress} />
          </Box>
        )}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Breadcrumbs
            size="sm"
            aria-label="breadcrumbs"
            separator={<ChevronRightRoundedIcon fontSize="sm" />}
            sx={{ pl: 0 }}
          >
            <Link underline="none" color="neutral" href="/" aria-label="Home">
              <HomeRoundedIcon />
            </Link>
            <Link underline="hover" color="neutral" href="/dashboard">
              Dashboard
            </Link>
            <Link underline="hover" color="neutral" href={`/projectDetails/${projectId}`} aria-current="page">
              {listProjectDetails.projectName}
            </Link>
          </Breadcrumbs>
        </Box>
      </Box>
      <HandleAssignUserToProject
        listProjectDetails={listProjectDetails}
        projectId={projectId}
        setListProjectDetails={setListProjectDetails}
      />
      <KanbanBoard
        listProjectDetails={listProjectDetails}
        onTaskClick={handleTaskClick}
        task={selectedTask}
        loading={loading}
        setLoading={setLoading}
        setProgress={setProgress}
      />
      <TaskDetailModal
        setListProjectDetails={setListProjectDetails}
        open={isModalOpen}
        onClose={handleCloseModal}
        task={selectedTask}
        projectId={projectId}
      />
    </Box>
  )
}
