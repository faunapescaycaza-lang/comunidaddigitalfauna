export const getGuardianCardHtml = (name: string): string => {
  // Asumimos que la aplicación corre en localhost:3000 para la URL del logo en desarrollo.
  // En producción, esto debería ser una URL absoluta al dominio del sitio.
  const logoUrl = "https://res.cloudinary.com/dltraeliq/image/upload/v1768910873/fauna-removebg-preview_kauerg.png";
  const webUrl = "https://cazaypesca.neuquen.gob.ar/";
  const instagramUrl = "https://www.instagram.com/fauna_neuquen?igsh=YWptNHhuNjZwdXNh";

  return `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>¡Felicidades, Guardián de Fauna!</title>
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        background-color: #f0f2f5;
        margin: 0;
        padding: 20px;
        color: #333;
      }
      .container {
        background-color: #ffffff;
        margin: 0 auto;
        padding: 30px;
        border-radius: 12px;
        max-width: 600px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        border: 1px solid #e1e1e1;
      }
      .header {
        text-align: center;
        padding-bottom: 25px;
        border-bottom: 1px solid #e1e1e1;
      }
      .header img {
        max-width: 120px;
        margin-bottom: 15px;
      }
      .header h2 {
        color: #1a202c;
        font-size: 26px;
        font-weight: 600;
        margin: 0;
      }
      .content {
        padding: 30px 0;
        text-align: center;
      }
      .content p {
        font-size: 16px;
        color: #4a5568;
        line-height: 1.6;
      }
      .card {
        background: linear-gradient(135deg, #38A169 0%, #2F855A 100%);
        color: #ffffff;
        padding: 40px;
        border-radius: 10px;
        text-align: center;
        margin: 25px 0;
        box-shadow: 0 10px 20px rgba(47, 133, 90, 0.25);
      }
      .card h1 {
        margin: 0;
        font-size: 32px;
        font-weight: 700;
        letter-spacing: 0.5px;
      }
      .card .name {
        font-size: 22px;
        margin-top: 12px;
        font-weight: 500;
        opacity: 0.9;
      }
      .footer {
        text-align: center;
        padding-top: 25px;
        border-top: 1px solid #e1e1e1;
        font-size: 14px;
        color: #718096;
      }
      .footer .social-title {
        font-weight: 600;
        margin-bottom: 15px;
        font-size: 16px;
        color: #4a5568;
      }
      .footer a {
        color: #2F855A;
        text-decoration: none;
        font-weight: 500;
        margin: 0 10px;
      }
      .footer a:hover {
        text-decoration: underline;
      }
      .footer .disclaimer {
        font-size: 12px;
        color: #a0aec0;
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <img src="${logoUrl}" alt="Fauna Neuquén Logo">
        <h2>¡Felicidades, ${name}!</h2>
      </div>
      <div class="content">
        <p>Por tu valioso aporte y compromiso, has sido reconocido como:</p>
        <div class="card">
          <h1>Guardián de Fauna</h1>
          <p class="name">${name}</p>
        </div>
        <p>Tu participación es fundamental para la protección de la fauna silvestre de nuestra provincia.</p>
      </div>
      <div class="footer">
        <p class="social-title">Seguinos en nuestras redes</p>
        <p>
          <a href="${webUrl}" target="_blank">Sitio Web Oficial</a>
          &bull;
          <a href="${instagramUrl}" target="_blank">Instagram</a>
        </p>
        <p class="disclaimer">Este email fue enviado por Fauna Comunidad.</p>
      </div>
    </div>
  </body>
  </html>
  `;
};
