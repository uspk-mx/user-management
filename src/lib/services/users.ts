import { getServerClient } from "@/providers/urql.rsc";
import {
  ActiveSessionsDocument,
  GetProfileDocument,
  GetUserDocument,
  GetUserQuery,
  GetUserQueryVariables,
  GetUsersDocument,
  ListRolesDocument,
  MeDocument,
  MyAppsDocument,
  PendingApprovalsDocument,
  UserApprovalDocument,
  UserAppAccessDocument,
} from "@/graphql/gql/graphql";

export async function getMeData() {
  const client = await getServerClient();
  const result = await client.query(MeDocument, {}).toPromise();
  return result.data?.me;
}

export async function getProfile() {
  const client = await getServerClient();
  const result = await client.query(GetProfileDocument, {}).toPromise();
  return result.data?.getProfile;
}

export async function getUsers() {
  const client = await getServerClient();
  const result = await client.query(GetUsersDocument, {}).toPromise();
  return result.data?.getUsers;
}

export async function getRoles() {
  const client = await getServerClient();
  const result = await client.query(ListRolesDocument, {}).toPromise();
  return result.data?.listRoles;
}

export async function getUserById(userId: string) {
  const client = await getServerClient();
  const result = await client
    .query<GetUserQuery, GetUserQueryVariables>(GetUserDocument, { userId })
    .toPromise();
  return result.data?.getUser;
}

export async function getPendingApprovals() {
  const client = await getServerClient();
  const result = await client.query(PendingApprovalsDocument, {}).toPromise();
  return result.data?.pendingApprovals;
}

export async function getActiveSessionsByUserId(userId: string) {
  const client = await getServerClient();
  const result = await client
    .query(ActiveSessionsDocument, { userId })
    .toPromise();
  return result.data?.activeSessions;
}

export async function getUserApproval(userId: string) {
  const client = await getServerClient();
  const result = await client
    .query(UserApprovalDocument, { userId })
    .toPromise();
  return result.data?.userApproval;
}

export async function getMyApps() {
  const client = await getServerClient();
  const result = await client.query(MyAppsDocument, {}).toPromise();
  return result.data?.myApps;
}

export async function getUserAppAccess(userId: string) {
  const client = await getServerClient();
  const result = await client
    .query(UserAppAccessDocument, { userId })
    .toPromise();
  return result.data?.userAppAccess;
}
