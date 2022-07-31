var orderedItems = JSON.parse(localStorage.getItem("orderedItems"));
var ordersTable = document.getElementById("ordered-items");
var rows = Array.from(ordersTable.children());
var returnItems = new Array();

var products;

for (let row in rows) {
    let children = row.childNodes();
    let checkbox = children[0];
    let name = children[1];
    if (checkbox.checked == "true") {
        returnItems.push(products[name]); //add product object to return items array
        for (let i = 0; i < orderedItems.length; i++) { //remove return item from ordered items
            let item = orderedItems[i];
            if (item.name == name) {
                orderedItems.splice(i, 1);
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
