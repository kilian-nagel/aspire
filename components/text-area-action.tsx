import {Textarea} from "@/components/ui/textarea";
import {useState} from "react";
import {getMainChat} from "@/models/chats/chats.service";
import {userStore} from "@/store/userStore";
import {postStore} from "@/store/postStore";
import {postDetailStore} from "@/store/postDetailStore";
import {commentsStore} from "@/store/commentsStore";
import {useToast} from "@/hooks/use-toast";
import {dispatchPostEvent, PostEvent, PostEventData} from "@/handlers/post-reducer";

interface Props {
    content?: string;
    action_type: PostEvent;
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

            // On setup un id factice qui ne sera pas utiisé si on est en mode création.
            if (!id) id = -1;
            if (!user_store?.user?.id || !text.trim() || !id) throw new Error("User ID empty or input empty");

            let payload: PostEventData;

            // Si on est on en mode création on fait un payload sans les ids. 
            if (action_type === PostEvent.create) {
                payload = {
                    data: {userId: user_store.user.id, chatId: chat.id, content: text},
                    event: action_type
                };
            } else {
                payload = {
                    data: {userId: user_store.user.id, chatId: chat.id, content: text, postId: id, id: id},
                    event: action_type as PostEvent.createComment | PostEvent.update
                };
            }

            // On dispatch un évènement, d'ajout, modif etc.. pour exécuter l'action nécessaire
            await dispatchPostEvent(payload);
            postStore.getState().reloadData();
            postDetailStore.getState().reloadData();
            commentsStore.getState().reloadData();

            let description = "";
            if (action_type === PostEvent.create) {
                description = "Post créé avec succès";
            } else if (action_type === PostEvent.createComment) {
                description = "Commentaire créé avec succès";
            } else if (action_type === PostEvent.update) {
                description = "Post modifié avec succès";
            }
            toast({title: "Succès", description});

        } catch (e) {
            toast({
                title: "Erreur",
                description: `Échec de l'opération`,
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

