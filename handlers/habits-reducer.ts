import {addHabit, deleteHabit} from "@/models/habits/habits.service";
import {Tables} from "@/models/database.types";

export enum HabitEvent {
    create,
    update,
    delete
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
    }
};

