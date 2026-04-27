function generateIconElement(name){
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    let useTag = document.createElementNS("http://www.w3.org/2000/svg", 'use');
    useTag.setAttribute("href", `./assets/icons/sprite.svg#${name}`);
    svg.appendChild(useTag);
    svg.classList.add('u-icon');
    return svg;
}

export { generateIconElement };