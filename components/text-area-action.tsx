import {Textarea} from "@/components/ui/textarea";
import {useEffect, useState} from "react";
import {createPost, modifyPost} from "@/models/posts/posts.service";
import {addComment} from "@/models/comments/comments.service";
import {getMainChat} from "@/models/chats/chats.service";
import {userStore} from "@/store/userStore";
import {postStore} from "@/store/postStore";
import {useToast} from "@/hooks/use-toast";

interface Props {
    content?: string;
    action_type?: string;
    confirm_button_clicked: number;
    id?: number;
}

export function TextAreaAction({
    content = "",
    action_type,
    confirm_button_clicked,
    id,
}: Props) {
    const [text, setText] = useState(content);
    const [prevConfirmClick, setPrevConfirmClick] = useState(confirm_button_clicked);
    const user_store = userStore();
    const {toast} = useToast();

    const handleClick = async () => {
        try {
            const chat = await getMainChat();
            if (!user_store?.user?.id || !text.trim()) throw new Error("User ID empty or input empty");

            if (action_type === "add") {
                await createPost({userId: user_store.user.id, chatId: chat.id, content: text});
                postStore.getState().reloadData();
                toast({title: "Succès", description: "Post créé avec succès"});
            } else if (action_type === "edit") {
                await modifyPost({userId: user_store?.user?.id ?? "", content: text, postId: id ?? -1});
                postStore.getState().reloadData();
                toast({title: "Succès", description: "Post modifié avec succès"});
            } else if (action_type === "comment") {
                await addComment(user_store?.user?.id, id ?? -1, text);
                postStore.getState().reloadData();
                toast({title: "Succès", description: "Commentaire créé avec succès"});
            }
        } catch (e) {
            toast({
                title: "Erreur",
                description: `Échec de ${action_type !== "edit" ? "création" : "modification"} du post`,
                variant: "destructive",
            });
        }
    };

    // Detect button click change and trigger action
    if (prevConfirmClick !== confirm_button_clicked) {
        setPrevConfirmClick(confirm_button_clicked);
        handleClick();
    }

    return (
        <Textarea
            id="post_content"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write something..."
        />
    );
}

