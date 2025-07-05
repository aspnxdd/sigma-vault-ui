import { gql } from "graphql-request";
import { isAddress } from "viem";
import z from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const eulerRouter = createTRPCRouter({
  getAllPools: publicProcedure
    .input(
      z.object({
        address: z.string().refine((val) => isAddress(val)),
      })
    )
    .query(async ({ ctx, input }) => {
      const { graphql } = ctx;

      return [];
    }),
});
