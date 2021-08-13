import { RegExr } from "Utils/RegExr";
import { AUTH_LEVEL } from "Utils/constants";
export const validator = {
  authority: (authority) => !(authority === AUTH_LEVEL.unknown),
  email: (email) => RegExr.email.test(email),
  pw: (pw) => RegExr.password.test(pw),
  pwCheck: (pwCheck, pw) => pwCheck === pw,
  name: (name) => RegExr.name.test(name),
  address: (address) => !(address === ""),
  detailAddress: (detailAddress) => !(detailAddress === ""),
  dateOfBirth: (dateOfBirth) => RegExr.dateOfBirth.test(dateOfBirth),
  creditCardNum: (creditCardNum) => RegExr.creditNumber.test(creditCardNum),
  pwEnglish: (pw) => pw.search(RegExr.pwEnglish) >= 0,
  pwNumber: (pw) => pw.search(RegExr.pwNumber) >= 0,
  pwSpecialCharacter: (pw) => pw.search(RegExr.pwSpecialCharacter) >= 0,
  pwLength: (pw) => pw.length >= 8,
};
