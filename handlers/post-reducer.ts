import {createPost, modifyPost} from "@/models/posts/posts.service";
import {addComment} from "@/models/comments/comments.service";
import {PostPartial, PostCreate} from "@/models/posts/posts.types";

export enum PostEvent {
    create,
    createComment,
    update,
}

export type PostEventData =
    {event: PostEvent.create; data: PostCreate} |
    {event: PostEvent.createComment; data: PostPartial} |
    {event: PostEvent.update; data: PostPartial}

export const dispatchPostEvent = async ({event, data}: PostEventData) => {
    switch (event) {
        case PostEvent.create:
            const res1 = await createPost(data);
            return res1;
        case PostEvent.createComment:
            const res2 = await addComment({...data, postId: data.id});
            return res2;
        case PostEvent.update:
            const res3 = await modifyPost({...data, postId: data.id});
            return res3;
    }
};

