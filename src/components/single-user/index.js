"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { deleteUserAction } from "@/actions";
import { useContext } from "react";
import { UserContext } from "@/context";

const SingleUserCard = ({ user }) => {
  const { setCurrentEditedId, setOpenPopup, setNewUserFormData } =
    useContext(UserContext);

  const handleDeleteUser = async (userId) => {
    const response = await deleteUserAction(userId, "/user-management");
  };

  const handleEdit = (userData) => {
    setOpenPopup(true);
    setNewUserFormData({
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      email: userData?.email,
      address: userData?.address,
    });
    setCurrentEditedId(userData?._id);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {user?.firstName} {user?.lastName}
        </CardTitle>
        <CardDescription>{user?.email}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{user.address}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={() => handleEdit(user)}>Edit</Button>
        <Button onClick={() => handleDeleteUser(user?._id)}>Delete</Button>
      </CardFooter>
    </Card>
  );
};

export default SingleUserCard;
