# 📋 Bitácora y Retroalimentación de Desarrollo - DosisPedia

Este documento mantiene un registro continuo de las mejoras, retroalimentación técnica y cambios aplicados en el proyecto local para sincronizarlos con el repositorio de GitHub.

---

## 📌 Sesión: Conexión y Configuración Inicial
- **Fecha:** 28 de octubre de 2026
- **Repositorio:** [ANDRES869udb/GRUPO-14](https://github.com/ANDRES869udb/GRUPO-14)
- **Rama principal:** `main`
- **Ubicación local:** `C:\Users\andre\.gemini\antigravity\scratch\GRUPO-14`

### 🔍 Diagnóstico inicial del proyecto
1. **Proyecto detectado:** **DosisPedia** (aplicación web para cálculo de dosis pediátricas y seguimiento de medicamentos).
2. **Estructura encontrada:**
   - `index.html`: Aplicación principal (HTML5 + Tailwind CSS + Vanilla JS + Web Audio API).
   - `firebase-config.js`: Configuración de persistencia / backend en Firebase.
   - `sync.ps1`: Script de sincronización automatizada para commits y push.
   - `.github/workflows`: Automatización de despliegue en GitHub Pages.

### 🛠️ Acciones realizadas
- Instalación y configuración de entorno portátil de Git (`v2.56.0`).
- Clonación del repositorio en el espacio de trabajo local.
- Configuración de identidad del colaborador (`amsantos2005`).
- Adaptación de `sync.ps1` para integración directa con el entorno de Git.
- Vinculación exitosa de credenciales de colaborador con Token Clásico (`repo`).
- Sincronización del primer commit a la rama `main` de GitHub.

### 💡 Siguientes pasos propuestos
- Realizar las mejoras, desarrollo o correcciones que requieras en `index.html` o los archivos del proyecto.
- En cada sesión o ciclo de trabajo, registrar la retroalimentación en este documento y sincronizar los cambios automáticamente con GitHub.

---

## 📌 Sesión: Soporte y Navegación Completa en PC / Escritorio
- **Fecha:** 29 de octubre de 2026
- **Objetivo:** Permitir rotar y navegar entre las secciones (Calcular, Cronograma, Alarmas e Historial) en ordenadores y monitores de escritorio con mouse y teclado.

### 🔍 Diagnóstico del problema en PC
1. **Desplazamiento de barra fija:** La barra de navegación inferior (`<nav>`) y el encabezado (`<header>`) usaban `position: fixed` sin centrado horizontal explícito (`left-1/2 -translate-x-1/2`), provocando desalineación o extravío visual fuera de la vista centrada en monitores anchos.
2. **Contenedor rígido para móvil:** El ancho estaba restringido a `max-w-md` (448px) sin adaptación responsiva para pantallas grandes.
3. **Ausencia de controles superiores para mouse:** En PC, el usuario busca navegar desde la parte superior del contenido o encabezado en lugar de una barra de pulgar inferior.

### 🛠️ Mejoras aplicadas en [index.html](file:///C:/Users/andre/.gemini/antigravity/scratch/GRUPO-14/index.html)
- **Barra de navegación de escritorio en el encabezado:** Se añadieron botones para *Calcular*, *Cronograma*, *Alarmas* e *Historial* en el header superior para pantallas de PC/tablet (`hidden sm:flex`).
- **Píldoras de acceso rápido:** Se agregó una barra secundaria de accesos en el área superior del contenido.
- **Centrado universal:** Se aplicó `left-1/2 -translate-x-1/2` tanto al `<header>` como al `<nav>` para garantizar alineación perfecta en cualquier resolución.
- **Atajos de teclado:** Ahora en PC se puede presionar `1`, `2`, `3` o `4` para alternar instantáneamente entre secciones.
- **Diseño responsivo extendido:** Se amplió el contenedor en pantallas grandes (`md:max-w-2xl lg:max-w-3xl`) para mejorar la lectura de dosis y tablas.
- **Scrollbar estilizado en PC:** Barra de desplazamiento delgada y sutil adaptada a la estética *Clinical Calm*.

---

## 📌 Sesión: Reparación de la Función de Guardado de Dosis
- **Fecha:** 5 de noviembre de 2026
- **Objetivo:** Corregir el guardado y registro de tomas para que persista de forma infalible en memoria local (`localStorage`), Firestore y actualice la UI en vivo.

### 🔍 Diagnóstico del fallo de guardado
1. **Destrucción de ID del botón:** Al completar el primer guardado, `ejecutarGuardadoDeToma()` sobreescribía `btn.innerHTML` con texto genérico eliminando el elemento `<span id="btn-final-confirmar-text">`. Al intentar abrir el modal una segunda vez, `document.getElementById('btn-final-confirmar-text').textContent` lanzaba un error `TypeError` bloqueando todo intento posterior de guardado.
2. **Fragilidad en deserialización de datos:** Si `localStorage` contenía una entrada nula o inválida, `tomas` se inicializaba como `null` en lugar de un array, provocando que `tomas.unshift(...)` y `tomas.length` congelaran los scripts.
3. **Modal excesivamente alto:** En pantallas de teléfonos o ventanas reducidas, los elementos gráficos gigantescos empujaban el botón de confirmación fuera de la vista.
4. **Falta de feedback en la pantalla principal:** En la vista del calculador no se apreciaba de inmediato si la dosis se había guardado, requiriendo ir a ciegas al cronograma.

### 🛠️ Correcciones implementadas
- **Preservación de elementos del DOM:** Se aseguró que `id="btn-final-confirmar-text"` permanezca siempre intacto durante estados de carga y reseteo.
- **Protección defensiva de almacenamiento:** Inicialización segura de `tomas` con comprobación `Array.isArray(tomas)` en guardado, borrado y filtrado.
- **Aislamiento de excepciones en Firebase:** Las operaciones hacia Firestore ahora están debidamente encapsuladas en `try / catch` para que cualquier fallo de red o reglas de seguridad jamás impida el guardado local del usuario.
- **Modal de confirmación compacto y visible:** Rediseño del modal para que sea conciso, centrado y con el botón *"Confirmar y Guardar Toma"* inmediatamente accesible sin necesidad de scroll.
- **Widget dinámico en la calculadora:** Se incorporó un banner interactivo en `vista-calcular` que muestra al instante la última dosis guardada, hora y cuenta regresiva activa en tiempo real.

---

## 📌 Sesión: Alarmas Nativas en Teléfono y Conversión a PWA (App Instalable)
- **Fecha:** 5 de noviembre de 2026
- **Objetivo:** Hacer las alarmas 100% funcionales (incluso con el teléfono bloqueado y pantalla apagada) y permitir instalar DosisPedia con su propio ícono en celulares Android e iOS.

### 🛠️ Implementaciones realizadas:
1. **PWA Completa (Progressive Web App):**
   - Creación de `manifest.json` con especificación oficial para instalación como app nativa (`display: standalone`).
   - Generación de iconos oficiales en alta resolución (`icon-192.png` y `icon-512.png`) con diseño médico.
   - Creación de Service Worker (`sw.js`) con estrategia de caché offline para funcionamiento sin conexión a internet.
   - Botón *"Instalar App"* en la barra superior con soporte para el prompt de instalación nativo (`beforeinstallprompt`) y guía para iPhone/Safari.
2. **Alarmas Reales y Prácticas en el Teléfono:**
   - **Agendamiento en Calendario/Reloj Nativo (`.ics`):** Generación de evento estándar con alerta `VALARM` que programa la alarma en la aplicación nativa del celular a la hora exacta de la siguiente dosis, sonando aunque la pantalla esté bloqueada.
   - **Integración con Google Calendar:** Enlace directo de un solo toque con hora, dosis y medicamento precargados.
   - **Notificaciones Web del Sistema:** Soporte de `Notification API` para emitir avisos en el centro de notificaciones del celular o PC.

---

## 📌 Sesión: Personalización del Nombre del Niño y Cuidador (Eliminación de Nombres Fijos)
- **Fecha:** 7 de noviembre de 2026
- **Objetivo:** Retirar nombres fijos ("Camila", "Lucas", "Leo") y permitir que la familia configure libremente el nombre del paciente/niño, su edad y el nombre del cuidador desde la interfaz.

### 🛠️ Implementaciones realizadas:
1. **Modal de Perfil del Niño y Cuidador (`modal-perfil-nino`):**
   - Campos configurables para: Nombre del niño/a, Edad/etapa y Nombre del Cuidador.
   - Persistencia local inmediata en `localStorage` (`dosispedia_child_name`, `dosispedia_child_age`, `dosispedia_caregiver_name`).
2. **Acceso Rápido y Visible:**
   - Clic en el encabezado superior (`#header-child-name`) para abrir el editor.
   - Clic en la tarjeta de paciente de la calculadora (`#card-child-name`) con icono de lápiz interactivo.
3. **Eliminación Total de Nombres Hardcodeados:**
   - Se removieron todas las menciones estáticas de "Camila", "Lucas" y "Leo" en el código fuente.
   - El modal de confirmación de dosis muestra dinámicamente el nombre del niño seleccionado.
   - Al guardar la dosis, el registro almacena `paciente: childName` y `cuidador: caregiverName`.
   - Las alarmas nativas (`.ics`) y enlaces de Google Calendar se generan con el nombre personalizado del paciente.

---

## 📌 Sesión: Presentaciones Oficiales de Acetaminofén Líquido Oral en Colombia
- **Fecha:** 7 de noviembre de 2026
- **Objetivo:** Incorporar todas las presentaciones orales pediátricas (líquidas: gotas, jarabes, suspensiones y soluciones) comercializadas en Colombia según el estándar INVIMA, excluyendo tabletas e inyectables.

### 🇨🇴 Presentaciones añadidas para Acetaminofén:
1. **Jarabe / Solución 160 mg / 5 mL (32 mg/mL):**
   - Marcas de referencia: *Dolex Niños 2-7 años, Tempra Jarabe, Tylenol Niños, MK*.
   - Concentración: 32 mg/mL. Dosis calculada a 15 mg/kg cada 6 horas (`peso * 0.46875 mL`).
2. **Jarabe / Solución 150 mg / 5 mL (30 mg/mL):**
   - Marcas de referencia: *Genfar, Doloral pediátrico, Laproff, Genéricos Colombia*.
   - Concentración: 30 mg/mL. Dosis calculada a 15 mg/kg cada 6 horas (`peso * 0.50 mL` — ¡la mitad del peso en mL!).
3. **Gotas Pediátricas 100 mg / 1 mL (100 mg/mL):**
   - Marcas de referencia: *Dolex Bebés Gotas, Winadeine Pediátrico, Genfar Gotas, Tecnoquímicas*.
   - Concentración: 100 mg/mL. Dosis calculada a 15 mg/kg cada 6 horas (`peso * 0.15 mL` — ~30 gotas/mL, aprox. 4.5 gotas por kg).
4. **Jarabe Pediátrico 120 mg / 5 mL (24 mg/mL):**
   - Marcas de referencia: *MK Pediátrico, Calpol, Genérico tradicional*.
   - Concentración: 24 mg/mL. Dosis calculada a 15 mg/kg cada 6 horas (`peso * 0.625 mL`).
5. **Jarabe Forte 250 mg / 5 mL (50 mg/mL):**
   - Marcas de referencia: *Dolex Niños 7+ años, Genfar Forte*.
   - Concentración: 50 mg/mL. Diseñado para escolares y niños mayores para reducir el volumen líquido a tomar (`peso * 0.30 mL`).
6. **Solución Oral 100 mg / 5 mL (20 mg/mL):**
   - Distribución institucional EPS / Hospitalaria en Colombia.
   - Concentración: 20 mg/mL. Dosis calculada a 15 mg/kg cada 6 horas (`peso * 0.75 mL`).

### 🛠️ Mejoras de Interfaz y Cálculo:
- **Selector Dinámico de Presentaciones:** Componente con lista desplegable y píldoras rápidas de un toque para alternar instantáneamente entre frascos y goteros.
- **Banner de Información Clínica:** Muestra la concentración en mg/mL, marcas comerciales comunes en Colombia y explicación de la pauta.
- **Escala Volumétrica Inteligente de Jeringa Oral:** La jeringa adapta su escala automáticamente (0-5 mL, 0-10 mL o 0-15 mL) con marcas graduadas precisas según el volumen requerido por jarabes de niños mayores.
- **Trazabilidad en Historial y Cronograma:** Las tomas guardadas registran la presentación exacta (`160 mg / 5 mL`, `150 mg / 5 mL`, etc.) y las marcas comerciales asociadas.






---

## 📌 Sesión: Perfeccionamiento Integral, Conexión Firestore, Asistente IA y 8 FAQs
- **Fecha:** 8 de noviembre de 2026
- **Objetivo:** Perfeccionar todos los componentes interactivos, conectar Cloud Firestore (`grupo-14-dosis-pedia`), incorporar el Asistente IA Pediátrico con API Gemini / Motor Clínico local, resolver las 8 FAQs obligatorias, modal moderno de temperatura y compartir reportes vía WhatsApp.

### 🛠️ Mejoras y Novedades Implementadas:
1. **Conexión a Firebase Firestore (`grupo-14-dosis-pedia`):**
   - Configuración en `firebase-config.js` con API Key proporcionada y `projectId: "grupo-14-dosis-pedia"`.
   - Botón interactivo de diagnóstico *"🧪 Probar Conexión con Firestore"* en el modal de Firebase para verificar lecturas y escrituras en la nube en tiempo real.
   - Sincronización transparente de tomas y temperaturas en Firestore con modo offline defensivo.

2. **5ª Pestaña: Asistente IA de Guardia Pediátrica & FAQs:**
   - Accesible desde la barra superior de PC (tecla `5`), píldoras de navegación y barra inferior móvil con ícono de IA (`psychology`).
   - **Sub-pestaña 1: Chat en Vivo con IA:** Conexión con Gemini 1.5 Flash (`AQ.Ab8RN6... (Token configurado)`) con prompt empático de guardias pediátricas AAP/AEP y fallback automático a motor clínico local en caso de desconexión.
   - **Sub-pestaña 2: Dudas Pediátricas Frecuentes:** Protocolos de acción ante fiebre de 39°C o más, vómito tras el jarabe (<15 min, 15-30 min, >30 min), contraindicación de alternar antitérmicos y uso seguro de jeringa oral.
   - **Sub-pestaña 3: 8 Preguntas Frecuentes del Curso / PRD:** Respuestas completas a las 8 dudas requeridas (producto en asistencia, PRD vs lluvia de ideas, permisos de Antigravity, invitación de GitHub, compañeros que no responden, fecha de entrega 29 de octubre, grabaciones y cambios de grupo).
   - **Protocolo de Seguridad y Crisis (PRD Punto 4):** Banner visible con acceso rápido a llamada al 911 y guía de emergencia.

3. **Modal Moderno de Registro de Temperatura (`modal-temperatura`):**
   - Eliminación definitiva del `prompt()` nativo del navegador.
   - Selector visual con slider, botones delta `+/- 0.1°C`, y chips de acceso rápido (`36.8° Normal`, `37.6° Febrícula`, `38.3° Fiebre`, `39.1° Alta`).
   - Semáforo clínico dinámico con recomendaciones específicas y persistencia en `localStorage` y Firestore.

4. **Resumen Clínico para WhatsApp y Portapapeles (`modal-compartir`):**
   - Botón *"Compartir Resumen con Pediatra / Familiar"* en el Cronograma e Historial.
   - Generación de informe clínico con nombre, edad, peso, última temperatura, dosis administradas y cuenta regresiva.
   - Enlace directo a WhatsApp (`https://api.whatsapp.com/send?text=...`) y botón de copiado de un toque.

5. **Ergonomía de Botones y Experiencia de Usuario:**
   - **Presets de Peso:** Chips rápidos de incremento `[-1 kg]`, `[-0.5 kg]`, `[+0.5 kg]`, `[+1 kg]` y pesos frecuentes (`6 kg`, `8.5 kg`, `10.4 kg`, `12.5 kg`, `15 kg`).
   - **Selector de Capacidad de Jeringa:** Botones de un toque para jeringas de 5 mL, 10 mL y 15 mL para emparejar con la jeringa física de casa.
   - **Feedback Auditivo y Háptico:** Timbres suaves mediante Web Audio API en confirmaciones de toma, pruebas de alarma y guardado térmico.
   - **Service Worker v2:** Actualización de caché para instalación como Progressive Web App (PWA).