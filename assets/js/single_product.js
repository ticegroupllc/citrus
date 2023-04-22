// /* app.js */


var productItem = 
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
	
	let singleProduct =  JSON.parse(localStorage.getItem("single-product")) || [];
    getProductInfo(singleProduct);

if (document.readyState == 'loading'){
	document.addEventListener('DOMContentLoaded', ready)
	console.log('page not ready')
	//renderProducts()//this has to be placed here for the tiles to render correctly
}else{
	ready()
	console.log('page ready')
}

function ready(){
	renderProducts()
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
		singleProduct.addEventListener('click', setSingleProduct(singleProduct))
	}
	


	//populateCart()

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
	//console.log('clicked')
	var buttonClicked = event.target
	var name = buttonClicked.parentElement.parentElement.getElementsByTagName("h3")[0].innerHTML
	newCartItem.name = name
	//console.log("name = '" + name + "'" )
	for(i = 0; i < products.length;i++){
		//console.log("product.name = '" + products[i].name +"'")
		if (newCartItem.name === products[i].name ){
			newCartItem.id = products[i].id;
			newCartItem.price = products[i].price;
			newCartItem.instock = products[i].instock;
			newCartItem.description = products[i].description;
			newCartItem.imgSrc = products[i].imgSrc;
			newCartItem.family = products[i].family;
			
		}
	}
	//console.log(newCartItem)
	
		for(i = 0; i< products.length; i++){
			if (cart[i].name === newCartItem.name){
				//console.log("item matched at " + i)
				//changeNumberOfUnits("plus", id);
				cart[i].quantity = cart[i].quantity + 1
				i = products.length + 1
			} else {
				if (cart[i].name === ""){
					//console.log("item added at " + i)
					newCartItem.quantity = 1
					cart[i] = newCartItem
					i = products.length + 1
				}
			}
		}
	//console.log("Cart Contents:")
	//console.log(cart)
	cartStorage();
}

// // render cart items
function renderProducts() {
	
	var stringHTML = ""
	
		
		stringHTML = `
        <div class="container">
			<div class="row">
				<div class="col-md-5">
					<div class="single-product-img">
						<img src="${productItem.imgSrc}" alt="">
					</div>
				</div>
				<div class="col-md-7">
					<div class="single-product-content">
		<h3>${productItem.name}</h3>
						<p class="single-product-pricing"><span>Per Kg</span> ${productItem.price}</p>
						<p>${productItem.description}</p>
						<div class="single-product-form">
							<form action="index.html">
								<input type="number" placeholder="0">
							</form>
							<a href="cart.html" class="cart-btn"><i class="fas fa-shopping-cart"></i> Add to Cart</a>
							<p><strong>Categories: </strong>${productItem.family}</p>
						</div>
						<h4>Share:</h4>
						<ul class="product-share">
							<li><a href=""><i class="fab fa-facebook-f"></i></a></li>
							<li><a href=""><i class="fab fa-twitter"></i></a></li>
							<li><a href=""><i class="fab fa-google-plus-g"></i></a></li>
							<li><a href=""><i class="fab fa-linkedin"></i></a></li>
						</ul>
                        </div>
				</div>
			</div>
		</div>
						`;
	
	console.log("before")
    console.log(document.getElementsByClassName("single-product mt-150 mb-150")[0].innerHTML)
    document.getElementsByClassName("single-product mt-150 mb-150")[0].innerHTML = ""
	document.getElementsByClassName("single-product mt-150 mb-150")[0].innerHTML = stringHTML
    console.log("after")
    console.log(document.getElementsByClassName("single-product mt-150 mb-150")[0].innerHTML)
	
}

function setSingleProduct(singleProduct){
	
	localStorage.setItem("single-product", JSON.stringify(singleProduct.innerHTML));	
  }

  function getProductInfo(singleProduct){
    productItem.name = singleProduct
    for(i = 0; i < products.length;i++){
		//console.log("product.name = '" + products[i].name +"'")
		if (productItem.name === products[i].name ){
			productItem.id = products[i].id;
			productItem.price = products[i].price;
			productItem.instock = products[i].instock;
			productItem.description = products[i].description;
			productItem.imgSrc = products[i].imgSrc;
			productItem.family = products[i].family;
			
		}
	}
	
  }