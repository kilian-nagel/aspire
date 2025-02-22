"use client"

import {Button} from "@/components/ui/button"
import TestimonialSections from "@/components/testimonials-section";

export default function HeroSection() {
    return (
        <section className="py-8 mx-auto">
            <div className="grid md:grid-cols-2 justify-between items-center">
                <div className="flex flex-col space-y-6">
                    <div>
                        <h1 className="text-center lg:text-left text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                            Track habits. <br />
                            <span className="text-primary">Achieve goals.</span>
                        </h1>
                        <p className="text-center lg:text-left text-xl text-muted-foreground max-w-md">
                            The all-in-one platform to build better habits, achieve your goals, and connect with like-minded people.
                        </p>
                    </div>

                    <div className="flex flex-col justify-center lg:justify-start sm:flex-row gap-4">
                        <Button size="lg" className="px-8">
                            Get Started
                        </Button>
                        <Button size="lg" variant="outline" className="px-8">
                            Watch Demo
                        </Button>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-8 h-8 rounded-full bg-muted border-2 border-background" />
                            ))}
                        </div>
                        <p>Join 10,000+ users already tracking their habits</p>
                    </div>
                </div>

                <div className="h-[400px] md:h-[500px] hidden lg:block">
                    <TestimonialSections />
                </div>
            </div>
        </section>
    )
}
