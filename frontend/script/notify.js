// Small, dependency-free toast notifications shared by interactive pages.
(function initializeNotifications() {
  const host = document.createElement("div");
  host.className = "toast-stack";
  host.setAttribute("aria-live", "polite");
  host.setAttribute("aria-relevant", "additions");
  host.setAttribute("aria-label", "Notifications");
  document.body.append(host);

  function dismiss(toast) {
    if (toast.dataset.dismissing === "true") return;
    toast.dataset.dismissing = "true";
    toast.classList.add("is-dismissing");
    window.setTimeout(() => toast.remove(), 180);
  }

  function show(type, message, duration = 5000) {
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.setAttribute("role", "status");

    const text = document.createElement("p");
    text.className = "toast-message";
    text.textContent = message;

    const close = document.createElement("button");
    close.className = "toast-close";
    close.type = "button";
    close.setAttribute("aria-label", "Dismiss notification");
    close.textContent = "\u00d7";
    close.addEventListener("click", () => dismiss(toast));

    toast.append(text, close);
    host.append(toast);
    const timer = window.setTimeout(() => dismiss(toast), duration);
    close.addEventListener("click", () => window.clearTimeout(timer), { once: true });
    return toast;
  }

  window.notify = {
    success: (message, duration) => show("success", message, duration),
    error: (message, duration) => show("error", message, duration),
    warning: (message, duration) => show("warning", message, duration),
    info: (message, duration) => show("info", message, duration),
  };

  window.addEventListener("offline", () => {
    window.notify.warning("You’re offline. Changes may not save until you reconnect.");
  });
  window.addEventListener("online", () => {
    window.notify.success("Your connection is back.");
  });
})();
