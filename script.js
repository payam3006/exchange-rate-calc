const apiUrl =
  "https://v6.exchangerate-api.com/v6/e9844e162343291d05b4de26/latest/USD";

async function getData() {
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
}

const data = getData();
