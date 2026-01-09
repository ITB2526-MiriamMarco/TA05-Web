/**
 * MATRIX TERMINAL ENGINE - FULL INTEGRATED VERSION
 * Includes: Boot Sequence, Matrix Rain, Text Decrypt, and Glitch Effects.
 */

const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

// --- 1. CONFIGURACIÓN Y RESPONSIVIDAD ---
const fontSize = 16;
const characters = "ｦｱｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890ABCDEF$+-*/=%<>#!";
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ｦｱｳｴｵｶｷｸｹｺ";
let columns = 0;
let drops = [];

function setupCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const newColumns = Math.floor(canvas.width / fontSize);
    const oldDrops = [...drops];
    drops = [];
    for (let x = 0; x < newColumns; x++) {
        drops[x] = oldDrops[x] || Math.floor(Math.random() * -20);
    }
}

// --- 2. NÚCLEO DE LA LLUVIA MATRIX ---
function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0f0";
    ctx.font = fontSize + "px monospace";
    ctx.shadowBlur = 4;
    ctx.shadowColor = "#0f0";

    for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
    requestAnimationFrame(drawMatrix);
}

// --- 3. EFECTOS INTERACTIVOS (HOVER Y GLITCH) ---
function initTextEffects() {
    document.querySelectorAll("h1, h2, .descripcio-linies").forEach(element => {
        let interval = null;
        element.onmouseover = event => {
            let iteration = 0;
            const originalValue = event.target.innerText;
            clearInterval(interval);
            interval = setInterval(() => {
                event.target.innerText = originalValue.split("")
                    .map((letter, index) => {
                        if(index < iteration) return originalValue[index];
                        return letters[Math.floor(Math.random() * letters.length)];
                    }).join("");
                if(iteration >= originalValue.length) clearInterval(interval);
                iteration += 1 / 3;
            }, 30);
        };
    });
}

function glitchText(elemento) {
    if (!elemento) return;
    const textoOriginal = elemento.innerText;
    let interval = setInterval(() => {
        elemento.innerText = textoOriginal.split("")
            .map(() => "ｦｱｳｴｵ012345".charAt(Math.floor(Math.random() * 11)))
            .join("");
    }, 50);
    setTimeout(() => { clearInterval(interval); elemento.innerText = textoOriginal; }, 400);
}

// --- 4. SECUENCIA DE ARRANQUE (BOOT SEQUENCE) ---
const bootLines = [
    "> INITIALIZING KERNEL 6.2.0-31-GENERIC...",
    "> LOADING SYSTEM MODULES................ [OK]",
    "> ESTABLISHING SECURE PROTOCOLS......... [OK]",
    "> ACCESSING PROJECTS REPOSITORY......... [DONE]",
    "> DECRYPTING PORTFOLIO DATA............. [100%]",
    "> WELCOME, AGENT. ACCESS GRANTED."
];

async function runBootSequence() {
    const bootText = document.getElementById('boot-text');
    const bootScreen = document.getElementById('boot-screen');
    if (!bootText || !bootScreen) return;

    for (let line of bootLines) {
        bootText.innerText += line + "\n";
        // Espera aleatoria para realismo
        await new Promise(res => setTimeout(res, Math.random() * 300 + 150));
    }

    setTimeout(() => {
        bootScreen.classList.add('fade-out');
        setTimeout(() => bootScreen.style.display = 'none', 1000);
    }, 800);
}

// --- 5. INICIALIZACIÓN Y EVENTOS ---
setupCanvas();
drawMatrix();
initTextEffects();

window.addEventListener('resize', setupCanvas);
window.addEventListener('load', runBootSequence); // Inicia el boot al cargar

setInterval(() => {
    const titulo = document.querySelector('h1');
    glitchText(titulo);
}, 8000);

// Alerta Roja con tecla 'X'
window.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'x') {
        ctx.fillStyle = "rgba(255, 0, 0, 0.6)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
});