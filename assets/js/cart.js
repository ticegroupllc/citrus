/**
 * 
 */



if (document.readyState == 'loading'){
	document.addEventListener('DOMContentLoaded', ready)
	console.log('page not ready')
}else{
	ready()
	console.log('page ready')
}

function ready(){
	
	updateCartTotal()
	importCartItemsFromStorage()
	
	var removeCartItemButtons = document.getElementsByClassName( "far fa-window-close")
	console.log(removeCartItemButtons)
	for (var i = 0; i < removeCartItemButtons.length; i++){
		var button = removeCartItemButtons[i]
		button.addEventListener('click', removeCartItem )
		
	}
	
	var updateCartItemsButton = document.getElementsByClassName( "boxed-btn")
	for (var i = 0; i < updateCartItemsButton.length; i++){
		var updateButton = updateCartItemsButton[i]
		updateButton.addEventListener('click', updateCartTotal)
	}
	
	var quantityInputs = document.getElementsByClassName('product-input-quantity')
	for (var i = 0; i < quantityInputs.length; i++){
		var input = quantityInputs[i]
		input.addEventListener('change', quantityChanged)
	}
	
	var zipCodeInput = document.getElementsByClassName('shipping-input-zipcode')
	for (var i = 0; i < zipCodeInput.length; i++){
		var input = quantityInputs[i]
		console.log(input)
		input.addEventListener('change', getShippingEstimate(input))
	}
	

}

function quantityChanged(event){
	var input = event.target
	if(isNaN(input.value) || input.value <= 0){
		input.value = 1
	}
	updateCartTotal()
}

function removeCartItem(event){
	console.log('clicked')
	var buttonClicked = event.target
	buttonClicked.parentElement.parentElement.parentElement.remove()
	updateCartTotal()
}
		
function updateCartItems(event){
	
	var cartItemContainer = document.getElementsByClassName("cart-table")[0]
	var cartRows = cartItemContainer.getElementsByClassName("table-body-row")
	var cartRowTotal = 0
	for (var i = 0; i < cartRows.length; i++){
		var cartRow = cartRows[i]
		var priceElement = cartRow.getElementsByClassName("product-price")[0]
		var quantityElement = cartRow.getElementsByClassName("product-input-quantity")[0]
		console.log(priceElement, quantityElement)
		var price = parseFloat(priceElement.innerText.replace('$', ''))
		var quantity = quantityElement.value
		console.log(price, quantity)
		console.log(price*quantity)
		cartRowTotal = (Math.round((price*quantity)*100)/100);
		cartRow.getElementsByClassName("product-total")[0].innerText = '$' + cartRowTotal.toFixed(2)
	}	
}

function updateCartTotal(event){
	var cartItemContainer = document.getElementsByClassName("cart-table")[0]
	var cartRows = cartItemContainer.getElementsByClassName("table-body-row")
	var cartTotal = 0
	var cartSubTotal = 0
	var cartRowTotal = 0
	var cartShippingTotal = 15
	for (var i = 0; i < cartRows.length; i++){
		var cartRow = cartRows[i]
		var priceElement = cartRow.getElementsByClassName("product-price")[0]
		var quantityElement = cartRow.getElementsByClassName("product-input-quantity")[0]
		//console.log(priceElement, quantityElement)
		var price = parseFloat(priceElement.innerText.replace('$', ''))
		var quantity = quantityElement.value
		//console.log(price, quantity)
		//console.log(price*quantity)
		cartRowTotal = Math.round((price*quantity)*100)/100;
		cartRow.getElementsByClassName("product-total")[0].innerText = '$' + cartRowTotal.toFixed(2)
		cartSubTotal = cartSubTotal + cartRowTotal
	}
	//console.log(cartItemContainer)
}

// change number of units for an item
function changeNumberOfUnits(action, id) {
	cart = cart.map((item) => {
	  let numberOfUnits = item.numberOfUnits;
  
	  if (item.id === id) {
		if (action === "minus" && numberOfUnits > 1) {
		  numberOfUnits--;
		} else if (action === "plus" && numberOfUnits < item.instock) {
		  numberOfUnits++;
		}
	  }
  
	  return {
		...item,
		numberOfUnits,
	  };
	});
  
	updateCart();
  }

   //update cart
