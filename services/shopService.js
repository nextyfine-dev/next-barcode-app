import catchAsync from "../utils/catchAsync";
import http from "./http";

export const createNewShop = catchAsync(async (values) => {
  const { data } = await http.post("/shop/create", values);
  return data;
});

export const getShops = catchAsync(async () => {
  const { data } = await http.get("/shop/get");
  return data;
});
