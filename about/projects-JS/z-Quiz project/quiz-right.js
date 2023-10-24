/* 1. Selecting elements */
const form = document.querySelector("#quiz-form")
const answers = Array.from(document.querySelectorAll(".answer"))
const questionItems = document.querySelectorAll(".question-item")
const alertPop = document.querySelector("#alert")
const buttonReset = document.querySelector("#reset")

/* 2. Create a submit event listener for the form to prevent the default behaviour */

form.addEventListener("submit", (e) => {
  e.preventDefault()

  /* 6. Make sure unanswered questions show up as incorrect. The 
    easiest way to do this is to add the incorrect class and removing the 
    correct class from all question items before checking the correct 
    answers */

  questionItems.forEach((item) => {
    item.classList.add("incorrect")
    item.classList.remove("correct")
    console.dir(item)
  })
  /* 3. Take the only checked answers using object property "checked"
  or console.dir(item) */

  const checkedAnswers = answers.filter((answer) => answer.checked)
  console.log(checkedAnswers, "checkedAnswers") // control prop

  /*  4. Define correct answers (convert booleean to string)
  and define closest parent to answer */

  checkedAnswers.forEach((answer) => {
    const isCorrect = answer.value === "true"
    const question = answer.closest(".question-item")

    /*  4. For each correct answer add the class "correct" to the parent 
    with the class `question-item` and remove the class "incorrect". */

    if (isCorrect) {
      question.classList.add("correct")
      question.classList.remove("incorrect")

      /* 5. For each incorrect answer add the class "incorrect" to the 
        parent with the class "question-item" and remove the class "correct". */
    } else {
      question.classList.add("incorrect")
      //   question.classList.remove("correct")
    }

    /* 7. If all answers are correct show the element with the id "alert" and hide it after one second (setTimeout) (use the class "active" to show the alert and remove the class to hide it) */

    const allCorrect = checkedAnswers.every((answer) => answer.value === "true")
    const allAnswered = checkedAnswers.length === questionItems.length // or 3 (length of array)

    if (allCorrect && allAnswered) {
      alertPop.classList.add("active")
      setTimeout(() => {
        alertPop.classList.remove("active")
        question.classList.remove("correct")
      }, 1200)
    }
  })
})

/* Notes */

/* querySelectorAll - is not an actual array, it's an HTML collection
it's need to convert it in array: Array.from(document...bla-bla) */

/*
function reset(questionItems) {
  questionItems.forEach((item) => {
    item.classList.remove("incorrect")
    item.classList.remove("correct")
  })
}
reset(buttonReset) 
 */
