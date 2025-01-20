import { Post } from "@/models/posts/posts.types";

export interface User {
    id: string;
    username: string;
    email: string;
    created_at?: string;
    likes: Post[];
    shares: Post[]
    posts: Post[];
}
