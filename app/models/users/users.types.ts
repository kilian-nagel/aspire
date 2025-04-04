import {Post} from "@/models/posts/posts.types";
import {Like} from "@/models/likes/likes.types";
import {Share} from "@/models/shares/shares.types";

export interface User {
    id: string;
    username: string;
    email: string;
    created_at?: string;
    likes: Like[];
    shares: Share[]
    posts: Post[];
}

export interface PartialUser {
    id: string,
    username: string
}
