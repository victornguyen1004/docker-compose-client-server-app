async function handleSubmit(event) {
  event.preventDefault();
  const email = document.getElementById("Email").value;
  const password = document.getElementById("Password").value;
  const reTypePassword = document.getElementById("ReTypePassword").value;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  if (!password.match(passwordRegex)) {
    alert(
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 8 characters long"
    );
    return;
  }
  if (password !== reTypePassword) {
    alert("Passwords do not match");
    return;
  }
  const user = {
    email,
    password,
    balance: 0,
  };
  try {
    const response = await axios.post(
      "http://localhost:3000/users/register",
      user
    );
    if (response.status === 201) {
      alert(
        "Registration successful. You will automatically redirect to your profile."
      );
      localStorage.setItem("email", user.email);
      localStorage.setItem("id", response.data.data._id);
      localStorage.setItem("balance", response.data.data.balance);
      window.location.href = "/profile";
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 409) {
        alert("User already exists. Please log in.");
        window.location.href = "/";
      } else {
        alert("Registration error. Please try again later.");
      }
    } else {
      console.error("Registration error:", error);
      alert("Registration error. Please try again later.");
    }
  }
}
