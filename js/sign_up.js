const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

function register() {
  const username = document.getElementById("reg-username").value;
  const password = document.getElementById("reg-password").value;

  if (username === "" || password === "") {
    document.querySelector(".messenger").innerHTML = "Vui lòng nhập thông tin";
    return;
  }

  if (password.length < 6) {
    document.getElementById("messenger").innerText =
      "Mật khẩu phải ít nhất 6 ký tự!";
    return;
  }

  if (localStorage.getItem(username)) {
    document.querySelector(".messenger").innerHTML = "Tài khoản đã tồn tại";
  } else {
    localStorage.setItem(username, password);
    localStorage.setItem("currentUser", username);
    document.querySelector(".messenger").innerHTML = "Đăng kí thành công";

    setTimeout(() => {
      window.location.href = "/index.html";
    }, 1000);
  }
}

function login() {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  const savedPassword = localStorage.getItem(username);

  if (savedPassword && password === savedPassword) {
    document.querySelector(".message").innerText = "Đăng nhập thành công!";
    localStorage.setItem("currentUser", username);

    setTimeout(() => {
      window.location.href = "/index.html";
    }, 1000);
  } else {
    document.querySelector(".message").innerText =
      "Sai tên, mật khẩu hoặc chưa đăng kí tài khoản";
  }

  if (username === "" || password === "") {
    document.querySelector(".message").innerHTML = "Vui lòng nhập thông tin";
    return;
  }
}
