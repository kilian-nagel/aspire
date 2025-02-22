import {CheckCircle, Target, Users} from "lucide-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


export default function FeatureSection() {
    return (
        <section id="features" className="py-16 px-4 md:py-24">
            <div className="mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight mb-4">Features designed for your success</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Our platform provides everything you need to build better habits, achieve your goals, and connect with
                        others.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={<CheckCircle className="h-12 w-12 text-primary" />}
                        title="Habit Tracking"
                        description="Track your daily habits with ease. Set up custom routines, get reminders, and visualize your progress over time."
                    />

                    <FeatureCard
                        icon={<Target className="h-12 w-12 text-primary" />}
                        title="Goal Setting"
                        description="Set meaningful goals with deadlines. Break them down into actionable steps and celebrate your achievements."
                    />

                    <FeatureCard
                        icon={<Users className="h-12 w-12 text-primary" />}
                        title="Social Community"
                        description="Connect with like-minded individuals. Share your journey, join challenges, and stay motivated together."
                    />
                </div>
            </div>
        </section>
    )
}

function FeatureCard({icon, title, description}) {
    return (
        <Card>
            <CardHeader className="flex flex-col items-center justify-center">
                <div>{icon}</div>
                <CardTitle className="pt-2">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-center text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    )
}


