# 📱 Sistema de QR para Registro de Guardianes

## ✅ ¿Qué se creó?

### 1. **Código QR Listo para Usar**
- Archivo: `public/qr-registro-guardian.png`
- Tamaño: 500x500px en alta calidad
- URL del QR: `https://fauna-comunidad.onrender.com/registro`

### 2. **Página de Registro Directa**
- URL: `https://fauna-comunidad.onrender.com/registro`
- Al visitar esta URL, el formulario se abre automáticamente
- Perfecta para compartir en redes sociales o WhatsApp

### 3. **Página para Ver y Descargar el QR**
- URL: `https://fauna-comunidad.onrender.com/qr`
- Muestra el QR con instrucciones
- Botón para descargar en alta calidad

## 🎯 ¿Cómo usar el QR?

### Para imprimir carteles:
1. Descarga el QR desde: `https://fauna-comunidad.onrender.com/qr`
2. O usa el archivo en: `public/qr-registro-guardian.png`
3. Imprime en alta calidad (mínimo 300dpi)
4. Recomendado: Tamaño mínimo de impresión 5cm x 5cm

### Para compartir digital:
- Link directo: `https://fauna-comunidad.onrender.com/registro`
- Copia y pega en WhatsApp, Instagram, Facebook, etc.

### Para redes sociales:
- Sube la imagen del QR desde `public/qr-registro-guardian.png`
- Texto sugerido:
  ```
  🌿 ¡Conviértete en Guardián de Fauna! 🌿

  Escanea el QR y registrate en segundos.
  Tu aporte es fundamental para proteger
  la fauna silvestre de nuestra provincia.

  📱 O ingresa directo a:
  fauna-comunidad.onrender.com/registro

  #GuardiánDeFauna #FaunaNeuquén
  ```

## 🔧 Para Regenerar el QR

Si necesitas cambiar la URL o crear una nueva versión:

```bash
cd fauna-comunidad
npm run generate-qr
```

Para cambiar la URL, edita el archivo `generate-qr.js`:
```javascript
const url = 'https://tu-nueva-url.com/registro';
```

## 📍 Ubicación de Archivos

```
fauna-comunidad/
├── public/
│   └── qr-registro-guardian.png     # ← QR listo para usar
├── src/app/
│   ├── registro/
│   │   └── page.tsx                 # ← Página que abre el formulario
│   └── qr/
│       └── page.tsx                 # ← Página para ver/descargar QR
└── generate-qr.js                   # ← Script para generar QR
```

## 🎨 Características del QR

- ✅ **Estable**: La URL nunca cambia
- ✅ **Gratuito**: No requiere servicios de pago
- ✅ **Alta Calidad**: 500x500px optimizado
- ✅ **Corrección de Errores**: Nivel H (30% del código puede estar dañado y aún funciona)
- ✅ **Compatible**: Funciona con cualquier lector de QR

## 🚀 Después del Deploy

Una vez que Render termine el deploy (2-3 minutos):

1. **Prueba el QR**:
   - Abre la cámara de tu celular
   - Apunta al QR (puedes abrir la imagen en tu computadora)
   - Debería llevarte al formulario de registro abierto

2. **Descarga el QR**:
   - Ve a: `https://fauna-comunidad.onrender.com/qr`
   - Click en "Descargar QR en Alta Calidad"

3. **Comparte**:
   - Usa el link directo: `fauna-comunidad.onrender.com/registro`
   - O comparte la imagen del QR

## 💡 Ideas de Uso

- **Carteles en escuelas y centros comunitarios**
- **Presentaciones sobre fauna silvestre**
- **Folletos impresos**
- **Posts en redes sociales**
- **Firma de emails institucionales**
- **Códigos QR en merchandising (remeras, stickers, etc.)**

---

¡El QR está listo para usar! 🎉
