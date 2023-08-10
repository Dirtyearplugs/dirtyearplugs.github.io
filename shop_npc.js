function build_shop_table(shop){
    // Create the table
    const table = document.createElement("table");
    table.border = "1";

    // Create the header
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    ["", "Item", "Sell Price"].forEach(headerText => {
        const th = document.createElement("th");
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create the table body
    const tbody = document.createElement("tbody");

    items.forEach((item, index) => {
        const row = document.createElement("tr");

        const indexCell = document.createElement("td");
        indexCell.textContent = index + 1;

        const itemCell = document.createElement("td");
        itemCell.textContent = item.itemName;

        const priceCell = document.createElement("td");
        priceCell.textContent = item.sellPrice;

        row.appendChild(indexCell);
        row.appendChild(itemCell);
        row.appendChild(priceCell);

        tbody.appendChild(row);
    });

    table.appendChild(tbody);

    // Append the table to the container
    document.getElementById("tableContainer").appendChild(table);
}