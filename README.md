# 👶 DosisPedia

Aplicación web móvil para el cálculo seguro de dosis pediátricas y seguimiento de medicamentos para padres y cuidadores.

🌐 **Enlace público en vivo:** [https://andres869udb.github.io/GRUPO-14/](https://andres869udb.github.io/GRUPO-14/)

---

## 🚀 Funciones Implementadas (PRD)

1. **🧮 Calcular**:
   - Selección de fármaco comercial pediátrico (Paracetamol Gotas, Paracetamol Jarabe, Ibuprofeno 2%, Ibuprofeno 4%, Amoxicilina).
   - Ajuste rápido del peso del niño en kilogramos con botones de acceso táctil.
   - Cálculo automático exacto en mililitros (ml) e indicación en gotas.

2. **💉 Anotar (en 1 toque)**:
   - Registro inmediato de la toma con un solo toque del botón principal.
   - Guarda automáticamente la fecha, hora exacta, fármaco y mililitros administrados en la memoria local del dispositivo (`localStorage`).

3. **⏱️ Ver (Historial y Cuenta Regresiva)**:
   - Reloj digital en vivo con cuenta regresiva para la próxima toma autorizada.
   - Indicador visual claro de seguridad (*En reposo* vs *¡Tiempo cumplido!*).
   - Cronograma histórico detallado con opción de eliminar registros erróneos.

4. **🔔 Marcar (Alarmas y Avisos Locales)**:
   - Alarma sonora sintetizada con Web Audio API.
   - Aviso visual persistente al cumplirse el intervalo de horas.
   - Botón de prueba de sonido para verificar el volumen del celular.

5. **🌙 Modo Noche / Madrugada**:
   - Interfaz con fondo oscuro para evitar molestias visuales durante tomas nocturnas.

---

## 🛠️ Tecnologías Utilizadas
- **HTML5 & Vanilla JavaScript**: Rápido, ligero y sin dependencias pesadas.
- **Tailwind CSS**: Diseño moderno, responsive y adaptado a pantallas móviles.
- **Web Audio API**: Efectos de sonido y alarmas sin depender de archivos de audio externos.
- **LocalStorage API**: Persistencia de datos en el teléfono del usuario.
- **GitHub Pages & Actions**: Despliegue automático continuo.
