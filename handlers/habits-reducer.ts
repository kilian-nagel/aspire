import {addHabit, deleteHabit, completeHabit, uncompleteHabit} from "@/models/habits/habits.service";
import {Tables} from "@/models/database.types";

export enum HabitEvent {
    create,
    update,
    delete,
    complete,
    uncomplete
}

let habit: Tables<'habits'>;
export const dispatchHabitEvent = async<T extends typeof habit>(event: HabitEvent, data: T) => {
    switch (event) {
        case HabitEvent.create:
            const res1 = await addHabit(data);
            return res1;
        case HabitEvent.delete:
            const res2 = await deleteHabit(data.id);
            return res2;
        case HabitEvent.complete:
            const res3 = await completeHabit(data.id);
            return res3;
        case HabitEvent.uncomplete:
            const res4 = await uncompleteHabit(data.id);
            return res4;
    }
};

