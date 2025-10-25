import { renderFilterContainer, renderFilters } from "./components/filter"
import { handlePagination } from "./components/products"
import { order, sort, initializeEvents as initializeEventsSort, initializeSelections as initializeSelectionsSort, renderSortOptions } from "./components/sort"
import { initializeEvents as initializeEventsFilter } from "./components/filter"
import { initializeEvents as initializeEventsDrawer } from "./components/drawer"
import { Product, Filters } from "./typings"
import { renderCount } from "./components/cart"

const serverUrl = "http://localhost:5000"

let allProducts: Product[] = []

const filters: Filters = {
  "cor": {},
  "tamanho": {},
  "preco": {
    "0-50": "inactive",
    "51-150": "inactive",
    "151-300": "inactive",
    "301-500": "inactive",
    "500": "inactive",
  }
}

async function fetchProducts() {
  await fetch(`${serverUrl}/products`)
    .then(res => res.json())
    .then(res => {
      allProducts = [...order(res)]
      handlePagination(sort(res, filters))
      renderFilters(allProducts, filters)
    })
}

function initializeEvents() {
  initializeEventsSort()
  initializeEventsFilter(filters)
  initializeEventsDrawer()
}

async function main() {
  renderCount()
  renderSortOptions()
  renderFilterContainer()
  fetchProducts()
  initializeEvents()
  initializeSelectionsSort()
}

document.addEventListener("DOMContentLoaded", main)
