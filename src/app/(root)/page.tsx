import { getUserDetails } from "@/lib/actions/database/user";
import { redirect } from "next/navigation";

import UsersDetailsDashboardAll from "@/components/dashboard/users/user-dashboard-all";
import UsersDetailsDashboardToday from "@/components/dashboard/users/user-dashboard-today";
import UsersDetailsDashboardCustom from "@/components/dashboard/users/user-dashboard-custom";
import { getServerSession } from "next-auth";


export default async function UsersDetailsDashboard() {

  const session = await getServerSession();
  console.log(session);
  if (!session) {
    redirect('/api/auth/signin');
  }

  const userId = session?.user?.email as string;

  const userDetails = await getUserDetails(userId);
  console.log(userDetails)

  if (userDetails === null) {
    return null
  }

  return (
    <>
      <div className="flex-1 space-y-8 p-8 pt-6">

        <UsersDetailsDashboardAll userId={userDetails.id} />
        <UsersDetailsDashboardToday userId={userDetails.id} />
        <UsersDetailsDashboardCustom userId={userDetails.id} />

      </div>

    </>
  );

}