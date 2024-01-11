import React from "react";
import AuthLayout from "@/components/Shared/AuthLayout";
import LoginComponent from "@/components/Auth/Login";

const Login = () => {
  return (
    <AuthLayout>
      <LoginComponent />
    </AuthLayout>
  );
};

export default Login;
