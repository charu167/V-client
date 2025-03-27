import AuthForm from "@/components/AuthForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <AuthForm
      title="Login"
      fields={[
        { name: "email", type: "email", placeholder: "Email Address" },
        { name: "password", type: "password", placeholder: "Password" },
      ]}
      apiEndpoint={`${process.env.NEXT_PUBLIC_BASE_URL}/user/signin`}
      redirectTo="/"
      defaultValues={{
        email: "",
        password: "",
      }}
      submitButtonText="Login"
      extraBottomText={
        <span>
          Don&apos;t have an account?{" "}
          <Link
            href="/signup/client"
            className="text-purple-600 hover:underline"
          >
            Sign up
          </Link>
        </span>
      }
    />
  );
}
