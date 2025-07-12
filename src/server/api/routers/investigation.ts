import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

export const investigationRouter = createTRPCRouter({
  // Öffentliche Liste
  getPublished: publicProcedure
    .input(z.object({
      limit: z.number().min(1).max(100).default(12),
      cursor: z.string().nullish(),
    }))
    .query(async ({ ctx, input }) => {
      const items = await ctx.db.investigation.findMany({
        where: { status: "PUBLISHED" },
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: { publishedAt: "desc" },
      });
      
      let nextCursor: typeof input.cursor | undefined = undefined;
      if (items.length > input.limit) {
        const nextItem = items.pop();
        nextCursor = nextItem!.id;
      }
      
      return { items, nextCursor };
    }),

  // Admin: Erstellen
  create: protectedProcedure
    .input(z.object({
      category: z.enum(["WANTED_PERSON", "MISSING_PERSON", "UNKNOWN_DEAD", "STOLEN_GOODS"]),
      title: z.string().min(1),
      location: z.string().min(1),
      date: z.date(),
      shortInfo: z.string().optional(),
      imageUrl: z.string().optional(),
      age: z.string().optional(),
      height: z.string().optional(),
      description: z.string().optional(),
      features: z.string().optional(),
      priority: z.enum(["NORMAL", "URGENT", "CRITICAL"]).default("NORMAL"),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.investigation.create({
        data: {
          ...input,
          caseNumber: `BW-${Date.now()}`,
          userId: ctx.session.user.id,
        },
      });
    }),

  // Admin: Aktualisieren
  update: protectedProcedure
    .input(z.object({
      id: z.string(),
      category: z.enum(["WANTED_PERSON", "MISSING_PERSON", "UNKNOWN_DEAD", "STOLEN_GOODS"]).optional(),
      title: z.string().min(1).optional(),
      location: z.string().min(1).optional(),
      date: z.date().optional(),
      shortInfo: z.string().optional(),
      imageUrl: z.string().optional(),
      age: z.string().optional(),
      height: z.string().optional(),
      description: z.string().optional(),
      features: z.string().optional(),
      priority: z.enum(["NORMAL", "URGENT", "CRITICAL"]).optional(),
      status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.db.investigation.update({
        where: { id },
        data: {
          ...data,
          publishedAt: data.status === "PUBLISHED" ? new Date() : undefined,
        },
      });
    }),

  // Admin: Löschen
  delete: protectedProcedure
    .input(z.object({
      id: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.investigation.delete({
        where: { id: input.id },
      });
    }),

  // Admin: Alle Fälle abrufen
  getAll: protectedProcedure
    .input(z.object({
      limit: z.number().min(1).max(100).default(12),
      cursor: z.string().nullish(),
      status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(),
      category: z.enum(["WANTED_PERSON", "MISSING_PERSON", "UNKNOWN_DEAD", "STOLEN_GOODS"]).optional(),
    }))
    .query(async ({ ctx, input }) => {
      const items = await ctx.db.investigation.findMany({
        where: {
          status: input.status,
          category: input.category,
        },
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: { createdAt: "desc" },
        include: {
          createdBy: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      });
      
      let nextCursor: typeof input.cursor | undefined = undefined;
      if (items.length > input.limit) {
        const nextItem = items.pop();
        nextCursor = nextItem!.id;
      }
      
      return { items, nextCursor };
    }),

  // Einzelnen Fall abrufen
  getById: publicProcedure
    .input(z.object({
      id: z.string(),
    }))
    .query(async ({ ctx, input }) => {
      return ctx.db.investigation.findUnique({
        where: { id: input.id },
        include: {
          createdBy: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      });
    }),
}); 