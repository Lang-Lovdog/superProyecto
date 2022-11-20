let user = JSON.parse(sessionStorage.user || null)
const navbar = document.querySelector('.navbar')

window.addEventListener('scroll', () => {
  if(scrollY >= 180){
    console.log('scroll', scrollY);
    navbar.classList.add('bg')
  }else{
    console.log('nada');
    navbar.classList.remove('bg')
  }
})

const createNavbar = () => {
    navbar.innerHTML +=
    `
      <ul class="links-container">
        <li class="link-item">
          <a href="#" class="link active">home</a>
        </li>
        <li class="link-item">
          <a href="#" class="link">Product</a>
        </li>
        <li class="link-item">
          <a href="#" class="link">about</a>
        </li>
        <li class="link-item">
          <a href="#" class="link">contact</a>
        </li>
      </ul> 
    `
  if(user){
    navbar.innerHTML += user.seller?
    ` <ul class="links-container">
        <li class="link-item">
          <a class="link" href="/dashboard">Dashboard</a>
         </li>
      </ul>`:
    ` <ul class="links-container">
        <li class="link-item">
          <a class="link" href="/seller">Seller</a>
       </li>
      </ul>`
  }

  navbar.innerHTML +=
    ` 
      <div class="user-interactions">
        <div class="search-box">
          <input class="search" type="text" placeholder="search item">
          <button class="search-btn">
            <img class="cart-icon" src="../img/search.png" alt="">
          </button>
        </div>
        <div class="cart" onclick="location.href = '/cart'">
          <img class="cart-icon" src="../img/cart.png">
          <span class="cart-item-conut">00</span>
        </div>
        <div class="user">
          <img class="user-icon" src="../img/user 2.png">
          <div class="user-icon-popup">
            <p>Login to your account</p>
            <a href="/login" >Login</a>
          </div>
        </div>
      </div>
    `
}

createNavbar()

// user icon popup
// We get the elements
let userIcon = document.querySelector('.user-icon')
let userPopupIcon = document.querySelector('.user-icon-popup')

userIcon.addEventListener('click', () => {
  userPopupIcon.classList.toggle('active')
})

let text = userPopupIcon.querySelector('p')
let actionBtn = userPopupIcon.querySelector('a')

if(user != null){
  text.innerHTML = `log in as, ${user.name}`
  actionBtn.innerHTML=`Logout`
  actionBtn.addEventListener('click',() => {
    logout()
  })
}else{
  text.innerHTML=`log in to your account`
  actionBtn.innerHTML = `Login`
  actionBtn.addEventListener('click', () => {
    location.href('/login')
  })
}

const logout = () => {
  sessionStorage.clear()
  location.reload()
}
