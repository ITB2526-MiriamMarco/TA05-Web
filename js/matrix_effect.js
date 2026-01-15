/**
 * MATRIX SYSTEM - FULL CORE
 * Archivo: matrix_effect.js
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. ELIMINAR BLOQUEO NEGRO (Seguridad extra)
    // Borra el div de carga si aún existe en el HTML para que no tape nada.
    const bootScreen = document.getElementById("boot-screen");
    if (bootScreen) {
        bootScreen.remove();
        console.log("Sistema: Pantalla de carga eliminada manualmente por JS.");
    }

    // 2. CONFIGURACIÓN DE LA LLUVIA MATRIX
    const canvas = document.getElementById("matrixCanvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");

        // Ajustar el canvas al tamaño total de la ventana
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        // Caracteres: Katakana y Números
        const chars = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓ0123456789";
        const fontSize = 16;
        const columns = Math.floor(canvas.width / fontSize);
        const drops = new Array(columns).fill(1);

        function drawMatrix() {
            // Fondo con opacidad para crear el efecto de rastro (estela)
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "#0f0"; // Verde neón
            ctx.font = fontSize + "px monospace";

            drops.forEach((y, i) => {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, y * fontSize);

                // Reiniciar gota al azar cuando llega al final
                if (y * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            });
        }
        setInterval(drawMatrix, 50);
    }

    // 3. EFECTO HACKER (DESCIFRADO AL PASAR EL MOUSE)
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
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
                        return letters[Math.floor(Math.random() * 36)];
                    })
                    .join("");

                if (iteration >= originalValue.length) {
                    clearInterval(element.interval);
                }
                iteration += 1 / 3;
            }, 30);
        };
    });

    console.log("Matrix Core: Ejecutándose correctamente.");
});