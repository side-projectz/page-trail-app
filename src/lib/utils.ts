import { type ClassValue, clsx } from "clsx"
import { DateTime } from "luxon";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(milliseconds: number) {
  let seconds: number | string = Math.floor(milliseconds / 1000);
  let minutes: number | string = Math.floor(seconds / 60);
  let hours: number | string = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;

  // Padding each unit to ensure two digits
  hours = hours.toString().padStart(2, '0');
  minutes = minutes.toString().padStart(2, '0');
  seconds = seconds.toString().padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
}


export function getOffSetCurrentDateTime(timeZone: string) {
  const timeZoneCurrentTime = DateTime.now().setZone(timeZone);
  const ISOString = timeZoneCurrentTime.toISO();
  const ISOSplit = ISOString?.split("+");
  const offsetString = ISOSplit?.[1];
  const offset = offsetString?.split(":");
  const hours = offset?.[0];
  const minutes = offset?.[1];
  // now from the retrieved offset lets create a new Date Object with the offset
  const date = new Date();
  date.setHours(date.getHours() + Number(hours));
  date.setMinutes(date.getMinutes() + Number(minutes));
  console.log("formatted offset date", date)
  return date
}

export function getOffSetDateTime(date: string, timeZone: string){
  console.log("getOffSetDateTime - date", date)
  const timeZoneCurrentTime = DateTime.fromISO(date).setZone(timeZone);
  const ISOString = timeZoneCurrentTime.toISO();
  const ISOSplit = ISOString?.split("+");
  const offsetString = ISOSplit?.[1];
  const offset = offsetString?.split(":");
  const hours = offset?.[0];
  const minutes = offset?.[1];
  // now from the retrieved offset lets create a new Date Object with the offset
  const newDate = new Date(date);
  newDate.setHours(newDate.getHours() + Number(hours));
  newDate.setMinutes(newDate.getMinutes() + Number(minutes));
  console.log("formatted offset date", newDate)
  return newDate
}