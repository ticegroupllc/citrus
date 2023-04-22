let cart =  JSON.parse(localStorage.getItem("CART")) || [];



if (document.readyState == 'loading'){
	document.addEventListener('DOMContentLoaded', ready)
	console.log('page not ready')
}else{
	ready()
	console.log('page ready')
}

function ready(){
	var placeOrderButtons = document.getElementById("placeorderbutton");
	console.log("placeOrderButtons")
	for (var i = 0; i < placeOrderButtons; i++){
		var button = placeOrderButtons[i]
		button.addEventListener('click', placeOrder )
	}
	
	
	
	renderCartItems()

}

renderCartItems()

function placeOrder(event){
	console.log("Place order button clicked")
}

 

// render cart items
function renderCartItems() {
	var cartString = "";
	var subTotal =0;
	var shipping=0;
	var total = 0;
	var quantity =0;
	var price = 0;
	for(i =0; i<cart.length;i++){
		console.log(cart[i])
		if (cart[i].quantity >=1){
			quantity = quantity + Number(cart[i].quantity);
			subTotal = subTotal + Number(cart[i].price);
			cartString += `<tr>
									<td>${cart[i].name}</td>
									<td>${cart[i].price * cart[i].quantity}</td>
								</tr>`
		}
	}
	
	orderDetailsString =
		`<tr>
			<td>Product</td>
			<td>Total</td>
			</tr>` + cartString ;

	document.getElementById("tablebodyorderdetails").innerHTML = orderDetailsString
	
	shipping = 15.00*Number(quantity);
	total = Number(shipping) + Number(subTotal);
	
	checkoutDetailsString =
		`<tr>
			<td>Subtotal</td>
			<td>${`$`+ subTotal.toFixed(2)}</td>
		</tr>
		<tr>
			<td>Shipping</td>
			<td>${shipping.toFixed(2)}</td>
		</tr>
		<tr>
			<td>Total</td>
			<td>${total.toFixed(2)}</td>
		</tr>`;
		document.getElementById("tablebodycheckoutdetails").innerHTML = checkoutDetailsString
		console.log(quantity)
		
}





