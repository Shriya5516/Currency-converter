const BASE_URL =
"https://v6.exchangerate-api.com/v6/74a0ff46cf67b62cc7627e28/latest/";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.getElementById("convertBtn");
const fromCurr = document.getElementById("fromCurrency");
const toCurr = document.getElementById("toCurrency");
const msg = document.getElementById("exchangeMsg");

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let option = document.createElement("option");
    option.value = currCode;
    option.innerText = currCode;

    if (select.id === "fromCurrency" && currCode === "USD") {
      option.selected = true;
    }
    if (select.id === "toCurrency" && currCode === "INR") {
      option.selected = true;
    }
    select.append(option);
  }

  select.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
}

async function updateExchangeRate() {
  let amount = document.getElementById("amount").value;
  if (amount <= 0) amount = 1;

  const res = await fetch(`${BASE_URL}${fromCurr.value}`);
  const data = await res.json();

  const rate = data.conversion_rates[toCurr.value];
  const finalAmount = (amount * rate).toFixed(2);

  msg.innerText = `${amount} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

function updateFlag(element) {
  let countryCode = countryList[element.value];
  let img = element.parentElement.querySelector("img");
  img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

btn.addEventListener("click", updateExchangeRate);
window.addEventListener("load", updateExchangeRate);

 

