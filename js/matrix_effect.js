/**
 * MATRIX TERMINAL SYSTEM - CORE ENGINE (Final Version)
 * Incluye: Lluvia Matrix y Efecto Hacker en Títulos
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. LIMPIEZA DE SEGURIDAD ---
    // Si todavía queda algún div de 'boot-screen' en el HTML, 
    // lo ocultamos forzosamente para que no bloquee la pantalla.
    const bootScreen = document.getElementById("boot-screen");
    if (bootScreen) {
        bootScreen.style.display = "none";
        bootScreen.style.visibility = "hidden";
    }

    // --- 2. EFECTO DE TEXTO HACKER (AL PASAR EL MOUSE) ---
    // Se activa en cualquier elemento que tenga el atributo data-value
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
    const hackerElements = document.querySelectorAll("[data-value]");

    hackerElements.forEach(element => {
        element.onmouseover = event => {
            let iteration = 0;
            const originalValue = event.target.dataset.value;
            
            // Limpiamos intervalos previos para evitar solapamientos
            clearInterval(element.interval);

            element.interval = setInterval(() => {
                event.target.innerText = originalValue
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return originalValue[index];
                        }
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

    // --- 3. LLUVIA DE CÓDIGO MATRIX (FONDO CANVAS) ---
    const canvas = document.getElementById("matrixCanvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");

        // Ajustar el canvas al tamaño de la ventana
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        // Caracteres: Mezcla de Katakana y Alfanuméricos
        const characters = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓ0