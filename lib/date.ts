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
