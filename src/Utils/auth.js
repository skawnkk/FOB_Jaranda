import { useEffect } from "react";
import { LOGGEDIN_USER, ROUTES } from "./constants";
import { loadLocalStorage } from "./Storage";

const AuthorityControl = (Components, option, authLevel) => {
  const CheckAuthority = ({ history }) => {
    const isLoggedIn = loadLocalStorage("TEST");

    useEffect(() => {
      if (!isLoggedIn && option) {
        alert("로그인 해주세요.");
        history.push(ROUTES.LOGIN);
      }
      if (isLoggedIn && !option) {
        alert("이미 로그인 한 유저입니다.");
        return history.push(ROUTES.HOME);
      }

      if (isLoggedIn) {
        const { auth } = isLoggedIn.authority;
        if (authLevel < auth) {
          alert("권한이 없습니다.");
          return history.push(ROUTES.HOME);
        }
        if (!auth) {
          alert("관리자가 아닙니다.");
          return history.push(ROUTES.HOME);
        }
      }
    }, []);
    return <Components />;
  };
  return CheckAuthority;
};

export default AuthorityControl;
