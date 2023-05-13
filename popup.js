const myComponent = document.getElementById("popup-container");
let isDragging = false;
let initialX;
let initialY;
let currentX;
let currentY;
let xOffset = 0;
let yOffset = 0;

// Add desktop event listeners
myComponent.addEventListener("mousedown", dragStart, false);
myComponent.addEventListener("mouseup", dragEnd, false);
myComponent.addEventListener("mousemove", drag, false);

// Add mobile event listeners
myComponent.addEventListener("touchstart", dragStart, false);
myComponent.addEventListener("touchend", dragEnd, false);
myComponent.addEventListener("touchmove", drag, false);

function dragStart(e) {
    if (e.type === "mousedown") {
        isDragging = true;
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
    } else if (e.type === "touchstart") {
        isDragging = true;
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
    }
}

function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;

    isDragging = false;
}

function drag(e) {
    if (isDragging) {
        e.preventDefault();

        if (e.type === "mousemove") {
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
        } else if (e.type === "touchmove") {
            currentX = e.touches[0].clientX - initialX;
            currentY = e.touches[0].clientY - initialY;
        }

        xOffset = currentX;
        yOffset = currentY;

        setTranslate(currentX, currentY, myComponent);
    }
}

function setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}