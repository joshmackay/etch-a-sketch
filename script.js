const etchASketch = (() => {
	const GRID_WIDTH = document.querySelector("#grid").offsetWidth;
	const DEFAULT_GRID_SIZE = 16;
	let currentGridSize = 16;
	const clearButton = document
		.querySelector("#clear-button")
		.addEventListener("click", function () {
			createGrid(currentGridSize);
		});

	//set up event listeners for buttons (on click), slider (on change) and colour picker (on change)
	document.querySelector("#default-button").addEventListener("click", setDefault);
	document.querySelector("#rgb-button").addEventListener("click", rgbMode);
	document.querySelector("#shading").addEventListener("click", shadingMode);
	document.querySelector("#lighten").addEventListener("click", lightenMode);
	document.querySelector("#erase-button").addEventListener("click", eraseMode);
	document.querySelector("#color").addEventListener("change", colourPickerValue);
	document.querySelector(".slider").addEventListener("change", setSize);

	//initialise default values for colours and modes
	let bgColour = "hsl(0,100%,100%)";
	let rgbOn = false;
	let darkenOn = false;
	let lightenOn = false;
	let eraseOn = false;
	let currentPaintColour = `hsl(0,0%, 0%)`;
	let functionMode = "default";

	//function to create the grid
	function createGrid(size) {
		//function to create a grid based on row and col values
		clear(); //wipe existing rows

		//nested for loop, generates 1 row, fills it with cells then generates the next
		for (let r = 0; r < size; r++) {
			const row = document.createElement("div");
			row.className = "row";
			row.setAttribute("draggable", "false");
			for (let c = 0; c < size; c++) {
				//sets cell width and height based on grid container width and height
				let cellWidth = GRID_WIDTH / size;
				let cellHeight = GRID_WIDTH / size;
				const cell = document.createElement("div");
				cell.classList.add("cell");
				cell.style.width = cellWidth + "px";
				cell.style.height = cellHeight + "px";
				cell.style.backgroundColor = bgColour;
				//draws the cell grid lines.  The if statements prevents overlap of cell border and grid container border
				if (r !== 0) {
					cell.classList.add("cell-border-top");
				}
				if (c !== 0) {
					cell.classList.add("cell-border-left");
				}
				//sets event listensers for click and click-drag and appends cell to the row
				cell.setAttribute("draggable", "false");
				cell.addEventListener("mousedown", mouseClick);
				cell.addEventListener("mouseenter", mouseDrag);
				row.appendChild(cell);
			}
			//appends the row to the grid container
			document.querySelector("#grid").appendChild(row);
		}
	}

	//sets default conditions either when initialised, or called when window loads
	function setDefault() {
		currentPaintColour = "hsl(0,0%,0%)";
		rgbOn = false;
		darkenOn = false;
		lightenOn = false;
		eraseOn = false;
	}

	//this is called when the mouse is clicked on a cell, uses on click listener
	//cell colour is dependant on which mode is active
	function mouseClick(e) {
		e.preventDefault();
		if (rgbOn) {
			e.target.style.backgroundColor = setRGBColour();
			//if shading is active, gets the current cell colour and calls the shadeCell funciton
			//to calculate and return the new colour value
		} else if (darkenOn) {
			let selectedCellColourRGB = e.target.style.backgroundColor;
			e.target.style.backgroundColor = shadeCell(selectedCellColourRGB);
		} else if (lightenOn) {
			let selectedCellColourRGB = e.target.style.backgroundColor;
			e.target.style.backgroundColor = lightenCell(selectedCellColourRGB);
		} else if (eraseOn) {
			let selectedCellColourRGB = e.target.style.backgroundColor;
			e.target.style.backgroundColor = lightenCell(selectedCellColourRGB);
		} else {
			e.target.style.backgroundColor = currentPaintColour;
			console.log(e.target.style.backgroundColor);
		}
	}

	//function called with mouse enter event listener on cells.
	//allows for mouse click and drag functionality
	//performs the same function as on click function, but occurs when mouse enters cell.
	function mouseDrag(e) {
		if (e.buttons > 0) {
			if (rgbOn) {
				e.target.style.backgroundColor = setRGBColour();
			} else if (darkenOn) {
				let selectedCellColourRGB = e.target.style.backgroundColor;
				e.target.style.backgroundColor = shadeCell(selectedCellColourRGB);
			} else if (lightenOn) {
				let selectedCellColourRGB = e.target.style.backgroundColor;
				e.target.style.backgroundColor = lightenCell(selectedCellColourRGB);
			} else if (eraseOn) {
				e.target.style.backgroundColor = currentPaintColour;
			} else e.target.style.backgroundColor = currentPaintColour;
		}
	}

	//flag to toggle rgb mode when button is clicked
	function rgbMode() {
		if (rgbOn) {
			rgbOn = false;
			currentPaintColour = "hsl(0,0%,0%)";
		} else {
			lightenOn = false;
			rgbOn = true;
			darkenOn = false;
			eraseOn = false;
		}
	}

	//flag to toggle shading mode when button is clicked
	function shadingMode() {
		if (darkenOn) {
			darkenOn = false;
		} else {
			darkenOn = true;
			rgbOn = false;
			lightenOn = false;
			raseOn = false;
		}
	}

	//flag to toggle lighten mode when button clicked.
	function lightenMode() {
		if (lightenOn) {
			lightenOn = false;
		} else {
			lightenOn = true;
			rgbOn = false;
			darkenOn = false;
			eraseOn = false;
		}
	}

	//flag to toggle erase mode
	function eraseMode() {
		if (eraseOn) {
			eraseOn = false;
		} else {
			lightenOn = false;
			rgbOn = false;
			darkenOn = false;
			eraseOn = true;
			currentPaintColour = "rgb(255,255,255";
		}
	}

	//sets the random rgb colour for rgb mode
	//i use hsl here as I am able to easily produce only bright colours by having l and s fixed.
	//hue only needs to be randomly generated
	function setRGBColour() {
		let randomHue = Math.floor(Math.random() * 360);
		currentPaintColour = `hsl(${randomHue}, 100%, 50%)`;
		return currentPaintColour;
	}

	//this is called when the size slider is adjusted
	//an event listener calls this function and gets the value of the slider
	//the value is then passed to createGrid and a new grid is generated with the new size
	function setSize(e) {
		const size = e.target.value;
		if (size != null && size > 0 && size < 101) {
			currentGridSize = size;
			createGrid(size);
		}
	}

	//clears any active modes with setDefault
	//then sets the current paint value to the value selected on the colour picker
	function colourPickerValue(e) {
		setDefault();
		currentPaintColour = e.target.value;
	}

	//clears the grid back to white
	//but maintains any modes that are active
	function clear() {
		let existingElements = document.querySelector("#grid");
		existingElements.style.backgroundColor = bgColour;
		existingElements.replaceChildren();
	}

	//function used to shade the cells
	//i decided to use HSL "L" value for darkening and lightening as it made the calulations simpler.
	//the function takes the existing colour of the cell in the full RGB string format ie. RGB(100,200,50)
	//it then passes the string into covertRGBToHSL to extract the r g b values as an array
	function shadeCell(rgb) {
		let selectedCellColourHSL = convertRGBToHSL(rgb);
		//stores the L value in a variable
		let currentLightness = Number(selectedCellColourHSL[2]);
		let newBG = "";
		//if lightness is already 0, the cell is coloured black
		if (currentLightness === 0) {
			return (newBG = "rgb(0,0,0)");
		}
		//otherwise, L is reduced by 5 (increments of 5%) and the full HSL string is retured
		else {
			let newLightness = currentLightness - 10;
			return `hsl(${Math.round(selectedCellColourHSL[0])},${Math.round(
				selectedCellColourHSL[1]
			)}%,${Math.round(newLightness)}%)`;
		}
	}

	//lighten works the same as darken but in reverse.  It adds 5% to the existing value.
	//And the cell is set to white if L is already at 100%
	function lightenCell(rgb) {
		let selectedCellColourHSL = convertRGBToHSL(rgb);
		let currentLightness = Number(selectedCellColourHSL[2]);
		let newBG = "";
		if (currentLightness === 100) {
			return (newBG = "rgb(255,255,255)");
		} else {
			let newLightness = currentLightness + 10;
			return `hsl(${Math.round(selectedCellColourHSL[0])},${Math.round(
				selectedCellColourHSL[1]
			)}%,${Math.round(newLightness)}%)`;
		}
	}

	//this starts the rgb to hsl conversion process and returns the array of HSL values to the lighten and darken functions
	function convertRGBToHSL(rgb) {
		let rgbValues = stripRGB(rgb);
		let hslValues = RGBToHSL(
			Math.round(rgbValues[0]),
			Math.round(rgbValues[1]),
			Math.round(rgbValues[2])
		);
		return hslValues;
	}

	//used to strip the r g b values from an RGB string using Regex
	function stripRGB(rgb) {
		let pattern = /([0-9]{1,3})/g;
		let result = rgb.match(pattern);
		return result;
	}

	//pulls the h s l values from a HSL string using regex, only returns the l value
	function stripHSL(hsl) {
		let pattern = /[0-9]{1,3}/g;
		let result = hsl.match(pattern);
		let h = Number(result[0]);
		let s = Number(result[1]);
		let l = Number(result[2]);
		return l;
	}

	//this is the maths to convert rgb into the equivalent hsl.
	//i used the code provided at the website reference as the maths is a bit over my head.

	function RGBToHSL(r, g, b) {
		//https://www.30secondsofcode.org/js/s/rgb-to-hsl
		r /= 255;
		g /= 255;
		b /= 255;
		const l = Math.max(r, g, b);
		const s = l - Math.min(r, g, b);
		const h = s ? (l === r ? (g - b) / s : l === g ? 2 + (b - r) / s : 4 + (r - g) / s) : 0;
		return [
			Math.round(60 * h < 0 ? 60 * h + 360 : 60 * h),
			100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
			(100 * (2 * l - s)) / 2,
		];
	}

	//This is also from another source, the maths is a bit over my head at this stage.
	//convert values of r,g,b to values of h,s,l.  Values must be stripped from
	//standard format with stripHSL function.
	function HSLToRGB(h, s, l) {
		//https://css-tricks.com/converting-color-spaces-in-javascript/
		// Must be fractions of 1
		s /= 100;
		l /= 100;

		let c = (1 - Math.abs(2 * l - 1)) * s,
			x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
			m = l - c / 2,
			r = 0,
			g = 0,
			b = 0;

		if (0 <= h && h < 60) {
			r = c;
			g = x;
			b = 0;
		} else if (60 <= h && h < 120) {
			r = x;
			g = c;
			b = 0;
		} else if (120 <= h && h < 180) {
			r = 0;
			g = c;
			b = x;
		} else if (180 <= h && h < 240) {
			r = 0;
			g = x;
			b = c;
		} else if (240 <= h && h < 300) {
			r = x;
			g = 0;
			b = c;
		} else if (300 <= h && h < 360) {
			r = c;
			g = 0;
			b = x;
		}
		r = Math.round((r + m) * 255);
		g = Math.round((g + m) * 255);
		b = Math.round((b + m) * 255);

		return "rgb(" + r + "," + g + "," + b + ")";
	}

	function initialise() {
		setDefault();
		createGrid(DEFAULT_GRID_SIZE);
	}

	initialise();
})();

//etchASketch.initialise();