function cartStorage() {
  renderCartItems();
  renderSubtotal();

  // save cart to local storage
  localStorage.setItem("CART", JSON.stringify(cart));
  sessionStorage.setItem("CART", JSON.stringify(cart));
}

// render cart items
function renderCartItems() {
	cartItemsEl.innerHTML = ""; // clear cart element
	cart.forEach((item) => {
		if (item.quantity >= 1){
			cartItemsEl.innerHTML += 
				`<tr class="table-body-row">
										<td class="product-remove"><a href="#"><i class="far fa-window-close"></i></a></td>
										<td class="product-image"><img src="${item.imgSrc}" alt="${item.name}"></td>
										<td class="product-name">${item.name}</td>
										<td class="product-price">${item.price}</td>
										<td class="product-quantity"><input class="product-input-quantity" type="number"  value = "${item.numberOfUnits}"></td>
										<td class="product-total">${item.numberOfUnits * item.price}</td>
									</tr>
									`;
		}
	});
  



	//This section updates the totals at the bottom of the cart
	cartShippingTotal = 15 //TODO:We will update this hard code with a function to retrieve shipping cost based on zipcode
	cartTotal = cartSubTotal + cartShippingTotal
	var cartTotalsTable = document.getElementsByClassName("total-table")[0]
	 
	cartTotalsTable.getElementsByClassName("total-data")[0].cells[1].innerText = '$' + Math.round((cartSubTotal*100)/100)
	cartTotalsTable.getElementsByClassName("total-data")[2].cells[1].innerText = '$' + Math.round((cartShippingTotal*100)/100)
	cartTotalsTable.getElementsByClassName("total-data")[3].cells[1].innerText = '$' + Math.round((cartTotal*100)/100)
	
}

function importCartItemsFromStorage(){
	let cart =  JSON.parse(localStorage.getItem("CART")) || [];
	//let cart2 = JSON.parse(sessionStorage.getItem("CART")) || [];
	console.log("Cart=")
	console.log(cart)
	console.log("Cart size")
	console.log(cart.length)
	var removeCartItem = document.getElementsByClassName( "table-body-row")
	//console.log(removeCartItem)
	for(i =0; i<3;i++){
		removeCartItem[0].remove();
		//removeCartItem[1].remove();
		//removeCartItem[2].remove();
	}
	var cartString = ""
	var productTotal = 0
	for(i =0; i<cart.length;i++){
		if (cart[i].quantity >=1){
			console.log(cart[i].name, cart[i].quantity, cart[i].family);
			productTotal = Math.round(((cart[i].price * cart[i].instock)*100)/100);
			console.log(productTotal.toFixed(2));
			cartString += `<tr class="table-body-row">
			<td class="product-remove"><a href="#"><i class="far fa-window-close"></i></a></td>
			<td class="product-image"><img src="${cart[i].imgSrc}" alt=""></td>
			<td class="product-name">${cart[i].name}</td>
			<td class="product-price">${cart[i].price}</td>
			<td class="product-quantity"><input class="product-input-quantity" type="number"  value = "${ cart[i].quantity}"></td>
			<td class="product-total">${productTotal}</td>
		</tr>`
		}
	}

	console.log(cart)


	document.getElementById("tablebody").innerHTML = cartString
	updateCartTotal()
}

// // this function is only for development purposes
// function setupCart(){
// 	var cartString=[]
// 	products.forEach(function(product){
// 		cartString.push(product)
// 		console.log(product);
// 	})
	
// 	localStorage.setItem("CART", JSON.stringify(cartString));
// 	sessionStorage.setItem("CART", JSON.stringify(cartString));
// }

function getShippingEstimate(input){
	// 'input' refers to JSON Payload
	var data = JSON.stringify(input);
	
	var xhr = new XMLHttpRequest();
	xhr.withCredentials = true;
	
	xhr.addEventListener("readystatechange", function () {
		if (this.readyState === 4) {
		console.log(this.responseText);
		}
	});
	
	xhr.open("POST", "https://apis-sandbox.fedex.com/rate/v1/rates/quotes");
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.setRequestHeader("X-locale", "en_US");
	xhr.setRequestHeader("Authorization", "Bearer ");
	
	xhr.send(data);

}