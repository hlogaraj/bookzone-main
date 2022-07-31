var cartItems = JSON.parse(localStorage.getItem("carttems"));

var products = JSON.parse(localStorage.getItem("products"));

if (products != null) {
    console.log("product catalog loaded locally");
}

if (cartItems != null) {
    console.log("cart items found");
    let table = document.getElementById("cart-items");
    var totalPrice = 0;
    for (let i = 0; i < cartItems.length; i++) {
        let item = cartItems[i];
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
    totalPrice = (Math.round(totalPrice * 100) / 100).toFixed(2);
    
    let row = document.createElement("tr");
    row.classList.add("total-row");
    let totalData = document.createElement("td");
    totalData.classList.add("total-data");
    totalData.innerHTML = "Total Price: $" + totalPrice;
    totalData.colSpan = "3";
    row.appendChild(totalData);
    table.appendChild(row);
}


