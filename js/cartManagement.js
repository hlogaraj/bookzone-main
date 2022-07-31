var request;
var products;

var cartItems = new Array();


if (localStorage.getItem("cart items") != null) {
    try {
        cartItems = JSON.parse(localStorage.getItem("cart items"));
        console.log("cart items found");
        console.log(cartItems);
    }
    catch (err) {
        console.log(err);
    }
}
var productListings = document.getElementsByClassName("product-listing");
for (let i = 0; i < productListings.length; i++) {
    productListings[i].addEventListener("click", function (e) { addToCart(productListings[i]) });
}

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
request.send();

function addToCart(listing) {
    let name = listing.id;
    let existing = false;
    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].name == name) { //adding to existing quantity
            let newQuantity = cartItems[i].quantity + 1;
            cartItems[i].quantity = newQuantity;
            existing = true;
        }
    }

    if (!existing) { //creating new slot in cart items
        let productInfo = products[name];
        let itemPrice = productInfo.price;
        let item = {
            name: name,
            quantity: 1,
            price: itemPrice,
            info: productInfo
        }
        cartItems.push(item);
    }
    localStorage.setItem("cart items", JSON.stringify(cartItems)); //save JSON string to local storage
    console.log(cartItems);
}

