import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const NotFoundPage: React.FC = () => {
  return (
    <Box
      sx={{
        mt: 4,
      }}
    >
      <Typography variant="h4" gutterBottom textAlign="center">
        This page does not exist
      </Typography>
    </Box>
  );
};
