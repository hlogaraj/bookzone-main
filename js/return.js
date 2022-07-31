var ordersTable = document.getElementById("ordered-items");
var rows = Array.from(ordersTable.children());
var returnItems = new Array();

var products;

for (let row in rows) {
    let children = row.childNodes();
    let checkbox = children[0];
    let name = children[1];
    if (checkbox.checked == "true") {
        returnItems.push(products[name]);
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
