const mailBodyRegister = (mail, user, password) => {
    const string = 
    "<!DOCTYPE html>"+
    "<html lang='en'>"+
    "<head>"+
    "    <meta charset='UTF-8'>"+
    "    <meta name='viewport' content='width=device-width, initial-scale=1.0'>"+
    "    <title>Registro de Cuenta</title>"+
    "    <style>"+
    "        body {"+
    "            font-family: Arial, sans-serif;"+
    "            line-height: 1.6;"+
    "            margin: 0;"+
    "            padding: 0;"+
    "        }"+

    "        table {"+
    "            width: 100%;"+
    "        }"+

    "        .header {"+
    "            background-color: #f4f4f4;"+
    "            padding: 20px;"+
    "            text-align: center;"+
    "        }"+
    "        .content {"+
    "            padding: 20px;"+
    "        }"+
    "        .footer {"+
    "            background-color: #f4f4f4;"+
    "            padding: 10px;"+
    "            text-align: center;"+
    "        }"+
    "    </style>"+
    "</head>"+
    "<body>"+
     "   <div class='header'>"+
            "<h1>Your Company Name</h1>"+
      "  </div>"+
        "<div class='content'>"+
            "<h2>Buen día,</h2>"+
            `<p>El correo  ${mail} ha sido registrado para la aplicación de territorios.</p>`+
            `<p>Se registró con los siguientes datos:</p>`+
            `<p>Usuario: ${user}</p>`+
            `<p>Contraseña: ${password}</p>`+
        "</div>"+
        "<div class='footer'>"+
            "<p>Este mail es automático. Cualquier duda dirigirse a <a href='mailto:cesar.higashi04@gmail.com'>Cesar Higashi</a> </p>"+
        "</div>"+
    "</body>"+
    "</html>";

    return string;
}

module.exports = {
    mailBodyRegister
}