import {
  defaultShouldDehydrateQuery,
  QueryClient,
} from "@tanstack/react-query";
import SuperJSON from "superjson";

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        refetchInterval: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: false,
        retryDelay: 0,
        retryOnMount: false,
        staleTime: Infinity,
      },
      dehydrate: {
        serializeData: SuperJSON.serialize,
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
      hydrate: {
        deserializeData: SuperJSON.deserialize,
      },
    },
  });
