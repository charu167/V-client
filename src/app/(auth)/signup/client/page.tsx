import AuthForm from "@/components/AuthForm";
import Link from "next/link";

export default function ClientSignupPage() {
  return (
    <AuthForm
      title="Client Signup"
      fields={[
        { name: "name", type: "text", placeholder: "Full Name / Company Name" },
        { name: "email", type: "email", placeholder: "Email Address" },
        { name: "phone", type: "tel", placeholder: "Phone Number" },
        { name: "password", type: "password", placeholder: "Password" },
      ]}
      apiEndpoint={`${process.env.NEXT_PUBLIC_BASE_URL}/user/signup`}
      redirectTo="/"
      defaultValues={{
        name: "",
        email: "",
        phone: "",
        password: "",
      }}
      submitButtonText="Sign Up"
      includeRole
      roleValue="CLIENT"
      extraBottomText={
        <span>
          Already signed up?{" "}
          <Link href="/login" className="text-purple-600 hover:underline">
            Login
          </Link>
        </span>
      }
    />
  );
}
