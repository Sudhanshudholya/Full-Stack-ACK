import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WithLogin = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (token) {
      navigate("/layout");
    }
  }, [navigate]);

  return <>{children}</>;
};

export default WithLogin;
