const apiUrl =
  "https://v6.exchangerate-api.com/v6/e9844e162343291d05b4de26/latest/USD";

let list;
let currencies;
let currenciesVlues;
let exchangeRate;
const firstCurrencyList = document.getElementById("firstCurrency");
const secondCurrencyList = document.getElementById("secondCurrency");
const firstCurrencyValue = document.getElementById("firstCurrencyValue");
const secondCurrencyValue = document.getElementById("secondCurrencyValue");
const rate = document.getElementById("rate");

async function getData() {
  const response = await fetch(apiUrl);
  const data = await response.json();
  list = data.conversion_rates;
  currencies = Object.keys(list);
  currenciesVlues = Object.values(list);
  currencies.forEach(function (value, index) {
    firstCurrencyList.innerHTML += `<option id="${value}" data-price="${currenciesVlues[index]}">${value}</option>`;
    secondCurrencyList.innerHTML += `<option id="${value}2" data-price="${currenciesVlues[index]}">${value}</option>`;
  });

  document.getElementById("EUR2").setAttribute("selected", "selected");
  rate.innerHTML = `1 ${currencies[0]} = ${currenciesVlues[43]} ${currencies[43]}`;
  document
    .getElementById("secondCurrencyValue")
    .setAttribute("value", `${currenciesVlues[43]}`);

  console.log(currencies.indexOf("EUR"));
  console.log(list);
}

getData();

const updateExchangeRate = () => {
  exchangeRate =
    currenciesVlues[currencies.indexOf(secondCurrencyList.value)] /
    currenciesVlues[currencies.indexOf(firstCurrencyList.value)];
};

const updateHint = () => {
  rate.innerHTML = `1 ${firstCurrencyList.value} = ${exchangeRate.toFixed(4)} ${
    secondCurrencyList.value
  }`;
};

function updateSecondCurrencyValue() {
  secondCurrencyValue.setAttribute(
    "value",
    `${(firstCurrencyValue.value * exchangeRate).toFixed(4)}`
  );
  firstCurrencyValue.setAttribute("value", `${firstCurrencyValue.value}`);
}

function updateAll() {
  updateExchangeRate();
  updateHint();
  updateSecondCurrencyValue();
}

firstCurrencyList.addEventListener("change", updateAll);

secondCurrencyList.addEventListener("change", updateAll);

firstCurrencyValue.addEventListener("change", updateAll);

secondCurrencyValue.addEventListener("change", function () {
  updateExchangeRate();
  updateHint();
  firstCurrencyValue.setAttribute(
    "value",
    `${(secondCurrencyValue.value / exchangeRate).toFixed(4)}`
  );
});

function swap() {
  let a = firstCurrencyList.value;
  console.log(a);

  firstCurrencyList.setAttribute("value", `${secondCurrencyList.value}`);
  secondCurrencyList.setAttribute("value", `${a}`);
}
