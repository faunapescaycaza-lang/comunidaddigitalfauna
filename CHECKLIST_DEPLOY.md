# Checklist de Deploy a Render

## Antes del Deploy

### 1. Commits Locales
```bash
cd fauna-comunidad
git status
git add .
git commit -m "Fix: Correcciones de producción - Cloudinary, emails y eliminación"
git push origin main
```

### 2. Variables de Entorno en Render

Ve a: https://dashboard.render.com → Tu servicio → Environment

Verifica que estén configuradas TODAS estas variables:

- [ ] `DATABASE_URL`
- [ ] `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
- [ ] `CLOUDINARY_API_KEY`
- [ ] `CLOUDINARY_API_SECRET`
- [ ] `RESEND_API_KEY`
- [ ] `NEXT_PUBLIC_APP_URL` ← **IMPORTANTE: Usa tu URL real de Render**

Ejemplo de NEXT_PUBLIC_APP_URL:
```
https://fauna-comunidad.onrender.com
```

### 3. Esperar el Deploy

Render detectará el push automáticamente y comenzará a hacer el build.
- El proceso toma aproximadamente 5-10 minutos
- Puedes ver el progreso en el dashboard de Render

## Después del Deploy

### Verificaciones (en orden):

#### 1. Página carga correctamente
- [ ] La página principal carga sin errores
- [ ] El navbar se muestra correctamente
- [ ] La imagen de la niña guardiana aparece (solo una vez, a la derecha)

#### 2. Formulario de reporte
- [ ] El botón "Registrar Guardián de Fauna" abre el formulario
- [ ] Puedes llenar todos los campos
- [ ] Al seleccionar una imagen, aparece "Subiendo imagen..."
- [ ] Después aparece "Imagen subida"
- [ ] Al enviar el formulario, aparece "¡Avistamiento registrado con éxito!"

#### 3. Galería de reportes
- [ ] Los reportes aparecen en la página principal
- [ ] Las miniaturas de las imágenes se muestran correctamente
- [ ] Al hacer clic en un reporte, se abre la página de detalle

#### 4. Email de confirmación
- [ ] Revisa el email que ingresaste en el formulario
- [ ] Deberías recibir un email con el título "¡Gracias por ser un Guardián de Fauna!"
- [ ] Si no llega, revisa la carpeta de spam

#### 5. Funciones de administrador
- [ ] Haz clic en "Login Admin"
- [ ] Ingresa las credenciales
- [ ] Los botones de editar y eliminar aparecen en cada reporte
- [ ] Al hacer clic en eliminar y confirmar, el reporte se elimina
- [ ] La página se actualiza y el reporte ya no aparece

## Si algo no funciona:

### Revisar logs de Render:
1. Ve a tu servicio en Render
2. Click en "Logs" en el menú lateral
3. Busca mensajes de error en rojo

### Errores comunes:

**"Must supply api_key"**
- Verifica que `CLOUDINARY_API_KEY` y `CLOUDINARY_API_SECRET` estén configuradas
- Asegúrate de no tener espacios en blanco en los valores

**"Image upload failed"**
- Verifica las credenciales de Cloudinary
- Revisa los logs para ver el error específico

**"Failed to send email"**
- Verifica que `RESEND_API_KEY` esté configurada correctamente
- Verifica que `NEXT_PUBLIC_APP_URL` tenga la URL correcta con https://

**Imagen de niña guardiana no aparece**
- Verifica que el archivo `nina-guardian.png` exista en la carpeta `public`
- Limpia el cache del navegador (Ctrl + Shift + R)

**Botón de eliminar no funciona**
- Asegúrate de estar logueado como admin
- Verifica las credenciales de Cloudinary
- Revisa los logs de Render

## Contacto y Soporte

Si necesitas ayuda adicional:
- Documentación de Render: https://render.com/docs
- Documentación de Cloudinary: https://cloudinary.com/documentation
- Documentación de Resend: https://resend.com/docs
