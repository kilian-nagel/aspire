"use client";
import React, {useState, useEffect} from "react";
import {Heart} from "lucide-react";
import {Post as PostModel} from "@/models/posts/posts.types";
import {userStore} from "@/store/userStore";
import {likePost} from "@/models/likes/likes.service"
import {useToast} from "@/hooks/use-toast"

export function LikeButton(post: PostModel) {
    const user_store = userStore();
    const user = user_store.user;
    const [fill_color, set_fill_color] = useState("");
    const [color, set_color] = useState("white");
    const [nb_likes, set_nb_likes] = useState(post.likes.length);
    const {toast} = useToast()

    if (!user) return;

    // On vérifie si l'utilisateur a liké le post 
    const [is_post_liked, set_is_post_liked] = useState(user.likes.find(
        (post_user) => post_user.postId === post.id
    ) ? true : false);

    // Lorsque l'utilisateur like on change la couleur du coeur en rouge et on augmente le nombre de likes.
    const like = () => {
        set_color("red");
        set_fill_color("red");
        set_is_post_liked(true);
        set_nb_likes(nb_likes => nb_likes + 1);
    }

    const dislike = () => {
        set_color("white");
        set_fill_color("");
        set_is_post_liked(false);
        set_nb_likes(nb_likes => nb_likes - 1);
    }

    useEffect(() => {
        if (!user) return;

        // On change la couleur du coeur si le post est liké par l'user.
        if (is_post_liked) {
            set_color("red");
            set_fill_color("red");
        }
    }, [user, post.id]);

    const like_action = async () => {
        const initial_state = is_post_liked;

        // Lorsque l'user clique sur le coeur on fait l'opération inverse par rapport à l'état du post.
        if (is_post_liked) {
            dislike();
        } else {
            like();
        }

        try {
            await likePost(user.id, post.id);
        } catch (error) {
            // En cas d'erreur on prévient l'user et on revient à l'état initial
            toast({
                title: "Erreur", 
                description: "Le post n'a pas pu être liké", 
                variant: "destructive"
            });

            set_is_post_liked(initial_state)

            if (is_post_liked) {
                dislike();
            } else {
                like();
            }
        }
    }

    return (
        <span className="flex gap-1 items-center" onClick={like_action}>
            <Heart className="h-4 w-4" color={color} fill={fill_color} />
            {nb_likes}
        </span>
    );
}
