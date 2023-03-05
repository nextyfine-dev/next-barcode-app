import catchAsync from "../utils/catchAsync";
import http from "./http";
import { removeFromStorage, setStorage } from "./storageService";

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

export const jwtLogin = catchAsync(async (token) => {
  const { data } = await http.post("/auth/jwtlogin", { token });
  if (data && data.status === "success") {
    await setStorage("@token", data.data.token);
  }
  return data;
});

export const logOut = catchAsync(async () => removeFromStorage("@token"));

export const updatePass = catchAsync(async (values) => {
  const { data } = await http.patch("/auth/password", values);
  return data;
});

export const getEmployees = catchAsync(async (values) => {
  const { adminId, limit, page, sortType, sortBy } = values;

  const { data } = await http.get(
    `/employees?limit=${limit}&page=${page}&sortBy=${sortBy}&sortType=${sortType}&adminId=${adminId}`
  );
  return data;
});

export const getAdmin = catchAsync(async (adminId) => {
  const { data } = await http.get(`/admin/${adminId}`);
  return data;
});
