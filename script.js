// Global variables

const sizeBtns = document.querySelectorAll('.size-cont');
const clearBtn = document.getElementById('clear');
const mainCont = document.getElementById('main-cont');
const sketchPad = document.getElementById('sketch-pad');
const styleBtns = document.querySelectorAll('.controls');
const pixels = document.getElementsByClassName('grid-pixels');

let padSize = '40';
let penSize = '1';
let eraserOn = false;
let mouseDown = 0;

// Global functions

function hover(e) {
    e.currentTarget.style.backgroundColor = 'var(--lightgrey)';
}

function deHover(e) {
    e.currentTarget.style.backgroundColor = 'var(--white)';
}

// Size Section

document.getElementById('1600').classList.add('size-select');        // Selects first size

sizeBtns.forEach(button => button.addEventListener('mouseenter', (e) => {       // Size buttonhover (enter)

    if (e.currentTarget.classList.contains('size-select')) {

        return

    } else {

        hover(e);

    }
    }));

sizeBtns.forEach(button => button.addEventListener('mouseleave', (e) => {       // Size buttonhover (leave)

    if (e.currentTarget.classList.contains('size-select')) {

        return

    } else {

    deHover(e); 

    }
    }));
    
sizeBtns.forEach(button => button.addEventListener('click', sizeChange));     // Adds click event for each size

for (let i = 0; i < 1600; i++) {        // Sets default grid to 40x40

    const d = document.createElement('div');
    d.classList.add('grid-pixels');

    sketchPad.classList.add('grid-40');
    sketchPad.appendChild(d);
}

function sizeChange(e) {     // Function for size click event

    sizeBtns.forEach(button => button.classList.remove('size-select'));
    e.currentTarget.style.backgroundColor = '';
    e.currentTarget.classList.add('size-select');

    if (e.currentTarget.id == '400') {      // Change to 20x20

        sketchPad.setAttribute('class', '');        // Adds class
        sketchPad.classList.add('grid-20');
        padSize = 20;

        const pixels = document.querySelectorAll('.grid-pixels');       // Selects pixels & removes previous grid
        pixels.forEach(pixel => pixel.remove());

        for (let i = 0; i < e.currentTarget.id; i++) {      // Loops & set pixels to grid

            const d = document.createElement('div');

            d.classList.add('grid-pixels');
            sketchPad.appendChild(d);
        }
    
    } else if (e.currentTarget.id == '1600') {      // Change to 30x30

        sketchPad.setAttribute('class', '');        // Adds class
        sketchPad.classList.add('grid-40');
        padSize = 40;

        const pixels = document.querySelectorAll('.grid-pixels');       // Selects pixels & removes previous grid
        pixels.forEach(pixel => pixel.remove());

        for (let i = 0; i < e.currentTarget.id; i++) {      // Loops & set pixels to grid

            const d = document.createElement('div');
            d.classList.add('grid-pixels');

            sketchPad.appendChild(d);
        }
    } else if (e.currentTarget.id == '3600') {      // Change to 60x60

        sketchPad.setAttribute('class', '');        // Adds class
        sketchPad.classList.add('grid-60');
        padSize = 60;

        const pixels = document.querySelectorAll('.grid-pixels');       // Selects pixels & removes previous grid
        pixels.forEach(pixel => pixel.remove());

        for (let i = 0; i < e.currentTarget.id; i++) {      // Loops & set pixels to grid

            const d = document.createElement('div');
            d.classList.add('grid-pixels');

            sketchPad.appendChild(d);
        }
    } else if (e.currentTarget.id == '6400') {     // Change to 80x80

        sketchPad.setAttribute('class', '');        // Adds class
        sketchPad.classList.add('grid-80');
        padSize = 80;

        const pixels = document.querySelectorAll('.grid-pixels');       // Selects pixels & removes previous grid
        pixels.forEach(pixel => pixel.remove());

        for (let i = 0; i < e.currentTarget.id; i++) {      // Loops & set pixels to grid
            const d = document.createElement('div');
            d.classList.add('grid-pixels');

            sketchPad.appendChild(d);
        }
    }
}

// Clear sketch

clearBtn.addEventListener('mouseenter', hover);
clearBtn.addEventListener('mouseleave', deHover);

clearBtn.addEventListener('click', clear);

function clear() {
    const pixels = document.getElementsByClassName('grid-pixels');
    for (let i = 0; i < pixels.length; i++) {
        pixels[i].style.backgroundColor = '';
    }
}

// Color sketch-pad

document.onmousedown = function() {mouseDown = 1;};
document.onmouseup = function() {mouseDown = 0;};

document.addEventListener('click', colorPixel);

for (let i = 0; i < pixels.length; i++) {       // Adds event listener for each pixel

    pixels[i].addEventListener('mouseenter', (colorDrag));
    pixels[i].addEventListener('click', (colorClick));
};

function colorPixel() {     // Adds event listener for each pixel

    for (let i = 0; i < pixels.length; i++) {

        pixels[i].addEventListener('mouseenter', (colorDrag));
        pixels[i].addEventListener('click', (colorClick));
    };
}

