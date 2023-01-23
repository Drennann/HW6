export const formatMoney = (amount: number) => {
  return amount.toLocaleString("en", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  })
}
