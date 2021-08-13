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
    authLevel: 2,
    name: "parents",
    selectName: "부모님",
  },
];

export const USER_STORAGE = "USERLIST";
export const LOGGEDIN_USER = "LOGGEDIN_USER";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  LOGOUT: "/logout",
  SIGNUP: "/signup",
  ADMIN: "/admin",
  STUDENTS: "/students",
  MATCHUP: "/matchup",
  TEACHER: "/teacher",
  KIDS: "/kids",
};
export const { HOME, LOGIN, LOGOUT, SIGNUP, ADMIN, STUDENTS, MATCHUP, TEACHER, KIDS } = ROUTES;
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

export const IS_LOGGED_IN = {
  accessible: true,
  inaccessible: false,
  allAllow: null,
};

export const AUTH_LEVEL = {
  admin: 0,
  teacher: 1,
  parent: 2,
  unknown: 3,
};

export const SIGNUP_EMAIL_STATUS = {
  defaultStatus: 0,
  invalidType: 1,
  unConfirmed: 2,
  confirmedFailure: 3,
  confirmedSuccess: 4,
};
export const CATEGORY = {
  admin: [
    { title: "이용 안내", path: HOME },
    { title: "사용자 관리", path: ADMIN },
  ],
  teacher: [
    { title: "이용 안내", path: HOME },
    { title: "학생 관리", path: STUDENTS },
    { title: "학생 소개 받기", path: MATCHUP },
  ],
  parent: [
    { title: "이용 안내", path: HOME },
    { title: "우리 아이 관리", path: KIDS },
    { title: "자란다 선생님 찾기", path: TEACHER },
  ],
  allUser: [{ title: "이용 안내", path: HOME }],
};

export const ADMIN_CONSTANTS = {
  PAGE_SIZE: 10,
  authTitle: { choice: "선택", admin: "관리자", teacher: "선생님", parents: "부모님" },
};
