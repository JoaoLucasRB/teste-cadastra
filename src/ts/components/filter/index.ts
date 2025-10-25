import filterCor from "./filter-cor"
import filtertamanho from "./filter-tamanho"
import { Filters, Product } from "../../typings"
import filter from "./filter"

function handleFilterClick(filters: Filters) {
  const searchString = window.location.search?.replace('?', '')
  if (searchString || searchString == "") {
    const allFilteredColors: string[] = []
    for (let key in filters.cor) {
      if (filters.cor[key] == "active")
        allFilteredColors.push(key)
    }

    const allFilteredSizes: string[] = []
    for (let key in filters.tamanho) {
      if (filters.tamanho[key] == "active")
        allFilteredSizes.push(key)
    }

    const allfilteredPrices: string[] = []
    for (let key in filters.preco) {
      if (filters.preco[key] == "active")
        allfilteredPrices.push(key)
    }

    const searchValues = searchString.split("&")
    let newSearchString = ""

    if (!searchValues.find((value: string) => value.includes("cor=")) && allFilteredColors.length) {
      searchValues.push(`cor=`)
    }
    if (!searchValues.find((value: string) => value.includes("tamanho=")) && allFilteredSizes.length) {
      searchValues.push(`tamanho=`)
    }
    if (!searchValues.find((value: string) => value.includes("preco=")) && allfilteredPrices.length) {
      searchValues.push(`preco=`)
    }

    const filteredSearchValues = searchValues.filter(value => value)

    filteredSearchValues.forEach((value: string, index: number) => {
      if (value.includes(`cor=`)) {
        if (allFilteredColors.length)
          newSearchString += `${index != 0 ? "&" : ""}cor=${allFilteredColors.join(',')}`
      } else if (value.includes(`tamanho=`)) {
        if (allFilteredSizes.length)
          newSearchString += `${index != 0 ? "&" : ""}tamanho=${allFilteredSizes.join(',')}`
      } else if (value.includes(`preco=`)) {
        if (allfilteredPrices.length)
          newSearchString += `${index != 0 ? "&" : ""}preco=${allfilteredPrices.join(',')}`
      } else newSearchString += `${index != 0 ? "&" : ""}${value}`
    })

    console.log(newSearchString)

    window.location.href = `${window.location.origin}${window.location.pathname}?${newSearchString}`
  }
}

