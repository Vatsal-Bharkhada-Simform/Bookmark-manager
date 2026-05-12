import tagColors from "./tagColors.js";

function generateIconElement(name, className = "u-icon") {
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    let useTag = document.createElementNS("http://www.w3.org/2000/svg", 'use');
    svg.classList.add(className);
    useTag.setAttribute("href", `./assets/icons/sprite.svg#${name}`);
    svg.appendChild(useTag);
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

function generateDeletableTag(tagName) {
    let tagElement = generateTagElement(tagName);

    let closeButton = document.createElement('button');
    closeButton.classList.add("button-close-tag");
    closeButton.appendChild(generateIconElement("close", "u-icon-del"));
    closeButton.type = "button";
    closeButton.onclick = () => tagElement.remove();
    tagElement.appendChild(closeButton);

    return tagElement;
}

export { generateIconElement, generateTagElement, generateDeletableTag };