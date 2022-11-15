window.onload= ()=>{
  let user = JSON.parse(sessionStorage.user || null)
  if(user === null){
    location.replace('/login')
  }else if(user.seller){
    location.replace('/dashboard')
  }
}
let loader   = document.querySelector('.loader')
let applyBtn = document.querySelector('.apply-btn')

applyBtn.addEventListener('click', ()=>{
  let businessName = document.querySelector('#name').value
  let address      = document.querySelector('#address').value
  let about        = document.querySelector('#about').value
  let number       = document.querySelector('#number').value

  if(!businessName.length || !address.length  ||
     !about.length        || number.length<10 ||
     !Number(number)){
      showFormError('Some Info in Invalid')
  }else{
    loader.style.display = 'block'
    sendData('seller',{
      name: businessName,
      address,
      about,
      number,
      email: JSON.parse(sessionStorage.user).email
    })
    const Usuario = JSON.parse(sessionStorage.getItem('user'))
    Usuario.seller='true'
    sessionStorage.setItem('user', JSON.stringify(Usuario))
    console.log(Usuario)
    location.replace('/')
  }
})
