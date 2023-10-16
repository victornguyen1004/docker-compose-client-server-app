async function handleSubmit(event) {
  event.preventDefault();
  const email = document.getElementById("Email").value;
  const password = document.getElementById("Password").value;
  const user = {
    email,
    password,
  };
  try {
    const response = await axios.post(
      "http://localhost:8080/users/login",
      user
    );
    if (response.status === 200) {
      localStorage.setItem("email", response.data.data.email);
      localStorage.setItem("id", response.data.data._id);
      localStorage.setItem("balance", response.data.data.balance);
      window.location.href = "/profile";
    }
  } catch (error) {
    alert("Wrong email or password! Please try again.");
  }
}

function logOut() {
  localStorage.removeItem("email");
  localStorage.removeItem("balance");
  localStorage.removeItem("id");
}
