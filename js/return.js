var orderedItems = JSON.parse(localStorage.getItem("orderedItems"));
var ordersTable = document.getElementById("ordered-items");
var rows = Array.from(ordersTable.childNodes);
rows.splice(0,1);
var returnItems = new Array();

var products;

for (let i = 0; i < rows.length; i++) {
    let row = rows[i];
    let children = Array.from(row.childNodes);
    let checkbox = children[0];
    let name = children[1];
    if (checkbox.checked == "true") {
        returnItems.push(products[name]); //add product object to return items array
        for (let j = 0; j < orderedItems.length; j++) {
            let item = orderedItems[j];
            if (item.name == name) {
                orderedItems.splice(j, 1); //remove return item from ordered items
            }
        }
    }
}
console.log(returnItems);

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
