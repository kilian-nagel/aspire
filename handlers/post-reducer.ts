import {createPost, modifyPost} from "@/models/posts/posts.service";
import {addComment} from "@/models/comments/comments.service";
import {PostPartial} from "@/models/posts/posts.types";

export enum PostEvent {
    create,
    createComment,
    update,
    like,
    delete,
    share
}

export const dispatchPostEvent = async<T extends PostPartial>(event: PostEvent, data: T) => {
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

