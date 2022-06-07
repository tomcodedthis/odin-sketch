// Global variables

const sizeSlider = document.getElementById('slider');
const clearBtn = document.getElementById('clear');
const sketchPad = document.getElementById('sketch-pad');
const styleBtns = document.querySelectorAll('.controls');
const pixels = document.getElementsByClassName('grid-pixels');

let mouseDown = 0;
let padSize = 25;
let penSize = 1;
let currentColor = ['#222222'];
let prevColor = '';
let penOn = true;
let eraserOn = false;
let gridOn = true;
let fillOn = false;
let lastPX = [];
let nextPX = [];

// Size Section

for (let i = 0; i < (padSize * padSize); i++) {        // Sets default grid to 40x40

    const d = document.createElement('div');
    d.classList.add('grid-pixels', 'pixels-grid');
    d.id = i;

    sketchPad.style = `grid-template-columns: repeat(${padSize}, 1fr); grid-template-rows: repeat(${padSize}, 1fr)`;
    sketchPad.appendChild(d);
}

sizeSlider.oninput = () => {        // Sets pad size based of slider

    const pixels = document.querySelectorAll('.grid-pixels');       // Selects pixels & removes previous grid
    pixels.forEach(pixel => pixel.remove());

    padSize = sizeSlider.value;     // Assigns pad size to a live value

    const textValues = document.querySelectorAll('.slide-value');       // Sets the live values for grid size
    textValues.forEach(value => value.textContent = padSize);

    for (let i = 0; i < (padSize * padSize); i++) {      // Loops & set pixels to grid

        const d = document.createElement('div');
        d.classList.add('grid-pixels');
        d.id = i;

        if (gridOn == true) {
            d.classList.add('pixels-grid');
        } else {
            d.classList.add('pixels-no-grid');
        }

        sketchPad.style = `grid-template-columns: repeat(${padSize}, 1fr); grid-template-rows: repeat(${padSize}, 1fr)`;
        sketchPad.appendChild(d);
    }

    lastPX = [];        // Resets undo/redo
    nextPX = [];
};

sizeSlider.step = 5;      // Sets incriment size

// Clear sketch

clearBtn.addEventListener('click', clear);

function clear() {

    const pixels = document.getElementsByClassName('grid-pixels');

    for (let i = 0; i < pixels.length; i++) {

        pixels[i].style.backgroundColor = '';
    }

    lastPX = [];        // Resets undo/redo
    nextPX = [];
}

// Color sketch-pad

document.onmousedown = function() { mouseDown = 1 };        // Detects whether mouse is down (drag is on)
document.onmouseup = function() { mouseDown = 0 };

const color = document.getElementById('pen-color');     // Adds event listener for color picker
color.addEventListener('change', () => {        // Sets the color
    
    currentColor = document.getElementById('pen-color').value
});

for (let i = 0; i < pixels.length; i++) {       // Adds event listener for each default pixel

    pixels[i].addEventListener('mouseenter', pixelDrag);
    pixels[i].addEventListener('click', pixelClick);
};

document.addEventListener('click', e => {       // Adds event listener for each grid size

    for (let i = 0; i < pixels.length; i++) {

        pixels[i].addEventListener('mouseenter', pixelDrag);
        pixels[i].addEventListener('click', pixelClick);
    };
});

