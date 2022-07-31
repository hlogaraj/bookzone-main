var orderedItems = JSON.parse(localStorage.getItem("orderedItems"));
var products;
var returnButton = document.getElementById("return-button");
var returningItems = new Array();
if (returnButton != null) {
    console.log('button found');
}
var ordersTable = document.getElementById("ordered-items");
var rows = Array.from(ordersTable.childNodes);
rows.splice(0, 1); //remove row of headers

returnButton.addEventListener("click", returnItems);
console.log('listener added');

if (localStorage.getItem("products") != null) {
    products = JSON.parse(localStorage.getItem("products"));
    console.log("product catalog loaded locally");
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

function returnItems(e) {
    console.log('button clicked');
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        let children = row.childNodes;
        let checkbox = children[0];
        let itemName = children[1];
        if (checkbox.checked == "true") {
            returningItems.push(products[itemName]); //add product object to return items array
            for (let j = 0; j < orderedItems.length; j++) {
                let item = orderedItems[j];
                if (item.name == itemName) {
                    if (item.quantity > 1) {
                        item.quantity -= 1; //decrement from ordered quantity if multiple ordered
                    } else {
                        orderedItems.splice(j, 1); // remove return item from ordered items list if only 1
                    }
                    console.log('return started');
                }
            }
        }
        console.log(orderedItems);
        console.log(returningItems);
    }
    localStorage.setItem('orderedItems', JSON.stringify(orderedItems));
    location.reload();
}


