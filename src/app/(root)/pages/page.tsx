import { getUserDetails } from "@/lib/actions/database/user";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import moment from "moment-timezone";
import { formatTime } from "@/lib/utils";

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerSession();
  const userId = session?.user?.email as string;
  const userDetails = await getUserDetails(userId);

  const userTimeZone = "Asia/Calcutta";

  const { start, end } = searchParams as {
    userId: string;
    start: string;
    end: string;
  };

  const today = {
    start:
      start ?? moment().tz(userTimeZone).startOf("day").subtract(0, "days"),
    end: end ?? moment().tz(userTimeZone).endOf("day").subtract(0, "days"),
  };

  const pages = await prisma.site.findMany({
    where: {
      userId: userDetails.id,
      startDateTime: {
        gte: new Date(today.start),
      },
      endDateTime: {
        lte: new Date(today.end),
      },
    },
    include: {
      page: true,
      Domain: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  console.log(today.start);
  console.log(today.end);
  console.log(pages.length);

  return (
    <div className="flex-1 space-y-8 pt-6 md:p-8">
      <h2 className="text-3xl font-bold tracking-tight">Pages</h2>
      <small className="flex-1 text-gray-600">
        <span>
          Pages you have visited{" "}
          {moment(today.start).format("MMMM Do h:mm:ss a")} -{" "}
          {moment(today.end).format("Do h:mm:ss a")}
        </span>
      </small>
      <Table>
        <TableCaption>A list of your recently visited site.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Domain</TableHead>
            <TableHead className="w-[100px]">Page</TableHead>
            <TableHead>Visited</TableHead>
            <TableHead>TimeSpent</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pages.map((page) => (
            <>
              <TableRow key={page.id}>
                <TableCell className="font-medium">
                  {page.Domain.name}
                </TableCell>

                <TableCell className="w-[100px] font-medium">
                  {page.page.url.length < 50
                    ? page.page.url
                    : page.page.url.substring(0, 50) + "..."}
                </TableCell>

                <TableCell>
                  {moment(page.startDateTime).tz("Asia/Calcutta").fromNow()}
                </TableCell>

                <TableCell>
                  {formatTime(
                    new Date(page.endDateTime).getTime() -
                      new Date(page.startDateTime).getTime(),
                  )}
                </TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
