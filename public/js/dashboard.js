if(user === null){
  location.replace('/login')
}else if(!user.seller){
  location.replace('/seller')
}

let greeting = document.querySelector('#sellet-greeting')
greeting.innerHTML += user.name

let loader = document.querySelector('.loader')
let noProductImg = document.querySelector('.no-product')

loader.style.display='block'
const setupProducts = () => {
  fetch('/get-products',{
    method: 'post',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      email: user.email
    })
  }).then(res=>res.json()).then(data=>{
    loader.style.display='none'
    if(data=== 'no products'){
      noProductImg.style.display='block'
    }else{
      data.forEach(element => {
        createProduct(product)
      });
    }
  })
}

setupProducts()