function pixelDrag(e) {     // Adds color when mousedown & drag

    const pixel = e.currentTarget;
    const pixelR = e.currentTarget.nextElementSibling;
    const pixelL = e.currentTarget.previousElementSibling;
    const pixelsMain = [pixel, pixelR, pixelL];

    prevColor = pixel.style.backgroundColor;        // Updates prevColor to current targets background color

    if (mouseDown > 0 && penOn == true && penSize == 1) {        // Pen is small

        pixel.style.backgroundColor = `${currentColor}`;

        lastPX.push(pixel);     // Adds each pixel to lastPX array

    } else if (mouseDown > 0 && eraserOn == false && penSize == 2) {     // Pen is medium

        pixel.style.backgroundColor = `${currentColor}`;
        pixelR.style.backgroundColor = `${currentColor}`;

        for (let j = 0; j < pixels.length; j++) {       // Loops and fill upper left & right pixels

            if (pixels[j] == pixel) {

                let pixelUC = pixels[j - padSize];
                let pixelUR = pixels[j - (padSize - 1)];

                pixelUC.style.backgroundColor = `${currentColor}`;
                pixelUR.style.backgroundColor = `${currentColor}`;

                lastPX.push(pixel, pixelR, pixelUC, pixelUR);     // Adds each pixels to lastPX array
            }
        }

    } else if (mouseDown > 0 && penOn == true && penSize == 3) {     // Pen is large

        pixelsMain.forEach(pix => pix.style.backgroundColor = `${currentColor}`);

        for (let j = 0; j < pixels.length; j++) {       // Loops and fill upper left & right pixels

            if (pixels[j] == pixel) {

                let pixelUC = pixels[j - padSize];
                let pixelUR = pixels[j - (padSize - 1)];
                let pixelUL = pixels[(j - 1) - padSize];
                let pixelDC = pixels[j + (padSize*1)];
                let pixelDR = pixels[j + ((padSize*1) + 1)];
                let pixelDL = pixels[j + (padSize - 1)];

                const pixelsAll = [pixelUC, pixelUR, pixelUL, pixelDC, pixelDR, pixelDL]

                pixelsAll.forEach(pix => pix.style.backgroundColor = `${currentColor}`);

                lastPX.push(pixel, pixelR, pixelL, pixelUC, pixelUR, pixelUL, pixelDC, pixelDR, pixelDL);     // Adds each pixels to lastPX array
            }
        }

    } else if (mouseDown > 0 && eraserOn == true && penSize == 1) {     // Eraser is small

        pixel.style.backgroundColor = '';

        lastPX.push(pixel);     // Adds each pixel to lastPX array

    } else if (mouseDown > 0 && eraserOn == true && penSize == 2) {     // Eraser is medium

        pixel.style.backgroundColor = '';
        pixelR.style.backgroundColor = '';

        for (let j = 0; j < pixels.length; j++) {       // Loops and fill upper left & right pixels

            if (pixels[j] == pixel) {

                let pixelUC = pixels[j - padSize];
                let pixelUR = pixels[j - (padSize - 1)];

                pixelUC.style.backgroundColor = '';
                pixelUR.style.backgroundColor = '';

                lastPX.push(pixel, pixelR, pixelUC, pixelUR);     // Adds each pixels to lastPX array
            }
        }

    } else if (mouseDown > 0 && eraserOn == true && penSize == 3) {     // Eraser is large

        pixelsMain.forEach(pix => pix.style.backgroundColor = '');

        for (let j = 0; j < pixels.length; j++) {       // Loops and fill upper left & right pixels

            if (pixels[j] == pixel) {

                let pixelUC = pixels[j - padSize];
                let pixelUR = pixels[j - (padSize - 1)];
                let pixelUL = pixels[(j - 1) - padSize];
                let pixelDC = pixels[j + (padSize*1)];
                let pixelDR = pixels[j + ((padSize*1) + 1)];
                let pixelDL = pixels[j + (padSize - 1)];

                const pixelsAll = [pixelUC, pixelUR, pixelUL, pixelDC, pixelDR, pixelDL]

                pixelsAll.forEach(pix => pix.style.backgroundColor = '');

                lastPX.push(pixel, pixelR, pixelL, pixelUC, pixelUR, pixelUL, pixelDC, pixelDR, pixelDL);     // Adds each pixels to lastPX array
            }
        }

    } else {
        return
    }
};

