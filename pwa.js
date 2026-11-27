/* DigiCafe Progressive Web App setup */
(() => {
  const isStandalone = () =>
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true;

  let installPrompt = null;

  const style = document.createElement("style");
  style.textContent = `
    #digicafe-install-button{position:fixed;right:16px;bottom:18px;z-index:10001;
      display:none;align-items:center;gap:9px;padding:12px 16px;border:0;border-radius:999px;
      background:#102f55;color:#fff;font:700 14px Inter,system-ui,sans-serif;
      box-shadow:0 8px 26px rgba(16,47,85,.28);cursor:pointer}
    #digicafe-install-button.visible{display:flex}
    #digicafe-install-note{position:fixed;left:16px;right:16px;bottom:78px;z-index:10002;
      display:none;max-width:440px;margin:auto;padding:14px 16px;border:1px solid #b8c6d4;
      border-radius:14px;background:#fff;color:#101d2d;font:14px/1.5 Inter,system-ui,sans-serif;
      box-shadow:0 8px 26px rgba(16,47,85,.18)}
    #digicafe-install-note.visible{display:block}
    #digicafe-install-note button{float:right;border:0;background:transparent;font-size:20px;cursor:pointer}
    @media(min-width:900px){#digicafe-install-button{right:24px;bottom:24px}}
  `;
  document.head.appendChild(style);

  const installButton = document.createElement("button");
  installButton.id = "digicafe-install-button";
  installButton.type = "button";
  installButton.setAttribute("aria-label", "Install DigiCafe app");
  installButton.innerHTML = '<span aria-hidden="true">⬇</span> Install DigiCafe';
  document.body.appendChild(installButton);

  const note = document.createElement("div");
  note.id = "digicafe-install-note";
  note.setAttribute("role", "status");
  note.innerHTML = '<button type="button" aria-label="Close">×</button><strong>Install DigiCafe</strong><br>On iPhone or iPad, open this website in Safari, tap Share, then choose “Add to Home Screen”.';
  document.body.appendChild(note);
  note.querySelector("button").addEventListener("click", () => note.classList.remove("visible"));

  const hideInstall = () => {
    installButton.classList.remove("visible");
    note.classList.remove("visible");
  };

  if ("serviceWorker" in navigator && location.protocol === "https:") {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/Digicafe/sw.js", { scope: "/Digicafe/" })
        .catch(error => console.warn("DigiCafe offline support could not be enabled:", error));
    });
  }

  window.addEventListener("beforeinstallprompt", event => {
    event.preventDefault();
    installPrompt = event;
    if (!isStandalone()) installButton.classList.add("visible");
  });

  installButton.addEventListener("click", async () => {
    if (installPrompt) {
      installPrompt.prompt();
      await installPrompt.userChoice;
      installPrompt = null;
      hideInstall();
    } else {
      note.classList.add("visible");
    }
  });

  window.addEventListener("appinstalled", () => {
    installPrompt = null;
    hideInstall();
  });

  if (isStandalone()) hideInstall();
})();
