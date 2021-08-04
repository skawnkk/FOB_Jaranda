import React, { useEffect } from "react";
import { saveLocalStorage } from "Utils/Storage";

const Main = (props) => {
  useEffect(() => {
    saveLocalStorage("TEST", {
      id: "adfa",
      authority: 2,
    });
  }, []);
  return <div>Main</div>;
};

export default Main;
