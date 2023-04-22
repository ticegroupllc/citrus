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