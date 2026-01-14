/**
 * MATRIX TERMINAL ENGINE - HIGH-PERFORMANCE VERSION
 */

const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

// --- 1. CONFIGURACIÓN Y RESPONSIVIDAD ---
const fontSize = 16;
const characters = "ｦｱｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890ABCDEF$+-*/=%<>#!";
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ｦｱｳｴｵｶｷｸｹｺ";
let drops = [];

function setupCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const columns = Math.floor(canvas.width / fontSize);

    // Optimizamos la regeneración de gotas al redimensionar
    if (drops.length !== columns) {
        drops = [];
        for (let x = 0; x < columns; x++) {
            drops[x] = Math.floor(Math.random() * -20);
        }
    }
}

// --- 2. NÚCLEO DE LA LLUVIA MATRIX ---
function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0f0";
    ctx.font = fontSize + "px monospace";

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

// --- 3. EFECTOS INTERACTIVOS (TEXTO HACKER) ---
function initTextEffects() {
    document.querySelectorAll("h1, h2, .descripcio-linies").forEach(element => {
        let interval = null;

        if (!element.dataset.value) {
            element.dataset.value = element.innerText;
        }

        element.onmouseover = event => {
            let iteration = 0;
            const originalValue = event.target.dataset.value;
            clearInterval(interval);

            interval = setInterval(() => {
                event.target.innerText = originalValue
                    .split("")
                    .map((letter, index) => {
                        if(index < iteration) return originalValue[index];
                        return letters[Math.floor(Math.random() * letters.length)];
                    })
                    .join("");

                if(iteration >= originalValue.length) {
                    clearInterval(interval);
                    event.target.innerText = originalValue;
                }
                iteration += 1 / 2; // Velocidad de revelado aumentada
            }, 20);
        };

        element.onmouseleave = event => {
            clearInterval(interval);
            event.target.innerText = event.target.dataset.value;
        };
    });
}

// --- 4. SECUENCIA DE ARRANQUE ACELERADA (BOOT SEQUENCE) ---
const bootLines = [
    "> INITIALIZING KERNEL 6.2.0...",
    "> LOADING MODULES............... [OK]",
    "> SECURE PROTOCOLS.............. [OK]",
    "> ACCESSING REPOSITORY.......... [DONE]",
    "> WELCOME, AGENT."
];

async function runBootSequence() {
    const bootText = document.getElementById('boot-text');
    const bootScreen = document.getElementById('boot-screen');
    if (!bootText || !bootScreen) return;

    bootText.innerText = "";
    for (let line of bootLines) {
        bootText.innerText += line + "\n";
        // Tiempo de escritura mucho más rápido
        await new Promise(res => setTimeout(res, Math.random() * 40 + 10));
    }

    // Desvanecimiento rápido
    setTimeout(() => {
        bootScreen.style.transition = "opacity 0.4s ease";
        bootScreen.style.opacity = "0";
        setTimeout(() => {
            bootScreen.style.display = 'none';
        }, 400);
    }, 400);
}

// --- 5. PRECARGA DE ENLACES (NAVEGACIÓN INSTANTÁNEA) ---
function initPrefetching() {
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('mouseenter', () => {
            const href = link.getAttribute('href');
            if (href && href.endsWith('.html') && !href.startsWith('#')) {
                const prefetch = document.createElement('link');
                prefetch.rel = 'prefetch';
                prefetch.href = href;
                document.head.appendChild(prefetch);
            }
        }, { once: true });
    });
}

// --- 6. INICIALIZACIÓN Y CONTROL DE SESIÓN ---
setupCanvas();
drawMatrix();
initTextEffects();
initPrefetching();

window.addEventListener('resize', setupCanvas);

// Solo ejecuta el boot la primera vez que se abre la pestaña
window.addEventListener('load', () => {
    const hasBooted = sessionStorage.getItem('system_booted');
    const bootScreen = document.getElementById('boot-screen');

    if (!hasBooted && bootScreen) {
        runBootSequence().then(() => {
            sessionStorage.setItem('system_booted', 'true');
        });
    } else if (bootScreen) {
        bootScreen.style.display = 'none';
    }
});

// Glitch ocasional en el título principal
setInterval(() => {
    const titulo = document.querySelector('h1');
    if (titulo && titulo.innerText === titulo.dataset.value) {
        const original = titulo.dataset.value;
        let count = 0;
        const glitchInterval = setInterval(() => {
            titulo.innerText = original.split("").map(() => letters[Math.floor(Math.random() * 10)]).join("");
            if (count++ > 3) {
                clearInterval(glitchInterval);
                titulo.innerText = original;
            }
        }, 50);
    }
}, 15000);
