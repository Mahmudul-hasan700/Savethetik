const btnPaste = document.querySelector(".btn-paste");
const inputUrl = document.getElementById("url");

btnPaste.addEventListener("click", function() {
  btnPaste.classList.contains("active")
    ? (inputUrl.value = "", document.querySelector(".btn-paste span").innerHTML = lang.paste)
    : navigator.clipboard.readText().then(function(e) {
        "" != e ? (inputUrl.value = e, showBtnClear()) : showAlert(lang.linkEmpty);
      });
});

inputUrl.addEventListener("keyup", function(e) {
  inputUrl.value.length > 0 && showBtnClear();
  hideAlert();
});

const alertEL = document.getElementById("alert");

(document.querySelectorAll(".modal-background, .modal-close, .btn-modal-close") || []).forEach(e => {
  let t = e.closest(".modal-down");
  e.addEventListener("click", () => {
    closeModal(t);
  });
});

document.addEventListener("keydown", e => {
  27 === (e || window.event).keyCode && closeAllModals();
});

const showBtnClear = () => {
  btnPaste.classList.add("active");
  document.querySelector(".btn-paste span").innerHTML = lang.clear;
};

const hideAlert = () => {
  alertEL.classList.remove("active");
  alertEL.innerHTML = "";
};

const toggleSwitch = document.querySelector(".btn-darkmode");
toggleSwitch.addEventListener("click", function() {
  document.body.classList.toggle("dark-theme");
  var e = document.body.classList.contains("dark-theme") ? "dark" : "light";
  localStorage.setItem("theme", e);
});
