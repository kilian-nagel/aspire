export type Json =
    | string
    | number
    | boolean
    | null
    | {[key: string]: Json | undefined}
    | Json[]

export type Database = {
    public: {
        Tables: {
            chats: {
                Row: {
                    created_at: string
                    id: number
                    isGlobal: boolean
                    name: string
                }
                Insert: {
                    created_at?: string
                    id?: number
                    isGlobal: boolean
                    name: string
                }
                Update: {
                    created_at?: string
                    id?: number
                    isGlobal?: boolean
                    name?: string
                }
                Relationships: []
            }
            comments: {
                Row: {
                    comment_id: number | null
                    content: string
                    created_at: string
                    id: number
                    postId: number
                    userId: string
                }
                Insert: {
                    comment_id?: number | null
                    content: string
                    created_at?: string
                    id?: number
                    postId: number
                    userId: string
                }
                Update: {
                    comment_id?: number | null
                    content?: string
                    created_at?: string
                    id?: number
                    postId?: number
                    userId?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "comments_comment_id_fkey"
                        columns: ["comment_id"]
                        isOneToOne: false
                        referencedRelation: "comments"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "comments_postId_fkey"
                        columns: ["postId"]
                        isOneToOne: false
                        referencedRelation: "posts"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "comments_userId_fkey"
                        columns: ["userId"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                ]
            }
            habitCategory: {
                Row: {
                    description: string
                    id: number
                    name: string
                }
                Insert: {
                    description: string
                    id?: number
                    name: string
                }
                Update: {
                    description?: string
                    id?: number
                    name?: string
                }
                Relationships: []
            }
            habitCompletion: {
                Row: {
                    created_at: string
                    habit_id: number
                    id: number
                    performance: Database["public"]["Enums"]["habit_performance"] | null
                }
                Insert: {
                    created_at?: string
                    habit_id: number
                    id?: number
                    performance?: Database["public"]["Enums"]["habit_performance"] | null
                }
                Update: {
                    created_at?: string
                    habit_id?: number
                    id?: number
                    performance?: Database["public"]["Enums"]["habit_performance"] | null
                }
                Relationships: [
                    {
                        foreignKeyName: "habitCompletion_habit_id_fkey"
                        columns: ["habit_id"]
                        isOneToOne: false
                        referencedRelation: "habits"
                        referencedColumns: ["id"]
                    },
                ]
            }
            habitFrequency: {
                Row: {
                    created_at: string
                    day: number
                    id: number
                    period: number
                }
                Insert: {
                    created_at?: string
                    day: number
                    id?: number
                    period?: number
                }
                Update: {
                    created_at?: string
                    day?: number
                    id?: number
                    period?: number
                }
                Relationships: [
                    {
                        foreignKeyName: "HabitFrequency_id_fkey"
                        columns: ["id"]
                        isOneToOne: false
                        referencedRelation: "habits"
                        referencedColumns: ["id"]
                    },
                ]
            }
            habits: {
                Row: {
                    category: number
                    created_at: string
                    description: string | null
                    id: number
                    name: string
                    user_id: string | null
                }
                Insert: {
                    category: number
                    created_at?: string
                    description?: string | null
                    id?: number
                    name: string
                    user_id?: string | null
                }
                Update: {
                    category?: number
                    created_at?: string
                    description?: string | null
                    id?: number
                    name?: string
                    user_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "Habits_category_fkey"
                        columns: ["category"]
                        isOneToOne: false
                        referencedRelation: "habitCategory"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "habits_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                ]
            }
            likes: {
                Row: {
                    created_at: string
                    id: number
                    postId: number
                    userId: string
                }
                Insert: {
                    created_at?: string
                    id?: number
                    postId: number
                    userId?: string
                }
                Update: {
                    created_at?: string
                    id?: number
                    postId?: number
                    userId?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "likes_postId_fkey"
                        columns: ["postId"]
                        isOneToOne: false
                        referencedRelation: "posts"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "likes_userId_fkey"
                        columns: ["userId"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                ]
            }
            posts: {
                Row: {
                    chatId: number
                    content: string
                    created_at: string | null
                    id: number
                    postId: number | null
                    userId: string
                }
                Insert: {
                    chatId: number
                    content: string
                    created_at?: string | null
                    id?: number
                    postId?: number | null
                    userId: string
                }
                Update: {
                    chatId?: number
                    content?: string
                    created_at?: string | null
                    id?: number
                    postId?: number | null
                    userId?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "posts_chatId_fkey"
                        columns: ["chatId"]
                        isOneToOne: false
                        referencedRelation: "chats"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "posts_postId_fkey"
                        columns: ["postId"]
                        isOneToOne: false
                        referencedRelation: "posts"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "posts_userId_fkey"
                        columns: ["userId"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                ]
            }
            shares: {
                Row: {
                    created_at: string
                    id: number
                    postId: number
                    userId: string
                }
                Insert: {
                    created_at?: string
                    id?: number
                    postId: number
                    userId: string
                }
                Update: {
                    created_at?: string
                    id?: number
                    postId?: number
                    userId?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "shares_postId_fkey"
                        columns: ["postId"]
                        isOneToOne: false
                        referencedRelation: "posts"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "shares_userId_fkey"
                        columns: ["userId"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                ]
            }
            users: {
                Row: {
                    created_at: string
                    email: string
                    id: string
                    username: string
                }
                Insert: {
                    created_at?: string
                    email: string
                    id: string
                    username: string
                }
                Update: {
                    created_at?: string
                    email?: string
                    id?: string
                    username?: string
                }
                Relationships: []
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            habit_performance: "low" | "medium" | "high" | "very high"
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
    PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | {schema: keyof Database},
    TableName extends PublicTableNameOrOptions extends {schema: keyof Database}
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends {schema: keyof Database}
    ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
            Row: infer R
        }
    ? R
    : never
    : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
            Row: infer R
        }
    ? R
    : never
    : never

export type TablesInsert<
    PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | {schema: keyof Database},
    TableName extends PublicTableNameOrOptions extends {schema: keyof Database}
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends {schema: keyof Database}
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
        Insert: infer I
    }
    ? I
    : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
    }
    ? I
    : never
    : never

export type TablesUpdate<
    PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | {schema: keyof Database},
    TableName extends PublicTableNameOrOptions extends {schema: keyof Database}
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends {schema: keyof Database}
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
        Update: infer U
    }
    ? U
    : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
    }
    ? U
    : never
    : never

export type Enums<
    PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | {schema: keyof Database},
    EnumName extends PublicEnumNameOrOptions extends {schema: keyof Database}
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends {schema: keyof Database}
    ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | {schema: keyof Database},
    CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
        schema: keyof Database
    }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {schema: keyof Database}
    ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
