# PowerPoint editable · Administración de Redes

Abre **Expo_Administracion_de_Redes.pptx** con Microsoft PowerPoint o con una aplicación que admita PPTX. No necesitas ejecutar los scripts para utilizarlo.

La presentación HTML de la raíz sigue siendo la **versión maestra aprobada**. La conversión no modifica ningún archivo original: HTML, CSS, JavaScript, README, tablas de correspondencia e imágenes conservan sus bytes. La web, su navegación y su funcionamiento sin conexión se mantienen; no se cambió ninguna configuración de GitHub Pages.

## Qué contiene el archivo

- Exactamente **39 diapositivas**, en el orden de la versión HTML aprobada, con formato **16:9** (13⅓ × 7½ pulgadas).
- Títulos, párrafos, subtítulos, tarjetas, notas, integrantes y datos institucionales como textos editables. Se conserva también la numeración de las diapositivas y los expositores.
- **Seis tablas nativas de PowerPoint**, incluidas las dos tablas de comandos CDP y LLDP.
- Diagramas nuevos, iconos, tarjetas, bordes, flechas y fondos construidos con formas vectoriales y conectores editables.
- **675 cuadros de texto con contenido**, **180 conectores** y **1.272 objetos** en total, incluidas las tablas y las tres imágenes originales.
- Los controles exclusivos del navegador no se incluyen en las diapositivas de PowerPoint.

Los textos normales se distribuyen en cuadros por línea para mantener la colocación y los saltos del navegador. Cada cuadro sigue siendo editable; al alargar una línea manualmente, puede ser necesario ajustar su ancho o posición. Las tablas se editan desde las herramientas de tabla de PowerPoint. Los iconos son trazados vectoriales editables, no imágenes SVG incrustadas.

## Excepciones y diferencias de representación

**Estas tres imágenes conservan el formato de imagen original; su contenido interno no es editable como texto o formas:**

| Diapositiva | Recurso | Motivo |
| --- | --- | --- |
| 1 | `assets/images/image1.jpeg` | Escudo institucional del informe. |
| 5 | `assets/images/image2.png` | Diagrama original de anuncios entre switches. |
| 11 | `assets/images/image3.jpg` | Diagrama original de NTP. |

Las imágenes pueden moverse, redimensionarse o sustituirse en PowerPoint. Se conservan sus proporciones y los archivos originales, sin capturas de diapositivas. Ningún otro elemento se rasteriza.

Se utiliza **Arial**, y **Courier New** para los comandos, como fuentes portables equivalentes a las resueltas en el navegador de referencia. No se incrustan fuentes. Los gradientes CSS se aproximan con gradientes radiales nativos; las tablas nativas tienen esquinas rectas. En la celda de la dirección multicast CDP se reduce ligeramente el margen horizontal interno para impedir que PowerPoint divida el valor, conservando el tamaño de letra, el texto y el ancho de columna. Estos ajustes afectan solamente al PPTX.

## Verificación realizada

- El paquete se abre de nuevo con `python-pptx`; se comprueban 39 diapositivas, proporción 16:9 y XML bien formado.
- Se comparan todas las líneas y palabras visibles del archivo contra el HTML; se conservan también las mayúsculas aplicadas por CSS.
- Las únicas imágenes del paquete coinciden por SHA-256 con las tres imágenes del informe.
- Se comparan los hashes de los nueve archivos originales antes y después de generar el PPTX.
- El archivo se abre y renderiza con **LibreOfficeDev 26.8** a PDF. Se revisan las 39 diapositivas contra sus referencias HTML, el texto renderizado, los límites de página y los saltos de las celdas.
- `verificacion.json` documenta la estructura y los hashes; `revision_renderizada.json` contiene las comprobaciones por diapositiva del render final.

**Microsoft PowerPoint no está instalado en este entorno. No se ha realizado una apertura directa en Microsoft PowerPoint.** El archivo es un PPTX nativo y fue abierto y renderizado en LibreOffice, pero esa comprobación no equivale a probarlo en la aplicación de Microsoft. No se garantiza una igualdad de píxel entre motores de presentación.

## Regenerar sin alterar el HTML

El código se conserva en `../scripts/`:

1. `export_pptx_layout.cjs` lee la web aprobada con Playwright y captura sus medidas, estilos, texto y recursos. Las imágenes de referencia se usan para revisar y **nunca** se insertan como diapositivas.
2. `generate_powerpoint.py` reconstruye los objetos editables y comprueba el paquete.
3. `verify_powerpoint.py` compara el PDF renderizado desde el PPTX con el HTML, genera pares de revisión y comprueba que los originales no hayan cambiado.

Preparación para desarrolladores, si faltan herramientas:

```bash
python3 -m venv /tmp/redes-pptx-python
/tmp/redes-pptx-python/bin/pip install -r scripts/requirements-powerpoint.txt
npm install --prefix /tmp/redes-pptx-node --no-save playwright@1.62.1
```

Se necesita Chromium y, para renderizar, LibreOffice. El entorno utilizado ya disponía de estas herramientas. Configura `CHROMIUM_PATH` si el ejecutable no es `/usr/bin/chromium`.

Desde la raíz del repositorio:

```bash
NODE_PATH=/tmp/redes-pptx-node/node_modules node scripts/export_pptx_layout.cjs /tmp/redes-pptx/layout.json
/tmp/redes-pptx-python/bin/python scripts/generate_powerpoint.py /tmp/redes-pptx/layout.json
soffice -env:UserInstallation=file:///tmp/redes-pptx/lo-profile --headless --convert-to pdf --outdir /tmp/redes-pptx/render powerpoint/Expo_Administracion_de_Redes.pptx
/tmp/redes-pptx-python/bin/python scripts/verify_powerpoint.py /tmp/redes-pptx/layout.json /tmp/redes-pptx/render/Expo_Administracion_de_Redes.pdf --review-dir /tmp/redes-pptx/comparison
```

Tras revisar los pares HTML/PPTX y obtener una verificación correcta, se puede guardar el informe final:

```bash
cp /tmp/redes-pptx/comparison/render-audit.json powerpoint/revision_renderizada.json
```

Los archivos temporales y capturas de revisión quedan fuera del repositorio. El usuario final solamente necesita el PPTX, o los archivos originales para abrir la versión web.

## Flujo para futuras modificaciones

**HTML → Revisión → Aprobación → PowerPoint editable.**

1. Modificar el HTML únicamente con autorización explícita.
2. Esperar la aprobación del usuario para esa nueva versión HTML.
3. Regenerar el PowerPoint desde el HTML aprobado, sin modificar el maestro durante la conversión.
4. Mantener disponibles ambos formatos; nunca sustituir la versión HTML por el PowerPoint.

Una edición manual del PPTX no actualiza automáticamente el maestro HTML.
