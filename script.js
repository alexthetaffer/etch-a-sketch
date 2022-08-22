const CANVAS_SIZE = 712;
const canvas = document.querySelector('.canvas');
let pixels;
let color = '#222222';
let colorMode = "color";
const BtnCanvasSize = document.querySelector('#btn-size');
const btnRainbowMode = document.querySelector('#rainbow-mode');
const btnColorMode = document.querySelector('#color-mode');
const btnShadeMode = document.querySelector('#shade-mode');
const colorWell = document.querySelector('#colorWell');

createCanvas(16);

function createCanvas(n) {
    pixelAmount = n * n
    canvas.style.cssText = 
        `grid-template-columns: repeat(${n}, 1fr);
        grid-template-rows: repeat(${n}, 1fr);`;
        for (let i = 0; i < pixelAmount; i++) {
        const pixel = document.createElement('div');
        pixel.className = 'pixel';
        pixel.style.cssText = `background-color: rgb(255, 255, 255)`;
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
    } else if (colorMode === 'shade') {
        const colors = pixel.style.backgroundColor.replace(/[a-z() ]/g, '').split(',');
        newColor = `rgb(${colors[0] - 26}, ${colors[1] - 26}, ${colors[2] - 26})`;
        return newColor;
    } else return color;
}
function changeColor(pixel, color) {
    pixel.style.backgroundColor = color;
}

// Change canvas size
BtnCanvasSize.addEventListener('click', () => {
    
    let newCanvasSize = null;

    while (newCanvasSize > 100 || newCanvasSize <= 0) {
        newCanvasSize = parseInt(prompt('Enter number of squares per side'));
        if (isNaN(newCanvasSize)) return;
    }

    deleteCanvas();
    createCanvas(newCanvasSize);
    BtnCanvasSize.textContent = `${newCanvasSize}×${newCanvasSize}`;

});

btnRainbowMode.onclick = () => colorMode = 'rainbow';
btnShadeMode.onclick = () => colorMode = 'shade';
btnColorMode.onclick = () => colorMode = 'color';
colorWell.addEventListener('input', function(e) {
    color = e.target.value;
})




