/* ==========================================================
   OSCA Nature Travel for Safari – script.js
   ========================================================== */

/* ----------------------------------------------------------
   1. WHATSAPP NUMBER  (EDIT THIS)
   Replace the placeholder text between the quotes with the
   company's WhatsApp number in INTERNATIONAL format, digits
   only: no plus sign, no spaces, no dashes.
   Tanzania example format: 2557XXXXXXXX  (country code 255,
   then the number without its leading 0).
   Until a real number is added, the buttons show a reminder
   message instead of opening WhatsApp.
   ---------------------------------------------------------- */
const WHATSAPP_NUMBER = "255783070362";

/* Message sent when someone presses the general contact button (EDIT if you like). */
const GENERAL_MESSAGE =
  "Hello OSCA Nature Travel for Safari, I would like to ask about your safari packages. Please share the available options, confirmed prices and availability.";

/* ----------------------------------------------------------
   2. REUSABLE WHATSAPP BOOKING FUNCTION
   openWhatsApp("message text") opens WhatsApp with that message
   already typed. The visitor must still press Send themselves.
   ---------------------------------------------------------- */
function openWhatsApp(message) {
  // A valid number is 8 to 15 digits only.
  if (!/^\d{8,15}$/.test(WHATSAPP_NUMBER)) {
    showToast("WhatsApp number not set yet. Open script.js and replace REPLACE_WITH_WHATSAPP_NUMBER with the company number (digits only, no plus sign).");
    return;
  }
  const url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
  window.open(url, "_blank", "noopener");
}

/* Builds the message for one package. EDIT the wording here if needed. */
function bookPackage(packageName) {
  openWhatsApp(
    "Hello OSCA Nature Travel for Safari, I am interested in the " + packageName +
    ". Please share the confirmed price, availability, itinerary and package inclusions."
  );
}

/* ----------------------------------------------------------
   3. SMALL MESSAGE BAR
   ---------------------------------------------------------- */
let toastTimer;
function showToast(text) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = text;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { toast.classList.remove("show"); }, 7000);
}

/* ----------------------------------------------------------
   4. PAGE SETUP (runs when the page has loaded)
   ---------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", function () {

  // "Book This Safari" buttons: each uses its data-package name from index.html
  document.querySelectorAll(".book-btn").forEach(function (button) {
    button.addEventListener("click", function () {
      bookPackage(button.dataset.package);
    });
  });

  // General "Contact Us on WhatsApp" button
  const contactButton = document.getElementById("contactWhatsApp");
  if (contactButton) {
    contactButton.addEventListener("click", function () {
      openWhatsApp(GENERAL_MESSAGE);
    });
  }

  // Mobile menu open/close
  const navToggle = document.getElementById("navToggle");
  const siteNav = document.getElementById("siteNav");
  function setMenu(open) {
    siteNav.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  navToggle.addEventListener("click", function () {
    setMenu(!siteNav.classList.contains("open"));
  });
  siteNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () { setMenu(false); });
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") setMenu(false);
  });

  // Footer year updates itself
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});
