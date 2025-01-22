import { Textarea } from "@/components/ui/textarea"
import { useRef, useState } from "react";
import { createPost } from "@/models/posts/posts.service";
import { getMainChat } from "@/models/chats/chats.service";
import { userStore } from "@/store/userStore";
import { useToast } from "@/hooks/use-toast"

interface props {
    content:string
    action_type:string
    // Lorsqu'elle est appelée elle fermera la modale.
    confirm_button_clicked: number
    postId?:string
}

export function TextAreaAction({content, action_type, confirm_button_clicked, postId=""}: props){
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const user_store = userStore();
    const [prev_confirm_button_clicked, set_prev_confirm_button_clicked] = useState(confirm_button_clicked);
    const { toast } = useToast();

    const handleClick = async () => {
        try {
            let chat = await getMainChat();
            if(action_type === 'add'){
                createPost({userId:user_store?.user?.id || '', chatId:chat.id, content:inputRef.current?.value || ""});
            } else {
                modifyPost({userId:user_store?.user?.id || '', chatId:chat.id, content:inputRef.current?.value || "", postId:postId});
            }
        } catch (e) {
            toast({title: "Erreur", description:"Echec de création du post", variant:"destructive"}); 
        }
    }

    if(prev_confirm_button_clicked !== confirm_button_clicked){
        set_prev_confirm_button_clicked(confirm_button_clicked);
        handleClick();
    }

    return (
    <Textarea id="post_content" defaultValue={content || ""} ref={inputRef} placeholder="write something..."/> )
}
