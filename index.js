let results = [];
const resultTable = document.getElementById("result");

function calculatePricePerMeterFormula(price, count, meter, type) {
  if (type === "single") {
    return price / (count * meter);
  } else if (type === "double") {
    return price / (count * meter * 2);
  } else {
    throw new Error("Invalid type");
  }
}

function clearResults() {
  const result = document.getElementById("result");
  result.innerHTML = "";
  results = [];
}

function clearInputs() {
  const form = document.querySelector("form");
  form.reset();
}

function clearForm() {
  clearResults();
  clearInputs();
}

function calculatePricePerMeter() {
  const price = document.getElementById("price").value;
  const count = document.getElementById("count").value;
  const meter = document.getElementById("meter").value;

  const typeRadios = document.querySelectorAll("input[name='btnradio']");
  let type;
  for (const radio of typeRadios) {
    if (radio.checked) {
      type = radio.value;
      break;
    }
  }

  const result = document.getElementById("result");

  try {
    const pricePerMeter = calculatePricePerMeterFormula(price, count, meter, type);
    const typeString = type === "single" ? "シングル" : "ダブル";
    results.unshift([price, count, meter, typeString, pricePerMeter.toFixed(2)]);

    if (results.length > 5) {
      results.pop();
    }

    const tableHeader = `
      <tr>
        <th>価格</th>
        <th>個数</th>
        <th>長さ</th>
        <th>タイプ</th>
        <th>1m/円</th>
      </tr>
    `;

    const tableBody = results.map(result => `
      <tr>
        <td>${result[0]}円</td>
        <td>${result[1]}個</td>
        <td>${result[2]}m</td>
        <td>${result[3]}</td>
        <td>${result[4]}円</td>
      </tr>
    `).join('');

    resultTable.innerHTML = `
    <p>計算結果</p>
    <table class="table table-striped table-sm">
        ${tableHeader}
        ${tableBody}
      </table>
    `;
  } catch (error) {
    resultTable.innerHTML = "計算できませんでした。";
    console.error(error);
  }

}

function moveToNextInput(event) {
  const target = event.target;
  const maxLength = parseInt(target.maxLength);
  const currentLength = target.value.length;

  if (currentLength >= maxLength) {
    const form = target.form;
    const index = Array.prototype.indexOf.call(form, target);
    form.elements[index + 1].focus();
  }
}

function checkMaxLength(event) {
    const target = event.target;
    const maxLength = parseInt(target.maxLength);
    const currentLength = target.value.length;
  
    if (currentLength >= maxLength) {
      const form = target.form;
      const index = Array.prototype.indexOf.call(form, target);
      form.elements[index + 1].focus();
    }
  }

function moveToNextOnEnter(event) {
    const target = event.target;
    const form = target.form;
    const index = Array.prototype.indexOf.call(form, target);
  
    if (event.key === "Enter" || event.key === "NumpadEnter") {
      event.preventDefault();
      if (index < form.length - 1) {
        form.elements[index + 1].focus();
      } else {
        form.elements[0].focus();
      }
    }
  }
  
  document.getElementById("price").addEventListener("input", function (event) {
    checkMaxLength(event);
    moveToNextInput(event);
  });
  
  document.getElementById("count").addEventListener("input", function (event) {
    checkMaxLength(event);
    moveToNextInput(event);
  });
  
  document.getElementById("meter").addEventListener("input", function (event) {
    checkMaxLength(event);
    moveToNextInput(event);
  });
  
  document.getElementById("price").addEventListener("keydown", moveToNextOnEnter);
  document.getElementById("count").addEventListener("keydown", moveToNextOnEnter);
  document.getElementById("meter").addEventListener("keydown", moveToNextOnEnter);
  
  document.querySelector('input[type="button"]').addEventListener("click", function () {
    calculatePricePerMeter();
    clearInputs();
  });
  
  document.getElementById("clear-all-button").addEventListener("click", clearForm);
  
