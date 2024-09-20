import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { setMode, setColors } from "@redux/themeSlice";
// Cannot find module '@redux/themeSlice' or its corresponding type declarations

const SomeComponent: React.FC = () => {
  const dispatch = useDispatch();

  const toggleMode = () => {
    dispatch(setMode("dark"));
  };

  const changeColors = () => {
    dispatch(setColors({ primary: "#ff0000", secondary: "#0000ff" }));
  };

  return (
    <div>
      <Button onClick={toggleMode}>Switch to Dark Mode</Button>
      <Button onClick={changeColors}>Change Colors</Button>
    </div>
  );
};

export default SomeComponent;
