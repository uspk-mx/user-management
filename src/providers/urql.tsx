"use client";

import { ReactNode, useMemo } from "react";
import {
  UrqlProvider as Provider,
  ssrExchange,
  cacheExchange,
  fetchExchange,
  createClient,
} from "@urql/next";
import { API_URL } from "@/lib/constants";
import { isClient } from "@/lib/utils";

export function UrqlProvider({ children }: { children: ReactNode }) {
  const [client, ssr] = useMemo(() => {
    const ssr = ssrExchange({
      isClient,
    });
    const client = createClient({
      url: API_URL as string,
      exchanges: [cacheExchange, ssr, fetchExchange],
      suspense: true,
      fetchOptions: {
        credentials: "include",
      },
    });

    return [client, ssr];
  }, []);

  return (
    <Provider client={client} ssr={ssr}>
      {children}
    </Provider>
  );
}
