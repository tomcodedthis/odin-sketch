// Global variables

const sizeSlider = document.getElementById('slider');
const clearBtn = document.getElementById('clear');
const sketchPad = document.getElementById('sketch-pad');
const styleBtns = document.querySelectorAll('.controls');
const pixels = document.getElementsByClassName('grid-pixels');

let mouseDown = 0;
let padSize = '30';
let penSize = '1';
let currentColor = ['#222222'];
let penOn = true;
let eraserOn = false;
let gridOn = true;
let fillOn = false;

// Global functions

clearBtn.addEventListener('mouseenter', hover);     // Adds event listeners for button hover effects
clearBtn.addEventListener('mouseleave', deHover);

function hover(e) {

    e.currentTarget.style.backgroundColor = 'var(--lightgrey)';
}

function deHover(e) {

    e.currentTarget.style.backgroundColor = 'var(--white)';
}

// Size Section

for (let i = 0; i < (padSize * padSize); i++) {        // Sets default grid to 40x40

    const d = document.createElement('div');
    d.classList.add('grid-pixels', 'pixels-grid');

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
        d.classList.add('grid-pixels')

        if (gridOn == true) {
            d.classList.add('pixels-grid');
        } else {
            d.classList.add('pixels-no-grid');
        }

        sketchPad.style = `grid-template-columns: repeat(${padSize}, 1fr); grid-template-rows: repeat(${padSize}, 1fr)`;
        sketchPad.appendChild(d);
    }
};

sizeSlider.step = '5';      // Sets incriment size

// Clear sketch

clearBtn.addEventListener('click', clear);

function clear() {

    const pixels = document.getElementsByClassName('grid-pixels');

    for (let i = 0; i < pixels.length; i++) {

        pixels[i].style.backgroundColor = '';
    }
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
    
    if (mouseDown > 0 && penOn == true && penSize == 1) {        // Pen is small

        pixel.style.backgroundColor = `${currentColor}`;

    } else if (mouseDown > 0 && eraserOn == false && penSize == 2) {     // Pen is medium

        pixel.style.backgroundColor = `${currentColor}`;
        pixelR.style.backgroundColor = `${currentColor}`;

        for (let j = 0; j < pixels.length; j++) {       // Loops and fill upper left & right pixels

            if (pixels[j] == pixel) {

                let pixelUC = pixels[j - padSize];
                let pixelUR = pixels[j - (padSize - 1)];

                pixelUC.style.backgroundColor = `${currentColor}`;
                pixelUR.style.backgroundColor = `${currentColor}`;
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
            }
        }

    } else if (mouseDown > 0 && eraserOn == true && penSize == 1) {     // Eraser is small

        pixel.style.backgroundColor = '';

    } else if (mouseDown > 0 && eraserOn == true && penSize == 2) {     // Eraser is medium

        pixel.style.backgroundColor = '';
        pixelR.style.backgroundColor = '';

        for (let j = 0; j < pixels.length; j++) {       // Loops and fill upper left & right pixels

            if (pixels[j] == pixel) {

                let pixelUC = pixels[j - padSize];
                let pixelUR = pixels[j - (padSize - 1)];

                pixelUC.style.backgroundColor = '';
                pixelUR.style.backgroundColor = '';
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

    if (penOn == true && penSize == 1) {        // Pen is small

    pixel.style.backgroundColor = `${currentColor}`;

    } else if (penOn == true && penSize == 2) {     // Pen is medium

        pixel.style.backgroundColor = `${currentColor}`;
        pixelR.style.backgroundColor = `${currentColor}`;

        for (let j = 0; j < pixels.length; j++) {       // Loops and fill upper left & right pixels

            if (pixels[j] == pixel) {

                let pixelUC = pixels[j - padSize];
                let pixelUR = pixels[j - (padSize - 1)];

                pixelUC.style.backgroundColor = `${currentColor}`;
                pixelUR.style.backgroundColor = `${currentColor}`;
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
            }
        }

    } else if (eraserOn == true && penSize == 1) {     // Eraser is small

        pixel.style.backgroundColor = '';

    } else if (eraserOn == true && penSize == 2) {     // Eraser is medium

        pixel.style.backgroundColor = '';
        pixelR.style.backgroundColor = '';

        for (let j = 0; j < pixels.length; j++) {       // Loops and fill upper left & right pixels

            if (pixels[j] == pixel) {

                let pixelUC = pixels[j - padSize];
                let pixelUR = pixels[j - (padSize - 1)];

                pixelUC.style.backgroundColor = '';
                pixelUR.style.backgroundColor = '';
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

// Style sections

const eraser = document.getElementById('eraser');       // Style variables
const pen = document.getElementById('pen');
const penS = document.getElementById('pen-s');
const penM = document.getElementById('pen-m');
const penL = document.getElementById('pen-l');
const grid = document.getElementById('grid');
const colorFill = document.getElementById('fill');

styleBtns.forEach(button => button.addEventListener('click', styleSelect));     // Event listeners for style select

grid.style.borderWidth = '0 0 5px 0';       // Sets default style highlight
pen.style.borderWidth = '0 0 5px 0';
penS.style.borderWidth = '0 0 5px 0';

function styleSelect(e) {       // Set style highlight\ on click

    if (e.currentTarget.id == 'pen') {      // Higlights pen and clears eraser higlight

        penOn = true;
        eraserOn = false;
        fillOn = false;

        eraser.style.borderWidth = '0';
        colorFill.style.borderWidth = '0';

        e.currentTarget.style.borderWidth = '0 0 5px 0';

    } else if (e.currentTarget.id == 'eraser') {        // Higlights eraser and clears pen higlight
       
        penOn = false;
        eraserOn = true;
        fillOn = false;

        pen.style.borderWidth = '0px';
        colorFill.style.borderWidth = '0';

        e.currentTarget.style.borderWidth = '0 0 5px 0'; 

    } else if (e.currentTarget.id == 'fill') {

        penOn = false;
        eraserOn = false;
        fillOn = true;
        pen.style.borderWidth = '0px';
        eraser.style.borderWidth = '0';

        e.currentTarget.style.borderWidth = '0 0 5px 0'; 
    }

    if (e.currentTarget.id == 'pen-s') {        // Higlights s-pixel and clears other size higlight

        penSize = 1;

        penM.style.borderWidth = '0';
        penL.style.borderWidth = '0';

        e.currentTarget.style.borderWidth = '0 0 5px 0';        

    } else if (e.currentTarget.id == 'pen-m') {     // Higlights m-pixel and clears other size higlight

        penSize = 2;

        penS.style.borderWidth = '0';
        penL.style.borderWidth = '0';

        e.currentTarget.style.borderWidth = '0 0 5px 0';

    } else if (e.currentTarget.id == 'pen-l') {     // Higlights l-pixel and clears other size higlight

        penSize = 3;

        penS.style.borderWidth = '0';
        penM.style.borderWidth = '0';

        e.currentTarget.style.borderWidth = '0 0 5px 0';
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
        grid.style.borderWidth = '0 0 5px 0';

        for (let i = 0; i < pixels.length; i++) {       // Adds grid-class to each pixel

            pixels[i].classList.remove('pixels-no-grid');
            pixels[i].classList.add('pixels-grid');
        };
    }
}