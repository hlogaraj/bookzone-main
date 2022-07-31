var shoppers = new Array();
var shopperInfo = new Object();
var editButton = document.getElementById("edit-billing-button");
var saveButton = document.getElementById("update-billing-button");

var firstNameField = document.getElementById("first-name");
var lastNameField = document.getElementById("last-name");
var streetAddressField = document.getElementById("street-address");
var cityField = document.getElementById("city");
var stateField = document.getElementById("state");
var zipCodeField = document.getElementById("zip-code");
var emailField = document.getElementById("email");
var phoneNumberField = document.getElementById("phone-number");
var textConsent = document.getElementById("texts");

editButton.addEventListener("click", enableForm);
saveButton.addEventListener("click", updateBilling)

if (localStorage.getItem("shoppers") != null) {
    shoppers = JSON.parse(localStorage.getItem("shoppers"));
} else {
    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
    } else {
        request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    request.open('GET', 'js/shoppers.json');
    request.onreadystatechange = function () {
        if ((request.status === 200) && (request.readyState === 4)) {
            let json = JSON.parse(request.responseText);
            shoppers = json[0];
            localStorage.setItem('shoppers', JSON.stringify(shoppers)); //save JSON string to local storage
            console.log("Shoppers loaded externally");
            console.log(shoppers);
        }
    }
}

function enableForm(e) {;
    let fields = document.querySelectorAll(input);
    for (let i = 0; i < fields.length; i++) { //unlock fields
        if (fields[i].disabled == "true") {
            fields[i].disabled = "false";
        }
    }
    editButton.style.display = "none";
    saveButton.style.display = "block";
}

function disableForm() {;
    let fields = document.querySelectorAll(input);
    for (let i = 0; i < fields.length; i++) { //lock fields
        if (fields[i].disabled == "false") {
            fields[i].disabled = "true";
        }
    }
    editButton.style.display = "block";
    saveButton.style.display = "none";
}

function updateBilling(e) {
    if (validateShopper == true) {
        updateToJSON(shopperInfo); //save new info to JSON string
        disableForm();
    }
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

function updateToJSON(shopperInfo) { //takes care of storing values of the input fields into a JSON object passed as an argument
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
    shoppers[email] = shopperInfo;
    localStorage.setItem("shoppers", JSON.stringify(shoppers));
    console.log("billing updated");
}

function validateShopper() {
	let valid = true;

	valid = valid && validateName(firstNameField);
	valid = valid && validateName(lastNameField);
	valid = valid && validateName(cityField);
	valid = valid && validateStreetAddress();
	valid = valid && validateDropDown(stateField);
	valid = valid && validateZipCode();
	valid = valid && validatePhoneNumber();
	flagName(firstNameField);
	flagName(lastNameField);
	flagName(cityField);
	flagStreetAddress();
	flagDropDown(stateField);
	flagZipCode();
	flagPhoneNumber();

    return valid;
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