export function renderFilters(array: Product[], filters: Filters) {
  const searchString = window.location.search.replace('?', '')

  const cor = searchString.split('&').find((substring: string) => substring.includes("cor="))?.replace("cor=", '')
  const tamanho = searchString.split('&').find((substring: string) => substring.includes("tamanho="))?.replace("tamanho=", '')
  const preco = searchString.split('&').find((substring: string) => substring.includes("preco="))?.replace("preco=", '')

  array.forEach((product: Product) => {
    if (!filters.cor[product.color]) {
      filters.cor[product.color] = cor && cor.includes(product.color) ? "active" : "inactive"
    }

    product.size.forEach((size: string) => {
      if (!filters.tamanho[size]) {
        filters.tamanho[size] = tamanho && tamanho.includes(size) ? "active" : "inactive"
      }
    })

    if (preco)
      preco.split(',').forEach((priceRange: string) => {
        if (preco.includes(priceRange))
          filters.preco[priceRange] = "active"
      })
  })

  for (let key in filters.cor) {
    const parser = new DOMParser()
    let htmlString = filterCor

    htmlString = htmlString.replace(/@Valor/gi, key)

    const doc: Document = parser.parseFromString(htmlString, 'text/html')
    const docMobile: Document = parser.parseFromString(htmlString, 'text/html')

    const parsedHtmlElement: HTMLElement | null = doc.body.firstChild as HTMLElement
    const parsedHtmlElementMobile: HTMLElement | null = docMobile.body.firstChild as HTMLElement

    if (filters.cor[key] == "active") {
      parsedHtmlElement.setAttribute("data-filter-facet-selected", "true")
      parsedHtmlElementMobile.setAttribute("data-filter-facet-selected", "true")
    }

    parsedHtmlElement.addEventListener("click", function (e) {
      e.stopPropagation()
      e.preventDefault()
      filters.cor[parsedHtmlElement.getAttribute("data-filter-facet-value")] = parsedHtmlElement.getAttribute("data-filter-facet-selected") ? "inactive" : "active"
      handleFilterClick(filters)
    })
    parsedHtmlElementMobile.addEventListener("click", function (e) {
      e.stopPropagation()
      e.preventDefault()
      filters.cor[parsedHtmlElementMobile.getAttribute("data-filter-facet-value")] = parsedHtmlElement.getAttribute("data-filter-facet-selected") ? "inactive" : "active"
      handleFilterClick(filters)
    })

    if (parsedHtmlElement) {
      document.querySelector(".main-left .filter-facet-cor-values").appendChild(parsedHtmlElement)
      document.querySelector(".mobile-drawer-wrapper.filter .mobile-drawer-content .filter-facet-cor-values").appendChild(parsedHtmlElementMobile)
    }
  }

  for (let key in filters.tamanho) {
    const parser = new DOMParser()
    let htmlString = filtertamanho

    htmlString = htmlString.replace(/@Valor/gi, key)

    const doc: Document = parser.parseFromString(htmlString, 'text/html')
    const docMobile: Document = parser.parseFromString(htmlString, 'text/html')

    const parsedHtmlElement: HTMLElement | null = doc.body.firstChild as HTMLElement
    const parsedHtmlElementMobile: HTMLElement | null = docMobile.body.firstChild as HTMLElement

    if (filters.tamanho[key] == "active") {
      parsedHtmlElement.setAttribute("data-filter-facet-selected", "true")
      parsedHtmlElementMobile.setAttribute("data-filter-facet-selected", "true")
    }

    parsedHtmlElement.addEventListener("click", function (e) {
      e.stopPropagation()
      e.preventDefault()
      filters.tamanho[parsedHtmlElement.getAttribute("data-filter-facet-value")] = parsedHtmlElement.getAttribute("data-filter-facet-selected") ? "inactive" : "active"
      handleFilterClick(filters)
    })
    parsedHtmlElementMobile.addEventListener("click", function (e) {
      e.stopPropagation()
      e.preventDefault()
      filters.tamanho[parsedHtmlElementMobile.getAttribute("data-filter-facet-value")] = parsedHtmlElement.getAttribute("data-filter-facet-selected") ? "inactive" : "active"
      handleFilterClick(filters)
    })

    if (parsedHtmlElement) {
      document.querySelector(".main-left .filter-facet-tamanho-values").appendChild(parsedHtmlElement)
      document.querySelector(".mobile-drawer-wrapper.filter .mobile-drawer-content .filter-facet-tamanho-values").appendChild(parsedHtmlElementMobile)
    }
  }

  for (let key in filters.preco) {
    if (filters.preco[key] == "active") {
      document.querySelector(`.main-left .filter-facet-preco-value[data-filter-facet-value="${key}"]`).setAttribute("data-filter-facet-selected", "true")
      document.querySelector(`.mobile-drawer-wrapper.filter .mobile-drawer-content .filter-facet-preco-value[data-filter-facet-value="${key}"]`).setAttribute("data-filter-facet-selected", "true")
    }
  }
}

export function renderFilterContainer() {
  const parser = new DOMParser()
  const filterContainer = filter;

  const doc: Document = parser.parseFromString(filterContainer, 'text/html')
  const docMobile: Document = parser.parseFromString(filterContainer, 'text/html')

  const parsedHtmlElement: HTMLElement | null = doc.body.firstChild as HTMLElement
  const parsedHtmlElementMobile: HTMLElement | null = docMobile.body.firstChild as HTMLElement

  if (parsedHtmlElement) {
    document.querySelector(".main-left").appendChild(parsedHtmlElement)
    document.querySelector(".mobile-drawer-wrapper.filter .mobile-drawer-content").appendChild(parsedHtmlElementMobile)
  }
}

export function initializeEvents(filters: Filters) {
  // Filter Preco value
  const filterPrecoValueList = document.querySelectorAll(".filter-facet-preco-value")
  filterPrecoValueList.forEach((option: HTMLDivElement) => {
    option.addEventListener("click", function (e) {
      e.stopPropagation()
      e.preventDefault()
      filters.preco[option.getAttribute("data-filter-facet-value")] = option.getAttribute("data-filter-facet-selected") ? "inactive" : "active"
      handleFilterClick(filters)
    })
  })
}