export function formatDateTime(date: string) {
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
