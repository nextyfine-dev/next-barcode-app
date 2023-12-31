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

export const getProductBarCodes = catchAsync(
  async (page = 1, limit = 10, sortBy = "createdAt", sortType = "DESC") => {
    const { data } = await http.get(
      `/barcode/get?limit=${limit}&page=${page}&sortBy=${sortBy}&sortType=${sortType}`
    );
    return data;
  }
);

export const updateProduct = catchAsync(async (productId, values) => {
  const { data } = await http.put(`/product/update/${productId}`, values);
  return data;
});

export const deleteProduct = catchAsync(async (id) => {
  const { data } = await http.delete(`/product/delete/${id}`);
  return data;
});
