"use client";
import { CustomButton, SectionTitle } from "@/components";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const OtpVerification = ({ email, onVerified }: { email: string; onVerified: () => void }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.success) {
      toast.success("OTP verified! Redirecting to login...");
      onVerified();
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } else {
      toast.error(data.message || "Invalid OTP");
    }
  };

  return (
    <form onSubmit={handleVerify} className="flex flex-col gap-4 mt-8">
      <label htmlFor="otp">Enter 4-digit OTP sent to your email:</label>
      <input
        id="otp"
        type="text"
        maxLength={4}
        value={otp}
        onChange={e => setOtp(e.target.value)}
        className="border px-4 py-2 rounded"
        required
      />
      
      <button type="submit" disabled={loading} className="btn-primary">
        {loading ? "Verifying..." : "Verify OTP"}
      </button>
    </form>
  );
};

const RegisterPage = () => {
  const [error, setError] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [pendingUser, setPendingUser] = useState<{ email: string; password: string } | null>(null);
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/");
    }
  }, [sessionStatus, router]);

  const handleOtpVerified = async () => {
    if (!pendingUser) return;
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: pendingUser.email,
          password: pendingUser.password,
        }),
      });

      if (res.status === 400) {
        toast.error("This email is already registered");
        setError("The email already in use");
      }
      if (res.status === 200) {
        setError("");
        toast.success("Registration successful");
        router.push("/login");
      }
    } catch (error) {
      toast.error("Error, try again");
      setError("Error, try again");
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const name = e.target[0].value;
    const lastname = e.target[1].value;
    const email = e.target[2].value;
    const password = e.target[3].value;
    const confirmPassword = e.target[4].value;

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      toast.error("Email is invalid");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setError("Password must be at least 8 characters, include uppercase, lowercase, number, and special character.");
      toast.error("Password must be at least 8 characters, include uppercase, lowercase, number, and special character.");
      return;
    }

    if (confirmPassword !== password) {
      setError("Passwords are not equal");
      toast.error("Passwords are not equal");
      return;
    }

    try {
      const otpRes = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const otpData = await otpRes.json();
      if (otpData.success) {
        setPendingUser({ email, password });
        setShowOtp(true);
        toast.success("OTP sent to your email");
      } else {
        toast.error("Failed to send OTP");
      }
    } catch (err) {
      toast.error("Error sending OTP");
    }
  };

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="pcb-hero-bg pcb-pattern min-h-screen">
      <SectionTitle title="Register" path="Home | Register" />
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
        <div className="absolute top-20 left-10 w-32 h-1 circuit-flow opacity-20"></div>
        <div className="absolute top-40 right-20 w-24 h-1 circuit-flow opacity-25" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-1/4 w-20 h-1 circuit-flow opacity-30" style={{ animationDelay: '2s' }}></div>
        <div className="flex justify-center flex-col items-center relative z-10">
          <h2 className="mt-6 text-center text-2xl font-semibold leading-9 tracking-tight text-[#5068a4] animate-fade-in">
            Sign up on our website
          </h2>
        </div>
        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-[480px] relative z-10">
          <div className="bg-[#ffffff] border border-[#5068a4] border-opacity-30 px-6 py-12 shadow-xl rounded-2xl sm:px-12 backdrop-blur-sm animate-scale relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 border-l border-b border-[#5068a4] opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-12 h-12 border-r border-t border-[#5068a4] opacity-20"></div>
            {!showOtp ? (
              <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold leading-6 text-[#5068a4] mb-2">Name</label>
                  <div className="mt-2">
                    <input id="name" name="name" type="text" required className="block w-full rounded-xl border-2 border-[#5068a4] border-opacity-30 py-3 px-4 text-gray-900 bg-white shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-[#5068a4] focus:border-[#5068a4] focus:outline-none transition-all duration-300 hover:border-opacity-50 sm:text-sm sm:leading-6" placeholder="Enter your first name" />
                  </div>
                </div>
                <div>
                  <label htmlFor="lastname" className="block text-sm font-semibold leading-6 text-[#5068a4] mb-2">Lastname</label>
                  <div className="mt-2">
                    <input id="lastname" name="lastname" type="text" required className="block w-full rounded-xl border-2 border-[#5068a4] border-opacity-30 py-3 px-4 text-gray-900 bg-white shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-[#5068a4] focus:border-[#5068a4] focus:outline-none transition-all duration-300 hover:border-opacity-50 sm:text-sm sm:leading-6" placeholder="Enter your last name" />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold leading-6 text-[#5068a4] mb-2">Email address</label>
                  <div className="mt-2">
                    <input id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-xl border-2 border-[#5068a4] border-opacity-30 py-3 px-4 text-gray-900 bg-white shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-[#5068a4] focus:border-[#5068a4] focus:outline-none transition-all duration-300 hover:border-opacity-50 sm:text-sm sm:leading-6" placeholder="Enter your email" />
                  </div>
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-semibold leading-6 text-[#5068a4] mb-2">Password</label>
                  <div className="mt-2">
                    <input id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-xl border-2 border-[#5068a4] border-opacity-30 py-3 px-4 text-gray-900 bg-white shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-[#5068a4] focus:border-[#5068a4] focus:outline-none transition-all duration-300 hover:border-opacity-50 sm:text-sm sm:leading-6" placeholder="Enter your password" />
                  </div>
                </div>
                <div>
                  <label htmlFor="confirmpassword" className="block text-sm font-semibold leading-6 text-[#5068a4] mb-2">Confirm password</label>
                  <div className="mt-2">
                    <input id="confirmpassword" name="confirmpassword" type="password" autoComplete="current-password" required className="block w-full rounded-xl border-2 border-[#5068a4] border-opacity-30 py-3 px-4 text-gray-900 bg-white shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-[#5068a4] focus:border-[#5068a4] focus:outline-none transition-all duration-300 hover:border-opacity-50 sm:text-sm sm:leading-6" placeholder="Confirm your password" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-2 border-[#5068a4] text-[#5068a4] focus:ring-[#5068a4] focus:ring-2" />
                    <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-[#5068a4] font-medium">Accept our terms and privacy policy</label>
                  </div>
                </div>
                <div>
                  <CustomButton buttonType="submit" text="Sign up" paddingX={3} paddingY={1.5} customWidth="full" textSize="sm" />
                  {error && (
                    <p className="text-red-500 text-center text-sm my-4 p-3 bg-red-50 border border-red-200 rounded-xl font-medium animate-pulse">
                      {error}
                    </p>
                  )}
                </div>
              </form>
            ) : (
                <OtpVerification email={pendingUser?.email || ""} onVerified={handleOtpVerified} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;