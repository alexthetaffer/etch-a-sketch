const CANVAS_SIZE = 712;
const canvas = document.querySelector('.canvas');
let pixels;
let color = 'black';
let colorMode = "blackAndWhite";
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
        pixel.style.cssText = `width: ${pixelSize}px; height: ${pixelSize}px; background-color: rgb(255, 255, 255)`;
        canvas.appendChild(pixel);
    }
    const pixels = document.querySelectorAll('.pixel');
    canvas.style.cssText = `width: ${CANVAS_SIZE}px; height: ${CANVAS_SIZE}px`;

    // Change pixels color
    pixels.forEach(pixel => {
        pixel.addEventListener('mouseover', () => {
            if (mouseDown) changeColor(pixel, getColor(pixel))});

        pixel.addEventListener('mousedown', () => changeColor(pixel, getColor(pixel)));
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

function getColor(pixel) {
    if (colorMode === 'rainbow') {
        return `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
    } else if (colorMode === 'blackAndWhite') {
        const colors = pixel.style.backgroundColor.replace(/[a-z() ]/g, '').split(',');
        newColor = `rgb(${colors[0] - 26}, ${colors[1] - 26}, ${colors[2] - 26})`;
        console.log(newColor); 
        return newColor;
    } else return color;
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




