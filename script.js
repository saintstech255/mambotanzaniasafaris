
/* ==========================================================
   MAMBO TANZANIA SAFARIS – SCRIPT.JS
   WhatsApp Booking + Mobile Menu + Sun Journey Animation
   ========================================================== */

/* ----------------------------------------------------------
   1. WHATSAPP SETTINGS
   ---------------------------------------------------------- */

const WHATSAPP_NUMBER = "255685645498";

const GENERAL_MESSAGE =
  "Hello Mambo Tanzania safaris, I would like to ask about your safari packages. Please share the available options, confirmed prices and availability.";


/* ----------------------------------------------------------
   2. WHATSAPP BOOKING
   ---------------------------------------------------------- */

function openWhatsApp(message) {
  if (!/^\d{8,15}$/.test(WHATSAPP_NUMBER)) {
    showToast("WhatsApp number is not set correctly.");
    return;
  }

  const url =
    "https://wa.me/" +
    WHATSAPP_NUMBER +
    "?text=" +
    encodeURIComponent(message);

  window.open(url, "_blank", "noopener");
}

function bookPackage(packageName) {
  openWhatsApp(
    "Hello Mambo Tanzania Safari, I am interested in the " +
    packageName +
    ". Please share the confirmed price, availability, itinerary and package inclusions."
  );
}


/* ----------------------------------------------------------
   3. TOAST MESSAGE
   ---------------------------------------------------------- */

let toastTimer;

function showToast(text) {
  const toast = document.getElementById("toast");

  if (!toast) return;

  toast.textContent = text;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(function () {
    toast.classList.remove("show");
  }, 7000);
}


/* ----------------------------------------------------------
   4. SUN JOURNEY ANIMATION
   ---------------------------------------------------------- */

function initSunJourney() {
  const journey = document.querySelector(".sun-journey");

  if (!journey) return;

  const sun = journey.querySelector(".sun");
  const moon = journey.querySelector(".moon");
  const sky = journey.querySelector(".sky");
  const stars = journey.querySelector(".stars");

  if (!sun || !moon || !sky || !stars) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  let ticking = false;

  function updateJourney() {
    const scrollableHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress = scrollableHeight > 0
      ? Math.min(1, Math.max(0, window.scrollY / scrollableHeight))
      : 0;

    /*
      SUN MOVEMENT
      Starts in the upper sky and moves towards the horizon.
    */

    const sunTop = 15 + progress * 82;
    const sunLeft = 70 - progress * 38;

    sun.style.top = sunTop + "%";
    sun.style.left = sunLeft + "%";

    /*
      SKY COLOUR TRANSITIONS
      Morning -> Midday -> Sunset -> Night
    */

    let skyColor;

    if (progress < 0.35) {
      skyColor = `
        linear-gradient(
          to bottom,
          #65b9e8 0%,
          #a9d9ed 55%,
          #f5d49a 100%
        )
      `;
    } else if (progress < 0.65) {
      skyColor = `
        linear-gradient(
          to bottom,
          #f4a66d 0%,
          #e98a68 55%,
          #7b557e 100%
        )
      `;
    } else {
      skyColor = `
        linear-gradient(
          to bottom,
          #111c3b 0%,
          #25294d 55%,
          #49365e 100%
        )
      `;
    }

    sky.style.background = skyColor;

    /*
      SUNLIGHT FADES AS NIGHT APPROACHES
    */

    const sunOpacity = Math.max(
      0,
      1 - Math.max(0, (progress - 0.48) / 0.17)
    );

    sun.style.opacity = sunOpacity;

    /*
      MOON APPEARS DURING TWILIGHT
    */

    const moonOpacity = Math.min(
      1,
      Math.max(0, (progress - 0.55) / 0.18)
    );

    moon.style.opacity = moonOpacity;

    /*
      STARS GRADUALLY APPEAR
    */

    const starsOpacity = Math.min(
      1,
      Math.max(0, (progress - 0.58) / 0.20)
    );

    stars.style.opacity = starsOpacity;

    ticking = false;
  }

  function requestUpdate() {
    if (reducedMotion || ticking) return;

    ticking = true;
    window.requestAnimationFrame(updateJourney);
  }

  window.addEventListener("scroll", requestUpdate, {
    passive: true
  });

  window.addEventListener("resize", requestUpdate);

  updateJourney();
}


/* ----------------------------------------------------------
   5. PAGE SETUP
   ---------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", function () {

  // Safari booking buttons

  document.querySelectorAll(".book-btn").forEach(function (button) {
    button.addEventListener("click", function () {
      bookPackage(button.dataset.package);
    });
  });


  // General WhatsApp contact button

  const contactButton = document.getElementById("contactWhatsApp");

  if (contactButton) {
    contactButton.addEventListener("click", function () {
      openWhatsApp(GENERAL_MESSAGE);
    });
  }


  // Mobile navigation

  const navToggle = document.getElementById("navToggle");
  const siteNav = document.getElementById("siteNav");

  if (navToggle && siteNav) {

    function setMenu(open) {
      siteNav.classList.toggle("open", open);

      navToggle.setAttribute(
        "aria-expanded",
        String(open)
      );

      navToggle.setAttribute(
        "aria-label",
        open ? "Close menu" : "Open menu"
      );
    }

    navToggle.addEventListener("click", function () {
      setMenu(!siteNav.classList.contains("open"));
    });

    siteNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setMenu(false);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        setMenu(false);
      }
    });
  }


  // Automatic footer year

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  // Start Sun Journey

  initSunJourney();

});

