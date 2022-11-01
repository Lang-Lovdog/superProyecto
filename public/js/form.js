window.onload = () => {
  if(sessionStorage.user){
    user = JSON.parse(sessionStorage.user)
    if(user.email){
      location.replace('/')
    }
  }
}

let formBtn = document.querySelector('.submit-btn')
let loader = document.querySelector('.loader')

formBtn.addEventListener('click', () => {
  let fullname = document.querySelector('#name')     || null
  let email    = document.querySelector('#email')    || null
  let password = document.querySelector('#password') || null
  let number   = document.querySelector('#number')   || null
  let tac      = document.querySelector('#tac')      || null

  if(fullname !== null){
    //Quiere decir que estoy en la pagina de registro
  } else {
    //Si si trae correo 
    if(!email.value.length || !password.value.length){
      showFormError('fill all inputs')
    } else {
      loader.style.display = 'block'
      sendData('/login', {
        email:email.value,
        password: password.value

      })
    }
  } 
})
