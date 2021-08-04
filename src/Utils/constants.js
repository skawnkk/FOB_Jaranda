export const USER_DATA_ARR = ["admin", "teacher", "parent"];
// Local storage
export const USER_STORAGE = "USERLIST";
export const LOGGEDIN_USER = "LOGGEDIN_USER";

// User Path
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  ADMIN: "/admin",
};

// Userdata Template
export const USERDATA_TEMPLATE = {
  id: "",
  auth: "",
  email: "",
  pw: "",
  name: "",
  address: "",
  dateOfBirth: "",
  creditCardNum: "",
};

// 로그인 여부
export const IS_LOGGED_IN = {
  accessible: true,
  inaccessible: false,
  allAllow: null,
};

// 권한레벨
export const AUTH_LEVEL = {
  admin: 0,
  teacher: 1,
  parent: 2,
  unknown: null,
};