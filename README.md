# NovaTech Solutions

Sitio web de **NovaTech Solutions**, una empresa tecnológica **ficticia** creada como proyecto de portafolio de desarrollo web.

🔗 **Sitio en línea:** https://jhairceli9-crypto.github.io/novatech-solutions/

## Características

- Encabezado fijo con menú móvil accesible (foco de teclado dentro del menú, cierre con `Esc`).
- Portada con título, descripción y llamadas a la acción claras.
- Tres tarjetas de servicios; «Consultar este servicio» lo preselecciona en el formulario.
- Sección «Cómo trabajamos» con un proceso de 4 pasos.
- Formulario de contacto **demostrativo**: valida los datos, pero **no envía** mensajes (no hay servidor conectado).
- Diseño responsive probado en 360, 390, 768, 1024 y 1366 px, sin desplazamiento horizontal.
- Zonas táctiles de al menos 44 px y estados de foco visibles.
- Animaciones suaves que respetan la preferencia de «reducir movimiento».

## Tecnologías

HTML5 · CSS3 · JavaScript puro (sin frameworks ni dependencias). Tipografía *Plus Jakarta Sans* (Google Fonts).

## Paleta

| Uso | Color |
|---|---|
| Fondo azul marino | `#0B1220` |
| Azul (botones) | `#2563EB` |
| Celeste (acentos) | `#38BDF8` |
| Blanco | `#FFFFFF` |

Los colores se cambian en un solo lugar: las variables de `:root` al inicio de `styles.css`.

## Estructura

```
├── index.html   → contenido y estructura
├── styles.css   → diseño, colores, animaciones y media queries
└── script.js    → menú móvil, scroll, animaciones y validación del formulario
```

## Ver en local

```bash
python -m http.server 8000
# luego abre http://localhost:8000
```
