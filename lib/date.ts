import type { DepositRatesChartRange } from "./types";

export function formatDate(date: string): string {
  const dateObj = new Date(date);
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(dateObj);

  return formattedDate;
}

export function formatDateTime(date: string): string {
  const dateObj = new Date(date);
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h12",
  }).format(dateObj);

  return formattedDate;
}

export function formatTime(time: string): string {
  const timeValue = time.split(":");
  let hours = Number(timeValue[0]);
  const minutes = timeValue[1];
  const period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  return `${hours}:${minutes} ${period}`;
}

export function formatDepositRatesChartTickDate(
  date: string,
  _range: DepositRatesChartRange,
): string {
  const [year, month, day] = date.split("-").map(Number);
  const dateObj = new Date(year, month - 1, day);

  return new Intl.DateTimeFormat("en-GB", {
    month: "short",
    year: "numeric",
  }).format(dateObj);
}
