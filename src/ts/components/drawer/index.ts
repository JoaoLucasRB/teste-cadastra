export function initializeEvents() {
  document.querySelector(".top-mobile-actions-button.sort").addEventListener("click", function () {
    // @ts-ignore
    document.querySelector(".mobile-drawer-wrapper.sort").style.display = "block"
  })
  document.querySelector(".top-mobile-actions-button.filter").addEventListener("click", function () {
    // @ts-ignore
    document.querySelector(".mobile-drawer-wrapper.filter").style.display = "block"
  })
  
  document.querySelector(".mobile-drawer-wrapper.sort .mobile-drawer-close").addEventListener("click", function () {
    // @ts-ignore
    document.querySelector(".mobile-drawer-wrapper.sort").style.display = "none"
  })
  document.querySelector(".mobile-drawer-wrapper.filter .mobile-drawer-close").addEventListener("click", function () {
    // @ts-ignore
    document.querySelector(".mobile-drawer-wrapper.filter").style.display = "none"
  })
}