function colorDrag(e) {     // Adds color when mousedown & drag
    
    if (mouseDown > 0 && eraserOn == false && penSize == 1) {        // Pen is small

        const pixel = e.currentTarget;

        pixel.style.backgroundColor = 'var(--black)';

    } else if (mouseDown > 0 && eraserOn == false && penSize == 2) {     // Pen is medium
        const pixel = e.currentTarget;
        const pixelR = e.currentTarget.nextElementSibling;

        pixel.style.backgroundColor = 'var(--black)';
        pixelR.style.backgroundColor = 'var(--black)';

        for (let j = 0; j < pixels.length; j++) {       // Loops and fill upper left & right pixels
            if (pixels[j] == pixel) {
                let pixelUC = pixels[j - padSize];
                pixelUC.style.backgroundColor = 'var(--black)';
                let pixelUR = pixels[j - (padSize - 1)];
                pixelUR.style.backgroundColor = 'var(--black)';
            }
        }

    } else if (mouseDown > 0 && eraserOn == false && penSize == 3) {     // Pen is large

        const pixel = e.currentTarget;
        const pixelR = e.currentTarget.nextElementSibling;
        const pixelL = e.currentTarget.previousElementSibling;

        pixel.style.backgroundColor = 'var(--black)';
        pixelR.style.backgroundColor = 'var(--black)';
        pixelL.style.backgroundColor = 'var(--black)';

        for (let j = 0; j < pixels.length; j++) {       // Loops and fill upper left & right pixels

            if (pixels[j] == pixel) {

                let pixelUC = pixels[j - padSize];      // Up
                pixelUC.style.backgroundColor = 'var(--black)';

                let pixelUR = pixels[j - (padSize - 1)];
                pixelUR.style.backgroundColor = 'var(--black)';

                let pixelUL = pixels[(j - 1) - padSize];
                pixelUL.style.backgroundColor = 'var(--black)';

                let pixelDL = pixels[j + (padSize - 1)];        // Down
                pixelDL.style.backgroundColor = 'var(--black)';

                let pixelDR = pixels[j + ((padSize*1) + 1)];
                pixelDR.style.backgroundColor = 'var(--black)';

                let pixelDC = pixels[j + (padSize*1)];
                pixelDC.style.backgroundColor = 'var(--black)';
            }
        }

    } else if (mouseDown > 0 && eraserOn == true && penSize == 1) {     // Eraser is small

        const pixel = e.currentTarget;

        pixel.style.backgroundColor = 'var(--white)';

    } else if (mouseDown > 0 && eraserOn == true && penSize == 2) {     // Eraser is medium
        console.log(mouseDown)
        const pixel = e.currentTarget;
        const pixelR = e.currentTarget.nextElementSibling;

        pixel.style.backgroundColor = 'var(--white)';
        pixelR.style.backgroundColor = 'var(--white)';

        for (let j = 0; j < pixels.length; j++) {       // Loops and fill upper left & right pixels

            if (pixels[j] == pixel) {

                let pixelUC = pixels[j - padSize];
                pixelUC.style.backgroundColor = 'var(--white)';

                let pixelUR = pixels[j - (padSize - 1)];
                pixelUR.style.backgroundColor = 'var(--white)';
            }
        }

    } else if (mouseDown > 0 && eraserOn == true && penSize == 3) {     // Eraser is large


        const pixel = e.currentTarget;
        const pixelR = e.currentTarget.nextElementSibling;
        const pixelL = e.currentTarget.previousElementSibling;

        pixel.style.backgroundColor = 'var(--white)';
        pixelR.style.backgroundColor = 'var(--white)';
        pixelL.style.backgroundColor = 'var(--white)';

        for (let j = 0; j < pixels.length; j++) {       // Loops and fill upper left & right pixels

            if (pixels[j] == pixel) {

                let pixelUC = pixels[j - padSize];      // Up
                pixelUC.style.backgroundColor = 'var(--white)';

                let pixelUR = pixels[j - (padSize - 1)];
                pixelUR.style.backgroundColor = 'var(--white)';

                let pixelUL = pixels[(j - 1) - padSize];
                pixelUL.style.backgroundColor = 'var(--white)';

                let pixelDL = pixels[j + (padSize - 1)];        // Down
                pixelDL.style.backgroundColor = 'var(--white)';

                let pixelDR = pixels[j + ((padSize*1) + 1)];
                pixelDR.style.backgroundColor = 'var(--white)';

                let pixelDC = pixels[j + (padSize*1)];
                pixelDC.style.backgroundColor = 'var(--white)';
            }
        }

    } else {
        return
    }
};

