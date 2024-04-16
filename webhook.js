<script>
    function sendContact(event) {
      event.preventDefault();

      const senderName = document.getElementById('nameInput').value;
      const senderDiscord = document.getElementById('discordInput').value;
      const senderEmail = document.getElementById('emailInput').value;
      const senderMessage = document.getElementById('messageInput').value;

 // Función para crear una cookie en el navegador
 // function to create a cookie
        function setCookie(name, value, days) {
            var expires = "";
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + (value || "") + expires + "; path=/";
        }

        // Función para obtener el valor de una cookie
        // Function to get the value of a cookie
        function getCookie(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) === ' ') {
                    c = c.substring(1, c.length);
                }
                if (c.indexOf(nameEQ) === 0) {
                    return c.substring(nameEQ.length, c.length);
                }
            }
            return null;
        }

        // Generar un identificador único si no existe la cookie
        // Generate a unique identifier if the cookie does not exist
        var userId = getCookie("userId");
        if (!userId) {
            userId = Date.now().toString(); // Puedes usar una lógica más robusta para generar el ID // You can use more robust logic to generate the ID
            setCookie("userId", userId, 365); // Guardar la cookie por 1 año  // Save the cookie for 1 year
        }

        console.log("ID de usuario: " + userId);

      const userAgent = navigator.userAgent;
      const language = navigator.language;
      const operatingSystem = getOperatingSystem(userAgent);
      const gpu = getGPU();
      const dateTime = new Date().toLocaleString();
      const screenResolution = `${window.screen.width}x${window.screen.height}`;
      const deviceName = getDeviceName(userAgent);


      visitorIP.then(ip => {
        const browser = getBrowser(userAgent);

        const webhookBody = {
          content: 'Form information ',
          embeds: [
            {
              title: 'From information',
              fields: [
                { name: 'name', value: senderName },
                { name: 'Discord', value: senderDiscord },
                { name: 'Email', value: senderEmail },
                { name: 'Message', value: senderMessage },
                { name: 'User Agent', value: userAgent },
                { name: 'Language', value: language },
                { name: 'Browser', value: browser },
                { name: 'Operating System', value: operatingSystem },
                { name: 'GPU', value: gpu },
                { name: 'Date and Time', value: dateTime },
                { name: 'screen resolution', value: screenResolution },
                { name: 'device model', value: deviceName },
                { name: 'Cookie ID', value: userId },
              ]
            }
          ]
        };

        const webhookUrl = 'https://discord.com/api/webhooks/1229805867336077372/gc4sQvqQWkTEiIwBXikRfjg9S9Npy4eU6cH5HOaKMAgSccgoSwZbhRbg34UBf6AFuO-x';

        fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(webhookBody)
        })
        .then(response => {
          if (response.ok) {
            alert('Message has been submitted');
            window.location.href = 'form-submitted';
          } else {
            alert('An unknown error occurred on the server.');
          }
        })
        .catch(error => {
          console.error('Error:', error);
          alert('An unknown error occurred on the server.');
        });
      });
    }

    function getBrowser(userAgent) {
      if (userAgent.includes('Firefox')) {
        return 'Mozilla Firefox';
      } else if (userAgent.includes('Chrome')) {
        return 'Google Chrome';
      } else if (userAgent.includes('Safari')) {
        return 'Apple Safari';
      } else if (userAgent.includes('Edge')) {
        return 'Microsoft Edge';
      } else if (userAgent.includes('Firefox')) {
        return 'Firefox';
      } else if (userAgent.includes('Opera')) {
        return 'Opera';
      } else {
        return 'Unknown';
      }
    }

    function getOperatingSystem(userAgent) {
      const operatingSystems = [
        { name: 'Windows', searchString: 'Win' },
        { name: 'Mac', searchString: 'Mac' },
        { name: 'Linux', searchString: 'Linux' },
        { name: 'iOS', searchString: 'iPhone|iPad|iPod' },
        { name: 'Android', searchString: 'Android' }
      ];

      for (const os of operatingSystems) {
        if (new RegExp(os.searchString, 'i').test(userAgent)) {
          return os.name;
        }
      }

      return 'Unknown';
    }

function getOperatingSystemName(userAgent) {
  const operatingSystemKeywords = [
    { keyword: 'Windows NT 10.0', name: 'Windows 10' },
    { keyword: 'Mac', name: 'Mac' },
    { keyword: 'Linux', name: 'Linux' },
    { keyword: 'iPhone', name: 'iOS' },
    { keyword: 'iPad', name: 'iOS' },
    { keyword: 'iPod', name: 'iOS' },
    { keyword: 'Android', name: 'Android' }
    // Puedes agregar más sistemas operativos y palabras clave según sea necesario
  ];

  for (const os of operatingSystemKeywords) {
    if (userAgent.includes(os.keyword)) {
      return os.name;
    }
  }

  return 'Unknown';
}


function getDeviceName(userAgent) {
  const deviceKeywords = [
    { keyword: 'SM-G532M', name: 'Samsung Galaxy J2 Prime' },
    { keyword: 'M2010J19SL', name: 'Xiaomi Redmi 9T' },
    { keyword: 'moto g (8) power)', name: 'Motorola Moto G8 power' },
    { keyword: 'CPH2207', name: 'OPPO Find X3 Neo' },
    { keyword: 'sm-a546b', name: 'Samsung Galaxy A54' },
    { keyword: 'RMX1971', name: 'Realme 5 Pro RMX1971' },
    { keyword: 'RMX1921', name: 'Realme XT' },
    { keyword: 'MAR-LX1A', name: 'Huawei P30 lite' },
    { keyword: 'X671B', name: 'Infinix Note 12 Pro 5G' },
    { keyword: 'SM-A705FN', name: 'Samsung Galaxy A70' },
    { keyword: 'M2101K7BNY', name: 'Xiaomi Redmi Note 10S' },
    { keyword: 'Pixel 3a', name: 'Google Pixel 3A' },
    { keyword: 'SM-A146P', name: 'Samsung Galaxy A14 5G' },
    { keyword: "iPhone13,4", "name": "iPhone 13 Pro" },
    { keyword: "Pixel 6 Pro", "name": "Google Pixel 6 Pro" },
    { keyword: "OnePlus9T", "name": "OnePlus 9T" },
    { keyword: "Redmi Note 11", "name": "Xiaomi Redmi Note 11" },
    { keyword: "Galaxy Z Fold 3", "name": "Samsung Galaxy Z Fold 3" },
    { keyword: "Sony Xperia 5 III", "name": "Sony Xperia 5 III" },
    { keyword: "LG Velvet 2", "name": "LG Velvet 2" },
    { keyword: "ASUS ROG Phone 5", "name": "ASUS ROG Phone 5" },
    { keyword: "iPad Pro 12.9 (2023)", "name": "iPad Pro 12.9 (2023)" },
    { keyword: "Mi 11 Lite", name: "Xiaomi Mi 11 Lite" },
  
  
  ];

  for (const device of deviceKeywords) {
    if (userAgent.includes(device.keyword)) {
      return device.name;
    }
  }

  return 'Not registered in the database';
}


    function getGPU() {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      const extension = gl.getExtension('WEBGL_debug_renderer_info');
      const gpu = gl.getParameter(extension.UNMASKED_RENDERER_WEBGL);

      return gpu || 'Unknown';
    }
  
  
  
  </script>
