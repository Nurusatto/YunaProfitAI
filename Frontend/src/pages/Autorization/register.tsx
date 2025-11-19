import { AuthLayout } from "@/layout/authorization";
import { Register } from "@/widget/register";

export const RegisterPage = () => {
  return (
    <AuthLayout>
      <Register />
    </AuthLayout>
  );
};