function pixelClick(e) {        // Adds color on click

    const pixel = e.currentTarget;
    const pixelR = e.currentTarget.nextElementSibling;
    const pixelL = e.currentTarget.previousElementSibling;
    const pixelsMain = [pixel, pixelR, pixelL];

    prevColor = pixel.style.backgroundColor;        // Updates prevColor to current targets background color

    if (penOn == true && penSize == 1) {        // Pen is small

    pixel.style.backgroundColor = `${currentColor}`;

    lastPX.push(pixel);     // Adds each pixel to lastPX array

    } else if (penOn == true && penSize == 2) {     // Pen is medium

        pixel.style.backgroundColor = `${currentColor}`;
        pixelR.style.backgroundColor = `${currentColor}`;

        for (let j = 0; j < pixels.length; j++) {       // Loops and fill upper left & right pixels

            if (pixels[j] == pixel) {

                let pixelUC = pixels[j - padSize];
                let pixelUR = pixels[j - (padSize - 1)];

                pixelUC.style.backgroundColor = `${currentColor}`;
                pixelUR.style.backgroundColor = `${currentColor}`;

                lastPX.push(pixel, pixelR, pixelUC, pixelUR);     // Adds each pixels to lastPX array
            }
        }

    } else if (penOn == true && penSize == 3) {     // Pen is large

        pixelsMain.forEach(pix => pix.style.backgroundColor = `${currentColor}`);

        for (let j = 0; j < pixels.length; j++) {       // Loops and fill upper left & right pixels

            if (pixels[j] == pixel) {

                let pixelUC = pixels[j - padSize];
                let pixelUR = pixels[j - (padSize - 1)];
                let pixelUL = pixels[(j - 1) - padSize];
                let pixelDC = pixels[j + (padSize*1)];
                let pixelDR = pixels[j + ((padSize*1) + 1)];
                let pixelDL = pixels[j + (padSize - 1)];

                const pixelsAll = [pixelUC, pixelUR, pixelUL, pixelDC, pixelDR, pixelDL]

                pixelsAll.forEach(pix => pix.style.backgroundColor = `${currentColor}`);

                lastPX.push(pixel, pixelR, pixelL, pixelUC, pixelUR, pixelUL, pixelDC, pixelDR, pixelDL);     // Adds each pixels to lastPX array
            }
        }

    } else if (eraserOn == true && penSize == 1) {     // Eraser is small

        pixel.style.backgroundColor = '';

        lastPX.push(pixel);     // Adds each pixel to lastPX array

    } else if (eraserOn == true && penSize == 2) {     // Eraser is medium

        pixel.style.backgroundColor = '';
        pixelR.style.backgroundColor = '';

        for (let j = 0; j < pixels.length; j++) {       // Loops and fill upper left & right pixels

            if (pixels[j] == pixel) {

                let pixelUC = pixels[j - padSize];
                let pixelUR = pixels[j - (padSize - 1)];

                pixelUC.style.backgroundColor = '';
                pixelUR.style.backgroundColor = '';

                lastPX.push(pixel, pixelR, pixelUC, pixelUR);     // Adds each pixels to lastPX array
            }
        }

    } else if (eraserOn == true && penSize == 3) {     // Eraser is large

        pixelsMain.forEach(pix => pix.style.backgroundColor = '');

        for (let j = 0; j < pixels.length; j++) {       // Loops and fill upper left & right pixels

            if (pixels[j] == pixel) {

                let pixelUC = pixels[j - padSize];
                let pixelUR = pixels[j - (padSize - 1)];
                let pixelUL = pixels[(j - 1) - padSize];
                let pixelDC = pixels[j + (padSize*1)];
                let pixelDR = pixels[j + ((padSize*1) + 1)];
                let pixelDL = pixels[j + (padSize - 1)];

                const pixelsAll = [pixelUC, pixelUR, pixelUL, pixelDC, pixelDR, pixelDL]

                pixelsAll.forEach(pix => pix.style.backgroundColor = '');

                lastPX.push(pixel, pixelR, pixelL, pixelUC, pixelUR, pixelUL, pixelDC, pixelDR, pixelDL);     // Adds each pixels to lastPX array
            }
        }

    } else if (fillOn == true) {

        for (let i = 0; i < pixels.length; i++){

            pixels[i].style.backgroundColor = `${currentColor}`;
        }
    } else {
        return
    }
}

// Undo/Redo

document.getElementById('undo-btn').addEventListener('click', undoPrev)     // Adds event listener to undo button
document.getElementById('redo-btn').addEventListener('click', redoPrev)

