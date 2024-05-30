// interactive.js

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('coloringCanvas');
    const ctx = canvas.getContext('2d');
    let painting = false;

    function startPosition(e) {
        painting = true;
        draw(e);
    }

    function endPosition() {
        painting = false;
        ctx.beginPath();
    }

    function draw(e) {
        if (!painting) return;
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'black';

        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    }

    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', endPosition);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseleave', endPosition);

    // Touch events for mobile devices
    canvas.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        startPosition(touch);
    });
    canvas.addEventListener('touchend', endPosition);
    canvas.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        draw(touch);
    });

    function saveCanvas() {
        const link = document.createElement('a');
        link.download = 'coloring.png';
        link.href = canvas.toDataURL();
        link.click();
    }

    window.saveCanvas = saveCanvas;
});
