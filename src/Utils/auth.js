import { useEffect } from "react";
import { LOGGEDIN_USER, ROUTES } from "./constants";
import { loadLocalStorage } from "./Storage";

const AuthorityControl = (Components, option, authLevel) => {
  const CheckAuthority = ({ history }) => {
    const { HOME, LOGIN } = ROUTES;

    const isLoggedIn = loadLocalStorage("TEST");

    useEffect(() => {
      if (!isLoggedIn && option) {
        alert("로그인 해주세요.");
        history.push(LOGIN);
      }
      if (isLoggedIn && !option) {
        alert("이미 로그인 한 유저입니다.");
        return history.push(HOME);
      }

      if (isLoggedIn) {
        const { authority } = isLoggedIn;
        if (authLevel < authority) {
          alert("권한이 없습니다.");
          return history.push(HOME);
        }
        if (!authority) {
          alert("관리자가 아닙니다.");
          return history.push(HOME);
        }
      }
    }, []);
    return <Components />;
  };
  return CheckAuthority;
};

export default AuthorityControl;
