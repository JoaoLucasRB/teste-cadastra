import { Product } from "../../typings"

export function renderCount() {
  const elem = document.querySelector(".header-cart-count")
  const cartList: Product[] = JSON.parse(window.localStorage.getItem("cartList")) || []
  if(cartList.length)
    elem.innerHTML = String(cartList.length)
  else
    elem.remove()
}