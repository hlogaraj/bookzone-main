var startCheckout = document.getElementById("start-checkout-button");
var finishCheckout = document.getElementById("finish-checkout-button");
var cartItems = JSON.parse(localStorage.getItem("cartItems"));

var firstNameField = document.getElementById("first-name");
var lastNameField = document.getElementById("last-name");
var streetAddressField = document.getElementById("street-address");
var cityField = document.getElementById("city");
var stateField = document.getElementById("state");
var zipCodeField = document.getElementById("zip-code");
var emailField = document.getElementById("email");
var phoneNumberField = document.getElementById("phone-number");
var shippingCarrierField = document.getElementById("carrier");
var shippingMethodField = document.getElementById("shipping-method");

var request;
var shippingInfo = new Object();

firstNameField.addEventListener("click", function () { hideError(firstNameField); });
lastNameField.addEventListener("click", function () { hideError(lastNameField); });
streetAddressField.addEventListener("click", function () { hideError(streetAddressField); });
cityField.addEventListener("click", function () { hideError(cityField); });
stateField.addEventListener("click", function () { hideError(stateField); });
zipCodeField.addEventListener("click", function () { hideError(zipCodeField); });
emailField.addEventListener("click", function () { hideError(emailField); });
phoneNumberField.addEventListener("click", function () { hideError(phoneNumberField); });
shippingCarrierField.addEventListener("click", function () { hideError(shippingCarrierField) });
shippingMethodField.addEventListener("click", function () { hideError(shippingMethodField) });

startCheckout.addEventListener("click", revealCheckout);
finishCheckout.addEventListener("click", validateShippingInfo);

function shippingToJSON(shippingInfo) { //takes care of storing values of the input fields into a JSON object passed as an argument
	var firstName = firstNameField.value;
	var lastName = lastNameField.value;
	var streetAddress = streetAddressField.value;
	var city = cityField.value;
	var state = stateField.value;
	var zipCode = zipCodeField.value;
	var email = emailField.value;
	var phone = phoneNumberField.value;
	var carrier = shippingCarrierField.value;
	var method = shippingMethodField.value;

	shippingInfo = {
		"firstName": firstName,
		"lastName": lastName,
		"streetAddress": streetAddress,
		"city": city,
		"state": state,
		"ZIP": zipCode,
		"email": email,
		"phoneNumber": phone,
		"shippingCarrier": carrier,
		"shippingMethod": method,
	}

	localStorage.setItem('shippingInfo', JSON.stringify(shippingInfo)); //save JSON string to local storage
	firstNameField.value = "";
	lastNameField.value = "";
	streetAddressField.value = "";
	cityField.value = "";
	stateField.value = "";
	zipCodeField.value = "";
	emailField.value = "";
	phoneNumberField.value = "";
	shippingCarrierField.value = "none";
	shippingMethodField.value = "none";
	return shippingInfo;
}

function orderToJSON(cartItems) {
	localStorage.setItem('orderedItems', JSON.stringify(cartItems)); //save ordered items as JSON string
	localStorage.removeItem('cartItems'); //empty the cart
}
function validateShippingInfo(e) {
	let valid = true;

	valid = valid && validateName(firstNameField);
	valid = valid && validateName(lastNameField);
	valid = valid && validateName(cityField);
	valid = valid && validateStreetAddress();
	valid = valid && validateDropDown(stateField);
	valid = valid && validateZipCode();
	valid = valid && validateEmail();
	valid = valid && validatePhoneNumber();
	valid = valid && validateDropDown(shippingCarrierField);
	valid = valid && validateDropDown(shippingMethodField);

	flagName(firstNameField);
	flagName(lastNameField);
	flagName(cityField);
	flagStreetAddress();
	flagDropDown(stateField);
	flagZipCode();
	flagEmail();
	flagPhoneNumber();
	flagDropDown(shippingCarrierField);
	flagDropDown(shippingMethodField);

	if (!valid) {
		e.preventDefault();
	} else {
		shippingInfo = shippingToJSON(shippingInfo); //after inputs are confirmed valid, executes function to store values into JSON objct
		orderToJSON(cartItems); //save cart items as ordered items JSON string
		console.log("Shipping Info Received");
		console.log(shippingInfo); //used to check successful storage of inputs
		location.reload();
	}
}

function revealCheckout(e) {
	document.getElementById("checkout-form").classList.remove("hidden");
}

function validateName(target) {
	return /^[a-zA-Z\-\.\s]+$/.test(target.value);
}

function flagName(target) {
	if (!validateName(target)) {
		showError(target);
	}
}

function validateStreetAddress() {
	return /^\d+\s[A-z]+\s[A-z]+/.test(streetAddressField.value);
}

function flagStreetAddress() {
	if (!validateStreetAddress()) {
		showError(streetAddressField);
	}
}

function validateDropDown(field) {
	return (field.value != "none");
}

function flagDropDown(field) {
	if (!validateDropDown(field)) {
		showError(field);
	}
}

function validateZipCode() {
	return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipCodeField.value);
}

function flagZipCode() {
	if (!validateZipCode()) {
		showError(zipCodeField);
	}
}

function validateEmail() {
	return emailField.value.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

function flagEmail() {
	if (!validateEmail()) {
		showError(emailField);
	}
}

function validatePhoneNumber() {
	return ((phoneNumberField.value.length == 10 && /^\d+$/.test(phoneNumberField.value)));
}

function flagPhoneNumber() {
	if (!validatePhoneNumber()) {
		showError(phoneNumberField);
	}
}

function showError(element) {
	element.parentNode.getElementsByClassName("error")[0].classList.remove("hidden");
}

function hideError(element) {
	element.parentNode.getElementsByClassName("error")[0].classList.add("hidden");
}