import { insertionHandler } from "../handlers/insertionHandler.js";
import tagColors from "./tagColors.js";

// Generates an svg element where svg is used from sprite file.
// Only needs svg name as defined in the sprite file to generate svg
function generateIconElement(name, className = "u-icon") {
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    let useTag = document.createElementNS("http://www.w3.org/2000/svg", 'use');
    svg.classList.add(className);
    useTag.setAttribute("href", `./assets/icons/sprite.svg#${name}`);
    svg.appendChild(useTag);
    return svg;
}

// Generate tag element with color code taken from tagColors object based on the tag name
function generateTagElement(tagName) {
    let tagElement = document.createElement('span');

    tagElement.textContent = tagName;
    tagElement.classList.add('u-tag');

    tagElement.style.backgroundColor = tagColors[tagName[0].toUpperCase()]?.background || '#E0E0E0';
    tagElement.style.color = tagColors[tagName[0].toUpperCase()]?.color || '#000000';
    tagElement.style.borderColor = tagColors[tagName[0].toUpperCase()]?.border || '#E0E0E0';

    return tagElement;
}

// Generate tag element with a button to delete the tag. Used in add/edit forms of bookmark page.
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

// Create a <td> element with given content
function createCell(content){
    let td = document.createElement("td");
    td.append(content);
    return td;
}

// Generate entire table using template(blueprint) passed as argument
// Use passed data to fill table body as defined in the template
function generateTable(data, blueprint, addEdit = false){
    if(!Array.isArray(data) || data.length === 0 || !blueprint) return generateEmptyStateElement("Nothing to show. Start by adding a bookmark.");

    let table = document.createElement("table");
    let thead = document.createElement("thead");
    let tbody = document.createElement("tbody");

    let tr = document.createElement("tr");

    // Add table header
    Object.entries(blueprint).forEach(([_,item]) => {
        let th = document.createElement("th");
        th.append(item.th_title);
        tr.append(th);
    });

    thead.append(tr);
    table.append(thead);

    // Add table body
    data.forEach((item) => {
        let tr = document.createElement("tr");
        Object.keys(blueprint).forEach((key) => {
            tr.append(createCell(insertionHandler.insertData(item[key] ?? "", blueprint[key].type, item.id)));
        });
        if(addEdit){
            insertionHandler.insertEditButton(tr.lastElementChild, item);
        }
        tbody.append(tr);
    });

    table.append(tbody);

    return table;
}

// Generate collapsible elements for collection page
function generateCollapsible(title, body, count){
    let collapsible = document.createElement("div");
    collapsible.classList.add("collapsible");
    collapsible.dataset.collectionName = title;

    // Add Head content
    let head = document.createElement("div");
    head.classList.add("collapsible__head");
    let title_cont = document.createElement("div");
    title_cont.classList.add("head-wrapper");
    let heading = document.createElement("h2");
    heading.style.backgroundColor = tagColors[title[0].toUpperCase()]?.background || '#E0E0E0';
    heading.style.color = tagColors[title[0].toUpperCase()]?.color || '#000000';
    heading.style.borderColor = tagColors[title[0].toUpperCase()]?.border || '#E0E0E0';

    let countElement = generateTagElement(String(count));
    countElement.classList.add("count");
    
    heading.append(title);
    title_cont.append(heading, countElement);
    
    let icon = generateIconElement("chevron-down");

    head.append(title_cont, icon);
    
    // Add body
    let c_body = document.createElement("div");
    c_body.classList.add("collapsible__body");
    c_body.append(body);

    head.onclick = () => {
        let body = head.nextElementSibling;
        body.classList.toggle("hidden");
        let icon = head.lastChild;
        icon.classList.toggle("close");
    }

    collapsible.append(head, c_body);

    return collapsible;
}

function generateEmptyStateElement(message = "Nothing to show"){
    let wrapper = document.createElement("div");
    wrapper.classList.add("u-empty-message");

    let div = document.createElement("div");
    let img = document.createElement("img");
    img.src = "./assets/images/empty-box.png";
    img.alt = "Empty box image";

    let span = document.createElement("span");
    span.innerText = message;

    div.append(img, span);
    wrapper.append(div);

    return wrapper;
}

export { generateIconElement, generateTagElement, generateDeletableTag, generateTable, generateCollapsible, generateEmptyStateElement };