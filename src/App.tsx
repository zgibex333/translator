import { BrowserRouter, Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";
import { Header } from "./components/Header";
import { FAVOURITES, HISTORY, HOME } from "./utils/routes";
import { TranslatePage } from "./pages/TranslatePage";
import { FavouritesPage } from "./pages/FavouritesPage";
import { HistoryPage } from "./pages/HistoryPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { LangContextWrapper } from "./components/LangContextWrapper";
import { ContextWrapper } from "./components/ModeContextWrapper";

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
          <LangContextWrapper>
            <Routes>
              <Route path={HOME} element={<TranslatePage />} />
              <Route path={FAVOURITES} element={<FavouritesPage />} />
              <Route path={HISTORY} element={<HistoryPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </LangContextWrapper>
        </Container>
      </ContextWrapper>
    </BrowserRouter>
  );
};
