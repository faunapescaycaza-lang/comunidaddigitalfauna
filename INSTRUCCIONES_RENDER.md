# Instrucciones para Configurar Variables en Render

## Variables que YA TIENES configuradas ✅

Estas variables ya están en tu Render y están bien:
- ✅ `CLOUDINARY_URL`
- ✅ `DATABASE_URL`
- ✅ `NODE_ENV`
- ✅ `RESEND_API_KEY`

## Variables que NECESITAS AGREGAR ⚠️

### 1. NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

Esta variable es necesaria para que el navegador pueda acceder al nombre del cloud de Cloudinary.

**Valor a agregar:**
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dltraeliq
```

### 2. NEXT_PUBLIC_APP_URL

Esta variable es CRÍTICA para que funcione el envío de emails.

**Valor a agregar:**
```
NEXT_PUBLIC_APP_URL=https://TU-APP-NOMBRE.onrender.com
```

**⚠️ IMPORTANTE:** Reemplaza `TU-APP-NOMBRE` con el nombre real de tu servicio en Render.

Para encontrar tu URL:
1. Ve a tu dashboard de Render
2. Mira la URL en la parte superior de tu servicio
3. Debería verse algo como: `https://fauna-comunidad-xxxx.onrender.com`

## Pasos para Agregar las Variables

### Paso 1: Ve a Environment en Render

1. Abre https://dashboard.render.com
2. Click en tu servicio `fauna-comunidad`
3. Click en **"Environment"** en el menú lateral

### Paso 2: Agrega NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

1. Click en **"Add Environment Variable"**
2. En "Key" escribe: `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
3. En "Value" escribe: `dltraeliq`
4. Click en **"Save Changes"**

### Paso 3: Agrega NEXT_PUBLIC_APP_URL

1. Click en **"Add Environment Variable"** otra vez
2. En "Key" escribe: `NEXT_PUBLIC_APP_URL`
3. En "Value" escribe tu URL completa con https://, por ejemplo:
   ```
   https://fauna-comunidad-xxxx.onrender.com
   ```
4. Click en **"Save Changes"**

### Paso 4: Hacer Deploy del Código Actualizado

Ahora necesitas hacer push del código actualizado:

```bash
cd fauna-comunidad
git add .
git commit -m "Fix: Soporte para CLOUDINARY_URL y configuración de variables de entorno"
git push origin main
```

Render detectará el push automáticamente y reiniciará el servicio.

## Verificación del Deploy

Después de que Render termine el deploy (5-10 minutos), verifica:

### 1. Logs de Cloudinary
En los logs de Render deberías ver uno de estos mensajes:
- `Cloudinary configured from CLOUDINARY_URL` ✅
- `Cloudinary configured from individual env vars` ✅

Si ves errores de "Must supply api_key", revisa las variables.

### 2. Prueba de Upload
1. Ve a tu sitio en Render
2. Click en "Registrar Guardián de Fauna"
3. Llena el formulario y selecciona una imagen
4. Deberías ver "Subiendo imagen..." y luego "Imagen subida" ✅
5. Al enviar, deberías ver "¡Avistamiento registrado con éxito!" ✅

### 3. Prueba de Email
1. Revisa el email que usaste en el formulario
2. Deberías recibir un email con "¡Gracias por ser un Guardián de Fauna!" ✅
3. Si no llega, revisa spam

### 4. Prueba de Eliminación (Admin)
1. Click en "Login Admin"
2. Ingresa las credenciales
3. Click en el botón de eliminar de un reporte
4. Confirma la eliminación
5. El reporte debería desaparecer ✅

## Resumen de Variables Finales en Render

Después de seguir estos pasos, deberías tener estas 6 variables:

```
✅ CLOUDINARY_URL=cloudinary://843863464732728:9avN1CXsScU5TU0FCtSXWYkOhV4@dltraeliq
✅ DATABASE_URL=postgresql://fauna_guardianes_db_user:...
✅ NODE_ENV=production
✅ RESEND_API_KEY=re_JEKiAMmA_EABZ5ZBNTLfY7z5wmN2e6V49
⚠️ NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dltraeliq  (AGREGAR)
⚠️ NEXT_PUBLIC_APP_URL=https://tu-app.onrender.com  (AGREGAR)
```

## Solución de Problemas

### Error: "Image upload failed"
- Verifica que `CLOUDINARY_URL` esté correcta
- Verifica que `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` esté agregada
- Revisa los logs de Render para más detalles

### Error: "Failed to send email"
- Verifica que `NEXT_PUBLIC_APP_URL` esté correcta
- Asegúrate de usar `https://` no `http://`
- Verifica que `RESEND_API_KEY` esté correcta

### Imagen de niña guardiana no aparece
- Haz Ctrl + Shift + R para limpiar el cache
- Verifica que el archivo `nina-guardian.png` exista en `public/`

### Botón de eliminar no funciona
- Verifica que estés logueado como admin
- Verifica `CLOUDINARY_URL` en Render
- Revisa los logs para ver el error específico

## Contacto

Si después de seguir todos estos pasos sigues teniendo problemas, envíame:
1. Los logs de Render (copia el texto de los errores en rojo)
2. Capturas de pantalla de tus variables de entorno en Render
3. Descripción específica del error que ves
