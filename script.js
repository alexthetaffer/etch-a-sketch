
let pixels;
let color = '#222222';
let colorMode = "color";
let mouseDown = false;

const canvas = document.querySelector('.canvas');
const BtnCanvasSize = document.querySelector('#btn-size');
const modeButtons = document.querySelectorAll('.btn-mode');
const colorPicker = document.querySelector('#colorPicker');

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

modeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const currentActiveBtn = document.querySelector('.active');
        currentActiveBtn.classList.remove('active');
        if (button.id === 'color-mode') {
            colorMode = 'color';
            button.classList.add('active')
        } else if (button.id === 'rainbow-mode') {
            colorMode = 'rainbow';
            button.classList.add('active')
        } else if (button.id === 'shade-mode') {
            colorMode = 'shade';
            button.classList.add('active');
        }
    })
})

colorPicker.addEventListener('input', (e) => {
    color = e.target.value;
})