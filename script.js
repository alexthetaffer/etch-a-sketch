const CANVAS_SIZE = 712;
const canvas = document.querySelector('.canvas');
let pixels;
let color = 'black';
const size16 = document.querySelector('#size-16');
const size32 = document.querySelector('#size-32');
const size64 = document.querySelector('#size-64');

createCanvas(16);

function createCanvas(n) {
    const pixelSize = Math.floor(CANVAS_SIZE / n);
    const pixelAmount = n * n;

    for (let i = 0; i < pixelAmount; i++) {
        const pixel = document.createElement('div');
        pixel.className = 'pixel';
        pixel.style.cssText = `width: ${pixelSize}px; height: ${pixelSize}px`;
        canvas.appendChild(pixel);
    }
    const pixels = document.querySelectorAll('.pixel');
    canvas.style.cssText = `width: ${CANVAS_SIZE}px; height: ${CANVAS_SIZE}px`;

    // Change pixels color
    pixels.forEach(pixel => {
        pixel.addEventListener('mouseover', () => {
            if (mouseDown) changeColor(pixel, color)});

        pixel.addEventListener('mousedown', () => changeColor(pixel, color));
    })
}
// Check if the mouse down
let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

function deleteCanvas() {
    const pixels = document.querySelectorAll('.pixel');
    pixels.forEach(pixel => {
        canvas.removeChild(pixel);
    })
}

function changeColor(pixel, color) {
    pixel.style.backgroundColor = color;
}

// Change canvas size
size16.addEventListener('click', () => {
    deleteCanvas();
    createCanvas(16);
});

size32.addEventListener('click', () => {
    deleteCanvas();
    createCanvas(32);
});

size64.addEventListener('click', () => {
    deleteCanvas();
    createCanvas(64);
});



