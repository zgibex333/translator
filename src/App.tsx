import { ContextWrapper } from "./components/ContextWrapper";
import { Header } from "./components/Header";
import Container from "@mui/material/Container";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FAVOURITES, HISTORY, HOME } from "./utils/routes";
import { TranslatePage } from "./pages/TranslatePage";
import { FavouritesPage } from "./pages/FavouritesPage";
import { HistoryPage } from "./pages/HistoryPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ContextWrapper>
        <Header />
        <Container
          maxWidth="xl"
          sx={{
            flexGrow: 1,
          }}
        >
          <Routes>
            <Route path={HOME} element={<TranslatePage />} />
            <Route path={FAVOURITES} element={<FavouritesPage />} />
            <Route path={HISTORY} element={<HistoryPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Container>
      </ContextWrapper>
    </BrowserRouter>
  );
};
