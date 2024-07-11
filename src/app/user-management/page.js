import { fetchUserAction } from "@/actions";
import AddNewUser from "@/components/add-new-user";
import SingleUserCard from "@/components/single-user";
import React from "react";

const UserManagement = async () => {
  const usersList = await fetchUserAction();

  return (
    <div className="p-20 max-w-6xl">
      <div className="flex justify-between">
        <h1>User Management</h1>
        <AddNewUser />
      </div>
      <h1>Hello</h1>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {usersList && usersList.data && usersList.data?.length > 0 ? (
          usersList.data?.map((user) => (
            <SingleUserCard key={user._id} user={user} />
          ))
        ) : (
          <h2>No users found! Please create one</h2>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
