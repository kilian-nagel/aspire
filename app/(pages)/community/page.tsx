import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ActionCard } from "@/components/action-card"

export default async function Page() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex-1 flex flex-col gap-12">
      <div className="w-[100%]">
        <h2 className="mt-5 text-left scroll-m-20 text-4xl font-semibold">
        Recent chats
        </h2>

        <p className="leading-7 pb-2 mt-2">
          Get to know the community.
        </p>
      </div>
    </div>
  );
}
