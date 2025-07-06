import { TRPCError } from "@trpc/server";
import { gql } from "graphql-request";
import { isAddress } from "viem";
import { z } from "zod";
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
          return new Date(timestamp);
        }),
        swapCount: z.coerce.number(),
        amount0D: z.coerce.number(),
        amount1D: z.coerce.number(),
        volumeToken0D: z.coerce.number(),
        volumeToken1D: z.coerce.number(),
      })
    );

    const { pools }: { pools: unknown[] } = await ctx.graphql.request(
      gql`
        query MyQuery {
          pools(
            where: { eulerpoolflag_eq: true, swapCount_gt: 0 }
            orderBy: swapCount_DESC
          ) {
            id
            token0 {
              symbol
            }
            token1 {
              symbol
            }
            createdAtTimestamp
            swapCount
            amount0D
            amount1D
            volumeToken0D
            volumeToken1D
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

  getPoolById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const schema = z.array(
        z.object({
          id: z.string(),
          token0: z.object({
            symbol: z.string(),
            id: z
              .string()
              .transform((e) => e.split("-")[1])
              .refine((val) => isAddress(val), {
                message: "Invalid token0 address",
              }),
          }),
          token1: z.object({
            symbol: z.string(),
            id: z
              .string()
              .transform((e) => e.split("-")[1])
              .refine((val) => isAddress(val), {
                message: "Invalid token1 address",
              }),
          }),
          createdAtTimestamp: z.coerce.number().transform((timestamp) => {
            return new Date(timestamp);
          }),
          swapCount: z.coerce.number(),
          amount0D: z.coerce.number(),
          amount1D: z.coerce.number(),
          volumeToken0D: z.coerce.number(),
          volumeToken1D: z.coerce.number(),
        })
      );

      const { pools }: { pools: unknown[] } = await ctx.graphql.request(
        gql`
          query MyQuery($id: String!) {
            pools(
              where: { eulerpoolflag_eq: true, swapCount_gt: 0, id_eq: $id }
              orderBy: swapCount_DESC
            ) {
              id
              token0 {
                symbol
                id
              }
              token1 {
                symbol
                id
              }
              createdAtTimestamp
              swapCount
              amount0D
              amount1D
              volumeToken0D
              volumeToken1D
            }
          }
        `,
        {
          id: input.id,
        }
      );

      const parsedPools = schema.safeParse(pools);
      if (!parsedPools.success || parsedPools.data.length === 0) {
        console.error("Failed to parse pools data:", parsedPools.error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to parse pools data",
        });
      }
      return parsedPools.data[0]!;
    }),

  getPoolDepositedAssets: publicProcedure
    .input(
      z.object({
        token0Id: z.string().refine((val) => isAddress(val), {
          message: "Invalid token0 address",
        }),
        token1Id: z.string().refine((val) => isAddress(val), {
          message: "Invalid token1 address",
        }),
      })
    )
    .query(async ({ ctx, input }) => {
      const schema = z.array(
        z.object({
          token0: z.object({
            id: z.string(),
            decimals: z.coerce.number(),
            symbol: z.string(),
          }),
          token1: z.object({
            id: z.string(),
            decimals: z.coerce.number(),
            symbol: z.string(),
          }),
          amount0: z.coerce.number(),
          amount1: z.coerce.number(),
          userId: z.string(),
          depositId: z.coerce.number(),
        })
      );

      const sortedToken0 = input.token0Id.toLowerCase();
      const sortedToken1 = input.token1Id.toLowerCase();

      const { sigmaVaultBalances }: { sigmaVaultBalances: unknown } =
        await ctx.graphql.request(
          gql`
            query MyQuery($token0Id: String!, $token1Id: String!) {
              sigmaVaultBalances(
                where: {
                  token0Id_contains: $token0Id
                  token1Id_contains: $token1Id
                }
              ) {
                token0 {
                  id
                  symbol
                  decimals
                }
                token1 {
                  id
                  symbol
                  decimals
                }
                amount0
                amount1
                userId
                depositId
              }
            }
          `,
          {
            token0Id: sortedToken0.toLowerCase(),
            token1Id: sortedToken1.toLowerCase(),
          }
        );

      const parsedData = schema.safeParse(sigmaVaultBalances);
      if (!parsedData.success) {
        console.error(
          "Failed to parse pool deposited assets data:",
          parsedData.error
        );
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to parse pool deposited assets data",
        });
      }
      return parsedData.data;
    }),
});
