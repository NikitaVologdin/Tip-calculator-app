const form = document.getElementById("form") as HTMLFormElement;
const billInput = document.getElementById("bill") as HTMLInputElement;
const tipFieldset = document.getElementById("selectTip") as HTMLFieldSetElement;
const customTip = document.getElementById("custom") as HTMLInputElement;
const amountOfPeopleInput = document.getElementById(
  "people"
) as HTMLInputElement;
const resultTipSpan = document.getElementById("tipAmount") as HTMLSpanElement;
const resultTotalSpan = document.getElementById(
  "totalAmount"
) as HTMLSpanElement;
const resetButton = document.getElementById("reset") as HTMLButtonElement;

let sum = 0;
let isSumEntered = false;

let amountOfPeople = 0;
let isAmountOfPeopleEntered = false;

let tip: number;

const validations = {
  isNumber: (value: string) => {
    const result = !isNaN(+value);
    const error = "Not a number";
    return { result, error };
  },
  isPositive: (value: string) => {
    const result = +value >= 0;
    const error = "Not positive";
    return { result, error };
  },
  isZero: (value: string) => {
    const result = +value != 0;
    const error = "Can't be null";
    return { result, error };
  },
};

interface validations {
  [isNumber: string]: (value: string) => validationResult;
  [isPositive: string]: (value: string) => validationResult;
  [isZero: string]: (value: string) => validationResult;
}

interface validationResult {
  result: boolean;
  error: string;
}

function isValueValid(value: string, validations: validations) {
  const trimedValue = value.trim();
  let result = { result: true, error: "" };
  for (let key in validations) {
    const validation = validations[key](trimedValue);
    if (!validation.result) {
      result = validation;
      break;
    }
  }
  return result;
}

function setError(input: HTMLInputElement, error: string) {
  const span = input.parentNode!.querySelector("span");
  span!.classList.add("error");
  span!.innerText = error;
}

function clearError(input: HTMLInputElement) {
  const span = input.parentNode!.querySelector("span");
  if (!span) return;
  span.classList.remove("error");
  span.innerText = "";
}

function setSuccessful(input: HTMLInputElement) {
  const span = input.parentNode!.querySelector("span");
  span!.classList.add("successful");
}

function clearSuccessful(input: HTMLInputElement) {
  const span = input.parentNode!.querySelector("span");
  span!.classList.remove("successful");
}

function isSuccessful(input: HTMLInputElement) {
  const parent = input.parentNode!;
  const span = parent.querySelector("span")!;
  return span.classList.contains("successful");
}

function resetInput(input: HTMLInputElement) {
  input.value = "";
}

function isEmpty(value: string) {
  return value.length === 0;
}

function handleBlur(event: UIEvent) {
  const input = event.target as HTMLInputElement;
  const value = input.value.trim();
  const empty = isEmpty(value);
  const inputValidation = isValueValid(value, validations);
  if (inputValidation.result && !empty) {
    clearError(input);
    setSuccessful(input);
  }
  if (!inputValidation.result && !empty) {
    clearSuccessful(input);
    setError(input, inputValidation.error);
  }
  if (empty) {
    clearError(input);
    clearSuccessful(input);
  }
}

function showResults() {
  if (isSumEntered && isAmountOfPeopleEntered) {
    let tipAmountResult = (sum * tip) / 100 / amountOfPeople;
    let totalResult = (sum + (sum * tip) / 100) / amountOfPeople;
    resultTipSpan.innerText = "$" + tipAmountResult.toFixed(2);
    resultTotalSpan.innerText = "$" + totalResult.toFixed(2);
  }

  return;
}

function clearResults() {
  resultTipSpan.innerText = "$0.00";
  resultTotalSpan.innerText = "$0.00";

  sum = 0;
  isSumEntered = false;

  amountOfPeople = 0;
  isAmountOfPeopleEntered = false;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
});

billInput.addEventListener("input", (event) => {
  handleBlur(event as UIEvent);
  const isValid = isSuccessful(event.target as HTMLInputElement);
  if (isValid) {
    isSumEntered = true;
    sum = +billInput.value;
    showResults();
  }
});

amountOfPeopleInput.addEventListener("input", (event) => {
  const input = event.target as HTMLInputElement;
  handleBlur(event as UIEvent);
  const isValid = isSuccessful(input);
  const isNotEmpty = +input.value > 0;
  if (isValid && isNotEmpty) {
    isAmountOfPeopleEntered = true;
    amountOfPeople = +amountOfPeopleInput.value;
    showResults();
  }
});

tipFieldset.addEventListener("click", (event: MouseEvent) => {
  const target = event.target as HTMLInputElement;
  if (target.type !== "radio") return;
  if (target.checked) {
    tip = +target.value;
    showResults();
  }
});

resetButton.addEventListener("click", () => {
  const inputs = document.querySelectorAll(
    'input[type="text"]'
  ) as NodeListOf<HTMLInputElement>;
  const radioInputs = document.querySelectorAll(
    'input[type="radio"]'
  ) as NodeListOf<HTMLInputElement>;
  for (let input of inputs) {
    clearError(input);
    clearSuccessful(input);
    resetInput(input);
  }
  for (let input of radioInputs) {
    input.checked = false;
  }
  customTip.classList.remove("error", "successful");
  customTip.value = "";
  clearResults();
});

customTip.addEventListener("input", (event) => {
  const value = customTip.value;
  const inputValidation = isValueValid(value, validations);
  if (inputValidation.result) {
    const fieldset = document.querySelector("fieldset")!;
    const span = fieldset.querySelector("span")!;
    const allInputs = fieldset.querySelectorAll(
      "input"
    ) as NodeListOf<HTMLInputElement>;
    for (let input of allInputs) {
      input.checked = false;
    }
    span.innerText = "";
    customTip.classList.remove("error");
    customTip.classList.add("successful");

    tip = +customTip.value;
  }
  if (!inputValidation.result) {
    customTip.classList.remove("successful");
    customTip.classList.add("error");
    const fieldset = document.querySelector("fieldset")!;
    const span = fieldset.querySelector("span")!;
    span.innerText = inputValidation.error;
    span.classList.add("error");
  }
  if (customTip.value === "") {
    customTip.classList.remove("error");
    customTip.classList.remove("successful");
  }
});
