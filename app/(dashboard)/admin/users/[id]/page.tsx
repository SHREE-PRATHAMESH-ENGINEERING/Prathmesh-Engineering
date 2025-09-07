"use client";
import { DashboardSidebar } from "@/components";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { isValidEmailAddressFormat } from "@/lib/utils";

interface DashboardUserDetailsProps {
  params: { id: number };
}

const DashboardSingleUserPage = ({
  params: { id },
}: DashboardUserDetailsProps) => {
  const [userInput, setUserInput] = useState<{
    email: string;
    newPassword: string;
    role: string;
  }>({
    email: "",
    newPassword: "",
    role: "",
  });
  const router = useRouter();

  const deleteUser = async () => {
    const requestOptions = {
      method: "DELETE",
    };
    fetch(`/api/users/${id}`, requestOptions)
      .then((response) => {
        if (response.status === 204) {
          toast.success("User deleted successfully");
          router.push("/admin/users");
        } else {
          throw Error("There was an error while deleting user");
        }
      })
      .catch((error) => {
        toast.error("There was an error while deleting user");
      });
  };

  const updateUser = async () => {
    if (
      userInput.email.length > 3 &&
      userInput.role.length > 0 &&
      userInput.newPassword.length > 0
    ) {
      if (!isValidEmailAddressFormat(userInput.email)) {
        toast.error("You entered invalid email address format");
        return;
      }

      if (userInput.newPassword.length > 7) {
        const requestOptions = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: userInput.email,
            password: userInput.newPassword,
            role: userInput.role,
          }),
        };
        fetch(`/api/users/${id}`, requestOptions)
          .then((response) => {
            if (response.status === 200) {
              return response.json();
            } else {
              throw Error("Error while updating user");
            }
          })
          .then((data) => toast.success("User successfully updated"))
          .catch((error) => {
            toast.error("There was an error while updating user");
          });
      } else {
        toast.error("Password must be longer than 7 characters");
        return;
      }
    } else {
      toast.error("For updating a user you must enter all values");
      return;
    }
  };

  useEffect(() => {
    // sending API request for a single user
    fetch(`/api/users/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUserInput({
          email: data?.email,
          newPassword: "",
          role: data?.role,
        });
      });
  }, [id]);

  return (
    <div className="bg-gradient-to-br from-[#FAF9EE] to-white min-h-screen flex justify-start max-w-screen-2xl mx-auto max-xl:flex-col">
      <DashboardSidebar />
      <div className="flex-1 flex items-center justify-center p-8 max-xl:p-4">
        <div className="bg-white rounded-2xl shadow-lg border-2 border-[#5068a4] border-opacity-10 w-full max-w-lg p-8 flex flex-col gap-y-7">
          <h1 className="text-3xl font-bold text-[#5068a4] mb-2">User Details</h1>
          <div>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text text-[#5068a4] font-semibold">Email:</span>
              </div>
              <input
                type="email"
                className="input input-bordered w-full"
                value={userInput.email}
                onChange={(e) =>
                  setUserInput({ ...userInput, email: e.target.value })
                }
              />
            </label>
          </div>
          <div>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text text-[#5068a4] font-semibold">New Password:</span>
              </div>
              <input
                type="password"
                className="input input-bordered w-full"
                onChange={(e) =>
                  setUserInput({ ...userInput, newPassword: e.target.value })
                }
                value={userInput.newPassword}
              />
            </label>
          </div>
          <div>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text text-[#5068a4] font-semibold">User Role:</span>
              </div>
              <select
                className="select select-bordered w-full"
                value={userInput.role}
                onChange={(e) =>
                  setUserInput({ ...userInput, role: e.target.value })
                }
              >
                <option value="admin">admin</option>
                <option value="user">user</option>
              </select>
            </label>
          </div>
          <div className="flex gap-x-4 max-sm:flex-col mt-4">
            <button
              type="button"
              className="uppercase bg-[#5068a4] px-8 py-4 text-lg border border-[#5068a4] font-bold text-white shadow-sm rounded-xl hover:bg-[#3d5998] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#5068a4] transition-all duration-300"
              onClick={updateUser}
            >
              Update User
            </button>
            <button
              type="button"
              className="uppercase bg-red-600 px-8 py-4 text-lg border border-red-600 font-bold text-white shadow-sm rounded-xl hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-600 transition-all duration-300"
              onClick={deleteUser}
            >
              Delete User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSingleUserPage;
