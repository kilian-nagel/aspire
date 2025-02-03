import {createPost, modifyPost} from "@/models/posts/posts.service";
import {addComment} from "@/models/comments/comments.service";

export enum PostEvent {
    create,
    createComment,
    update,
    like,
    delete,
    share
}

export const dispatchPostEvent = async (event: PostEvent, data: Object) => {
    console.log(event);
    console.log(data);
    switch (event) {
        case PostEvent.create:
            const res1 = await createPost(data);
            return res1;
        case PostEvent.createComment:
            const res2 = await addComment({...data, postId: data.id});
            return res2;
        case PostEvent.update:
            const post_data = {...data, postId: data.id};
            console.log(post_data);
            const res3 = await modifyPost({...data, postId: data.id});
            return res3;
    }
};

