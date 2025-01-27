import { Post } from "@/components/post";
import { getPost } from "@/models/posts/posts.service";
import { userStore } from "@/store/userStore";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug;
  const post = await getPost(slug);
  return (
      <div>
        {JSON.stringify(post)}
        <Post key={post.id} {...post}/>
      </div>
  )
}
