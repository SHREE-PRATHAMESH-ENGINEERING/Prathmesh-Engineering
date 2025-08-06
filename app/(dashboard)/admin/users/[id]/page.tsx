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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="flex max-w-screen-2xl mx-auto">
        <DashboardSidebar />
        <div className="flex-1 xl:ml-8 max-xl:px-6">
          <div className="py-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-[#5068a4] to-[#3d5998] px-8 py-6">
                <h1 className="text-3xl font-bold text-white">User Details</h1>
                <p className="text-blue-100 mt-2">Manage user account and permissions</p>
              </div>
              
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#5068a4] focus:outline-none transition-colors duration-200"
                      value={userInput.email}
                      onChange={(e) =>
                        setUserInput({ ...userInput, email: e.target.value })
                      }
                      placeholder="user@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">User Role</label>
                    <select
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#5068a4] focus:outline-none transition-colors duration-200 bg-white"
                      value={userInput.role}
                      onChange={(e) =>
                        setUserInput({ ...userInput, role: e.target.value })
                      }
                    >
                      <option value="admin">Administrator</option>
                      <option value="user">Regular User</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#5068a4] focus:outline-none transition-colors duration-200"
                    onChange={(e) =>
                      setUserInput({ ...userInput, newPassword: e.target.value })
                    }
                    value={userInput.newPassword}
                    placeholder="Enter new password (min 8 characters)"
                  />
                </div>

                <div className="flex gap-4 max-sm:flex-col mb-6">
                  <button
                    type="button"
                    className="flex-1 bg-[#5068a4] hover:bg-[#3d5998] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                    onClick={updateUser}
                  >
                    Update User
                  </button>
                  <button
                    type="button"
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                    onClick={deleteUser}
                  >
                    Delete User
                  </button>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-xl">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> Deleting a user will permanently remove their account and all associated data.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSingleUserPage;
