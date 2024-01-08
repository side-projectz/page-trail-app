import { getUserDetails } from "@/lib/actions/database/user";
import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";
import UsersDetailsDashboardCustom from "@/components/dashboard/users/user-dashboard-custom";
import moment from "moment-timezone";


export default async function UsersDetailsDashboard() {

  const session = await getServerSession();

  if (!session) {
    redirect('/api/auth/signin');
  }

  const userId = session?.user?.email as string;

  const userDetails = await getUserDetails(userId);
  console.log(userDetails)

  if (userDetails === null) {
    return null
  }


  const all = {
    start: moment().startOf('year').utcOffset(1).format('YYYY-MM-DDT00:00:00'),
    end: moment().endOf('year').utcOffset(1).format('YYYY-MM-DDT23:59:59')
  }

  const today = {
    start: moment().startOf('day').subtract(0, "days").format('YYYY-MM-DDT00:00:00'),
    end: moment().endOf('day').subtract(0, "days").format('YYYY-MM-DDT23:59:59')
  }

  const thisWeek = {
    start: moment().startOf('week').subtract(0, 'week').format('YYYY-MM-DDT00:00:00'),
    end: moment().endOf('week').subtract(0, 'week').format('YYYY-MM-DDT23:59:59')
  }
  const PrevWeek = {
    start: moment().startOf('week').subtract(1, 'week').format('YYYY-MM-DDT00:00:00'),
    end: moment().endOf('week').subtract(1, 'week').format('YYYY-MM-DDT23:59:59')
  }


  return (
    <>
      <div className="flex-1 space-y-8 p-8 pt-6">

        {/* <UsersDetailsDashboardAll userId={userDetails.id} /> */}
        {/* <UsersDetailsDashboardToday userId={userDetails.id} /> */}
        {/* <UsersDetailsDashboardWeek userId={userDetails.id} /> */}


        <UsersDetailsDashboardCustom
          title="Overall"
          description="The time spent on the internet this year"
          userId={userDetails.id}
          start={all.start}
          end={all.end}
        />

        <UsersDetailsDashboardCustom
          title="Today"
          description="The time spent on the internet today"
          userId={userDetails.id}
          start={today.start}
          end={today.end}
        />
        <UsersDetailsDashboardCustom
          title="This Week"
          description="The time spent on the internet this week"
          userId={userDetails.id}
          start={thisWeek.start}
          end={thisWeek.end}
        />
        <UsersDetailsDashboardCustom
          title="Last Week"
          description="The time spent on the internet last week"
          userId={userDetails.id}
          start={PrevWeek.start}
          end={PrevWeek.end}
        />



      </div>

    </>
  );

}