import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ActionCard } from "@/components/action-card"

export default async function ProtectedPage() {
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
        Welcome back, guest
        </h2>

        <p className="leading-7 pb-2 mt-2">
          What is on your mind ?
        </p>

        <div className="grid gap-6 mt-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ActionCard
            title="Manage habits and goals"
            content="Set, track, and achieve your aspirations effortlessly."
            linkText="Take control now →"
            linkHref="/manage-habits"
          />
          <ActionCard
            title="Check your stats"
            content="Gain insights into your progress and milestones."
            linkText="See your journey →"
            linkHref="/stats"
          />
            <ActionCard
                title="Chat with the community"
                content="Connect, learn, and grow with like-minded individuals."
                linkText="Join the conversation →"
                linkHref="/community"
          />
        </div>
      </div>
    </div>
  );
}
