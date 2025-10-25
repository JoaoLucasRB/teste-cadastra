export default function formatCurrency(value: number) {
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
}