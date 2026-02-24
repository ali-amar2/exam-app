"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { LucideTriangleAlert } from "lucide-react";
import { useDeleteAccount } from "../_hooks/use-delete-acc";

export default function DeleteAccountDialog() {
  const { mutate: deleteAccount, isPending } = useDeleteAccount();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          className="bg-red-50 text-red-600 flex-1 hover:bg-red-100"
        >
          Delete My Account
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-xl min-h-[25rem] flex flex-col items-center justify-between">
        <AlertDialogHeader className="flex flex-col gap-12 items-center">
          {/* Icon */}
          <AlertDialogTitle className="flex justify-center items-center">
            <div className="w-24 h-24 p-4 bg-red-50 rounded-full relative flex justify-center items-center">
              <LucideTriangleAlert className="w-20 h-20 text-red-600 bg-red-100 rounded-full p-4 absolute" />
            </div>
          </AlertDialogTitle>

          {/* Text */}
          <div className="flex flex-col m-auto gap-2 items-center text-center">
            <p className="text-red-600 font-bold text-lg">
              Are you sure you want to delete your account?
            </p>

            <AlertDialogDescription>
              This action is permanent and cannot be undone.
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>

        {/* Actions */}
        <AlertDialogFooter className="gap-4">
          <AlertDialogCancel disabled={isPending} className="w-52 border-none">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={() => deleteAccount()}
            disabled={isPending}
            className="bg-red-600 hover:bg-red-700 w-52"
          >
            {isPending ? "Deleting..." : "Yes, Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
