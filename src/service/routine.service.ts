import { and, eq } from "drizzle-orm";
import { db } from "../db";
import {
  CreateRoutineType,
  GetRoutineType,
  UpdateRoutineType,
} from "../model/routine.model";
import { routineTable, taskTable } from "../schema";

/* create */
export async function createRoutineService(
  data: CreateRoutineType,
  userId: string
) {
  try {
    if (!data) {
      throw new Error("Data cannot be empty");
    }
 
    if ((data.tasks ?? []).length <= 0) {
      throw new Error("Task cannot be empty");
    }

    //transaction insert routine and tasks
    const res = await db.transaction(async (trx) => {
      //create routine
      const routine: GetRoutineType[] = await trx
        .insert(routineTable)
        .values({
          userId: userId,
          title: data.title,
          description: data.description,
        })
        .returning({
          id: routineTable.id,
          userId: routineTable.userId,
          title: routineTable.title,
          description: routineTable.description,
        });

      //create tasks
      const tasks = await trx
        .insert(taskTable)
        .values(
          (data.tasks ?? []).map((task) => ({
            userId: userId,
            routineId: routine[0].id,
            name: task.name, // Assuming 'name' is the correct field
            description: task.description ?? null, // Ensure description is nullable
          }))
        )
        .returning({
          id: taskTable.id,
          userId: taskTable.userId,
          routineId: taskTable.routineId,
          title: taskTable.name,
          description: taskTable.description,
        });

      return { routine: routine[0], tasks };
    }
  );
  
    return res;
  } catch (error: unknown) {
    throw new Error((error as Error).message);
  }
}

/* get */
export async function getRoutineService(data: { userId: string; id: string }) {
  try {
    //get routine
    const routine = await db
      .select()
      .from(routineTable)
      .where(
        and(eq(routineTable.userId, data.userId), eq(routineTable.id, data.id))
      )
      .innerJoin(
        taskTable,
        and(
          eq(routineTable.id, taskTable.routineId),
          eq(taskTable.userId, data.userId)
        )
      );

    //if there is no routine
    if (routine.length <= 0) {
      throw new Error("Routine not found");
    }

    //format result
    const result = routine.reduce((acc: GetRoutineType | null, row) => {
      const routine = row.routine_table;
      const task = row.task_table;

      if (!acc) {
        acc = {
          ...routine,
          tasks: [],
        };
      }

      if (task) {
        acc.tasks?.push(task);
      }

      return acc;
    }, null as GetRoutineType | null);

    return result;
  } catch (error: unknown) {
    throw new Error((error as Error).message);
  }
}

export async function getAllRoutineService(userId: string) {
  try {
    //get all routines
    const routines = await db
      .select()
      .from(routineTable)
      .where(eq(routineTable.userId, userId))
      .innerJoin(
        taskTable,
        and(
          eq(taskTable.routineId, routineTable.id),
          eq(taskTable.userId, userId)
        )
      );

    //format result
    const result = routines.reduce<GetRoutineType[]>((acc, row) => {
      const routine = row.routine_table;
      const task = row.task_table;

      const existingRoutine = acc.find((r) => r.id === routine.id);

      if (!existingRoutine) {
        acc.push({
          ...routine,
          tasks: task ? [task] : [],
        });
      } else {
        if (task) {
          existingRoutine.tasks?.push(task);
        }
      }

      return acc;
    }, []);

    return result;
  } catch (error: unknown) {
    throw new Error((error as Error).message);
  }
}

/* update */
export async function updateRoutineService(
  data: UpdateRoutineType,
  userId: string,
  routineId: string
) {
  try {
    //update routine
    const routine: GetRoutineType[] = await db
      .update(routineTable)
      .set({
        title: data.title,
        description: data.description,
      })
      .where(
        and(eq(routineTable.userId, userId), eq(routineTable.id, routineId))
      )
      .returning({
        id: routineTable.id,
        userId: routineTable.userId,
        title: routineTable.title,
        description: routineTable.description,
      });

    //if there is no routine
    if (routine.length <= 0) {
      throw new Error("Routine not found");
    }

    return routine[0];
  } catch (error: unknown) {
    throw new Error((error as Error).message);
  }
}

/* delete */
export async function deleteRoutineService(data: {
  userId: string;
  id: string;
}) {
  try {
    //delete routine
    const routine: GetRoutineType[] = await db
      .delete(routineTable)
      .where(
        and(eq(routineTable.userId, data.userId), eq(routineTable.id, data.id))
      )
      .returning({
        id: routineTable.id,
        userId: routineTable.userId,
        title: routineTable.title,
        description: routineTable.description,
      });

    //if there is no routine
    if (routine.length <= 0) {
      throw new Error("Routine not found");
    }

    return routine[0];
  } catch (error: unknown) {
    throw new Error((error as Error).message);
  }
}
