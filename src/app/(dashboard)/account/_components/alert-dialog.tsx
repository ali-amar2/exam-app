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
import { LucideTriangleAlert, Loader } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useDeleteAccount } from "../_hooks/use-delete-acc";

export default function DeleteAccountDialog() {
  // States
  const [open, setOpen] = useState(false);

  // Navigations
  const router = useRouter();

  // Hooks
  const { mutateAsync, isPending } = useDeleteAccount();

  // Handlers
  const handleDelete = async () => {
    try {
      await mutateAsync();
      setOpen(false);
      await signOut({ redirect: false });
      router.replace("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          disabled={isPending}
          type="button"
          className="bg-red-50 text-red-600 flex-1 hover:bg-red-100"
        >
          Delete My Account
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-xl min-h-[25rem] flex flex-col items-center justify-between">
        <AlertDialogHeader className="flex flex-col gap-12 items-center">
          <AlertDialogTitle>
            <div className="w-24 h-24 p-4 bg-red-50 rounded-full flex items-center justify-center">
              <LucideTriangleAlert className="w-20 h-20 text-red-600 bg-red-100 rounded-full p-4" />
            </div>
          </AlertDialogTitle>

          <div className="flex flex-col gap-2 items-center text-center">
            <p className="text-red-600 font-bold text-lg">
              Are you sure you want to delete your account?
            </p>

            <AlertDialogDescription>
              This action is permanent and cannot be undone.
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>

        <AlertDialogFooter className="gap-4">
          <AlertDialogCancel disabled={isPending} className="w-52 border-none">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            disabled={isPending}
            className="bg-red-600 hover:bg-red-700 w-52"
          >
            {isPending ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              "Yes, Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
