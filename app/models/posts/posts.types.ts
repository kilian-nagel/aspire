import {Like} from "@/models/likes/likes.types";
import {User} from "@/models/users/users.types";
import {Share} from "@/models/shares/shares.types";

export interface Post {
    id: number;
    userId: string;
    chatId: number;
    content: string;
    created_at: string;
    numberOfLikes: number;
    numberOfShares: number;
    user: User;
    comments: Comment[];
    likes: Like[];
    shares: Share[];
    postId: number;
}

export interface PostPartial {
    id: number,
    userId: string,
    postId: number,
    content: string,
    chatId: number
}
