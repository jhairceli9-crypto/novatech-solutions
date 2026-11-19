# NovaTech Solutions

Sitio web de **NovaTech Solutions**, una empresa tecnológica **ficticia** creada como proyecto de portafolio de desarrollo web.

🔗 **Sitio en línea:** https://jhairceli9-crypto.github.io/novatech-solutions/

> **Aviso de honestidad:** la empresa, el correo `hola@novatech.example` y los proyectos marcados como «Demostración» son ficticios. No se muestran clientes, testimonios, certificaciones ni cifras inventadas.

## Funciones reales

| Sección | Qué hace |
|---|---|
| Encabezado | Menú fijo. En pantallas ≤ 960 px se convierte en menú lateral: el foco del teclado entra al menú, queda dentro mientras está abierto y vuelve al botón al cerrarlo con `Esc`. |
| Servicios | 3 tarjetas con «Ideal si…». El botón «Consultar» lleva al formulario con ese servicio ya elegido. |
| Proyectos | 4 tarjetas (1 proyecto real, este sitio, y 3 demostraciones etiquetadas). Se pueden filtrar por Web, Nube y Seguridad; el resultado se anuncia a los lectores de pantalla. |
| Proceso | 4 pasos de trabajo. |
| Contacto | Consejos para escribir el mensaje, enlace real al código y un formulario **demostrativo**. |
| Formulario | Valida nombre, correo y mensaje, cuenta caracteres (máx. 600) y muestra una confirmación. **No envía nada**: no hay servicio de correo conectado. |

## Accesibilidad y rendimiento

- Responsive comprobado en 360, 390, 768, 920, 1280 y 1440 px, sin desplazamiento horizontal.
- Zonas táctiles de al menos 44 px, foco visible y enlace «Saltar al contenido».
- Los enlaces externos avisan que se abren en una pestaña nueva.
- El contenido es visible aunque JavaScript falle, y las animaciones respetan «reducir movimiento».
- Sin frameworks ni imágenes pesadas: las ilustraciones son CSS y SVG. Usa una sola fuente variable.

## Tecnologías

HTML5 · CSS3 · JavaScript puro. Fuente *Plus Jakarta Sans* (Google Fonts). Publicado con GitHub Pages.

## Paleta

| Uso | Color | Variable en `styles.css` |
|---|---|---|
| Fondo azul marino | `#0B1220` | `--navy` |
| Azul (botones) | `#2563EB` | `--blue` |
| Celeste (acentos) | `#38BDF8` | `--sky` |
| Blanco | `#FFFFFF` | `--white` |

## Estructura

```
├── index.html   → contenido y estructura
├── styles.css   → diseño, colores, animaciones y media queries
└── script.js    → menú, filtros, scroll y validación del formulario
```

## Ver en local

```bash
python -m http.server 8000
# luego abre http://localhost:8000
```

## Pendiente: conectar un servicio real al formulario

Para que el formulario envíe correos de verdad, hace falta un servicio externo (por ejemplo Formspree o EmailJS). Cuando se configure:

1. Crear la cuenta y obtener la dirección de envío del formulario.
2. Cambiar el envío en `script.js`, dentro de `form.addEventListener("submit", …)`.
3. Solo entonces quitar el aviso «Formulario de demostración» de `index.html`.
