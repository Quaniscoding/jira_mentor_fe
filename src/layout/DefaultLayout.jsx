import { Outlet } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from "../components/shared-theme/AppTheme";

const DefaultLayout = () => {
  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <Outlet />
    </AppTheme>
  );
};

export default DefaultLayout;
