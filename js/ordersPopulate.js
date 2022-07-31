var orderedItems = JSON.parse(localStorage.getItem("orderedItems"));

var products = JSON.parse(localStorage.getItem("products"));

if (products != null) {
    console.log("product catalog loaded locally");
}

if (orderedItems != null) {
    console.log("ordered items found");
    let table = document.getElementById("ordered-items");
    var totalPrice = 0;
    for (let i = 0; i < orderedItems.length; i++) {
        let item = orderedItems[i];
        let name = String(item.name);
        let quantity = parseInt(item.quantity);
        let price = parseFloat(item.price);

        for (let j = 0; j < quantity; j++) {
            let row = document.createElement("tr");
            row.id = name;
            let checkmark = document.createElement("input");
            checkmark.type = "checkbox";
            checkmark.style.textAlign = "center";
            checkmark.style.verticalAlign = "middle";
            checkmark.id = name + String(j);
            let nameData = document.createElement("td");
            nameData.innerHTML = name;
            let priceData = document.createElement("td");
            priceData.innerHTML = "$" + price;
            row.appendChild(document.createElement("td").appendChild(checkmark));
            row.appendChild(document.createElement("td").appendChild(nameData));
            row.appendChild(document.createElement("td").appendChild(priceData));
            table.appendChild(row);
        }
    }
}


