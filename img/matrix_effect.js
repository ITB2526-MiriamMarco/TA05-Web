// Obté el body per adjuntar el canvas
const body = document.body;

// 1. Crear l'element Canvas
const canvas = document.createElement('canvas');
canvas.id = 'matrixCanvas';
body.prepend(canvas); // Afegim el canvas just després de <body> perquè sigui el fons

const ctx = canvas.getContext('2d');

// 2. Definir mida i caràcters
let W = canvas.width = window.innerWidth;
let H = canvas.height = window.innerHeight;
const font_size = 18;
const columns = W / font_size; // Nombre de columnes

// Caràcters per a la pluja de codi (Matrix/Hacker)
const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+{}:"<>?|~`-=[]\;,./';
// Array per fer un seguiment de la posició Y de cada columna
const drops = [];

// Inicialitzar cada columna a la posició Y=1
for (let i = 0; i < columns; i++) {
    drops[i] = 1;
}

// 3. La funció de dibuix (loop principal)
function draw() {
    // Fons negre semitransparent per crear l'efecte de rastre
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, W, H);

    // Color i font del text
    ctx.fillStyle = '#0F0'; // Verd brillant
    ctx.font = font_size + 'px monospace';

    // Bucle per cada columna (drop)
    for (let i = 0; i < drops.length; i++) {
        // Seleccionar un caràcter aleatori
        const text = characters.charAt(Math.floor(Math.random() * characters.length));

        // Calcular la posició X i Y
        const x = i * font_size;
        const y = drops[i] * font_size;

        // Dibuixar el caràcter
        ctx.fillText(text, x, y);

        // Si la "gota" ha arribat al fons (o més enllà), la reseteja a dalt
        if (drops[i] * font_size > H && Math.random() > 0.975) {
            drops[i] = 0;
        }

        // Incrementa la posició Y de la gota
        drops[i]++;
    }
}

// 4. Bucle d'animació (33ms = ~30 FPS)
setInterval(draw, 33);

// 5. Ajustar el canvas si la finestra canvia de mida
window.addEventListener('resize', () => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    // Recalcular les columnes (opcional: o simplement reescalar)
});