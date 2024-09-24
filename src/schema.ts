import { integer, pgEnum, pgTable, serial, text, timestamp, uuid } from 'drizzle-orm/pg-core';


export const usersTable = pgTable("users_table", {
    id: uuid('id').primaryKey().unique().defaultRandom().notNull(),
    email: text('email').unique().notNull(),
    password: text('password').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdate( () => new Date() ),
});

//task status enum
export const taskStatus = pgEnum('task_status', ['due', 'done', 'overdue']);

export const taskTable = pgTable("task_table", {
    id: serial('id').primaryKey().unique().notNull(),
    userId: uuid('task_user_id').references(() => usersTable.id).notNull(),
    name: text('name').notNull(),
    description: text('description'),
    status: taskStatus('status').default('due').notNull(),
    timeTodo: timestamp('time_todo'),
    deadline: timestamp('deadline'),
    routineId: integer('routine_id').references(() => routineTable.id),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdate( () => new Date() ),
});

export const noteTable = pgTable("note_table", {
    id: serial('id').primaryKey().unique().notNull(),
    userId: uuid('note_user_id').references(() => usersTable.id).notNull(),
    title: text('title').notNull(),
    content: text('content'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdate( () => new Date() ),
});

export const routineTable = pgTable("routine_table", {
    id: serial('id').primaryKey().unique().notNull(),
    userId: uuid('routine_user_id').references(() => usersTable.id).notNull(),
    title: text('title').notNull(),
    description: text('description'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdate( () => new Date() ),
}); 