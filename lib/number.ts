export function formatMoney(num: number): string {
  let res = num.toLocaleString("en-SG", {
    style: "currency",
    currency: "SGD",
  });
  res = res.replace(".00", "");

  return `S${res}`;
}

export function formatMoneyPeso(num: number): string {
  let res = num.toLocaleString("en-PH", {
    style: "currency",
    currency: "PHP",
  });
  res = res.replace(".00", "");

  return `${res}`;
}
