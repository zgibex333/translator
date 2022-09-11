import {
  Box,
  CircularProgress,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { FavCard } from "../components/FavCard";
import { LanguagesListContext } from "../context/context";
import { getHistoryList } from "../utils/localStorage";
import { countPagesAmount, paginate } from "../utils/pagination";
import { savedItemType } from "../utils/types";

export const HistoryPage: React.FC = () => {
  const { loading } = useContext(LanguagesListContext);

  const [historyList, setHistoryList] = useState<savedItemType[] | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const perPage: number = 10;

  useEffect(() => {
    setHistoryList(() => getHistoryList());
    if (historyList !== null)
      setTotalPages(() => countPagesAmount(historyList.length, perPage));
  }, []);

  useEffect(() => {
    if (historyList !== null)
      setTotalPages(() => countPagesAmount(historyList.length, perPage));
  }, [historyList]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (historyList === null || loading)
    return (
      <Box sx={{ display: "grid", mt: 3, placeItems: "center" }}>
        <CircularProgress />
      </Box>
    );

  if (historyList.length) {
    const historySlice = paginate(historyList, perPage, page);
    if (!historySlice.length && historyList.length) setPage((prev) => prev - 1);
    return (
      <>
        <Box>
          {paginate(historyList, perPage, page).map((item, index) => (
            <FavCard key={index} {...item} />
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
