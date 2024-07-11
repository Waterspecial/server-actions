"use client";

import React, { useContext } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserFormControls, userFormInitialState } from "@/utils";
import { AddNewUserAction, editUserAction } from "@/actions";
import { UserContext } from "@/context";

const AddNewUser = () => {
  const {
    openPopup,
    setOpenPopup,
    currentEditedId,
    setCurrentEditedId,
    newUserFormData,
    setNewUserFormData,
  } = useContext(UserContext);

  function handleSaveButtonValid() {
    return Object.keys(newUserFormData).every(
      (key) => newUserFormData[key].trim() !== ""
    );
  }

  const handleAddNewUser = async () => {
    const path = "/user-management";
    const result =
      currentEditedId !== null
        ? await editUserAction(currentEditedId, newUserFormData, path)
        : await AddNewUserAction(newUserFormData, path);
    console.log(result);
    setOpenPopup(false);
    setNewUserFormData(userFormInitialState);
    setCurrentEditedId(nul);
  };

  return (
    <div>
      <Button onClick={() => setOpenPopup(true)}>Add New User</Button>
      <Dialog
        open={openPopup}
        onOpenChange={() => {
          setOpenPopup(false);
          setNewUserFormData(userFormInitialState);
          setCurrentEditedId(null);
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {currentEditedId === null ? "Add New User" : "Edit User"}
            </DialogTitle>
          </DialogHeader>
          <form action={handleAddNewUser} className="grid gap-4 py-4">
            {UserFormControls.map((formControl, i) => (
              <div className="mb-5" key={i}>
                <Label htmlFor={formControl.name} className="text-right">
                  {formControl.label}
                </Label>
                <Input
                  id={formControl.name}
                  name={formControl.name}
                  placeholder={formControl.placeholder}
                  className="col-span-3"
                  type={formControl.type}
                  value={newUserFormData[formControl.name]}
                  onChange={(e) =>
                    setNewUserFormData({
                      ...newUserFormData,
                      [formControl.name]: e.target.value,
                    })
                  }
                />
              </div>
            ))}
            <DialogFooter>
              <Button
                className="disabled:opacity-20"
                disabled={!handleSaveButtonValid()}
                type="submit"
              >
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewUser;
