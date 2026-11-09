# Administración de redes · UNAH-VS

Presentación universitaria en español para **Redes de Computadoras II**, sección 2000. Catedrático: **MSc. Luis Andres Pineda Zuniga**. Fecha del informe: **09/11/2026**.

## Abrir la presentación

1. Descarga el ZIP desde **Code → Download ZIP** en GitHub.
2. Descomprime **todo** el archivo; conserva las carpetas juntas.
3. Abre `index.html` con un navegador moderno, como Chrome, Edge o Firefox.

**No necesitas Internet, instalar programas, ejecutar un servidor ni usar npm.** Todos los estilos, scripts e imágenes son locales. No abras el HTML desde dentro del ZIP.

## Diseño y lectura

La versión actual conserva las 39 diapositivas y utiliza una paleta oscura: fondo `#101C30`, paneles `#1C304A`, acentos `#59D8EB`, títulos blancos, texto `#D9E5F2` y elementos secundarios `#93A9C2`. Alterna comparaciones, tablas, ejemplos, beneficios y diagramas con iconos de dispositivos. Las explicaciones introducen la necesidad de cada tecnología antes de desarrollar sus funciones, con transiciones entre los temas y oraciones pensadas para leerse en voz alta.

Los diagramas originales conservan sus colores y su fondo blanco dentro de un marco oscuro. Los diagramas nuevos muestran anuncios entre vecinos, consultas NTP, consultas y respuestas SNMP, envío de registros Syslog, respaldo y restauración TFTP, y carga de IOS desde Flash a RAM. Todos se generan localmente, sin bibliotecas ni recursos externos.

## Controles

| Control | Acción |
| --- | --- |
| Flecha derecha / abajo, Av Pág o espacio | Siguiente diapositiva |
| Flecha izquierda / arriba o Re Pág | Diapositiva anterior |
| Inicio / Fin | Primera / última diapositiva |
| Botones ← / → | Retroceder / avanzar |
| I o botón Índice | Abrir el índice y elegir una diapositiva |
| Escape | Cerrar el índice o salir de pantalla completa |
| F o botón de pantalla completa | Activar / desactivar pantalla completa |
| Deslizamiento horizontal | Cambiar de diapositiva en pantalla táctil |

Si el navegador restringe la API de pantalla completa, utiliza F11 o su menú de visualización. El contador, la barra inferior y las marcas de tema indican la posición. El fragmento de la dirección, por ejemplo `index.html#11`, permite abrir una diapositiva concreta. La presentación conserva una proporción 16:9 y se ajusta al espacio disponible. Para proyectar, se recomienda pantalla horizontal y pantalla completa. En pantallas pequeñas, el contenido se reduce proporcionalmente.

## Contenido y fuente

La presentación contiene **39 diapositivas**. Se basa en `Info_Expo_Administracion_Redes_Numeracion_Clara.docx`, proporcionado por el grupo. Los **37 encabezados Título 1 y Título 2 pertinentes** tienen una diapositiva propia, en el mismo orden, además de portada y transición a Packet Tracer. Se omite únicamente «Cuerpo», según las instrucciones. La introducción y conclusión del informe se integran como sus respectivas diapositivas, sin duplicarlas.

`assets/coverage.json` registra la correspondencia entre cada encabezado original y su número de diapositiva. La sección **VI. Administración de imágenes IOS** figura como Título 2 en Word; se conserva ese nivel en el índice y se mantiene su numeración VI. Las viñetas ordinarias no se tratan como encabezados.

Se extrajeron y conservaron las tres imágenes originales, sin deformarlas:

- `image1.jpeg`: escudo institucional de la portada (109 × 150, resolución original).
- `image2.png`: diagrama de intercambio de anuncios CDP/LLDP (975 × 134).
- `image3.jpg`: diagrama de clientes y servidores NTP (1865 × 523).

El escudo se muestra pequeño para respetar su resolución. Los diagramas adicionales de procesos se construyen con HTML y SVG incluidos en el código. No hay imágenes ni resultados simulados de Packet Tracer.

