export const isEmail = (checkString) => {
  const emailRegex =
    /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  // /^[a-z0-9\.\-_]+@([a-z0-9\-]+\.)+[a-z]{2,6}$/;
  return emailRegex.test(checkString);
};
export const isName = (checkString) => {
  //한글 2~4자리
  const nameRegex = /^[가-힣]{2,4}$/;
  return nameRegex.test(checkString);
};
export const isDateOfBirth = (checkString) => {
  //숫자 6자리
  const dateOfBirthRegex = /([0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[1,2][0-9]|3[0,1]))$/;
  return dateOfBirthRegex.test(checkString);
};

//비밀번호 숫자/특수문자/영문/8자리이상
export const isPassword = (checkString) => {
  const passwordRegex = /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/;
  return passwordRegex.test(checkString);
};

export const isCreditNum = (checkString) => {
  const creditNumRegexp = /^[0-9]{4}[-][0-9]{4}[-][0-9]{4}[-][0-9]{4}$/;
  return creditNumRegexp.test(checkString);
};

export const isPwNum = (checkString) => {
  const pwNumRegex = /[0-9]/g;
  return checkString.search(pwNumRegex);
};
export const isEng = (checkString) => {
  const engRegex = /[a-zA-Z]/gi;
  return checkString.search(engRegex);
};
export const isSpe = (checkString) => {
  const speRegex = /[~`!@#$%\^&*()-+=]/gi;
  return checkString.search(speRegex);
};
// const num = pw.search(/[0-9]/g);
// const eng = pw.search(/[a-z]/gi);
// const spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
