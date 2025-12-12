// Aquest codi dibuixa l'efecte de pluja de codi utilitzant l'element Canvas

const canvas = document.getElementById('matrixCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');

    // 1. Definir mida i caràcters
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const font_size = 14; // Mida de font més petita per més densitat
    const columns = W / font_size;

    // Caràcters per a la pluja de codi
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+{}:"<>?|~`-=[]\;,./';

    // Array per fer un seguiment de la posició Y de cada columna
    const drops = [];

    // Inicialitzar cada columna a la posició Y=1
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }

    // 2. La funció de dibuix (loop principal)
    function draw() {
        // Fons negre semitransparent (augmentem l'opacitat a 0.1 per un rastre més curt)
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
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
            // Reduïm el límit aleatori a 0.95 (abans era 0.975) perquè es reiniciï més sovint
            if (drops[i] * font_size > H && Math.random() > 0.95) {
                drops[i] = 0;
            }

            // Incrementa la posició Y de la gota
            drops[i]++;
        }
    }

    // 3. Bucle d'animació (25ms = 40 FPS, més ràpid que els 33ms anteriors)
    setInterval(draw, 25);

    // 4. Ajustar el canvas si la finestra canvia de mida
    window.addEventListener('resize', () => {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
        // Reinicialitzar les gotes per la nova mida
        drops.length = 0;
        const new_columns = W / font_size;
        for (let i = 0; i < new_columns; i++) {
            drops[i] = 1;
        }
    });

} else {
    console.error("Canvas element with ID 'matrixCanvas' not found.");
}