/**
 * MATRIX TERMINAL ENGINE - FULL INTEGRATED & BUG-FREE VERSION
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
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; // Crea el rastro
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0f0"; // Verde Neón
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
    requestAnimationFrame(drawMatrix); // Animación fluida
}

// --- 3. EFECTOS INTERACTIVOS (SOLUCIÓN AL TEXTO ROTO) ---
function initTextEffects() {
    document.querySelectorAll("h1, h2, .descripcio-linies").forEach(element => {
        let interval = null;

        // Guardamos el valor real en un atributo personalizado (dataset)
        // Esto evita que el texto se "ensucie" con símbolos permanentes
        if (!element.dataset.value) {
            element.dataset.value = element.innerText;
        }

        element.onmouseover = event => {
            let iteration = 0;
            const originalValue = event.target.dataset.value;

            clearInterval(interval); // Limpia animaciones previas

            interval = setInterval(() => {
                event.target.innerText = originalValue
                    .split("")
                    .map((letter, index) => {
                        if(index < iteration) {
                            return originalValue[index]; // Letra correcta
                        }
                        return letters[Math.floor(Math.random() * letters.length)]; // Símbolo
                    })
                    .join("");

                if(iteration >= originalValue.length) {
                    clearInterval(interval);
                    event.target.innerText = originalValue; // Asegura el final limpio
                }

                iteration += 1 / 3;
            }, 30);
        };

        // Si el ratón sale rápido, restauramos el texto original inmediatamente
        element.onmouseleave = event => {
            clearInterval(interval);
            event.target.innerText = event.target.dataset.value;
        };
    });
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

    bootText.innerText = ""; // Limpiar antes de empezar
    for (let line of bootLines) {
        bootText.innerText += line + "\n";
        await new Promise(res => setTimeout(res, Math.random() * 200 + 100));
    }

    setTimeout(() => {
        bootScreen.style.transition = "opacity 0.8s ease";
        bootScreen.style.opacity = "0";
        setTimeout(() => {
            bootScreen.style.display = 'none';
        }, 800);
    }, 1000);
}

// --- 5. INICIALIZACIÓN ---
setupCanvas();
drawMatrix();
initTextEffects();

window.addEventListener('resize', setupCanvas);
window.addEventListener('load', runBootSequence);

// Efecto glitch automático ocasional en el H1
setInterval(() => {
    const titulo = document.querySelector('h1');
    if (titulo) {
        const original = titulo.dataset.value || titulo.innerText;
        let count = 0;
        const glitchInterval = setInterval(() => {
            titulo.innerText = original.split("").map(() => letters[Math.floor(Math.random() * 10)]).join("");
            if (count++ > 5) {
                clearInterval(glitchInterval);
                titulo.innerText = original;
            }
        }, 60);
    }
}, 10000);