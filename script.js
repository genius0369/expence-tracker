let expenses = [];

fetch("data.json")
  .then(response => response.json())
  .then(data => {
    expenses = data;
    showExpenses();
  });

function addExpense() {
  const title = document.getElementById("title").value;
  const amount = document.getElementById("amount").value;

  if (title === "" || amount === "") {
    alert("Please fill all fields");
    return;
  }

  expenses.push({
    title: title,
    amount: Number(amount)
  });

  saveToLocal();
  showExpenses();

  document.getElementById("title").value = "";
  document.getElementById("amount").value = "";
}

function showExpenses() {
  const list = document.getElementById("expenseList");
  const totalText = document.getElementById("total");

  list.innerHTML = "";
  let total = 0;

  expenses.forEach((expense, index) => {
    total += expense.amount;

    const li = document.createElement("li");
    li.innerHTML = `
      ${expense.title} - ₹${expense.amount}
      <button onclick="deleteExpense(${index})">X</button>
    `;
    list.appendChild(li);
  });

  totalText.innerText = total;
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  saveToLocal();
  showExpenses();
}

function saveToLocal() {
  localStorage.setItem("expenses_backup", JSON.stringify(expenses));
}
