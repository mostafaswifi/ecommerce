
import products from "../db/data.js";
const str = document.getElementById('container');
let searchBox = document.getElementById('searchBox');
let cartCheckout = document.getElementById('cart-checkout'); 
let totalPrice = document.getElementById('totalPrice');
let perchase = document.getElementById('perchase');
let res=[];
let filterd=[];
let cart = [];
let cartRoducts = [];
let bestSeller = [];;
let result = [];
let productsCount = document.getElementById("productsCount");
let notification = document.getElementById("notification");
let bestSellerSwipper = document.getElementById("bestSellerSwipper");
let closePer = document.getElementById("closePer");
let notFoundMsg = ()=>swal("Product not found!", `Try using another keyword !`, {icon: "info"});
function closePerchase() {

  perchase.classList.remove('checkout-show');
  perchase.style.display = 'none';
}
window.closePerchase = closePerchase
closePer.addEventListener('click',closePerchase)
let notFound = `<div class="card text-center">
  <div class="card-header bg-success">
   <span class="text-white fs-3 fw-bold"> Not found </span><i class="fa-solid fa-triangle-exclamation text-white fs-3 fw-bold"></i>
  </div>
  <div class="card-body">
  <img src="../assets/helpersImgs/6988279.jpg" class="" alt="not found" width="250px" height="250px">
    <h5 class="card-title">No product found!!</h5>
    <p class="card-text">Please try using some other keyword.</p>
    <button class="btn btn-secondary" onClick="window.location.reload()" >Go home</button>
  </div>
  <div class="card-footer text-white bg-success">
   Try again
  </div>
</div>`
productsCount.innerText = cart.length



let  removeDuplicates =(arr) => {
  const uniqueMap = new Map();
  for (const obj of arr) {
    const key = JSON.stringify(obj);
    if (!uniqueMap.has(key)) {
      uniqueMap.set(key, obj);
    }
  }
  return Array.from(uniqueMap.values());
}




var addProductsToCart = () => {
 cart.length == 0 ? cartRoducts = [] : null
  cart.map(prodCart => {

result = products.find(prod => prod.id == prodCart);



cartRoducts = [...cartRoducts, result]


const uniqueArray = removeDuplicates(cartRoducts);

})




console.log(cartRoducts);
let total = 0;
let carts = cartRoducts.map(cr => {
   total += cr.price;
  return `
 
    <tr>
      <th scope="row">${cr.id}</th>
      <td>${cr.name}</td>
      <td>${cr.price}</td>
      <td>${cr.description}</td>
    </tr>


  `

})

totalPrice.innerText = total;
cartCheckout.innerHTML = cart.length == 0 ?  swal("Cart Empty", {icon: "info"}) : carts.join("")

perchase.classList.add("checkout-show")
cartRoducts = []
    // cartRoducts.push(result)

  
}


var addToCart = (id) => {
  if (cart.length == 0) {
    cart.push(id)
    productsCount.innerText = cart.length

    swal("Add successfully to cart!", {icon: "success"});
  } else if (cart.includes(id)) {
    productsCount.innerText = cart.length
swal("Product already in the cart!", `This product already in the cart !`, {icon: "info"});
productsCount.innerText = cart.length
  } else {
    
    cart.push(id)
    productsCount.innerText = cart.length

    swal("Add successfully to cart!", {icon: "success"});
  }
}


var removeFromCart = (id) => {
  if (cart.length == 0) {
    swal("Cart Empty", {icon: "info"});
    productsCount.innerText = cart.length
  } else  {
if (cart.includes(id)) {

  cart.splice(cart.indexOf(id), 1)
  productsCount.innerText = cart.length
  swal("Product removed!", {icon: "success"});

} else {
  productsCount.innerText = cart.length
  swal("Product not in the cart!", `This product not in the cart !`, {icon: "info"});
}
productsCount.innerText = cart.length

  }
}
window.cart = cart;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.addProductsToCart = addProductsToCart;

