async function getUserInfo() {
  const userId = localStorage.getItem("id");
  const response = await axios.get(
    "http://localhost:3000/users/profile",
    userId
  );
  const user = response.data.data;
}

function logOut() {
  localStorage.removeItem("email");
  localStorage.removeItem("id");
  localStorage.removeItem("balance");
  window.location.href = "/";
}

function init() {
  if (
    !localStorage.getItem("email") &&
    !localStorage.getItem("id") &&
    !localStorage.getItem("balance")
  ) {
    window.location.href = "/";
  }
  const email = document.getElementById("Email");
  const userId = document.getElementById("UserId");
  const balance = document.getElementById("Balance");
  email.innerText = localStorage.getItem("email");
  userId.innerText = localStorage.getItem("id");
  balance.innerText = "$" + localStorage.getItem("balance");
}

async function handleTransaction(transactionType) {
  try {
    const balanceElement = document.getElementById("Balance");
    const storedBalance = parseFloat(localStorage.getItem("balance"));
    const inputAmount = parseFloat(
      document.getElementById("AmountInput").value
    );

    // Check if the input amount is a valid number and not negative
    if (isNaN(inputAmount) || inputAmount <= 0) {
      alert("Please enter a valid, positive amount.");
      return;
    }

    let totalBalance;

    if (transactionType === "deposit") {
      totalBalance = storedBalance + inputAmount;
    } else if (transactionType === "withdraw") {
      totalBalance = storedBalance - inputAmount;

      // Check if the withdrawal amount exceeds the balance
      if (totalBalance < 0) {
        alert("Withdrawal amount cannot exceed your balance.");
        return;
      }
    }

    const userId = localStorage.getItem("id");
    const user = {
      id: userId,
      amount: inputAmount,
    };

    const response = await axios.post(
      `http://localhost:3000/users/${transactionType}`,
      user
    );

    if (response.status === 200) {
      localStorage.setItem("balance", totalBalance.toString());
      balanceElement.innerText = `$${totalBalance}`;
      alert(`${transactionType} successful`);

      // Reset the input field
      document.getElementById("AmountInput").value = "";
    } else {
      alert(`${transactionType} failed. Try again later`);
    }
  } catch (error) {
    console.error(error);
    alert("Error. Please try again later");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  init();
  const depositButton = document.getElementById("DepositButton");
  const withdrawButton = document.getElementById("WithdrawButton");

  depositButton.addEventListener("click", function (event) {
    event.preventDefault();
    handleTransaction("deposit");
  });

  withdrawButton.addEventListener("click", function (event) {
    event.preventDefault();
    handleTransaction("withdraw");
  });
});
