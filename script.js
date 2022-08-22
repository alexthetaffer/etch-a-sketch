const CANVAS_SIZE = 712;
const canvas = document.querySelector('.canvas');
let pixels;
let color = 'black';
let colorMode = "blackAndWhite";
const canvasSize = document.querySelector('#btn-size');
const btnRainbowMode = document.querySelector('#rainbow-mode');
const btnColorMode = document.querySelector('#color-mode');
const btnBlackWhite = document.querySelector('#black-white-mode');
const colorWell = document.querySelector('#colorWell');

createCanvas(16);

function createCanvas(n) {
    pixelAmount = n * n
    canvas.style.cssText = 
        `grid-template-columns: repeat(${n}, 1fr);
        grid-template-rows: repeat(${n}, 1fr);`;
        canvas.setAttribute('draggable', 'false')
        for (let i = 0; i < pixelAmount; i++) {
        const pixel = document.createElement('div');
        pixel.className = 'pixel';
        pixel.style.cssText = `background-color: rgb(255, 255, 255)`;
        pixel.setAttribute('draggable', 'false');
        canvas.appendChild(pixel);
    }
    const pixels = document.querySelectorAll('.pixel');

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
        return newColor;
    } else return color;
}

function changeColor(pixel, color) {
    pixel.style.backgroundColor = color;
}

// Change canvas size
canvasSize.addEventListener('click', () => {
    deleteCanvas();
    do {
        newCanvasSize = parseInt(prompt('Enter number of squares per side'));
    } while (newCanvasSize > 100 || newCanvasSize <= 0 || isNaN(newCanvasSize));
    createCanvas(newCanvasSize);
    canvasSize.textContent = `${newCanvasSize}×${newCanvasSize}`;

});

btnRainbowMode.onclick = () => colorMode = 'rainbow';
btnBlackWhite.onclick = () => colorMode = 'blackAndWhite';
btnColorMode.onclick = () => colorMode = 'color';

colorWell.addEventListener('input', function(e) {
    color = e.target.value;
})