let showData = products.map(prod => {


  return (
    `
    <div class="card p-4 col-4 col-md-2 col-sm-1 position-relative overflow-hidden" style="min-width: 25rem;" id=${prod.id}c>
   ${prod.offer || prod.dicount? `<div class="position-absolute d-flex flex-column justify-content-center align-items-center text-white p-2" style="transform: rotate(45deg);background-color: rgba(0, 0, 0, 0.2); width: 385px; right: -81px;top: 77px">
    
        ${prod.offer? `<div><i class="fa-solid fa-face-smile-wink fs-5 mx-2" style="transform: rotate(15deg);"></i><span class="text-dark fw-bold">${prod.specialOffer}</span></div>`:'<div></div>'}     
    ${prod.dicount? `<div><i class="fa-solid fa-tags fs-5 mx-2" style="transform: rotate(45deg);"></i>Discount <span class="text-dark fw-bold">${prod.discountRercent}%</span></div>`:'<div></div>'}  
    </div>` : ''}  
   
   
        <p> ${prod.category} </p>
        <p>Brand : <span class="text-info"> ${prod.brand} </span></p>
        <p class="d-block my-2"><span class="text-info"> ${prod.quantity} avaliable</span></p>
        <div class=" img-resizer d-flex justify-content-center align-items-center">
        <img src=${prod.image} class="card-img-top img-size" alt=${prod.description} data-bs-toggle="modal" data-bs-target=#staticBackdrop${prod.id}>
        </div>
        <div class="card-body d-flex flex-column justify-content-between">
            <h5 class="card-title">${prod.name}</h5>
            <p class="card-text">${prod.description}</p>
<div class="d-flex flex-column align-items-center justify-content-between">
<button type="button" class="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target=#staticBackdrop${prod.id}>
 <i class="fa-regular fa-newspaper mx-2"></i> Features
</button>
<!-- Modal -->
<div class="modal fade" data-bs-dismiss="modal" id=staticBackdrop${prod.id} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">${prod.name}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <img src=${prod.image} class="card-img-top" alt=${prod.description}>
             <ul class='d-flex flex-column' id=${prod.id}>
             <h6>features:</h6>
                ${prod.features.map(feature => {
                return `<li>${feature}</li>`
                }).join("")}
            </ul>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick="addToCart(${prod.id})">add to cart</button>
      </div>
    </div>
  </div>
</div>
            <p class="text-success d-block my-3">price: ${prod.price}$</p>
            <div class="d-flex align-items-center justify-content-between w-100">
<button class="btn px-3 fs-4 py-1 btn-success addCart" id=${prod.id}t onclick="addToCart(${prod.id})">+<i class="fa-solid fa-cart-plus mx-2"></i></button> 
              
                <button class="btn px-3 fs-4 py-1 btn-secondary addCart" onclick="removeFromCart(${prod.id})">-<i class="fa-solid fa-trash-can mx-2"></i></button>
            </div>
            <button class="w-100 d-block my-2 btn btn-primary" onClick="addProductsToCart()"><i class="fa-solid fa-cart-arrow-down mx-2"></i>go to cart </button></div>
        </div>
    </div>
`
  )
}).join("")

 

 
window.addEventListener("load", (event) => {
  str.innerHTML = showData
});


searchBox.addEventListener('keyup',(e)=>{
    // e.preventDefault();
    res  = products.filter((prod)=>prod.name.toLowerCase().includes(e.target.value.toLowerCase())
    )
    filterd = res.map( r=> {
      return ` 
      
<div class="card p-4 col-4 col-md-2 col-sm-1" style="width: 25rem;" id=${r.id}c>
        <p> ${r.category} </p>
        <p>Brand : <span class="text-info"> ${r.brand} </span></p>
        <p class="d-block my-2"><span class="text-info"> ${r.quantity} avaliable</span></p>
        <div class=" img-resizer d-flex justify-content-center align-items-center">
        <img src=${r.image} class="card-img-top img-size" alt=${r.description} data-bs-toggle="modal" data-bs-target=#staticBackdrop${r.id}>
        </div>
        <div class="card-body d-flex flex-column justify-content-between">
            <h5 class="card-title">${r.name}</h5>
            <p class="card-text">${r.description}</p>
<div class="d-flex flex-column align-items-center justify-content-between">
<button type="button" class="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target=#staticBackdrop${r.id}>
 <i class="fa-regular fa-newspaper mx-2"></i> Features
</button>
<!-- Modal -->
<div class="modal fade" id=staticBackdrop${r.id} data-bs-dismiss="modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">${r.name}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <img src=${r.image} class="card-img-top" alt=${r.description}>
             <ul class='d-flex flex-column' id=${r.id}>
             <h6>features:</h6>
                ${r.features.map(feature => {
                return `<li>${feature}</li>`
                }).join("")}
            </ul>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick="addToCart(${r.id})">add to cart</button>
      </div>
    </div>
  </div>
</div>
            <p class="text-success d-block my-3">price: ${r.price}$</p>
            <div class="d-flex align-items-center justify-content-between w-100">
<button class="btn px-3 fs-4 py-1 btn-success addCart" id=${r.id}t onclick="addToCart(${r.id})">+<i class="fa-solid fa-cart-plus mx-2"></i></button> 
              
                <button class="btn px-3 fs-4 py-1 btn-secondary addCart" onclick="removeFromCart(${r.id})">-<i class="fa-solid fa-trash-can mx-2"></i></button>
            </div>
            <button class="w-100 d-block my-2 btn btn-primary" onClick="addProductsToCart()"><i class="fa-solid fa-cart-arrow-down mx-2"></i>go to cart </button></div>
        </div>
    </div>
 `
    }).join("")

   filterd.length==0 ? str.innerHTML = notFound : str.innerHTML = filterd
  }
  
  
)

bestSeller = products.filter((prod)=>prod.bestSeller==true
).map((prod)=> {
  return `   <div class="card mb-3 swiper-slide position-relative" style="max-width: 340px;overflow: hidden"  data-bs-toggle="modal" data-bs-target=#staticBackdrop${prod.id}>
 
          <div class="row g-0">
            <div class="col-md-4 d-flex align-items-center justify-content-center">
              <img src=${prod.image} class="img-fluid rounded-start" style="min-width: 150px; height: auto;width: auto" alt=${prod.description}>
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class=" text-primary">${prod.name}</h5>
                <p class="card-text">${prod.description}</p>
            <p class="card-text"><small class="text-body-secondary"><span class="text-info">${prod.quantity} avaliable</span> <span class="text-success">Only</span> ${prod.price}$</small></p>
            <div class="position-absolute d-flex justify-content-center align-items-center text-white p-2" style="transform: rotate(-45deg); top: 45px;background-color: rgba(0, 0, 0, 0.2); width: 300px; left: -90px;top: 30px"><i class="fa-solid fa-crown fs-5 mx-2"></i> Best Seller</div>
              </div>
            </div>
          </div>
        </div>`}).join("");
bestSellerSwipper.innerHTML += bestSeller



