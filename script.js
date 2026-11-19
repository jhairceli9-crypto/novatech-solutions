/* =========================================================
   NovaTech Solutions — Interacciones (v2)
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("navToggle");
  const navItems = nav.querySelectorAll("a");
  const mobileQuery = window.matchMedia("(max-width: 860px)");

  /* ---------- Menú móvil accesible ---------- */
  const backdrop = document.createElement("div");
  backdrop.className = "nav-backdrop";
  document.body.appendChild(backdrop);

  const isOpen = () => nav.classList.contains("is-open");

  const setMenu = (open, { returnFocus = false } = {}) => {
    nav.classList.toggle("is-open", open);
    backdrop.classList.toggle("is-visible", open);
    document.body.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    // Al abrir, el foco entra al menú; al cerrar con teclado, vuelve al botón
    if (open) setTimeout(() => navItems[0].focus(), 50);
    else if (returnFocus) toggle.focus();
  };

  toggle.addEventListener("click", () => setMenu(!isOpen()));
  backdrop.addEventListener("click", () => setMenu(false));
  navItems.forEach((link) => link.addEventListener("click", () => setMenu(false)));

  document.addEventListener("keydown", (e) => {
    if (!isOpen()) return;
    if (e.key === "Escape") setMenu(false, { returnFocus: true });

    // Mantiene el foco del teclado dentro del menú abierto (botón ☰ + enlaces)
    if (e.key === "Tab") {
      const focusables = [toggle, ...navItems];
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  // Si la pantalla se agranda con el menú abierto, se cierra
  mobileQuery.addEventListener("change", (e) => { if (!e.matches) setMenu(false); });

  /* ---------- Encabezado, barra de progreso y botón "volver arriba" ---------- */
  const progress = document.getElementById("scrollProgress");
  const toTop = document.getElementById("toTop");
  let ticking = false;
  const onScroll = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    header.classList.toggle("is-scrolled", y > 20);
    progress.style.setProperty("--progress", max > 0 ? (y / max).toFixed(4) : 0);
    toTop.classList.toggle("is-visible", y > window.innerHeight * 0.8);
    ticking = false;
  };
  onScroll();
  // requestAnimationFrame: como máximo un cálculo por fotograma (más fluido)
  window.addEventListener("scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });

  /* ---------- Enlace del menú activo según la sección visible ---------- */
  const sections = document.querySelectorAll("main section[id]");
  const menuLinks = document.querySelectorAll(".nav__link");
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        menuLinks.forEach((l) => {
          const active = l.getAttribute("href") === `#${entry.target.id}`;
          l.classList.toggle("is-active", active);
          if (active) l.setAttribute("aria-current", "true");
          else l.removeAttribute("aria-current");
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => sectionObserver.observe(s));

  /* ---------- Aparición suave al hacer scroll ---------- */
  const revealItems = document.querySelectorAll(".reveal");
  // Pequeño escalonado entre elementos hermanos (tarjetas, pasos)
  revealItems.forEach((el) => {
    const siblings = [...el.parentElement.children].filter((c) => c.classList.contains("reveal"));
    el.style.transitionDelay = `${Math.min(siblings.indexOf(el), 4) * 80}ms`;
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
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealItems.forEach((el) => revealObserver.observe(el));

  /* ---------- Brillo de las tarjetas que sigue al mouse (solo con mouse) ---------- */
  if (window.matchMedia("(hover: hover)").matches) {
    document.querySelectorAll(".card").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    });
  }

  /* ---------- "Consultar este servicio" preselecciona el servicio en el formulario ---------- */
  const serviceSelect = document.getElementById("servicio");
  document.querySelectorAll("[data-service]").forEach((link) => {
    link.addEventListener("click", () => { serviceSelect.value = link.dataset.service; });
  });

  /* ---------- Formulario de contacto (DEMOSTRATIVO: no envía datos) ---------- */
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
    if (input.type === "email" && !emailOk(value)) return showError(input, "Escribe un correo válido, por ejemplo: nombre@correo.com"), false;
    if (input.name === "mensaje" && value.length < 10) return showError(input, "Cuéntanos un poco más (mínimo 10 caracteres)."), false;
    showError(input, "");
    return true;
  };

  const required = form.querySelectorAll("[required]");
  required.forEach((input) => {
    // Corrige el error mientras la persona escribe, y valida al salir del campo
    input.addEventListener("input", () => {
      if (input.closest(".form__field").classList.contains("has-error")) validate(input);
    });
    input.addEventListener("blur", () => { if (input.value.trim()) validate(input); });
  });

  let hideTimer;
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // No hay servidor: nunca se envía nada
    const results = [...required].map(validate);
    if (results.includes(false)) {
      success.hidden = true;
      form.querySelector("[aria-invalid='true']").focus();
      return;
    }
    const name = form.nombre.value.trim().split(/\s+/)[0];
    success.textContent = `Gracias, ${name}. Los datos están correctos, pero este es un formulario de demostración: no se envió ningún mensaje.`;
    success.hidden = false;
    form.reset();
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => (success.hidden = true), 8000);
  });

  /* ---------- Año actual en el pie de página ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
});
