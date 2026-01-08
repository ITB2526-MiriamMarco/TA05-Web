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