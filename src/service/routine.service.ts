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
    //create routine
    const routine: GetRoutineType[] = await db
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

    return routine[0];
  } catch (error: unknown) {
    throw new Error((error as Error).message);
  }
}

/* get */
export async function getRoutineService(data: { userId: string; id: number }) {
  try {
    //get routine
    const routine: GetRoutineType[] = await db
      .select({
        id: routineTable.id,
        userId: routineTable.userId,
        title: routineTable.title,
        description: routineTable.description,
      })
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

    return routine;
  } catch (error: unknown) {
    throw new Error((error as Error).message);
  }
}

export async function getAllRoutineService(userId: string) {
  try {
    //get all routines
    const routines: GetRoutineType[] = await db
      .select({
        id: routineTable.id,
        userId: routineTable.userId,
        title: routineTable.title,
        description: routineTable.description,
      })
      .from(routineTable)
      .where(eq(routineTable.userId, userId))
      .innerJoin(
        taskTable,
        and(
          eq(routineTable.id, taskTable.routineId),
          eq(taskTable.userId, userId)
        )
      );

    return routines;
  } catch (error: unknown) {
    throw new Error((error as Error).message);
  }
}

/* update */
export async function updateRoutineService(
  data: UpdateRoutineType,
  userId: string,
  routineId: number
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
  id: number;
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

    //delete all tasks associated with the routine
    await db
      .delete(taskTable)
      .where(
        and(eq(taskTable.userId, data.userId), eq(taskTable.routineId, data.id))
      );

    //if there is no routine
    if (routine.length <= 0) {
      throw new Error("Routine not found");
    }

    return routine[0];
  } catch (error: unknown) {
    throw new Error((error as Error).message);
  }
}
