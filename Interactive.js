function saveCanvas() {
    let canvas = document.getElementById('coloringCanvas');
    let link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = 'coloring.png';
    link.click();
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
    let canvas = document.getElementById('coloringCanvas');
    let ctx = canvas.getContext('2d');

    canvas.addEventListener('mousemove', function(event) {
        let rect = canvas.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        ctx.fillStyle = 'rgba(255,0,0,0.5)';
        ctx.fillRect(x - 10, y - 10, 20, 20);
    });

    document.querySelectorAll('.gallery a').forEach(item => {
        item.addEventListener('click', event => {
            event.preventDefault();
            document.getElementById('lightbox-img').src = item.href;
            document.getElementById('lightbox').style.display = 'block';
        });
    });
});
