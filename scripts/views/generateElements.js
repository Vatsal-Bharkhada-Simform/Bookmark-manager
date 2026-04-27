import tagColors from "./tagColors.js";

function generateIconElement(name) {
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    let useTag = document.createElementNS("http://www.w3.org/2000/svg", 'use');
    useTag.setAttribute("href", `./assets/icons/sprite.svg#${name}`);
    svg.appendChild(useTag);
    svg.classList.add('u-icon');
    return svg;
}

function generateTagElement(tagName) {
    let tagElement = document.createElement('span');

    tagElement.textContent = tagName;
    tagElement.classList.add('u-tag');

    tagElement.style.backgroundColor = tagColors[tagName[0].toUpperCase()]?.background || '#E0E0E0';
    tagElement.style.color = tagColors[tagName[0].toUpperCase()]?.color || '#000000';
    tagElement.style.borderColor = tagColors[tagName[0].toUpperCase()]?.border || '#E0E0E0';

    return tagElement;
}

export { generateIconElement, generateTagElement };