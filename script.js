const sizeBtns = document.querySelectorAll('.size-cont');
const clearBtn = document.getElementById('clear');
const sketchPad = document.getElementById('sketch-pad');
const styleBtns = document.querySelectorAll('.controls');

// Global

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

for (let i = 0; i < 1600; i++) {        // Setsdefault grid to 40x40

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

        const pixels = document.querySelectorAll('.grid-pixels');
        pixels.forEach(pixel => pixel.remove());

        for (let i = 0; i < e.currentTarget.id; i++) {
            const d = document.createElement('div');
            d.classList.add('grid-pixels');

            sketchPad.classList.remove('grid-40', 'grid-60', 'grid-80');
            sketchPad.classList.add('grid-20');
            sketchPad.appendChild(d);
        }
    
    } else if (e.currentTarget.id == '1600') {      // Change to 30x30

        const pixels = document.querySelectorAll('.grid-pixels');
        pixels.forEach(pixel => pixel.remove());

        for (let i = 0; i < e.currentTarget.id; i++) {
            const d = document.createElement('div');
            d.classList.add('grid-pixels');

            sketchPad.classList.remove('grid-20', 'grid-60', 'grid-80');
            sketchPad.classList.add('grid-40');
            sketchPad.appendChild(d);
        }
    } else if (e.currentTarget.id == '3600') {      // Change to 60x60
        const pixels = document.querySelectorAll('.grid-pixels');
        pixels.forEach(pixel => pixel.remove());

        for (let i = 0; i < e.currentTarget.id; i++) {
            const d = document.createElement('div');
            d.classList.add('grid-pixels');

            sketchPad.classList.remove('grid-20', 'grid-40', 'grid-80');
            sketchPad.classList.add('grid-60');
            sketchPad.appendChild(d);
        }
    } else if (e.currentTarget.id == '6400') {     // Change to 80x80

        const pixels = document.querySelectorAll('.grid-pixels');
        pixels.forEach(pixel => pixel.remove());

        for (let i = 0; i < e.currentTarget.id; i++) {
            const d = document.createElement('div');
            d.classList.add('grid-pixels');

            sketchPad.classList.remove('grid-20', 'grid-40', 'grid-60');
            sketchPad.classList.add('grid-80');
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

document.addEventListener('click', colorPixel);

let mouseDown = 0;
document.onmousedown = function() {mouseDown++;};
document.onmouseup = function() {mouseDown--;};

function colorPixel(e) {

    const pixels = document.getElementsByClassName('grid-pixels');

    for (let i = 0; i < pixels.length; i++) {
        pixels[i].addEventListener('mouseenter', (colorDrag));
        pixels[i].addEventListener('click', (colorClick));
    };
        function colorDrag(e) {

            if (mouseDown > 0) {
                const pixel = e.currentTarget;
                pixel.style.backgroundColor = 'var(--black)';
            } else {
                return;
            }};

        function colorClick(e) {
            const pixel = e.currentTarget;
            pixel.style.backgroundColor = 'var(--black)';
            };
}