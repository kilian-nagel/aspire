"use client";
import React, {useState, useEffect} from "react";
import { Heart } from "lucide-react";
import { Post as PostModel } from "@/models/posts/posts.types";
import { userStore } from "@/store/userStore";
import { likePost } from "@/models/likes/likes.service"
import { useToast } from "@/hooks/use-toast"

export function LikeButton(post:PostModel) {
    const user_store = userStore();
    const user = user_store.user;
    const [fill_color, set_fill_color] = useState("");
    const [color, set_color] = useState("white");
    const [nb_likes, set_nb_likes] = useState(post.likes.length);
    const { toast } = useToast()

    if(!user) return;

    const [post_belong_to_user, set_post_belong_to_user] = useState(user.likes.find(
        (post_user) => post_user.postId === post.id
    ) ? true : false);

    const like = () => {
          set_color("red");
          set_fill_color("red");
          set_post_belong_to_user(true);
          set_nb_likes(nb_likes => nb_likes+1);
    }

    const dislike = () => {
          set_color("white");
          set_fill_color("");
          set_post_belong_to_user(false);
          set_nb_likes(nb_likes => nb_likes-1);
    }

    useEffect(() => {
        if (!user) return;

        if (post_belong_to_user) {
          set_color("red");
          set_fill_color("red");
        }
    }, [user, post.id]);

    const like_action = async () => {
        const initial_state = post_belong_to_user;
        if(post_belong_to_user){
            dislike();
        } else {
            like();
        }

        try {
            await likePost(user.id, post.id); 
        } catch(error){
            toast({title:"Erreur", description:"Le post n'a pas pu être liké", variant:"destructive"})
            set_post_belong_to_user(initial_state)
            if(post_belong_to_user){
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
