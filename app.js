const rElement = document.getElementById("r");
const gElement = document.getElementById("g");
const bElement = document.getElementById("b");

const levels = Array.from(document.getElementsByClassName("mode"));
const squares = Array.from(document.getElementsByClassName("square"));

let gameLevel = levels.find((level) => {
    const classList = Array.from(level.classList)
    return classList.includes("selected");
}).innerHTML;

levels.forEach(level => {
    level.addEventListener("click", function(){
        levels.forEach(node => node.classList.remove("selected"));
        this.classList.add("selected");

        gameLevel = this.innerHTML;
    });
});
// attempt to make all the square have background colors
const startButton = document.getElementById("reset");
startButton.addEventListener("click", function(){

    //assign each individual square a background color
    for (let i = 0; i < squares.length; i = i+1){

        const red = Math.floor(Math.random()*256);
        const green =  Math.floor(Math.random()*256);
        const blue =  Math.floor(Math.random()*256);

        const rgbString = "rgb(" + red + "," + green + "," + blue + ")";
        console.log(rgbString);

        const square = squares[i];

        square.dataset.rgb_value = JSON.stringify([red, green, blue]);
        square.style.backgroundColor = rgbString;
    }
    
 //assign the header a random rgb value from one of the square values
 const randomSquareIndex = Math.floor(Math.random() * 6);
 const headerColorSquare = squares[randomSquareIndex];
setHeaderRgbBackgroundColor(headerColorSquare);
});

function setHeaderRgbBackgroundColor(squareElement){
    const setHeaderElementBackgroundColor = (rgbValues, element) => {
        const [r, b, g] = rgbValues;
        const temp = "rgb(" + red + "," + green + "," + blue + ")";
        console.table(temp);
        //element.backgroundColor
    } 

    
    const rgbString = squareElement.dataset.rgb_value;
    const[red, green, blue] = JSON.parse(rgbString);
    const redBackground = [red, 0, 0];
    const greenBackground = [0, green, 0];
    const blueBackground = [0, 0, blue];

}




