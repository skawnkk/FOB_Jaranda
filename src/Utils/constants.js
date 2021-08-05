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

// User Paths
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  ADMIN: "/admin",
  STUDENTS: "/students",
  MATCHUP: "/matchup",
  TEACHER: "/teacher",
  KIDS: "/kids",
};

// Userdata Template
export const USERDATA_TEMPLATE = {
  id: "",
  authority: "",
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
  unknown: 3,
};

export const CATEGORY = {
  admin: [
    { title: "이용 안내", path: "/" },
    { title: "사용자 관리", path: "/admin" },
  ],
  teacher: [
    { title: "이용 안내", path: "/" },
    { title: "학생 관리", path: "/students" },
    { title: "학생 소개 받기", path: "/matchup" },
  ],
  parent: [
    { title: "이용 안내", path: "/" },
    { title: "우리 아이 관리", path: "/kids" },
    { title: "자란다 선생님 찾기", path: "/teacher" },
  ],
  allUser: [{ title: "이용 안내", path: "/" }],
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
