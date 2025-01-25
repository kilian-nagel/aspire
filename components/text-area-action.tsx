import { Textarea } from "@/components/ui/textarea"
import { useRef, useState } from "react";
import { createPost, modifyPost } from "@/models/posts/posts.service";
import { getMainChat } from "@/models/chats/chats.service";
import { userStore } from "@/store/userStore";
import { useToast } from "@/hooks/use-toast";
import { postStore } from "@/store/postStore";

interface props {
    content?:string | undefined
    action_type?:string
    confirm_button_clicked: number
    id?:number | undefined
}

export function TextAreaAction({content, action_type, confirm_button_clicked, id}: props){
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const user_store = userStore();
    const post_store = postStore();
    const [prev_confirm_button_clicked, set_prev_confirm_button_clicked] = useState(confirm_button_clicked);
    const { toast } = useToast();

    const handleClick = async () => {
        try {
            // On récupère les infos du chat courant.
            let chat = await getMainChat();

            if(!user_store?.user?.id || !inputRef.current?.value) throw new Error("User id empty or inputRef empty");

            if(action_type !== 'edit'){
                // On crée le post avec le contenu du text area.
                await createPost({userId:user_store.user.id, chatId:chat.id, content:inputRef.current.value});
                toast({title: "Succès", description:"Post crée avec succès"});

            } else {
                // On modifie le post avec le contenu du text area.
                await modifyPost({userId:user_store?.user?.id ?? '', content:inputRef.current?.value ?? "", postId:id??-1});
                toast({title: "Succès", description:"Post modifiée avec succès"}); 
            }

        } catch (e) {
            console.log(e);
            toast({title: "Erreur", description:`Echec de ${action_type !== "edit" ? "création":"modification"} du post`, variant:"destructive"}); 
        }
    }

    // Lorsque que l'user a cliqué sur le bouton submit (qui est à l'extérieur de ce composant) alors on envoie la requête au serveur.
    if(prev_confirm_button_clicked !== confirm_button_clicked){
        set_prev_confirm_button_clicked(confirm_button_clicked);
        handleClick();
    }

    return (
    <Textarea id="post_content" defaultValue={content ?? ""} ref={inputRef} placeholder="write something..."/> )
}
