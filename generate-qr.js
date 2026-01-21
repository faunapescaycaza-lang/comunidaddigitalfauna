const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

const url = 'https://fauna-comunidad.onrender.com/registro';

const options = {
  errorCorrectionLevel: 'H',
  type: 'image/png',
  quality: 1,
  margin: 2,
  width: 500,
  color: {
    dark: '#1a202c',
    light: '#ffffff'
  }
};

// Generar QR en alta calidad
QRCode.toFile(
  path.join(__dirname, 'public', 'qr-registro-guardian.png'),
  url,
  options,
  (err) => {
    if (err) {
      console.error('Error generando QR:', err);
    } else {
      console.log('✅ QR generado exitosamente en public/qr-registro-guardian.png');
      console.log('📱 URL del QR:', url);
      console.log('\nPuedes usar este QR para:');
      console.log('- Imprimirlo en carteles');
      console.log('- Compartirlo en redes sociales');
      console.log('- Incluirlo en presentaciones');
      console.log('\nEl QR lleva directamente al formulario de registro');
    }
  }
);
