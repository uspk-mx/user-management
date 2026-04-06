import { AppsDocument } from "@/graphql/gql/graphql";
import { getServerClient } from "@/providers/urql.rsc";

export async function getApps() {
  const client = await getServerClient();
  const result = await client.query(AppsDocument, {}).toPromise();
  return result.data?.apps;
}
