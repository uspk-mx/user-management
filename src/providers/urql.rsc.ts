"use server";
import { cacheExchange, createClient, fetchExchange, gql } from "@urql/core";
import { cookies } from "next/headers";
import { API_URL } from "../lib/constants";

export async function getServerClient() {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get("uspk_gateway_token")?.value ?? "";

  return createClient({
    url: API_URL,
    exchanges: [cacheExchange, fetchExchange],
    fetchOptions: {
      credentials: "include",
      headers: {
        Cookie: `uspk_gateway_token=${cookieValue}`,
      },
    },
  });
}

const MeQuery = gql`
  query Me {
    me {
      userID
      fullName
      userName
      email
      role
      phoneNumber
      isVerified
      profilePicture
      isActive
      createdAt
      updatedAt
    }
  }
`;

export async function getMeData() {
  const client = await getServerClient();
  const result = await client.query(MeQuery, {}).toPromise();
  return result.data?.me;
}
