/* =========================================================
   NovaTech Solutions — Interacciones
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("navToggle");
  const links = document.querySelectorAll(".nav__link, .nav__cta");

  /* ---------- Menú móvil ---------- */
  const backdrop = document.createElement("div");
  backdrop.className = "nav-backdrop";
  document.body.appendChild(backdrop);

  const setMenu = (open) => {
    nav.classList.toggle("is-open", open);
    backdrop.classList.toggle("is-visible", open);
    document.body.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  };

  toggle.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
  backdrop.addEventListener("click", () => setMenu(false));
  links.forEach((link) => link.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      setMenu(false);
      toggle.focus();
    }
  });
  // Si se agranda la pantalla con el menú abierto, se cierra
  window.matchMedia("(min-width: 861px)").addEventListener("change", (e) => {
    if (e.matches) setMenu(false);
  });

  /* ---------- Encabezado, barra de progreso y botón "volver arriba" ---------- */
  const progress = document.getElementById("scrollProgress");
  const toTop = document.getElementById("toTop");
  const onScroll = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    header.classList.toggle("is-scrolled", y > 20);
    progress.style.setProperty("--progress", max > 0 ? (y / max).toFixed(4) : 0);
    toTop.classList.toggle("is-visible", y > window.innerHeight * 0.8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Enlace activo según la sección visible ---------- */
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav__link");
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((l) =>
          l.classList.toggle("is-active", l.getAttribute("href") === `#${entry.target.id}`)
        );
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => sectionObserver.observe(s));

  /* ---------- Aparición suave al hacer scroll ---------- */
  const revealItems = document.querySelectorAll(".reveal");
  // Pequeño escalonado entre elementos hermanos (tarjetas, cifras)
  revealItems.forEach((el) => {
    const siblings = [...el.parentElement.children].filter((c) => c.classList.contains("reveal"));
    el.style.transitionDelay = `${siblings.indexOf(el) * 90}ms`;
  });
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealItems.forEach((el) => revealObserver.observe(el));

  /* ---------- Brillo de las tarjetas que sigue al mouse ---------- */
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  });

  /* ---------- Contador animado de cifras ---------- */
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const animateCount = (el) => {
    const target = Number(el.dataset.count);
    if (reduceMotion) { el.textContent = target; return; }
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const countObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );
  document.querySelectorAll("[data-count]").forEach((el) => countObserver.observe(el));

  /* ---------- Validación del formulario de contacto ---------- */
  const form = document.getElementById("contactForm");
  const success = document.getElementById("formSuccess");
  const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const showError = (input, msg) => {
    const field = input.closest(".form__field");
    field.classList.toggle("has-error", Boolean(msg));
    field.querySelector(".form__error").textContent = msg;
    input.setAttribute("aria-invalid", msg ? "true" : "false");
  };

  const validate = (input) => {
    const value = input.value.trim();
    if (!value) return showError(input, "Este campo es obligatorio."), false;
    if (input.type === "email" && !emailOk(value)) return showError(input, "Escribe un correo válido."), false;
    if (input.name === "mensaje" && value.length < 10) return showError(input, "Cuéntanos un poco más (mínimo 10 caracteres)."), false;
    showError(input, "");
    return true;
  };

  const required = form.querySelectorAll("[required]");
  required.forEach((input) =>
    input.addEventListener("input", () => {
      if (input.closest(".form__field").classList.contains("has-error")) validate(input);
    })
  );

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const results = [...required].map(validate);
    if (results.includes(false)) {
      form.querySelector("[aria-invalid='true']").focus();
      return;
    }
    // Empresa ficticia: no se envía a ningún servidor, solo se confirma.
    form.reset();
    success.hidden = false;
    setTimeout(() => (success.hidden = true), 6000);
  });

  /* ---------- Año del pie de página ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
});