function undoPrev() {       // Undos last pen drag/click

    if (penSize == '1') {

        if (lastPX.length >= 50) {       // Undo's by 10 PX if lastPX array is over 50

            let pxUndo = 10;
    
            for (let i = (lastPX.length - pxUndo); i < lastPX.length; i++) {        // Changes pixel to prev color
    
                lastPX[i].style.backgroundColor = prevColor;
            }
        
            for (let i = 0; i < pxUndo; i++) {      // Removes px's from lastPX array
        
                let px = lastPX.pop();
                nextPX.push(px);
            }
        } else if (lastPX.length > 10 && lastPX.length < 50) {        // Undo's by 5 PX if lastPX array is between 10-50
        
            let pxUndo = 5;
    
            for (let i = (lastPX.length - pxUndo); i < lastPX.length; i++) {        // Changes pixel to prev color
    
                lastPX[i].style.backgroundColor = prevColor;
            }
        
            for (let i = 0; i < pxUndo; i++) {      // Removes px's from lastPX array
        
                let px = lastPX.pop();
                nextPX.push(px);
            }
        } else if (lastPX.length > 5 && lastPX.length <= 10) {        // Undo's by 2 PX if lastPX array is between 5-10
    
            let pxUndo = 2;
    
            for (let i = (lastPX.length - pxUndo); i < lastPX.length; i++) {        // Changes pixel to prev color
    
                lastPX[i].style.backgroundColor = prevColor;
            }
        
            for (let i = 0; i < pxUndo; i++) {      // Removes px's from lastPX array
        
                let px = lastPX.pop();
                nextPX.push(px);
            }
        } else if (lastPX.length >= 1 && lastPX.length <= 5) {        // Undo's by 1 PX if lastPX array is less than 5
    
            let pxUndo = 1;
    
            for (let i = (lastPX.length - pxUndo); i < lastPX.length; i++) {        // Changes pixel to prev color
    
                lastPX[i].style.backgroundColor = prevColor;
            }
        
            for (let i = 0; i < pxUndo; i++) {      // Removes px's from lastPX array
        
                let px = lastPX.pop();
                nextPX.push(px);
            }
        } else {
    
            return
        }

    } else if (penSize == '2') {

        if (lastPX.length >= 72) {       // Undo's by 10 PX if lastPX array is over 50

            let pxUndo = 32;

            for (let i = (lastPX.length - pxUndo); i < lastPX.length; i++) {        // Changes pixel to prev color

                lastPX[i].style.backgroundColor = prevColor;
            }
        
            for (let i = 0; i < pxUndo; i++) {      // Removes px's from lastPX array
        
                let px = lastPX.pop();
                nextPX.push(px);
            }
        } else if (lastPX.length >= 24 && lastPX.length < 72) {        // Undo's by 5 PX if lastPX array is between 10-50
        
            let pxUndo = 16;

            for (let i = (lastPX.length - pxUndo); i < lastPX.length; i++) {        // Changes pixel to prev color

                lastPX[i].style.backgroundColor = prevColor;
            }
        
            for (let i = 0; i < pxUndo; i++) {      // Removes px's from lastPX array
        
                let px = lastPX.pop();
                nextPX.push(px);
            }

        } else if (lastPX.length >= 12 && lastPX.length < 24) {        // Undo's by 2 PX if lastPX array is between 5-10

            let pxUndo = 8;

            for (let i = (lastPX.length - pxUndo); i < lastPX.length; i++) {        // Changes pixel to prev color

                lastPX[i].style.backgroundColor = prevColor;
            }
        
            for (let i = 0; i < pxUndo; i++) {      // Removes px's from lastPX array
        
                let px = lastPX.pop();
                nextPX.push(px);
            } 

            console.log('huh')
        } else if (lastPX.length >= 1 && lastPX.length < 12) {        // Undo's by 1 PX if lastPX array is less than 5

            let pxUndo = 4;

            for (let i = (lastPX.length - pxUndo); i < lastPX.length; i++) {        // Changes pixel to prev color

                lastPX[i].style.backgroundColor = prevColor;
            }
        
            for (let i = 0; i < pxUndo; i++) {      // Removes px's from lastPX array
        
                let px = lastPX.pop();
                nextPX.push(px);
            }
        } else {

            return
        }

    } else if (penSize == '3') {

        if (lastPX.length >= 144) {       // Undo's by 10 PX if lastPX array is over 50

            let pxUndo = 32;

            for (let i = (lastPX.length - pxUndo); i < lastPX.length; i++) {        // Changes pixel to prev color

                lastPX[i].style.backgroundColor = prevColor;
            }
        
            for (let i = 0; i < pxUndo; i++) {      // Removes px's from lastPX array
        
                let px = lastPX.pop();
                nextPX.push(px);
            }
        } else if (lastPX.length >= 72 && lastPX.length < 144) {        // Undo's by 5 PX if lastPX array is between 10-50
        
            let pxUndo = 16;

            for (let i = (lastPX.length - pxUndo); i < lastPX.length; i++) {        // Changes pixel to prev color

                lastPX[i].style.backgroundColor = prevColor;
            }
        
            for (let i = 0; i < pxUndo; i++) {      // Removes px's from lastPX array
        
                let px = lastPX.pop();
                nextPX.push(px);
            }
        } else if (lastPX.length >= 36 && lastPX.length < 72) {        // Undo's by 2 PX if lastPX array is between 5-10

            let pxUndo = 18;

            for (let i = (lastPX.length - pxUndo); i < lastPX.length; i++) {        // Changes pixel to prev color

                lastPX[i].style.backgroundColor = prevColor;
            }
        
            for (let i = 0; i < pxUndo; i++) {      // Removes px's from lastPX array
        
                let px = lastPX.pop();
                nextPX.push(px);
            }
        } else if (lastPX.length >= 1 && lastPX.length < 36) {        // Undo's by 1 PX if lastPX array is less than 5

            let pxUndo = 9;

            for (let i = (lastPX.length - pxUndo); i < lastPX.length; i++) {        // Changes pixel to prev color

                lastPX[i].style.backgroundColor = prevColor;
            }
        
            for (let i = 0; i < pxUndo; i++) {      // Removes px's from lastPX array
        
                let px = lastPX.pop();
                nextPX.push(px);
            }
        } else {

            return
        }
    }
}

