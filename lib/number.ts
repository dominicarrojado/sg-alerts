export function formatMoney(num: number): string {
  let res = num.toLocaleString("en-SG", {
    style: "currency",
    currency: "SGD",
  });
  res = res.replace(".00", "");

  return `S${res}`;
}
