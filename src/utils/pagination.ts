import { savedItemType } from "./types";

export const countPagesAmount = (
  arrayLength: number,
  perPage: number
): number => {
  return Math.ceil(arrayLength / perPage);
};

export const paginate = (
  array: savedItemType[],
  perPage: number,
  currentPage: number
): savedItemType[] => {
  return array.slice((currentPage - 1) * perPage, currentPage * perPage);
};
