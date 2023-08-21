const toggleSwitch = document.querySelector(".btn-darkmode");
toggleSwitch.addEventListener("click", function() {
  document.body.classList.toggle("dark-theme");
  var e = document.body.classList.contains("dark-theme") ? "dark" : "light";
  localStorage.setItem("theme", e);
});

const btnPaste = document.querySelector(".btn-paste");
const inputUrl = document.getElementById("url");

btnPaste.addEventListener("click", function() {
  btnPaste.classList.contains("active")
    ? (inputUrl.value = "", document.querySelector(".btn-paste span").innerHTML = lang.paste)
    : navigator.clipboard.readText().then(function(e) {
        "" != e ? (inputUrl.value = e, showBtnClear()) : showAlert(lang.linkEmpty);
      });
});

navigator.clipboard && (btnPaste.style.display = "flex");

inputUrl.addEventListener("keyup", function(e) {
  inputUrl.value.length > 0 && showBtnClear();
  hideAlert();
});

const alertEL = document.getElementById("alert");

const shareButton = document.querySelector(".share-button");
shareButton.addEventListener("click", e => {
  navigator.share
    ? navigator.share({
        title: "Share SnapTik",
        url: "https://snaptik.app/" + lang.currentLang
      }).then(() => {
        sendEvent("Share_sucs_by_webapi");
      }).catch(console.error)
    : sendEvent("Share_webapi_not_support");
  sendEvent("share_click_btnShare");
});
