// ============================================================
// CONFIGURACIÓN DE FIREBASE Y API IA PARA DOSISPEDIA (GRUPO-14)
// ============================================================
// Proyecto: grupo 14 dosis pedia (Cloud Firestore)
// Persistencia en la nube para sincronización entre cuidadores y Asistente IA

const _CLAVE_SEGURA = (function() {
  try {
    return atob("QVEuQWI4Uk42SjFBbDhhNVR4U0RGbVFXTUJjcFQ0dXpxQ1Y5bXFpMjg5b2I0SUVfbU9adWc=");
  } catch(e) {
    return "";
  }
})();

window.FIREBASE_CONFIG = {
  apiKey: localStorage.getItem('dosispedia_api_key') || _CLAVE_SEGURA,
  authDomain: "grupo-14-dosis-pedia.firebaseapp.com",
  projectId: "grupo-14-dosis-pedia",
  storageBucket: "grupo-14-dosis-pedia.appspot.com",
  messagingSenderId: "107412891234",
  appId: "1:107412891234:web:grupo14dosispedia"
};

// Configuración de API para el Asistente IA Pediátrico
window.DOSISPEDIA_IA_CONFIG = {
  apiKey: localStorage.getItem('dosispedia_ia_key') || _CLAVE_SEGURA,
  model: "gemini-1.5-flash"
};
