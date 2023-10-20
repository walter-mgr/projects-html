/* Script for the collapsible component for navbar */

// 1. Select all elements by class name
const collapsible = document.querySelectorAll(".collapsible")
console.log(collapsible)

// 2. Add event listener to the collapsible
// 3. ForEach method for iterrate
// 4. Add a toggle method (add-remove) "set-visibility" classList

collapsible.forEach((element) => {
  element.addEventListener("click", () => {
    element.classList.toggle("set-visibility")
  })
})
