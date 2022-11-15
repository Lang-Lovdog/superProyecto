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
  let tac      = document.querySelector('#tc')       || null

  if(fullname !== null){
    //Quiere decir que estoy en la pagina de registro
    if(fullname.length < 3){
      showFormError('name must be at least 3 letters long')
    }else if(!email.value.length){
      showFormError('must enter an email')
    }else if(password.length<8){
      showFormError('password must at least be 8 letters long')
    }else if(Number(number) || number.value.length<10){
      showFormError('invalid number')
    }else if(!tac.checked){
      showFormError('you must agree with terms and conditions')
    }else{
      //Enviar datos al BACK
      loader.style.display='block'
      sendData('/signup',{
        name:     fullname.value,
        email:    email.value,
        password: password.value,
        number:   number.value,
        tac:      tac.checked
      })
    }
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
