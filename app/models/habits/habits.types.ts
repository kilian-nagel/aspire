export interface HabitType {
    id: number,
    name: string,
    description: string
}

export interface HabitFrequency {
    id: number,
    day: number,
    period: number,
    expires_at: string
}

export interface Habit {
    id: number,
    category: number,
    name: string,
    description: string,
    user_id: string,
    created_at: string
}
