import catchAsync from "../utils/catchAsync";
import http from "./http";

export const createCustomer = catchAsync(async (values) => {
  const { data } = await http.post("/customer/create", values);
  return data;
});

export const getCustomerDetails = catchAsync(async (id) => {
  const { data } = await http.get(`/customer/${id}`);
  return data;
});

export const getAllCustomers = catchAsync(
  async (page = 1, limit = 10, sortBy = "createdAt", sortType = "DESC") => {
    const { data } = await http.get(
      `/customer/barcode/get?limit=${limit}&page=${page}&sortBy=${sortBy}&sortType=${sortType}`
    );
    return data;
  }
);
