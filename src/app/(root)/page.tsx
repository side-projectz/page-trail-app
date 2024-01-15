import { getUserDetails } from "@/lib/actions/database/user";
import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";
import UsersDetailsDashboardCustom from "@/components/dashboard/users/user-dashboard-custom";
import moment from "moment-timezone";


export default async function UsersDetailsDashboard(
  {
    searchParams
  }:
    {
      searchParams?: { [key: string]: string | string[] | undefined };
    }
) {

  const session = await getServerSession();

  if (!session) {
    redirect('/api/auth/signin');
  }

  console.log(searchParams);
  const { start, end } = searchParams as { userId: string, start: string, end: string };

  const userId = session?.user?.email as string;
  const userDetails = await getUserDetails(userId);


  if (userDetails === null) {
    return null
  }

  const userTimeZone = 'Asia/Calcutta';

  const all = {
    start: moment().tz(userTimeZone).startOf('year').toISOString(),
    end: moment().tz(userTimeZone).endOf('year').toISOString()
  }

  const today = {
    start: start ?? moment().tz(userTimeZone).startOf('day').subtract(1, "days").toISOString(),
    end: end ?? moment().tz(userTimeZone).endOf('day').subtract(1, "days").toISOString()
  }


  const yesterday = {
    start: moment().tz(userTimeZone).startOf('day').subtract(2, "days").toISOString(),
    end: moment().tz(userTimeZone).endOf('day').subtract(2, "days").toISOString()
  }

  const thisWeek = {
    start: moment().tz(userTimeZone).startOf('week').subtract(0, 'week').toISOString(),
    end: moment().tz(userTimeZone).endOf('week').subtract(0, 'week').toISOString()
  }
  
  const PrevWeek = {
    start: moment().tz(userTimeZone).startOf('week').subtract(1, 'week').toISOString(),
    end: moment().tz(userTimeZone).endOf('week').subtract(1, 'week').toISOString()
  }


  return (
    <>
      <div className="flex-1 space-y-8 md:p-8 pt-6">

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
          title="Yesterday"
          description="The time spent on the internet yesterday"
          userId={userDetails.id}
          start={yesterday.start}
          end={yesterday.end}
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