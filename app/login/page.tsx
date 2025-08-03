"use client";
import { CustomButton, SectionTitle } from "@/components";
import { isValidEmailAddressFormat } from "@/lib/utils";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {

    if (sessionStatus === "authenticated") {
      router.replace("/");
    }
  }, [sessionStatus, router]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!isValidEmailAddressFormat(email)) {
      setError("Email is invalid");
      toast.error("Email is invalid");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password is invalid");
      toast.error("Password is invalid");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
      toast.error("Invalid email or password");
    } else {
      setError("");
      toast.success("Successful login");

      window.location.href = "/";
    }
  };

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="pcb-hero-bg pcb-pattern min-h-screen">
      <SectionTitle title="Login" path="Home | Login" />
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 relative">

        <div className="absolute top-20 left-10 w-32 h-1 circuit-flow opacity-20"></div>
        <div className="absolute top-40 right-20 w-24 h-1 circuit-flow opacity-25" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-1/4 w-20 h-1 circuit-flow opacity-30" style={{animationDelay: '2s'}}></div>
        
        <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
          <h2 className="mt-6 text-center text-2xl font-semibold leading-9 tracking-tight text-[#5068a4] text-glow animate-fade-in">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-[480px] relative z-10">
          <div className="bg-[#ffffff] border border-[#5068a4] border-opacity-30 px-6 py-12 shadow-xl rounded-2xl sm:px-12 backdrop-blur-sm animate-scale relative overflow-hidden">

            <div className="absolute top-0 right-0 w-16 h-16 border-l border-b border-[#5068a4] opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-12 h-12 border-r border-t border-[#5068a4] opacity-20"></div>
            
            <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold leading-6 text-[#5068a4] mb-2"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-xl border-2 border-[#5068a4] border-opacity-30 py-3 px-4 text-gray-900 bg-white shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-[#5068a4] focus:border-[#5068a4] focus:outline-none transition-all duration-300 hover:border-opacity-50 sm:text-sm sm:leading-6"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold leading-6 text-[#5068a4] mb-2"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-xl border-2 border-[#5068a4] border-opacity-30 py-3 px-4 text-gray-900 bg-white shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-[#5068a4] focus:border-[#5068a4] focus:outline-none transition-all duration-300 hover:border-opacity-50 sm:text-sm sm:leading-6"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-2 border-[#5068a4] text-[#5068a4] focus:ring-[#5068a4] focus:ring-2"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-3 block text-sm leading-6 text-[#5068a4] font-medium"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm leading-6">
                  <a
                    href="#"
                    className="font-semibold text-[#5068a4] hover:text-[#3d5998] transition-colors duration-300"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              <div>
                <CustomButton
                  buttonType="submit"
                  text="Sign in"
                  paddingX={3}
                  paddingY={1.5}
                  customWidth="full"
                  textSize="sm"
                />
              </div>
            </form>

            <div>
              <div className="relative mt-10">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-[#5068a4] border-opacity-30" />
                </div>
                <div className="relative flex justify-center text-sm font-medium leading-6">
                  <span className="bg-[#ffffff] px-6 text-[#5068a4] font-semibold">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <button
                  className="flex w-full items-center border-2 border-[#5068a4] border-opacity-30 justify-center gap-3 rounded-xl bg-white px-3 py-3 text-[#5068a4] hover:bg-[#5068a4] hover:text-white hover:border-[#5068a4] transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5068a4] shadow-md hover:shadow-lg"
                  onClick={() => {
                    signIn("google");
                  }}
                >
                  <FcGoogle className="w-5 h-5" />
                  <span className="text-sm font-semibold leading-6">
                    Google
                  </span>
                </button>

                <button
                  className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#24292F] border-2 border-[#24292F] px-3 py-3 text-white hover:bg-[#5068a4] hover:border-[#5068a4] transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5068a4] shadow-md hover:shadow-lg"
                  onClick={() => {
                    signIn("github");
                  }}
                >
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-semibold leading-6">
                    GitHub
                  </span>
                </button>
              </div>
              {error && (
                <p className="text-red-500 text-center text-sm my-4 p-3 bg-red-50 border border-red-200 rounded-xl font-medium animate-pulse">
                  {error}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
