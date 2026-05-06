import { insertionHandler } from "../handlers/insertionHandler.js";
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

function createCell(content){
    let td = document.createElement("td");
    td.append(content);
    return td;
}

function generateTable(data, blueprint, addEdit = false){
    if(!Array.isArray(data) || data.length === 0 || !blueprint) return "";

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
            insertionHandler.insertEditButton(tr, item);
        }
        tbody.append(tr);
    });

    table.append(tbody);

    return table;
}

function generateCollapsible(title, body){
    let collapsible = document.createElement("div");
    collapsible.classList.add("collapsible");

    // Add Head content
    let head = document.createElement("div");
    head.classList.add("collapsible__head");
    head.style.backgroundColor = tagColors[title[0].toUpperCase()]?.background || '#E0E0E0';
    head.style.color = tagColors[title[0].toUpperCase()]?.color || '#000000';
    head.style.borderColor = tagColors[title[0].toUpperCase()]?.border || '#E0E0E0';
    
    let title_cont = document.createElement("h2");
    title_cont.append(title);
    let icon = generateIconElement("chevron-down");

    head.append(title_cont, icon);
    
    // Add body
    let c_body = document.createElement("div");
    c_body.classList.add("collapsible__body");
    c_body.append(body);

    head.onclick = () => {
        let body = head.nextElementSibling;
        body.classList.toggle("hidden");
    }

    collapsible.append(head, c_body);

    return collapsible;
}

export { generateIconElement, generateTagElement, generateDeletableTag, generateTable, generateCollapsible };