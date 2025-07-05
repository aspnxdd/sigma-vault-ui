import { TRPCError } from "@trpc/server";
import { gql } from "graphql-request";
import { isAddress } from "viem";
import z from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const eulerRouter = createTRPCRouter({
  getAllPools: publicProcedure.query(async ({ ctx, input }) => {
    const schema = z.array(
      z.object({
        id: z.string(),
        token0: z.object({
          symbol: z.string(),
        }),
        token1: z.object({
          symbol: z.string(),
        }),
        createdAtTimestamp: z.coerce.number().transform((timestamp) => {
          const date = new Date(timestamp);
          return date;
        }),
      })
    );

    const { pools }: { pools: unknown[] } = await ctx.graphql.request(
      gql`
        query MyQuery {
          pools(where: { eulerpoolflag_eq: true }) {
            id
            token0 {
              symbol
            }
            token1 {
              symbol
            }
            createdAtTimestamp
          }
        }
      `
    );

    const parsedPools = schema.safeParse(pools);
    if (!parsedPools.success) {
      console.error("Failed to parse pools data:", parsedPools.error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to parse pools data",
      });
    }
    return parsedPools.data;
  }),
});
