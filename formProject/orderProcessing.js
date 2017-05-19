/*
 * 1. Break out options, Options Total:
 * 2. Size, shipping, sales tax, Total Cost button
 * 3. Reset button moved down, still works
 */

function w3_open() {
    document.getElementById("mySidebar").style.width = "100%";
    document.getElementById("mySidebar").style.display = "block";
}
function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
}

function get_data(orderForm) {
	var order_data = "This Order is ...\n";
	var items = ["Pizza Slice", "Churro", "Hot Dog & Soda", "Chicken Bake", "Chicken Caesar Salad", "Whole Pizza", "Shipping Method"];

	for ( i = 0; i < orderForm.line.length; i++) {
		if (orderForm.line[i].value == "")
			orderForm.line[i].value = "0";
		order_data += "Item = " + items[i] + ", Qty = " + orderForm.line[i].value + ", Price = " + accounting.formatMoney(orderForm.line_sum[i].value) + "\n";
	}
	if (orderForm.options_total.value == "") {
		orderForm.options_total.value = "Nothing yet";
	}
	order_data += "Total Order value = " + orderForm.options_total.value;
	document.confirmationForm.order.value = order_data;
}

function setShipper() {
	// find the drop-down choice input
	var shipDropDown = document.getElementById("selectShipper");
	var displayShipper = document.getElementById("previewShipper");
	var price;

	if (shipDropDown.options[shipDropDown.selectedIndex].text == "USPS") {
		price = parseFloat(20.95);
		displayShipper.value = "USPS - $20.95";
		
		document.orderForm.finalShip.value = accounting.formatMoney(price);
		
	} else if (shipDropDown.options[shipDropDown.selectedIndex].text == "UPS") {
		price = parseFloat(24.95);
		displayShipper.value = "UPS - $24.95";
		
		document.orderForm.finalShip.value = accounting.formatMoney(price);
		
	} else if (shipDropDown.options[shipDropDown.selectedIndex].text == "FedEx") {
		price = parseFloat(29.95);
		displayShipper.value = "FedEx - $29.95";
		
		document.orderForm.finalShip.value = accounting.formatMoney(price);
		
	} else {
		price = parseFloat(0.00);
		displayShipper.value = "Pick Up - $0.00";
		
		document.orderForm.finalShip.value = accounting.formatMoney(price);
		
	}
	
}

var optionsCost;
var shippingCost;
var sizeCost;
var salesTax;
var finalCost;

function calculateTotal() {
	
	finalCost = 0.00;
	
	optionsCost = orderForm.options_total.value;
	alert("Options Total is " + optionsCost);
	
	shippingCost = orderForm.lineShip.value;
	alert("Shipping Total is " + shippingCost);
	
	sizeCost = orderForm.lineSize.value;
	alert("sizeCost is" + sizeCost);
	
	finalCost = accounting.unformat(optionsCost) + accounting.unformat(shippingCost);
	// to be completed*/
}

function setSize(size) {
	var price = 0.0;
	document.getElementById("mySize").value = size;
	
	if (size == "Extra Small") {
		price = 4.95;
		document.getElementById("lineSize").value = accounting.formatMoney(price);
	} else if (size == "Small") {
		price = 9.95;
		document.getElementById("lineSize").value = accounting.formatMoney(price);
	} else if (size == "Medium") {
		price = 14.95;
		document.getElementById("lineSize").value = accounting.formatMoney(price);
	} else if (size == "Large") {
		price = 19.95;
		document.getElementById("lineSize").value = accounting.formatMoney(price);
	} else if (size == "Extra Large") {
		price = 24.95;
		document.getElementById("lineSize").value = accounting.formatMoney(price);
	} else {
		document.getElementById("lineSize").value = "error";
	}
}

function count(orderForm, lineNumber, itemCost) {
	// orderForm.line_sum[lineNumber].value = accounting.formatMoney(orderForm.line[lineNumber].value * itemCost);
	orderForm.line_sum[lineNumber].value = orderForm.line[lineNumber].value * itemCost;

	var optionsTotal = 0;
	for ( i = 0; i < orderForm.line_sum.length; i++) {
		// accounting.unformat(orderForm.line_sum[lineNumber].value);
		optionsTotal += Math.ceil(orderForm.line_sum[i].value * 1000) / 1000;
		// optionsTotal +
	
}

/*
 * 	optionsCost = orderForm.options_total.value;
	alert("Options Total is " + optionsCost);
	/*
	shippingCost = orderForm.lineShip.value;
	sizeCost = 0.00;
	// to be completed!
	
	finalCost = accounting.unformat(optionsCost) + accounting.unformat(shippingCost);
 */

	optionsTotal = Math.round(optionsTotal * 1000) / 1000;
	orderForm.options_total.value = accounting.formatMoney(optionsTotal);
	// orderForm.line_sum[lineNumber].value = accounting.formatMoney(orderForm.line[lineNumber].value * itemCost);
}

function init() {
	document.orderForm.reset();
	document.orderForm.line[0].select();
	document.orderForm.line[0].focus();
	document.confirmationForm.order.value = "";
}

window.onload = init;
