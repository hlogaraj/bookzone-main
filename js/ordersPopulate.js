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
        let qtyPrice = quantity * price;
        qtyPrice = (Math.round(qtyPrice * 100) / 100).toFixed(2);

        let row = document.createElement("tr");
        row.id = name;
        let nameData = document.createElement("td");
        nameData.innerHTML = name;
        let quantityData = document.createElement("td");
        quantityData.innerHTML = quantity;
        let priceData = document.createElement("td");
        priceData.innerHTML = "$" + qtyPrice;
        row.appendChild(nameData);
        row.appendChild(quantityData);
        row.appendChild(priceData);
        table.appendChild(row);
        totalPrice = parseFloat(totalPrice) + parseFloat(qtyPrice);
    }
}


