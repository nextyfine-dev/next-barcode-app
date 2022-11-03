import catchAsync from "../utils/catchAsync";
import http from "./http";

export const createProductBarcode = catchAsync(async (values) => {
  const { data } = await http.post("/barcode/create", values);
  return data;
});

export const getProductDetails = catchAsync(async (id) => {
  const { data } = await http.get(`/product/${id}`);
  return data;
});

export const getProductBarCodes = catchAsync(async () => {
  const { data } = await http.get(`/barcode/get`);
  return data;
});
