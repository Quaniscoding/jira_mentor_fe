import { Box, Typography, Container } from "@mui/material";

const NotFoundPage = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "background.default",
      }}
    >
      <Box textAlign="center">
        <Typography
          variant="h1"
          color="error"
          sx={{ fontWeight: "bold", fontSize: { xs: "6rem", md: "9rem" } }}
        >
          404
        </Typography>
        <Typography
          variant="h5"
          color="textSecondary"
          sx={{ fontWeight: "medium" }}
        >
          Page Not Found
        </Typography>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
