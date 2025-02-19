import {addHabit, deleteHabit, completeHabit, uncompleteHabit} from "@/models/habits/habits.service";
import {Tables} from "@/models/database.types";

export enum HabitEvent {
    create,
    delete,
    complete,
    uncomplete
}


interface PartialHabit {
    id: number;
}

type Habit = Tables<"habits">;

type HabitEventData =
    | {event: HabitEvent.create; data: Habit} // Requires full habit
    | {event: HabitEvent.delete; data: PartialHabit}
    | {event: HabitEvent.complete; data: PartialHabit}
    | {event: HabitEvent.uncomplete; data: PartialHabit};

export const dispatchHabitEvent = async ({event, data}: HabitEventData) => {
    switch (event) {
        case HabitEvent.create:
            return await addHabit(data); // Now TypeScript enforces full Habit object
        case HabitEvent.delete:
            return await deleteHabit(data.id);
        case HabitEvent.complete:
            return await completeHabit(data.id);
        case HabitEvent.uncomplete:
            return await uncompleteHabit(data.id);
    }
};

