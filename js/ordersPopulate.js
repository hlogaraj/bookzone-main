var orderedItems = JSON.parse(localStorage.getItem("orderedItems"));
var products;

if (localStorage.getItem("products") != null) {
    products = JSON.parse(localStorage.getItem("products"));
    console.log("product catalog lodaded locally");
} else {
    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
    } else {
        request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    request.open('GET', 'js/products.json');
    request.onreadystatechange = function () {
        if ((request.status === 200) && (request.readyState === 4)) {
            let json = JSON.parse(request.responseText);
            products = json[0];
            localStorage.setItem('products', JSON.stringify(products)); //save JSON string to local storage
            console.log("Products loaded externally");
            console.log(products);
        }
    }
    
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


