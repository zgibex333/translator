import Box from "@mui/material/Box";
import { ContextWrapper } from "./components/ContextWrapper";
import { Header } from "./components/Header";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import RepeatIcon from "@mui/icons-material/Repeat";
import { TranslateColumn } from "./components/TranslateColumn";

export const App: React.FC = () => {
  return (
    <ContextWrapper>
      <Header />
      <Container
        maxWidth="xl"
        sx={{
          flexGrow: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            mt: 10,
          }}
        >
          <TranslateColumn />
          <Button
            variant="outlined"
            sx={{
              my: { xs: 2, md: "none" },
            }}
          >
            <RepeatIcon />
          </Button>
          <TranslateColumn />
        </Box>
      </Container>
    </ContextWrapper>
  );
};
