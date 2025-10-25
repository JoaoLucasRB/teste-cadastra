import productCard from "./product-card"
import { Product } from "../../typings"
import formatCurrency from "../../utils/formatCurrency"

let currentPage = 0
const itemsPerPage = 9

function renderProductCard(product: Product) {
  const parser = new DOMParser()
  let htmlString = productCard
    .replace(/@Imagem_do_produto/gi, product.image)
    .replace(/@Nome_do_produto/gi, product.name)
    .replace(/@Preco_do_produto/gi, formatCurrency(product.price))
    .replace(/@Parcelamento_do_produto/gi, `até ${product.parcelamento[0]}x de ${formatCurrency(product.parcelamento[1])}`)

  const doc: Document = parser.parseFromString(htmlString, 'text/html')

  const parsedHtmlElement: HTMLElement | null = doc.body.firstChild as HTMLElement

  parsedHtmlElement.querySelector(".product-item-button-element").addEventListener("click", function() {
    const cartList: Product[] = JSON.parse(window.localStorage.getItem("cartList")) || []
    const newCartList = [...cartList]
    newCartList.push(product)
    window.localStorage.setItem("cartList", JSON.stringify(newCartList))
    window.location.reload()
  })

  if (parsedHtmlElement) {
    document.querySelector(".product-grid-container").appendChild(parsedHtmlElement)
  }
}

export function handlePagination(array: Product[]) {
  for (let index: number = (currentPage * itemsPerPage); index < ((currentPage * itemsPerPage) + itemsPerPage); index++) {
    if (array[index])
      renderProductCard(array[index])
  }
  currentPage++
}

