import { Filters, Product } from "../../typings"
import options from "./options"

export function sort(array: Product[], filters: Filters) {
  const searchString = window.location.search.replace('?', '')

  const cor = searchString.split('&').find((substring: string) => substring.includes("cor="))?.replace("cor=", '')
  const tamanho = searchString.split('&').find((substring: string) => substring.includes("tamanho="))?.replace("tamanho=", '')
  const preco = searchString.split('&').find((substring: string) => substring.includes("preco="))?.replace("preco=", '')

  const newArray: Product[] = []
  array.forEach((product: Product) => {
    let added = false

    if (cor && cor.includes(product.color)) {
      filters.cor[product.color] = "active"
      if (!added) {
        newArray.push(product)
        added = true
      }
    }

    if (tamanho && !added) {
      product.size.forEach((size: string) => {
        if (tamanho.includes(size) && !added) {
          newArray.push(product)
          added = true
        }
      })
    }

    if (preco && !added) {
      const ranges = preco.split(',')
      ranges.forEach((range: string) => {
        const priceRange = range.split('-')
        if (!priceRange[1] && (Number(priceRange[0]) < product.price)) {
          newArray.push(product)
        }

        if ((Number(priceRange[0]) < product.price) && (product.price < Number(priceRange[1]))) {
          newArray.push(product)
        }
      })
    }
  })

  return (!cor && !tamanho && !preco) ? array : newArray
}

export function order(array: Product[]) {
  const searchString = window.location.search?.replace('?', '')
  const order = searchString.split('&').find((substring: string) => substring.includes("order="))?.replace("order=", '')

  if (order) {
    switch (order) {
      case "OrderByReleaseDateDESC":
        array.sort((a: Product, b: Product) => (new Date(b.date).getDate()) - (new Date(a.date).getDate()))
        return array
      case "OrderByPriceASC":
        array.sort((a: Product, b: Product) => a.price - b.price)
        return array
      case "OrderByPriceDESC":
        array.sort((a: Product, b: Product) => b.price - a.price)
        return array
      default:
        return array
    }
  }
  return array
}

function handleSortClick(element: HTMLDivElement) {
  const searchString = window.location.search.replace('?', '')
  if (searchString || searchString == "") {
    const searchValues = searchString.split("&")
    let newSearchString = ""

    if (!searchValues.find((value: string) => value.includes("order="))) {
      searchValues.push(`order=`)
    }

    const filteredSearchValues = searchValues.filter(value => value)

    filteredSearchValues.forEach((value: string, index: number) => {
      if (value.includes(`order=`)) {
        newSearchString += `${index != 0 ? "&" : ""}order=${element.getAttribute("data-sort-value")}`
      } else newSearchString += `${index != 0 ? "&" : ""}${value}`
    })
    window.location.href = `${window.location.origin}${window.location.pathname}?${newSearchString}`
  }
}

export function initializeEvents() {
  // Sort dropdown
  const topDesktopContainer = document.querySelector(".top-desktop-seletor-container")
  topDesktopContainer.addEventListener('click', function () {
    const topDesktopOptions = document.querySelector('.top-desktop-seletor-container .top-desktop-seletor-options')
    if (!topDesktopOptions.getAttribute("data-sort-options-open"))
      topDesktopOptions.setAttribute('data-sort-options-open', "true")
    else
      topDesktopOptions.removeAttribute('data-sort-options-open')
  })

  // Sort value
  const topDesktopOptionList = document.querySelectorAll(".top-desktop-seletor-option")
  topDesktopOptionList.forEach((option: HTMLDivElement) => {
    option.addEventListener("click", function (e) {
      e.preventDefault()
      e.stopPropagation()
      handleSortClick(option)
    })
  })
}

export function renderSortOptions() {
  const parser = new DOMParser()
  const sortOptions = options;

  const doc: Document = parser.parseFromString(sortOptions, 'text/html')
  const docMobile: Document = parser.parseFromString(sortOptions, 'text/html')

  const parsedHtmlElement: HTMLElement | null = doc.body.firstChild as HTMLElement
  const parsedHtmlElementMobile: HTMLElement | null = docMobile.body.firstChild as HTMLElement

  if (parsedHtmlElement) {
    document.querySelector(".top-desktop-seletor-container").appendChild(parsedHtmlElement)
    document.querySelector(".mobile-drawer-wrapper.sort .mobile-drawer-content").appendChild(parsedHtmlElementMobile)
  }
}

export function initializeSelections() {
  const searchString = window.location.search.replace("?", '')
  if (searchString.includes("order=")) {
    const order = searchString.split('&').find((substring: string) => substring.includes("order=")).replace("order=", '')
    document.querySelector(`.top-desktop-seletor-options .top-desktop-seletor-option[data-sort-value="${order}"]`).setAttribute("data-sort-option-selected", "true")
    document.querySelector(`.mobile-drawer-wrapper.sort .mobile-drawer-content .top-desktop-seletor-option[data-sort-value="${order}"]`).setAttribute("data-sort-option-selected", "true")
  }
}