function redoPrev() {       // Redos last pen drag/click

    if (nextPX.length > 50) {       // Undo's by 10 PX if lastPX array is over 50

        let pxUndo = 10;

        for (let i = (nextPX.length - pxUndo); i < nextPX.length; i++) {        // Changes pixel to prev color

            nextPX[i].style.backgroundColor = currentColor;
        }
    
        for (let i = 0; i < pxUndo; i++) {      // Removes px's from lastPX array
    
            let px = nextPX.pop();
            lastPX.push(px);
        }
    } else if (nextPX.length > 10 && nextPX.length < 50) {        // Undo's by 5 PX if lastPX array is between 10-50
    
        let pxUndo = 5;

        for (let i = (nextPX.length - pxUndo); i < nextPX.length; i++) {        // Changes pixel to prev color

            nextPX[i].style.backgroundColor = currentColor;
        }
    
        for (let i = 0; i < pxUndo; i++) {      // Removes px's from lastPX array
    
            let px = nextPX.pop();
            lastPX.push(px);
        }
    } else if (nextPX.length > 5 && nextPX.length <= 10) {        // Undo's by 2 PX if lastPX array is between 5-10

        let pxUndo = 2;

        for (let i = (nextPX.length - pxUndo); i < nextPX.length; i++) {        // Changes pixel to prev color

            nextPX[i].style.backgroundColor = currentColor;
        }
    
        for (let i = 0; i < pxUndo; i++) {      // Removes px's from lastPX array
    
            let px = nextPX.pop();
            lastPX.push(px);
        }
    } else if (nextPX.length >= 1 && nextPX.length <= 5) {        // Undo's by 1 PX if lastPX array is less than 5

        let pxUndo = 1;

        for (let i = (nextPX.length - pxUndo); i < nextPX.length; i++) {        // Changes pixel to prev color

            nextPX[i].style.backgroundColor = currentColor;
        }
    
        for (let i = 0; i < pxUndo; i++) {      // Removes px's from lastPX array
    
            let px = nextPX.pop();
            lastPX.push(px);
        }
    } else {

        return
    }
}

