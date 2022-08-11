const CANVAS_SIZE = 960;
const canvas = document.querySelector('.canvas');

function createCanvas(n) {
    const pixelSize = Math.floor(CANVAS_SIZE / n);
    const pixelAmount = n * n;
    for (let i = 0; i < pixelAmount; i++) {
        const pixel = document.createElement('div');
        pixel.className = 'pixel';
        pixel.style.cssText = `width: ${pixelSize}px; height: ${pixelSize}px`;
        canvas.appendChild(pixel);
    }
}
createCanvas(16);