Se mejoró la continuidad de las explicaciones y la ortografía. Los comandos abreviados del informe se completaron donde era necesario: `no lldp transmit` y `no lldp receive` se presentan como comandos separados; se explicitan los parámetros de `ntp server` y `clock timezone`. Los tiempos CDP/LLDP se identifican como valores predeterminados habituales. La disponibilidad de comandos depende del dispositivo y la versión de IOS. La restauración hacia running-config puede combinar comandos con los existentes; TFTP no cifra las transferencias.

## Integrantes y distribución

| Integrante | Número de cuenta | Exposición |
| --- | --- | --- |
| Carlos Enrique Izaguirre Sagastume | 20221004549 | CDP y LLDP |
| Bella Arely Fernández Sabillon | 20192000242 | NTP |
| Ricardo Javier Isaula Bardales | 20232000313 | SNMP y Syslog |
| Angel Michael Acosta Maldonado | 20232000632 | Respaldos e imágenes IOS |
| Karin Jafet Mejia Maradiaga | 20222030948 | Demostración en Packet Tracer y conclusión |

Los nombres y números de cuenta de la portada se conservan tal como aparecen en el documento. La demostración práctica se realiza directamente en Cisco Packet Tracer.

## Modificar el proyecto

```text
index.html              Estructura de la aplicación y controles
css/styles.css          Paleta, tipografía, diseños y adaptación 16:9
js/slides.js            Contenido de todas las diapositivas
js/script.js            Renderizado, teclado, índice y pantalla completa
assets/images/          Imágenes extraídas del documento original
assets/coverage.json     Correspondencia con los encabezados de Word
README.md               Instrucciones de uso y edición
```

Para editar textos, abre `js/slides.js` en un editor de texto y cambia los campos `title`, `lead`, `cards`, `flow`, `table`, `note` o `takeaway`. Conserva la sintaxis de JavaScript y las rutas relativas. Los datos se cargan como un script clásico, sin peticiones `fetch`, para que la apertura por `file://` funcione sin servidor. Para cambiar colores y tamaños, edita `css/styles.css`. El campo opcional `visual` selecciona variantes de ejemplos (`cases`), beneficios (`benefits`) o procesos (`process`). El campo `diagram` selecciona los diagramas locales de vecinos, NTP, SNMP, Syslog, TFTP o IOS; sus conexiones e iconos se generan en `js/script.js`.

Si agregas o eliminas diapositivas, actualiza la descripción del total en `index.html`, el README y la correspondencia de encabezados. El contador, índice y navegación se generan a partir del contenido.

## Revisión

Se verifica la cobertura contra los estilos reales de los encabezados de Word, la carga de imágenes locales, el diseño a distintas resoluciones, la navegación, la pantalla completa y la apertura directa del HTML con el navegador sin conexión. Las pruebas de la aplicación no requieren ejecutar comandos Cisco ni simulan resultados de equipos reales.

### Resultado de la revisión en el entorno de desarrollo

- Versión oscura: 39 diapositivas recorridas en Chromium a 1600×1000, 1366×768, 1920×1080, 1024×768 y 390×844, sin contenido superpuesto al pie ni fuera del área de la diapositiva.
- Flechas, Inicio, Fin, botones anterior/siguiente, índice y pantalla completa comprobados.
- Las tres imágenes locales cargan; no se detectaron errores de JavaScript ni solicitudes a recursos externos.
- Contexto del navegador sin conexión, con las respuestas de archivos locales suministradas por el sistema de pruebas.
- Sintaxis de ambos scripts y existencia de todas las rutas relativas comprobadas.
- Revisión de las 39 capturas y comprobación adicional de límites para párrafos, títulos, tablas y diagramas.
- Orden, títulos, correspondencia de los 37 encabezados, expositores y bytes de las imágenes originales comparados con la versión anterior y conservados.

**Límite de la prueba:** el Chromium administrado de este entorno bloquea las URL `file://` por política. La apertura directa desde el explorador no pudo ejecutarse aquí. La aplicación utiliza scripts clásicos y archivos relativos, sin dependencias de servidor; para la exposición, descomprime el ZIP y comprueba esa apertura en tu navegador habitual.
