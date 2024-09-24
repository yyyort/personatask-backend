import { integer, pgEnum, pgTable, serial, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const usersTable = pgTable("users_table", {
    id: uuid('id').primaryKey().unique().defaultRandom().notNull(),
    email: text('email').unique().notNull(),
    password: text('password').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdate( () => new Date() ),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

//task status enum
export const taskStatus = pgEnum('task_status', ['due', 'done', 'overdue']);

export const taskTable = pgTable("task_table", {
    id: serial('id').primaryKey().unique().notNull(),
    userId: uuid('user_id').references(() => usersTable.id).notNull(),
    name: text('name').notNull(),
    description: text('description'),
    status: taskStatus('status').default('due').notNull(),
    timeTodo: timestamp('time_todo'),
    deadline: timestamp('deadline'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdate( () => new Date() ),
});

export type InsertTask = typeof taskTable.$inferInsert;
export type SelectTask = typeof taskTable.$inferSelect;

export const noteTable = pgTable("note_table", {
    id: serial('id').primaryKey().unique().notNull(),
    userId: uuid('user_id').references(() => usersTable.id).notNull(),
    title: text('title').notNull(),
    content: text('content'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdate( () => new Date() ),
});

export type InsertNote = typeof noteTable.$inferInsert;
export type SelectNote = typeof noteTable.$inferSelect;