import { useContext, useEffect, useState } from "react";
import { Box, Pagination, Stack, Typography } from "@mui/material";
import { ItemCard } from "../components/ItemCard";
import { savedItemType } from "../utils/types";
import { getFavList, saveFavsToStorage } from "../utils/localStorage";
import { CircularProgress } from "@mui/material";
import { LanguagesListContext } from "../context/context";
import { countPagesAmount, paginate } from "../utils/pagination";

export const FavouritesPage: React.FC = () => {
  const { loading } = useContext(LanguagesListContext);

  const [favList, setFavList] = useState<savedItemType[] | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const perPage: number = 5;

  useEffect(() => {
    setFavList(() => getFavList());
    if (favList !== null)
      setTotalPages(() => countPagesAmount(favList.length, perPage));
  }, []);

  useEffect(() => {
    if (favList !== null)
      setTotalPages(() => countPagesAmount(favList.length, perPage));
  }, [favList]);

  const removeFavByIdHandler = (favId: string) => {
    setFavList((prev) => {
      if (prev !== null) {
        const newState = prev.filter(({ id }) => id !== favId);
        saveFavsToStorage(newState);
        return newState;
      }
      return prev;
    });
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (favList === null || loading)
    return (
      <Box sx={{ display: "grid", mt: 3, placeItems: "center" }}>
        <CircularProgress />
      </Box>
    );

  if (favList.length) {
    const favSlice = paginate(favList, perPage, page);
    if (!favSlice.length && favList.length) setPage((prev) => prev - 1);
    return (
      <>
        <Box>
          {paginate(favList, perPage, page).map((item) => (
            <ItemCard key={item.id} remove={removeFavByIdHandler} {...item} />
          ))}
        </Box>
        <Stack spacing={2} sx={{ alignItems: "center", mb: 3 }}>
          <Typography>Page: {page}</Typography>
          <Pagination count={totalPages} page={page} onChange={handleChange} />
        </Stack>
      </>
    );
  }

  return (
    <Box
      sx={{
        mt: 4,
      }}
    >
      <Typography variant="h4" gutterBottom textAlign="center">
        This list is empty yet
      </Typography>
    </Box>
  );
};
