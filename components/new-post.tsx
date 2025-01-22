"use client";

import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useRef, useState } from "react";
import { TextAreaAction } from "@/components/text-area-action";  

export function PostDialog(content:string|null) {
  const [btn_clicked,set_btn_clicked] = useState(0);

  const create_post = (e) => {
    e.preventDefault();
    set_btn_clicked(btn_clicked => btn_clicked + 1);
  }

  const props = {
    confirm_button_clicked: btn_clicked,
    content: content,
    action_type: 'add', // Explicitly cast if needed
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">New Post</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New post</DialogTitle>
          <DialogDescription>
            This post will be published on the main chat.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <TextAreaAction {...props}/>
          </div>
        </div>
        <DialogFooter className="justify-end">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" onClick={create_post} variant="default">
              Publish
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

