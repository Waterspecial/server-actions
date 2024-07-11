"use server";

import connectToDB from "@/database";
import User from "@/models/user";
import { revalidatePath } from "next/cache";

// Add new user action

export async function AddNewUserAction(formData, pathToRevalidate) {
  await connectToDB();

  try {
    // validate the data using joi/ other packages you can use

    const newUser = await User.create(formData);
    if (newUser) {
      revalidatePath(pathToRevalidate);
      return {
        success: true,
        message: "User added successfully",
      };
    } else {
      return {
        success: false,
        message: "Some error occurred! Please try again later",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Some error occurred! Please try again laterr",
    };
  }
}

// fetch new users action
export async function fetchUserAction() {
  await connectToDB();

  try {
    const usersList = await User.find({});
    if (usersList) {
      return {
        success: true,
        data: JSON.parse(JSON.stringify(usersList)),
      };
    } else {
      return {
        success: false,
        message: "Some error occurred! Please try again later",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Some error occurred! Please try again laterr",
    };
  }
}
// edit new user action
export async function editUserAction(
  currentUserId,
  formData,
  pathToRevalidate
) {
  await connectToDB();
  try {
    const { firstName, lastName, email, address } = formData;
    const updatedUser = await User.findOneAndUpdate(
      {
        _id: currentUserId,
      },
      { firstName, lastName, email, address },
      { new: true }
    );

    if (updatedUser) {
      revalidatePath(pathToRevalidate);
      return {
        success: true,
        message: "User updated successfully",
      };
    } else {
      return {
        success: false,
        message: "Unable to update user! Please, try again",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Some error occurred! Please try again laterr",
    };
  }
}

// delete new user action
export async function deleteUserAction(currentUserId, pathToRevalidate) {
  await connectToDB();

  try {
    const deletedUser = await User.findByIdAndDelete(currentUserId);
    if (deletedUser) {
      revalidatePath(pathToRevalidate);
      return {
        success: true,
        message: "User deleted successfully",
      };
    } else {
      return {
        success: false,
        message: "Not able to perform delete operation! Please try again later",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Some error occurred! Please try again laterr",
    };
  }
}
