/**
 * Matrix Rain Effect
 * Autor: IA Helper (for Code Projects Portfolio)
 */

const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

// 1. Configuración de pantalla
function setupCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

setupCanvas();
window.addEventListener('resize', setupCanvas);

// 2. Parámetros del efecto
const characters = "ｦｱｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890ABCDEF$+-*/=%<>#!";
const fontSize = 16;
const columns = Math.floor(canvas.width / fontSize);

// Creamos un array para las gotas (una por columna)
// drops[x] almacenará la posición actual en el eje Y de la gota en la columna x
const drops = [];
for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

// 3. Función de dibujo principal
function draw() {
    // Fondo negro semitransparente para dejar el rastro de las letras
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Estilo de las letras
    ctx.fillStyle = "#0f0"; // Verde neón
    ctx.font = fontSize + "px monospace";

    // Opcional: añade un poco de brillo (glow)
    ctx.shadowBlur = 5;
    ctx.shadowColor = "#0f0";

    // Dibujar cada gota
    for (let i = 0; i < drops.length; i++) {
        // Elegir un carácter aleatorio
        const text = characters.charAt(Math.floor(Math.random() * characters.length));

        // Dibujarlo en la posición (x, y)
        // x = i * fontSize | y = drops[i] * fontSize
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Si la gota llega al final de la pantalla, reiniciarla arriba aleatoriamente
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        // Mover la gota hacia abajo
        drops[i]++;
    }
}

// 4. Ejecución (aprox. 30 fotogramas por segundo)
setInterval(draw, 35);
function glitchText(elemento) {
    const textoOriginal = elemento.innerText;
    const letras = "ｦｱｳｴｵｶｷｸｹｺ012345";

    let interval = setInterval(() => {
        elemento.innerText = textoOriginal
            .split("")
            .map(() => letras.charAt(Math.floor(Math.random() * letras.length)))
            .join("");
    }, 50);

    setTimeout(() => {
        clearInterval(interval);
        elemento.innerText = textoOriginal;
    }, 500); // El glitch dura medio segundo
}

// Se activa solo de vez en cuando (cada 5-10 segundos)
setInterval(() => {
    const titulo = document.querySelector('h1');
    if(titulo) glitchText(titulo);
}, 7000);
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZｦｱｳｴｵｶｷｸｹｺｻｼｽｾｿ1234567890";

document.querySelectorAll("h1, h2, .descripcio-linies").forEach(element => {
    element.onmouseover = event => {
        let iteration = 0;
        const originalValue = event.target.innerText;

        const interval = setInterval(() => {
            event.target.innerText = originalValue
                .split("")
                .map((letter, index) => {
                    if(index < iteration) {
                        return originalValue[index];
                    }
                    return letters[Math.floor(Math.random() * 52)];
                })
                .join("");

            if(iteration >= originalValue.length) {
                clearInterval(interval);
            }

            iteration += 1 / 3;
        }, 30);
    };
});
// Simula un fallo de energía o interferencia sutil
if (Math.random() > 0.99) {
    ctx.fillStyle = "rgba(0, 255, 0, 0.1)"; // Un flash verde muy rápido
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function triggerAlert() {
    const originalColor = "#0f0";
    ctx.fillStyle = "#f00"; // Cambio a rojo
    ctx.shadowColor = "#f00";

    // Un flash rápido en la pantalla
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Volver al verde tras 500ms
    setTimeout(() => {
        ctx.fillStyle = originalColor;
        ctx.shadowColor = originalColor;
    }, 500);
}

// Ejemplo: Se activa si presionan la tecla 'X' (de peligro)
window.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'x') triggerAlert();
});
function draw() {
    // Fondo muy oscuro con estela
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0f0"; // Color de las letras de la lluvia
    ctx.font = fontSize + "px monospace";

    // Opcional: añade este brillo para que las letras del matrix se parezcan a la imagen
    ctx.shadowBlur = 2;
    ctx.shadowColor = "#0f0";

    for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}