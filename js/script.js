// const form = document.getElementById("form");
// const billInput = document.getElementById("bill");
// const tipInput = document.getElementById("selectTip");
// const customTip = document.getElementById("custom");
// const amountOfPeopleInput = document.getElementById("people");
// const resultTipSpan = document.getElementById("tipAmount");
// const resultTotalSpan = document.getElementById("totalAmount");
// const resetButton = document.getElementById("reset");

// let sum = null;
// let isSumEntered = false;

// let amountOfPeople = null;
// let isAmountOfPeopleEntered = false;

// let tip = document.querySelector("input[type=radio]").value;

// const validations = {
//   isNumber: (value) => {
//     const result = !isNaN(value);
//     const error = "Not a number";
//     return { result, error };
//   },
//   isPositive: (value) => {
//     const result = value >= 0;
//     const error = "Not positive";
//     return { result, error };
//   },
//   isZero: (value) => {
//     const result = value != 0;
//     const error = "Can't be null";
//     return { result, error };
//   },
// };

// function isValueValid(value, validations) {
//   const trimedValue = value.trim();
//   let result = { result: true, error: "" };
//   for (let key in validations) {
//     const validation = validations[key](trimedValue);
//     if (!validation.result) {
//       result = validation;
//       break;
//     }
//   }
//   return result;
// }

// function setError(input, error) {
//   const span = input.parentNode.querySelector("span");
//   span.classList.add("error");
//   span.innerText = error;
// }

// function clearError(input) {
//   const span = input.parentNode.querySelector("span");
//   if (!span) return;
//   span.classList.remove("error");
//   span.innerText = "";
// }

// function setSuccessful(input) {
//   const span = input.parentNode.querySelector("span");
//   span.classList.add("successful");
// }

// function clearSuccessful(input) {
//   const span = input.parentNode.querySelector("span");
//   span.classList.remove("successful");
// }

// function isSuccessful(input) {
//   return input.parentNode
//     .querySelector("span")
//     .classList.contains("successful");
// }

// function resetInput(input) {
//   input.value = "";
// }

// function isEmpty(value) {
//   return value.length === 0;
// }

// function handleBlur(event) {
//   const input = event.target;
//   const value = input.value.trim();
//   const empty = isEmpty(value);
//   const inputValidation = isValueValid(value, validations);
//   if (inputValidation.result && !empty) {
//     clearError(input);
//     setSuccessful(input);
//   }
//   if (!inputValidation.result && !empty) {
//     clearSuccessful(input);
//     setError(input, inputValidation.error);
//   }
//   if (empty) {
//     clearError(input);
//     clearSuccessful(input);
//   }
// }

// function showResults() {
//   if (isSumEntered && isAmountOfPeopleEntered) {
//     let tipAmountResult = (sum * tip) / 100 / amountOfPeople;
//     let totalResult = (sum + (sum * tip) / 100) / amountOfPeople;
//     resultTipSpan.innerText = "$" + tipAmountResult.toFixed(2);
//     resultTotalSpan.innerText = "$" + totalResult.toFixed(2);
//   }

//   return;
// }

// function clearResults() {
//   resultTipSpan.innerText = "$0.00";
//   resultTotalSpan.innerText = "$0.00";

//   sum = null;
//   isSumEntered = false;

//   amountOfPeople = null;
//   isAmountOfPeopleEntered = false;
// }

// form.addEventListener("submit", (event) => {
//   event.preventDefault();
// });

// billInput.addEventListener("blur", (event) => {
//   handleBlur(event);
//   const isValid = isSuccessful(event.target);
//   if (isValid) {
//     isSumEntered = true;
//     sum = +billInput.value;
//     showResults();
//   }
// });

// amountOfPeopleInput.addEventListener("blur", (event) => {
//   handleBlur(event);
//   const isValid = isSuccessful(event.target);
//   const isNotEmpty = event.target.value > 0;
//   if (isValid && isNotEmpty) {
//     isAmountOfPeopleEntered = true;
//     amountOfPeople = +amountOfPeopleInput.value;
//     showResults();
//   }
// });

// tipInput.addEventListener("click", (event) => {
//   const target = event.target;
//   if (target.type !== "radio") return;
//   if (target.checked) {
//     tip = target.value;
//     showResults();
//   }
// });

// resetButton.addEventListener("click", () => {
//   const inputs = document.querySelectorAll('input[type="text"]');
//   for (let input of inputs) {
//     clearError(input);
//     clearSuccessful(input);
//     resetInput(input);
//   }
//   customTip.classList.remove("error", "successful");
//   customTip.value = "";
//   clearResults();
// });

// customTip.addEventListener("blur", (event) => {
//   const value = customTip.value;
//   const inputValidation = isValueValid(value, validations);
//   if (inputValidation.result) {
//     const fieldset = document.querySelector("fieldset");
//     const span = fieldset.querySelector("span");
//     const allInputs = fieldset.querySelectorAll("input");
//     for (let input of allInputs) {
//       input.checked = false;
//     }
//     span.innerText = "";
//     customTip.classList.remove("error");
//     customTip.classList.add("successful");

//     tip = +customTip.value;
//   }
//   if (!inputValidation.result) {
//     customTip.classList.remove("successful");
//     customTip.classList.add("error");
//     const fieldset = document.querySelector("fieldset");
//     const span = fieldset.querySelector("span");
//     span.innerText = inputValidation.error;
//     span.classList.add("error");
//   }
//   if (customTip.value === "") {
//     customTip.classList.remove("error");
//     customTip.classList.remove("successful");
//   }
// });
