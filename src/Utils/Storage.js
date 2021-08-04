import { USER_STORAGE, LOGGEDIN_USER } from "./constants";

export const loadLocalStorage = (storageKey = USER_STORAGE) => {
  const loadedUserListData = localStorage.getItem(storageKey);
  const parsedUserListData = JSON.parse(loadedUserListData);
  return parsedUserListData;
};

export const saveLocalStorage = (storageKey = USER_STORAGE, data) => {
  const formattedSaveData = JSON.stringify(data);
  const savedUserListData = localStorage.setItem(storageKey, formattedSaveData);
  return savedUserListData;
};

export const loggedOutStorage = (storageKey = LOGGEDIN_USER) => {
  localStorage.removeItem(storageKey);
};

export const userAuthority = () => {
  const nowLoggedInuserData = loadLocalStorage(LOGGEDIN_USER);
  return nowLoggedInuserData.authority;
};
