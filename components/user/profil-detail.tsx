"use client"

import { useState } from "react"
import { format } from "date-fns"
import {
  Calendar,
  CheckCheck,
  Target,
  TrendingUp,
  MapPin,
  Mail,
  Phone,
  Globe,
  Clock,
  MessageSquareDashed
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Post as PostComponent } from "@/components/post/post";
import { User } from "@/models/users/users.types";
import { Post } from "@/models/posts/posts.types";
import { Habit } from "@/app/models/habits/habits.types"
import { HabitCompletionService } from "@/app/models/habits/habits.utils"

interface props {
    user: User;
    posts: Post[];
    habits: Habit[];
}

// Mock user data
const userData = {
  id: 1,
  username: "sarah_wellness",
  displayName: "Sarah Johnson",
  avatar: "/placeholder.svg?height=120&width=120",
  bio: "Wellness enthusiast 🧘‍♀️ | Building better habits one day at a time | Sharing my journey to inspire others ✨",
  joinDate: "2023-03-15",
  location: "San Francisco, CA",
  email: "sarah.johnson@email.com",
  phone: "+1 (555) 123-4567",
  website: "https://sarahwellness.com",
  isVerified: true,
  followers: 1247,
  following: 389,
  metrics: {
    currentStreak: 23,
    totalHabitsCompleted: 1456,
    completionRate: 87,
    totalHabits: 8,
    longestStreak: 45,
    daysActive: 287,
  },
  achievements: [
    {
      id: 1,
      name: "Early Bird",
      description: "Completed morning routine 30 days in a row",
      icon: "🌅",
      earnedDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Consistency King",
      description: "Maintained 80%+ completion rate for 3 months",
      icon: "👑",
      earnedDate: "2024-02-20",
    },
    {
      id: 3,
      name: "Wellness Warrior",
      description: "Completed 1000 wellness habits",
      icon: "⚡",
      earnedDate: "2024-03-10",
    },
  ],
}

export function build_stats_object(data: Array<Object>){
    return {
        total_habits: data.length
    }
}

export default function UserProfile({user, posts, habits}: props) {
  const [activeTab, setActiveTab] = useState("posts")

  const habits_completions = habits.reduce((habits:Habit[], habit: Habit) => {
      habits = habits.concat(habit.completions); 
    return habits;
  }, []);
    console.log(habits_completions);

  const habits_stats = new HabitCompletionService(habits, habits_completions);
  const maxStreak = habits_stats.getHighestStreak();
  const currentMaxStreak = habits_stats.getCurrentStreak();
  const habitsCompleted = habits_stats.getTotalCompletions();
  const completionRate = habits_stats.getCompletionRate();

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM d, yyyy")
  }

  return (
    <div className="mx-auto w-full">
      {/* Header Section */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="flex flex-col items-center md:items-start">
              <Avatar className="h-24 w-24 md:h-32 md:w-32">
                <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user.username} />
                <AvatarFallback className="text-2xl">
                  {userData.displayName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold">{user.username}</h1>
                <span className="text-muted-foreground">@{user.username}</span>
              </div>

              <p className="text-muted-foreground mb-4 max-w-2xl">{user.biography}</p>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Joined {formatDate(user?.created_at)}
                </div>
                <div className="flex items-center">
                  <MessageSquareDashed className="h-4 w-4 mr-1" />
                  {posts?.length ?? 0} posts
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <CheckCheck className="h-4 w-4 mr-2 text-primary" />
              Current Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentMaxStreak?.data} days</div>
            <p className="text-xs text-muted-foreground mt-1">Longest: {maxStreak?.data} days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Target className="h-4 w-4 mr-2 text-primary" />
              Total Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{habitsCompleted}</div>
            <p className="text-xs text-muted-foreground mt-1">Across {habits.length} habits</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-primary" />
              Completion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completionRate}%</div>
            <p className="text-xs text-muted-foreground mt-1">10 days active</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="posts">Posts</TabsTrigger>
        </TabsList>

        {/* Posts Tab */}
        <TabsContent value="posts" className="space-y-4">
          {posts.map((post) => (
              <PostComponent key={post.id} {...post}></PostComponent>
          ))}
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userData.achievements.map((achievement) => (
              <Card key={achievement.id}>
                <CardContent className="pt-4">
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{achievement.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        Earned {formatDate(achievement.earnedDate)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* About Tab */}
        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>User Information</CardTitle>
              <CardDescription>Personal details and contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{userData.location}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{userData.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{userData.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <a href={userData.website} className="text-sm text-primary hover:underline">
                      {userData.website}
                    </a>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Activity Stats</h4>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Days Active:</span>
                        <span>{userData.metrics.daysActive}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Habits:</span>
                        <span>{userData.metrics.totalHabits}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Longest Streak:</span>
                        <span>{userData.metrics.longestStreak} days</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Member Since:</span>
                        <span>{formatDate(userData.joinDate)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-2">Bio</h4>
                <p className="text-sm text-muted-foreground">{userData.bio}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

