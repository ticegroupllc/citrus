// /* app.js */


const cartItem = 
	{
	  id: 0,
	  name: "",
	  price: 0,
	  instock: 0,
	  description:
		"",
	  imgSrc: "",
	  family: "",
	  quantity:0
	}

	//define a global variable to store product data in
	var productItemArray = []
	var cart = []
	var data = []
	
$.getJSON('GetData', {userName : name}, function(data) {
		$('#ajaxGetUserServletResponse').text(data) //.html(data)
        for (i=0;i<data.products.length;i++){
			productItemArray[i] = {
				id: 0,
				name: "",
				price: 0,
				instock: 0,
				description:"",
				imgSrc: "",
				family: ""
			}
		}
		for (i=0;i<data.products.length;i++){
			productItemArray[i].description = data.products[i].DESCRIPTION;
			productItemArray[i].family = data.products[i].FAMILY;
			productItemArray[i].name = data.products[i].NAME;
			productItemArray[i].price = data.products[i].PRICE;
			productItemArray[i].instock= data.products[i].QUANTITYINSTOCK;
			productItemArray[i].id = data.products[i].id;
			productItemArray[i].imgSrc = data.products[i].IMGSRC;
		}
		renderProducts()
		setClickableItems()
	});	
	


if (document.readyState == 'loading'){
	var name = "Dave";
	document.addEventListener('DOMContentLoaded', ready)
	console.log('page not ready')
	
}else{
	ready()
	console.log('page ready')
}

function ready(){
	renderProducts()
	setClickableItems()
	populateCart()
}

function quantityChanged(event){
	var input = event.target
	if(isNaN(input.value) || input.value <= 0){
		input.value = 1
	}
	updateCartTotal()
}

function setClickableItems(){
	var addCartItemButtons = document.getElementsByClassName( "cart-btn")
	console.log(addCartItemButtons)
	for (var i = 0; i < addCartItemButtons.length; i++){
		var button = addCartItemButtons[i]
		button.addEventListener('click', addCartItem )
		
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

	var imageClicked = document.getElementsByClassName('product-image')
	for (var i = 0; i < imageClicked.length; i++){
		var singleProduct = imageClicked[i]
		singleProduct.addEventListener('click', setSingleProduct)
	}
}

function addCartItem(event){
	var newCartItem = {
		id: "",
		name: "",
		price: 0,
		instock: "",
		description:"",
		imgSrc: "",
		family: "",
		quantity:0
	  }
	console.log('clicked')
	var buttonClicked = event.target
	var name = buttonClicked.parentElement.parentElement.getElementsByTagName("h3")[0].innerHTML
	newCartItem.name = name
	console.log("name = '" + name + "'" )
	
	for(i = 0; i < products.length;i++){
		console.log("product.name = '" + productItemArray[i].name +"'")
		if (newCartItem.name === productItemArray[i].name ){
			newCartItem.id = productItemArray[i].id;
			newCartItem.price = productItemArray[i].price;
			newCartItem.instock = productItemArray[i].instock;
			newCartItem.description = productItemArray[i].description;
			newCartItem.imgSrc = productItemArray[i].imgSrc;
			newCartItem.family = productItemArray[i].family;
			
		}
	}
	console.log(newCartItem)
	
		for(i = 0; i< products.length; i++){
			if (cart[i].name === newCartItem.name){
				console.log("item matched at " + i)
				//changeNumberOfUnits("plus", id);
				cart[i].quantity = cart[i].quantity + 1
				i = products.length + 1
			} else {
				if (cart[i].name === ""){
					console.log("item added at " + i)
					newCartItem.quantity = 1
					cart[i] = newCartItem
					i = products.length + 1
				}
			}
		}
	console.log("Cart Contents:")
	console.log(cart)
	cartStorage();
}
		
function cartStorage() {
	
	// save cart to local storage
	localStorage.setItem("CART", JSON.stringify(cart));
	//sessionStorage.setItem("CART", JSON.stringify(cart));
	console.log("Local Storage = ")
	console.log(localStorage.getItem("CART").length)
}


// // render cart items
function renderProducts() {
	console.log("rendering products");
	
	var stringHTML = ""
	for(i = 0; i< productItemArray.length; i++){
		console.log(productItemArray[i] );
		stringHTML += `
		<div class="col-lg-4 col-md-6 text-center ${productItemArray[i].name}">
			<div class="single-product-item">
				<div class="product-image">
					<a href="single-product.html"><img src="${productItemArray[i].imgSrc}" alt="${productItemArray[i].name}"></a>
				</div>
				<h3>${productItemArray[i].name}</h3>
				<p class="product-price"><span>Per Kg</span> ${productItemArray[i].price} </p>
				<a class="cart-btn"><i class="fas fa-shopping-cart"></i> Add to Cart</a>
			</div>
		</div>`;
						
	};
	

	//document.getElementById('mycontainer').innerHTML = stringHTML
	var elementToReplace = document.getElementsByClassName('row product-lists')
	elementToReplace[0].innerHTML = stringHTML
	//console.log( stringHTML)
	setClickableItems()
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

  function populateCart(){
	for (i = 0; i<products.length;i++){
		cart.push(cartItem)
	}
	//console.log("cart before addition")
	//console.log(cart)
  }

  function setSingleProduct(event){
	var input = event.target
	localStorage.setItem("single-product", JSON.stringify(input.parentElement.parentElement.parentElement.getElementsByTagName("h3")[0].innerHTML))
	
  }
  
  
  // Define recursive function to print nested values
function printValues(obj) {
    for(var k in obj) {
        if(obj[k] instanceof Object) {
            printValues(obj[k]);
        } else {
            document.write(obj[k] + "<br>");
        };
    }
};