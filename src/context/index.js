"use client";

import { userFormInitialState } from "@/utils";
import { createContext, useState } from "react";

export const UserContext = createContext(null);

export default function UserState({ children }) {
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [newUserFormData, setNewUserFormData] = useState(userFormInitialState);

  return (
    <UserContext.Provider
      value={{
        currentEditedId,
        setCurrentEditedId,
        openPopup,
        setOpenPopup,
        newUserFormData,
        setNewUserFormData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
