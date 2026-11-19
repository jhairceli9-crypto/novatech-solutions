# NovaTech Solutions

Página web profesional para **NovaTech Solutions**, una empresa tecnológica **ficticia** creada con fines académicos.

## Características

- Encabezado fijo con navegación y menú móvil funcional (☰).
- Hero, tres tarjetas de servicios, sección «Sobre nosotros» con contadores animados y formulario de contacto con validación.
- Diseño responsive: celulares, tablets y computadoras (sin desplazamiento horizontal, zonas táctiles de 44 px).
- Animaciones suaves que respetan la preferencia de «reducir movimiento» del sistema.
- Paleta azul marino, blanco y celeste · Tipografías *Plus Jakarta Sans* e *Inter*.

## Tecnologías

HTML5 · CSS3 · JavaScript puro (sin frameworks ni dependencias).

## Estructura

```
├── index.html   → contenido y estructura
├── styles.css   → diseño, colores, animaciones y media queries
└── script.js    → menú móvil, animaciones al hacer scroll, contadores y validación del formulario
```

## Ver en local

Abre `index.html` en el navegador, o sirve la carpeta:

```bash
python -m http.server 8000
# luego abre http://localhost:8000
```

## Nota

El formulario de contacto es demostrativo: valida los datos pero **no envía** información a ningún servidor.
