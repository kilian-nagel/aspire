"use client"
import Image from "next/image";
import {useEffect, useState} from "react"

interface ProfileBubble {
    id: number
    position: {x: number; y: number}
    image: string
    message?: string
    isLeft?: boolean
}

export default function TestimonialSection() {
    const [profiles, setProfiles] = useState<ProfileBubble[]>([
        {
            id: 1,
            position: {x: 45, y: 20},
            image: "/character1.jpg",
            message: "50 days fitness streak :)",
            isLeft: false,
        },
        {
            id: 2,
            position: {x: 120, y: 40},
            image: "/character2.jpg",
            message: "Awesome. Wanna join me ? I run everyday.",
            isLeft: true,
        },
        {
            id: 3,
            position: {x: 45, y: 60},
            image: "/character1.jpg",
            message: "Of course. let's do it!",
            isLeft: false,
        },
    ])

    // Adjust positions for mobile
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setProfiles((prev) =>
                    prev.map((profile) => ({
                        ...profile,
                        position: {
                            x: Math.min(Math.max(profile.position.x, 15), 85),
                            y: profile.position.y,
                        },
                    })),
                )
            }
        }

        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <section className="relative w-full min-h-[500px] py-20 px-4">
            {/* Profile bubbles */}
            {profiles.map((profile) => (
                <div
                    key={profile.id}
                    className="absolute"
                    style={{
                        left: `${profile.position.x}%`,
                        top: `${profile.position.y}%`,
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    <div className="relative mt-20">
                        {profile.message && (
                            <div
                                className={`absolute ${profile.isLeft ? "right-full mr-2" : "left-full ml-2"
                                    } top-1/2 -translate-y-1/2 bg-blue-100 text-blue-600 px-4 py-2 rounded-2xl text-sm whitespace-nowrap`}
                            >
                                {profile.message}
                            </div>
                        )}
                        <div className="rounded-full overflow-hidden h-16 w-16 md:h-20 md:w-20">
                            <Image alt="1" width={80} height={80} src={profile.image} />
                        </div>
                    </div>
                </div>
            ))}
        </section>
    )
}


