function calculateStrength(password) {
  const length = password.length;
  let strength = 0;
  if (length > 6) {
    strength++;
  }
  if (length >= 15) {
    strength++;
  }
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) {
    strength++;
  }
  if (/\d/.test(password)) {
    strength++;
  }
  if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
    strength++;
  }
  if (length >= 20) {
    strength++;
  }
  return strength;
}
function calculateTimeToCrack(strength) {
  if (strength == 0) {
    return "Instantly";
  } else if (strength == 1) {
    return "Very quickly";
  } else if (strength <= 3) {
    return "Few days";
  } else if (strength <= 5) {
    return "Few months";
  } else if (strength == 6) {
    return "Few years";
  } else {
    return "Many years";
  }
}

let container = document.querySelector(".container");
let timer;
let passwordInput = document.querySelector("#YourPassword");
function handlePasswordChange() {
  clearTimeout(timer);
  timer = setTimeout(function () {
    let password = passwordInput.value.trim();
    if (password === "") {
      container.classList.remove("very-weak");
      container.classList.remove("weak");
      container.classList.remove("moderate");
      container.classList.remove("strong");
      container.classList.remove("very-strong");
      return;
    }
    let strength = calculateStrength(password);
    let timeToCrack = calculateTimeToCrack(strength);
    document.querySelector(".timeToCrack").innerText = "Estimated time to crack: " + timeToCrack;
    container.classList.remove("very-weak");
    container.classList.remove("weak");
    container.classList.remove("moderate");
    container.classList.remove("strong");
    container.classList.remove("very-strong");
    if (strength == 0) {
      container.classList.add("very-weak");
    } else if (strength == 1) {
      container.classList.add("weak");
    } else if (strength <= 3) {
      container.classList.add("moderate");
    } else if (strength <= 5) {
      container.classList.add("strong");
    } else {
      container.classList.add("very-strong");
    }
  }, 500);
}
passwordInput.addEventListener("input", handlePasswordChange);
let show = document.querySelector(".show");
show.onclick = function () {
  if (passwordInput.type === "password") {
    passwordInput.setAttribute("type", "text");
    show.classList.add("hide");
  } else {
    passwordInput.setAttribute("type", "password");
    show.classList.remove("hide");
  }
};