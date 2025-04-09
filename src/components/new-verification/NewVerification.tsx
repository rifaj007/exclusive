"use client";
import { newVerification } from "@/libs/actions/auth/new-verification";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Loading from "../pages-component/Loading";

const NewVerification = () => {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Token is missing!");
      return;
    }

    newVerification(token)
      .then((data) => {
        if (data?.error) {
          setError(data.error);
        } else if (data?.success) {
          setSuccess(data.success);
        }
      })
      .catch(() => setError("Something went wrong!"));
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  if (!success && !error) return <Loading/>;

  return (
    <div>
      <div className="flex-center h-[40vh]">
        {success && (
          <div className="flex items-center flex-col gap-3">
            <p className="text-green-500">{success}</p>

            <Link className="button-primary inline-block" href="/log-in">
              Back to Login
            </Link>
          </div>
        )}

        {error && (
          <div className="flex items-center flex-col gap-3">
            <p className="text-red-500">{error}</p>

            <Link className="button-primary inline-block" href="/sign-up">
              Back to Signup
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewVerification;
