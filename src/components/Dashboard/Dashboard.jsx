import { Box, Breadcrumbs, Link } from "@mui/material";
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DashboardTable from "./Table/DashboardTable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CircularProgressWithLabel from "../CircularProgressWithLabel/CircularProgressWithLabel";
import { callGetListProject } from "../../redux/reducers/projects/getAllProject";

export default function Dashboard() {
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
    const listProject = useSelector((state) => state.getAllProject.listProject);
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);

    // Debounce searchQuery
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 500); // Độ trễ debounce, 500ms là khoảng thời gian chờ trước khi cập nhật

        return () => {
            clearTimeout(handler); // Xóa timeout cũ nếu người dùng tiếp tục nhập
        };
    }, [searchQuery]);
    useEffect(() => {
        let isMounted = true;
        async function fetchData() {
            setLoading(true);
            setProgress(15);
            try {
                for (let i = 10; i <= 90; i += 15) {
                    await new Promise((resolve) => setTimeout(resolve, 100)); // Giả lập tiến trình
                    if (isMounted) setProgress(i);
                }
                await dispatch(callGetListProject(debouncedSearchQuery));
                if (isMounted) setProgress(100);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                if (isMounted) {
                    setLoading(false);
                    setTimeout(() => setProgress(0), 500); // Đưa `progress` về 0 sau khi hoàn tất
                }
            }
        }

        fetchData();

        return () => {
            isMounted = false; // Cleanup khi component unmount
        };
    }, [dispatch, debouncedSearchQuery]);

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
                        backgroundColor: "rgba(255, 255, 255, 0.8)", // Hiệu ứng mờ nền
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
                </Breadcrumbs>
            </Box>
            <DashboardTable
                listProject={listProject}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
        </Box>
    );
}