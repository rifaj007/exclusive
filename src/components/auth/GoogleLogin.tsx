import { GoogleIcon } from "@/icons";
import { signIn } from "@/libs/auth";

const GoogleLogin = ({ text }: { text: string }) => {
  return (
    <form action={async () => {
      "use server";
      await signIn("google");
    }}>
    <button className="flex-center gap-4 py-4 border-text-4 border rounded w-full">
      <GoogleIcon /> {text}
    </button>
    </form>
  );
};

export default GoogleLogin;
