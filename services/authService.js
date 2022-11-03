import catchAsync from "../utils/catchAsync";
import http from "./http";
import { setStorage } from "./storageService";

export const signUp = catchAsync(async (values) => {
  const { data } = await http.post("/auth/register", values);
  return data;
});

export const signIn = catchAsync(async (values) => {
  const { data } = await http.post("/auth/login", values);
  if (data && data.status === "success") {
    await setStorage("@token", data.data.token);
  }
  return data;
});

export const verify = catchAsync(async (values) => {
  const { data } = await http.post("/auth/verify", values);
  if (data && data.status === "success") {
    await setStorage("@token", data.data.token);
  }
  return data;
});
