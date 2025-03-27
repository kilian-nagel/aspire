import {useState} from "react";
import {getMainChat} from "@/models/chats/chats.service";
import {userStore} from "@/store/userStore";
import {postStore} from "@/store/postStore";
import {postDetailStore} from "@/store/postDetailStore";
import {commentsStore} from "@/store/commentsStore";
import {useToast} from "@/hooks/use-toast";
import {Button} from "@/components/ui/button"
import {dispatchPostEvent, PostEvent, PostEventData} from "@/handlers/post-reducer";
import {EditorContent, useEditor} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {cn} from "@/lib/utils";
import {check_if_content_is_unacceptable} from "@/utils/validation";

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

    const extensions = [
        StarterKit.configure({
            bulletList: {
                keepMarks: true,
                keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
            },
            orderedList: {
                keepMarks: true,
                keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
            },
        })
    ]

    const editor = useEditor({
        extensions: extensions,
        content,
        onUpdate({editor}) {
            setText(editor.getHTML()); // stores HTML into your state
        },
    });

    if (!editor) return null;

    const handleClick = async () => {
        try {
            const chat = await getMainChat();

            // On setup un id factice qui ne sera pas utiisé si on est en mode création.
            if (!id) id = -1;
            if (!user_store?.user?.id || !text.trim() || !id) throw new Error("User ID empty or input empty");

            if (check_if_content_is_unacceptable(text)) {
                toast({title: "Error", description: "The post contains inappropriate content"});
                return;
            }

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
            console.log(e);
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

        <div className="space-y-2">
            {/* Toolbar */}
            <div className="space-x-2">
                <Button variant="outline" size="sm" onClick={() => editor.chain().focus().toggleBold().run()} className={cn({"bg-muted": editor.isActive('bold')})}>
                    Bold
                </Button>
                <Button variant="outline" size="sm" onClick={() => editor.chain().focus().toggleItalic().run()} className={cn({"bg-muted": editor.isActive('italic')})}>
                    Italic
                </Button>
            </div>

            {/* Editor Area */}
            <div className="border rounded max-h-[150px] min-h-[150px] p-2">
                <EditorContent className="h-full overflow-auto max-h-[140px]" editor={editor} />
            </div>
        </div>
    );
}

