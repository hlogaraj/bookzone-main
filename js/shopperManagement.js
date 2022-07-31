var submitUser = document.getElementById("submit-shopper-button");

var firstNameField = document.getElementById("first-name");
var lastNameField = document.getElementById("last-name");
var streetAddressField = document.getElementById("street-address");
var cityField = document.getElementById("city");
var stateField = document.getElementById("state");
var zipCodeField = document.getElementById("zip-code");
var emailField = document.getElementById("email");
var phoneNumberField = document.getElementById("phone-number");
var textConsent = document.getElementById("texts");

var request;
var shopperInfo = new Object();
var shoppers = new Array();

if (window.XMLHttpRequest) {
	request = new XMLHttpRequest();
} else {
	request = new ActiveXObject("Microsoft.XMLHTTP");
}

if (localStorage.getItem('shoppers') != null) {
	shoppers = JSON.parse(localStorage.getItem('shoppers'));
	console.log("Shoppers loaded locally");
	console.log(shoppers);
} else {
	request.open('GET', 'js/shoppers.json'); //get and parse product objects from products.json
	request.onreadystatechange = function () {
		if ((request.status === 200) && (request.readyState === 4)) {
			let json = JSON.parse(request.responseText);
			shoppers = json;
			localStorage.setItem('shoppers', JSON.stringify(shoppers)); //save copy of JSON string to local storage so it's handy for future access
			console.log("Shoppers loaded externally");
			console.log(shoppers);
		}
	}
	request.send();
}


firstNameField.addEventListener("click", function () { hideError(firstNameField); });
lastNameField.addEventListener("click", function () { hideError(lastNameField); });
streetAddressField.addEventListener("click", function () { hideError(streetAddressField); });
cityField.addEventListener("click", function () { hideError(cityField); });
stateField.addEventListener("click", function () { hideError(stateField); });
zipCodeField.addEventListener("click", function () { hideError(zipCodeField); });
emailField.addEventListener("click", function () { hideError(emailField); });
phoneNumberField.addEventListener("click", function () { hideError(phoneNumberField); });
submitUser.addEventListener("click", validateShopper);

function shopperToJSON(shopperInfo) { //takes care of storing values of the input fields into a JSON object passed as an argument
	var firstName = firstNameField.value;
	var lastName = lastNameField.value;
	var streetAddress = streetAddressField.value;
	var city = cityField.value;
	var state = stateField.value;
	var zipCode = zipCodeField.value;
	var email = emailField.value;
	var phone = phoneNumberField.value;
	var texts = textConsent.checked;
	shopperInfo = {
		"firstName": firstName,
		"lastName": lastName,
		"streetAddress": streetAddress,
		"city": city,
		"state": state,
		"ZIP": zipCode,
		"email": email,
		"phoneNumber": phone,
		"textConsent": texts
	}

	for (let i = 0; i < 1; i++) {
		var matchFound = false;
		for (let i = 0; i < shoppers.length; i++) {
			let shopper = shoppers[i];
			if (Object.keys(shopper)[0] == email) {
				console.log("Email already used");
				matchFound = true;
			}
		}
		if (!matchFound) {
			let shopper = {};
			shopper[email] = shopperInfo;
			console.log(shoppers);
			shoppers.push(shopper);
			localStorage.setItem('shoppers', JSON.stringify(shoppers)); //save JSON string to local storage
			console.log("New shopper saved");
			firstNameField.value = "";
			lastNameField.value = "";
			streetAddressField.value = "";
			cityField.value = "";
			stateField.value = "";
			zipCodeField.value = "";
			emailField.value = "";
			phoneNumberField.value = "";
			textConsent.checked = false;
			console.log(shoppers);
		}
	}

}

function validateShopper(e) {
	let valid = true;

	valid = valid && validateName(firstNameField);
	valid = valid && validateName(lastNameField);
	valid = valid && validateName(cityField);
	valid = valid && validateStreetAddress();
	valid = valid && validateDropDown(stateField);
	valid = valid && validateZipCode();
	valid = valid && validateEmail();
	valid = valid && validatePhoneNumber();
	flagName(firstNameField);
	flagName(lastNameField);
	flagName(cityField);
	flagStreetAddress();
	flagDropDown(stateField);
	flagZipCode();
	flagEmail();
	flagPhoneNumber();

	if (!valid) {
		e.preventDefault();
	} else {
		userInfo = shopperToJSON(shopperInfo); //after inputs are confirmed valid, executes function to store values into JSON objct
		console.log(shopperInfo); //used to check successful storage of inputs
		return valid;
	}
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
	return (phoneNumberField.value.length == 0 || (phoneNumberField.value.length == 10 && /^\d+$/.test(phoneNumberField.value)));
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