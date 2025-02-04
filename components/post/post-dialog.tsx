"use client";

import {Button} from "@/components/ui/button"
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
import {Label} from "@/components/ui/label"
import {useState} from "react";
import {TextAreaAction} from "@/components/text-area-action";
import {PostEvent} from "@/handlers/post-reducer";

interface props {
    children?: React.ReactNode
    content?: string
    action_type: PostEvent
    id?: number | undefined
    className?: string
}

export const PostDialog: React.FC<props> = ({children, content, action_type, id, className}) => {
    const [btn_clicked, set_btn_clicked] = useState(0);

    // Fonction appelé lorsque le bouton d'ajout est cliqué. Le composant TextAreaAction détectera la modif de la variable btn_clicked et va exécuter l'action d'ajout du post en conséquence.
    const create_post = () => {
        set_btn_clicked(btn_clicked => btn_clicked + 1);
    }

    const props = {
        confirm_button_clicked: btn_clicked,
        content: content,
        action_type: action_type ?? "add",
        id: id
    };

    let text = "";
    if (action_type === PostEvent.update) {
        text = "Edit post"
    } else if (action_type === PostEvent.create) {
        text = "New post"
    } else if (action_type === PostEvent.createComment) {
        text = "New Comment"
    }

    // L'user connecté est l'auteur du post.
    return (
        <Dialog>
            <DialogTrigger className={className ?? ""} asChild>
                {action_type !== PostEvent.createComment ?
                    <button className="btn-ghost">{text}</button> : <p>{children}</p>}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{text}</DialogTitle>
                    <DialogDescription>
                        This post will be published on the main chat.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                            Link
                        </Label>

                        {/* L'input qui contient le texte à modifier ou à ajouter au post. Cette input executera l'action d'ajout du post, lorsqu'on clique sur le bouton 'publish' */}
                        <TextAreaAction {...props} />
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

