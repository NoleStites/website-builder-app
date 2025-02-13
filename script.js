// Get CSS vars
var css_styles = window.getComputedStyle(document.body);
let resizeBarWidth = Math.round(css_styles.getPropertyValue("--resizeBarWidth").slice(0,-2));
let resizeBarHeight = Math.round(css_styles.getPropertyValue("--resizeBarHeight").slice(0,-2));

// Behavior of hover over "resizable" element
function createBarParentHoverEffect(parent_el, bar_els) {
    parent_el.addEventListener("mouseover", function() {
        // Add the resize bars to the parent
        for (let key in bar_els) {
            let bar = bar_els[key];
            parent_el.appendChild(bar);
        }
    });
    parent_el.addEventListener("mouseleave", function() {
        // Remove the resize bars from the parent
        for (let key in bar_els) {
            let bar = bar_els[key];
            parent_el.removeChild(bar);
        }
    });
}

// Behavior of hover over resize bar
function createResizeBarHoverEffect(bar_els) {
    for (let key in bar_els) {
        let bar = bar_els[key];
        bar.addEventListener("mouseover", function() {
            bar.style.backgroundColor = "rgb(68, 68, 68)";
        });
        bar.addEventListener("mouseleave", function() {
            bar.style.backgroundColor = "black";
        });
    }
}

let resizable_elements = document.getElementsByClassName("resizable");
for (let i = 0; i < resizable_elements.length; i++) {
    let el = resizable_elements[i];
    el.style.position = "relative";

    // Define hover effects
    let bars = {
        "right_bar": document.createElement("div"),
        "bottom_bar": document.createElement("div"),
        "left_bar": document.createElement("div"),
        "top_bar": document.createElement("div"),
    }

    // Right-bar specific styles
    bars["right_bar"].id = "right_bar";
    bars["right_bar"].style.top = (el.offsetHeight / 2) - resizeBarHeight/2 + 'px';

    // Bottom-bar specific styles
    bars["bottom_bar"].id = "bottom_bar";
    bars["bottom_bar"].style.left = (el.offsetWidth / 2) - resizeBarHeight/2 + 'px';

    // Left-bar specific styles
    bars["left_bar"].id = "left_bar";
    bars["left_bar"].style.top = (el.offsetHeight / 2) - resizeBarHeight/2 + 'px';

    // Top-bar specific styles
    bars["top_bar"].id = "top_bar";
    bars["top_bar"].style.left = (el.offsetWidth / 2) - resizeBarHeight/2 + 'px';

    // Assign class name to bars
    for (let key in bars) {
        bars[key].classList.add("resize_bar");
    }
    createResizeBarHoverEffect(bars);
    createBarParentHoverEffect(el, bars);
}