// Keyboard shortcuts 

document.onkeydown = keyPress;

function keyPress(e) {

    if (e.metaKey && e.shiftKey && e.which === 90) {        // Togggles undo/redo

        redoPrev();

    } else if (e.metaKey && e.which === 90) {

        undoPrev();

    }

    if (e.which === 87) {       // Togggles pen/eraser/fill

        pen.click();

    } else if (e.which === 69) {

        eraser.click();

    } else if (e.which === 70) {

        colorFill.click();

    }

    if (e.which === 49) {       // Toggles pen size

        penS.click();

    } else if (e.which === 50) {

        penM.click();

    } else if (e.which === 51) {
        
        penL.click();

    }

    if (e.which === 71) {       // Toggles grid

        grid.click();

    }
};

// Style sections

const eraser = document.getElementById('eraser');       // Style variables
const pen = document.getElementById('pen');
const penS = document.getElementById('pen-s');
const penM = document.getElementById('pen-m');
const penL = document.getElementById('pen-l');
const grid = document.getElementById('grid');
const colorFill = document.getElementById('fill');

styleBtns.forEach(button => button.addEventListener('click', styleSelect));     // Event listeners for style select

grid.style.borderWidth = '0 0 0 4px';       // Sets default style highlight
pen.style.borderWidth = '0 0 0 4px';
penS.style.borderWidth = '0 0 0 4px';

function styleSelect(e) {       // Set style highlight\ on click

    if (e.currentTarget.id == 'pen') {      // Higlights pen and clears eraser higlight

        penOn = true;
        eraserOn = false;
        fillOn = false;

        eraser.style.borderWidth = '0';
        colorFill.style.borderWidth = '0';

        e.currentTarget.style.borderWidth = '0 0 0 4px';

    } else if (e.currentTarget.id == 'eraser') {        // Higlights eraser and clears pen higlight
       
        penOn = false;
        eraserOn = true;
        fillOn = false;

        pen.style.borderWidth = '0px';
        colorFill.style.borderWidth = '0';

        e.currentTarget.style.borderWidth = '0 0 0 4px';

    } else if (e.currentTarget.id == 'fill') {

        penOn = false;
        eraserOn = false;
        fillOn = true;
        pen.style.borderWidth = '0px';
        eraser.style.borderWidth = '0';

        e.currentTarget.style.borderWidth = '0 0 0 4px';
    }

    if (e.currentTarget.id == 'pen-s') {        // Higlights s-pixel and clears other size higlight

        penSize = 1;

        penM.style.borderWidth = '0';
        penL.style.borderWidth = '0';

        e.currentTarget.style.borderWidth = '0 0 0 4px';

    } else if (e.currentTarget.id == 'pen-m') {     // Higlights m-pixel and clears other size higlight

        penSize = 2;

        penS.style.borderWidth = '0';
        penL.style.borderWidth = '0';

        e.currentTarget.style.borderWidth = '0 0 0 4px';

    } else if (e.currentTarget.id == 'pen-l') {     // Higlights l-pixel and clears other size higlight

        penSize = 3;

        penS.style.borderWidth = '0';
        penM.style.borderWidth = '0';

        e.currentTarget.style.borderWidth = '0 0 0 4px';
    }

    if (e.currentTarget.id == 'grid' && gridOn == true) {       // Turns grid off

        gridOn = false;
        grid.style.borderWidth = '0';

        for (let i = 0; i < pixels.length; i++) {       // Removes grid-class to each pixel

            pixels[i].classList.remove('pixels-grid');
            pixels[i].classList.add('pixels-no-grid');
        };

    } else if (e.currentTarget.id == 'grid' && gridOn == false) {        // Turns grid on

        gridOn = true;
        grid.style.borderWidth = '0 0 0 4px';

        for (let i = 0; i < pixels.length; i++) {       // Adds grid-class to each pixel

            pixels[i].classList.remove('pixels-no-grid');
            pixels[i].classList.add('pixels-grid');
        };
    }
}