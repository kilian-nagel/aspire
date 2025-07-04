"use client"
import {useState} from "react";
import {getLast7Days, get_habits_for_selected_day} from "@/models/habits/habits.utils";
import Last7Days from "@/components/habits/last7days_habits";
import HabitList from "@/components/habits/habits-list-completion";
import HabitStats from "@/components/habits/habits-stats";
import {HabitInfo} from "@/models/habits/habits.types";

export default function HabitDashboard({habits_infos}: {habits_infos: HabitInfo[]}) {
    const [selectedDay, setSelectedDay] = useState(6);
    const [selectedHabit, setSelectedHabit] = useState(habits_infos[0]);
    const last7Days = getLast7Days();
    const habits = get_habits_for_selected_day(habits_infos, last7Days[selectedDay].index, last7Days[selectedDay].date);

    return (
        <div>
            <Last7Days last7Days={last7Days} selectedDay={selectedDay} setSelectedDay={setSelectedDay} habits={habits_infos} />
            <div className="py-3"></div>
            <HabitList habits={habits} selectedDay={selectedDay} selectedHabit={selectedHabit} setSelectedHabit={setSelectedHabit} />
            <div className="py-3"></div>
            <HabitStats selectedHabit={selectedHabit} />
        </div>
    );
}

