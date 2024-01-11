import AuthLayout from "@/components/Shared/AuthLayout";
import React from "react";
import RegisterComponent from "@/components/Auth/Register";

const Register = () => {
  return (
    <AuthLayout>
      <RegisterComponent />
    </AuthLayout>
  );
};

export default Register;
