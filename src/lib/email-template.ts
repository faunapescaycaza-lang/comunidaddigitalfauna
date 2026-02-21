export const getGuardianCardHtml = (name: string): string => {
  // Logo mejorado con mayor calidad desde Cloudinary
  const logoUrl = "https://res.cloudinary.com/dltraeliq/image/upload/w_240,q_auto,f_auto/v1768910873/fauna-removebg-preview_kauerg.png";
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
        max-width: 150px;
        height: auto;
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
        background: linear-gradient(135deg, #48BB78 0%, #38A169 100%);
        color: #ffffff;
        padding: 40px;
        border-radius: 16px;
        text-align: center;
        margin: 25px 0;
        box-shadow: 0 10px 30px rgba(56, 161, 105, 0.3);
        border: 2px solid rgba(255, 255, 255, 0.2);
      }
      .card h1 {
        margin: 0;
        font-size: 36px;
        font-weight: 700;
        letter-spacing: 0.5px;
        text-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
      .card .name {
        font-size: 28px;
        margin-top: 16px;
        font-weight: 700;
        opacity: 1;
        background-color: rgba(255, 255, 255, 0.25);
        padding: 12px 24px;
        border-radius: 8px;
        display: inline-block;
        text-transform: uppercase;
        letter-spacing: 1px;
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
        margin-bottom: 20px;
        font-size: 18px;
        color: #2d3748;
      }
      .instagram-button {
        display: inline-block;
        background: linear-gradient(135deg, #E1306C 0%, #C13584 50%, #833AB4 100%);
        color: #ffffff;
        text-decoration: none;
        padding: 16px 40px;
        border-radius: 30px;
        font-weight: 700;
        font-size: 16px;
        margin: 10px 0;
        box-shadow: 0 6px 20px rgba(225, 48, 108, 0.4);
        transition: transform 0.2s;
      }
      .instagram-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(225, 48, 108, 0.5);
      }
      .instagram-icon {
        display: inline-block;
        width: 20px;
        height: 20px;
        background: white;
        border-radius: 6px;
        margin-right: 8px;
        vertical-align: middle;
      }
      .web-link {
        color: #38A169;
        text-decoration: none;
        font-weight: 600;
        font-size: 15px;
        display: inline-block;
        margin-top: 15px;
      }
      .web-link:hover {
        text-decoration: underline;
      }
      .footer .disclaimer {
        font-size: 12px;
        color: #a0aec0;
        margin-top: 25px;
      }
      .social-section {
        margin: 20px 0;
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
          <h1>🌿 Guardián de Fauna 🌿</h1>
          <p class="name">${name}</p>
        </div>
        <p>Tu participación es fundamental para la protección de la fauna silvestre de nuestra provincia.</p>
      </div>
      <div class="footer">
        <p class="social-title">¡Seguinos en Instagram!</p>
        <div class="social-section">
          <a href="${instagramUrl}" target="_blank" class="instagram-button">
            <span class="instagram-icon">📷</span>
            Seguir @fauna_neuquen
          </a>
        </div>
        <a href="${webUrl}" target="_blank" class="web-link">🌐 Visitar Sitio Web Oficial</a>
        <p class="disclaimer">Este email fue enviado por Fauna Comunidad Digital.</p>
      </div>
    </div>
  </body>
  </html>
  `;
};
