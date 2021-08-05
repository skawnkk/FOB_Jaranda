// Select Box Data
export const USER_DATA_OBJ = [
  {
    authLevel: 0,
    name: "admin",
    selectName: "관리자",
  },
  {
    authLevel: 1,
    name: "teacher",
    selectName: "선생님",
  },
  {
    authLevel: 0,
    name: "parents",
    selectName: "부모님",
  },
];
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
  pw: "",
  name: "",
  email: "",
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

// 모달창 종류
export const MODAL_TYPE = {
  success: "success",
  credit: "credit",
  address: "address",
  account: "account",
};
//관리자페이지 상수
export const ADMIN = {
  PAGE_SIZE: 10,
  authTitle: { choice: "선택", admin: "관리자", teacher: "선생님", parents: "부모님" },
};
