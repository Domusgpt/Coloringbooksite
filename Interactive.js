document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('coloringCanvas');
    const ctx = canvas.getContext('2d');
    const colorPicker = document.getElementById('colorPicker');
    let painting = false;
    let undoStack = [];
    let redoStack = [];

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
        ctx.strokeStyle = colorPicker.value;

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

    colorPicker.addEventListener('input', function() {
        ctx.strokeStyle = colorPicker.value;
    });

    function saveState() {
        undoStack.push(canvas.toDataURL());
        redoStack = [];
    }

    canvascanvas.addEventListener('mousedown', function() {
        saveState();
    });

    document.getElementById('undo').addEventListener('click', function() {
        if (undoStack.length > 0) {
            redoStack.push(canvas.toDataURL());
            let restoreState = undoStack.pop();
            let img = new Image();
            img.src = restoreState;
            img.onload = function() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0);
            }
        }
    });

    document.getElementById('redo').addEventListener('click', function() {
        if (redoStack.length > 0) {
            undoStack.push(canvas.toDataURL());
            let restoreState = redoStack.pop();
            let img = new Image();
            img.src = restoreState;
            img.onload = function() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0);
            }
        }
    });

    function saveCanvas() {
        const link = document.createElement('a');
        link.download = 'coloring.png';
        link.href = canvas.toDataURL();
        link.click();
    }

    window.saveCanvas = saveCanvas;
});
