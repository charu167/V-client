import AuthForm from "@/components/AuthForm";
import Link from "next/link";

export default function WorkerSignupPage() {
  return (
    <AuthForm
      title="Worker Signup"
      fields={[
        { name: "name", type: "text", placeholder: "Full Name" },
        { name: "email", type: "email", placeholder: "Email Address" },
        { name: "phone", type: "tel", placeholder: "Phone Number" },
        { name: "password", type: "password", placeholder: "Password" },
      ]}
      apiEndpoint={`${process.env.NEXT_PUBLIC_BASE_URL}/user/signup`}
      redirectTo="/worker/setup"
      defaultValues={{
        name: "",
        email: "",
        phone: "",
        password: "",
      }}
      submitButtonText="Sign Up"
      includeRole
      roleValue="WORKER"
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
