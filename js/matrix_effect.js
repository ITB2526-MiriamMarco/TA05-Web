/**
 * MATRIX TERMINAL SYSTEM - CORE ENGINE
 * Includes: Matrix Rain, Hacker Text Effect, and Smart Boot Sequence
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. GESTIÓN DE LA PANTALLA DE CARGA (BOOT SEQUENCE)
    const bootScreen = document.getElementById("boot-screen");
    const bootText = document.getElementById("boot-text");
    const isFirstLoad = !sessionStorage.getItem("system_booted");

    const terminalMessages = [
        "INITIALIZING MATRIX KERNEL 4.0.1...",
        "LOADING NEURAL NETWORKS...",
        "ESTABLISHING SECURE PROTOCOLS...",
        "DECRYPTING DATABASE FILES...",
        "ACCESS GRANTED. WELCOME, AGENT."
    ];

    if (isFirstLoad) {
        let currentLine = 0;
        const typeMessage = () => {
            if (currentLine < terminalMessages.length) {
                bootText.innerHTML += `> ${terminalMessages[currentLine]}\n`;
                currentLine++;
                setTimeout(typeMessage, 400); // Velocidad de los mensajes
            } else {
                setTimeout(() => {
                    bootScreen.style.opacity = "0";
                    setTimeout(() => {
                        bootScreen.style.display = "none";
                        sessionStorage.setItem("system_booted", "true");
                    }, 500);
                }, 800);
            }
        };
        typeMessage();
    } else {
        // Si ya cargó antes, eliminamos la pantalla de carga instantáneamente
        bootScreen.style.display = "none";
    }

    // 2. EFECTO DE TEXTO HACKER (DESCIFRADO)
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
    const hackerElements = document.querySelectorAll("[data-value]");

    hackerElements.forEach(element => {
        element.onmouseover = event => {
            let iteration = 0;
            const originalValue = event.target.dataset.value;
            clearInterval(element.interval);

            element.interval = setInterval(() => {
                event.target.innerText = originalValue
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) return originalValue[index];
                        return letters[Math.floor(Math.random() * letters.length)];
                    })
                    .join("");

                if (iteration >= originalValue.length) {
                    clearInterval(element.interval);
                }
                iteration += 1 / 3;
            }, 30);
        };
    });

    // 3. LLUVIA DE CÓDIGO MATRIX (CANVAS)
    const canvas = document.getElementById("matrixCanvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        const characters = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const fontSize = 16;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);

        function drawMatrix() {
            // Fondo semitransparente para el efecto estela
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "#0f0"; // Color verde neón
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = characters.charAt(Math.floor(Math.random() * characters.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        setInterval(drawMatrix, 50);
    }
});