function colorClick(e) {        // Adds color on click

    if (eraserOn == false && penSize == 1) {

    const pixel = e.currentTarget;

    pixel.style.backgroundColor = 'var(--black)';

    } else if (eraserOn == false && penSize == 2) {

        const pixel = e.currentTarget;
        const pixelR = e.currentTarget.nextElementSibling;

        pixel.style.backgroundColor = 'var(--black)';
        pixelR.style.backgroundColor = 'var(--black)';

        for (let j = 0; j < pixels.length; j++) {       // Loops and fill upper left & right pixels
            if (pixels[j] == pixel) {

                let pixelUC = pixels[j - padSize];
                pixelUC.style.backgroundColor = 'var(--black)';

                let pixelUR = pixels[j - (padSize - 1)];
                pixelUR.style.backgroundColor = 'var(--black)';
            }
        }

    } else if (eraserOn == false && penSize == 3) {     // Pen is large

        const pixel = e.currentTarget;
        const pixelR = e.currentTarget.nextElementSibling;
        const pixelL = e.currentTarget.previousElementSibling;

        pixel.style.backgroundColor = 'var(--black)';
        pixelR.style.backgroundColor = 'var(--black)';
        pixelL.style.backgroundColor = 'var(--black)';

        for (let j = 0; j < pixels.length; j++) {       // Loops and fill upper left & right pixels

            if (pixels[j] == pixel) {

                let pixelUC = pixels[j - padSize];      // Up
                pixelUC.style.backgroundColor = 'var(--black)';

                let pixelUR = pixels[j - (padSize - 1)];
                pixelUR.style.backgroundColor = 'var(--black)';

                let pixelUL = pixels[(j - 1) - padSize];
                pixelUL.style.backgroundColor = 'var(--black)';

                let pixelDL = pixels[j + (padSize - 1)];        // Down
                pixelDL.style.backgroundColor = 'var(--black)';

                let pixelDR = pixels[j + ((padSize*1) + 1)];
                pixelDR.style.backgroundColor = 'var(--black)';

                let pixelDC = pixels[j + (padSize*1)];
                pixelDC.style.backgroundColor = 'var(--black)';
            }
        }

    } else if (eraserOn == true && penSize == 1) {     // Eraser is small

        const pixel = e.currentTarget;

        pixel.style.backgroundColor = 'var(--white)';

    } else if (eraserOn == true && penSize == 2) {     // Eraser is medium

        const pixel = e.currentTarget;
        const pixelR = e.currentTarget.nextElementSibling;

        pixel.style.backgroundColor = 'var(--white)';
        pixelR.style.backgroundColor = 'var(--white)';

        for (let j = 0; j < pixels.length; j++) {       // Loops and fill upper left & right pixels

            if (pixels[j] == pixel) {

                let pixelUC = pixels[j - padSize];
                pixelUC.style.backgroundColor = 'var(--white)';

                let pixelUR = pixels[j - (padSize - 1)];
                pixelUR.style.backgroundColor = 'var(--white)';
            }
        }

    } else if (eraserOn == true && penSize == 3) {     // Eraser is large

        const pixel = e.currentTarget;
        const pixelR = e.currentTarget.nextElementSibling;
        const pixelL = e.currentTarget.previousElementSibling;

        pixel.style.backgroundColor = 'var(--white)';
        pixelR.style.backgroundColor = 'var(--white)';
        pixelL.style.backgroundColor = 'var(--white)';

        for (let j = 0; j < pixels.length; j++) {       // Loops and fill upper left & right pixels

            if (pixels[j] == pixel) {

                let pixelUC = pixels[j - padSize];      // Up
                pixelUC.style.backgroundColor = 'var(--white)';

                let pixelUR = pixels[j - (padSize - 1)];
                pixelUR.style.backgroundColor = 'var(--white)';

                let pixelUL = pixels[(j - 1) - padSize];
                pixelUL.style.backgroundColor = 'var(--white)';

                let pixelDL = pixels[j + (padSize - 1)];        // Down
                pixelDL.style.backgroundColor = 'var(--white)';

                let pixelDR = pixels[j + ((padSize*1) + 1)];
                pixelDR.style.backgroundColor = 'var(--white)';

                let pixelDC = pixels[j + (padSize*1)];
                pixelDC.style.backgroundColor = 'var(--white)';
            }
        }

    } else {
        return
    }
}

// Style sections

const eraser = document.getElementById('eraser');       // Style variables
const penS = document.getElementById('pen-s');
const penM = document.getElementById('pen-m');
const penL = document.getElementById('pen-l');

eraser.addEventListener('click', () => { eraserOn = true });        // Event listener to set pen size & eraser on
penS.addEventListener('click', () => { penSize = 1; eraserOn = false });
penM.addEventListener('click', () => { penSize = 2; eraserOn = false });
penL.addEventListener('click', () => { penSize = 3; eraserOn = false });

eraser.addEventListener('click', styleSelect);      // Event listeners for style select
penS.addEventListener('click', styleSelect);
penM.addEventListener('click', styleSelect);
penL.addEventListener('click', styleSelect);

function styleSelect(e) {       // Set style of on click

    mainCont.setAttribute('class', '');
    mainCont.classList.add(this.id);
}