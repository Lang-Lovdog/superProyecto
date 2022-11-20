import express, {query} from 'express';
import bcrypt, { hash } from 'bcrypt';
import stripe from 'stripe';
import { initializeApp } from 'firebase/app';
import { collection, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc, where } from 'firebase/firestore'
let laContraSenna

//Configuracion de Firebase
const firebaseConfig = {
  apiKey:            "AIzaSyAdjasV4l3zMlXowSi1x0_9ummu385PZuk",
  authDomain:        "lang-cn-1.firebaseapp.com",
  projectId:         "lang-cn-1",
  storageBucket:     "lang-cn-1.appspot.com",
  messagingSenderId: "416786130478",
  appId:             "1:416786130478:web:c3da4b17734dffa215e1bf"
}

const firebase = initializeApp(firebaseConfig)
const db = getFirestore()
//Inicializacion del servidor
const app = express()

//middleware
app.use(express.static('public'))
app.use(express.json())//Permite compartir forms

//Rutas

//Home
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'public' })
})

//Ruta para registrar
app.get('/signup', (req, res) => {
  res.sendFile('signup.html', { root: 'public' })
})

//Ruta para mandar los datos para registrarse
app.post('/signup', (req, res) => {
  const { name, email, password, number, tac } = req.body //el body va a llegar con estos parametros

  //Validacionesif
  if(name.length < 3) {
    res.json({ 'alert' : 'name must be 3 letters long'})
  } else if (!email.length){
    //NOTA: implementar una RegEx para filtrar email
    res.json({ 'alert' : 'enter your email'})
  } else if (password.length < 8 ){
    res.json({ 'alert' : 'password must be 8 letters long'})
  } else if (!Number(number) || number.length < 10 ) {
    res.json({ 'alert' : 'invalid number, please enter valid one'})
  } else if (!tac) {
    res.json({ 'alert' : 'you must agree to our terms'})
  } else {
    //Almacenar datos en DB
    const users = collection(db, "users")
    getDoc(doc(users, email)).then(user => {
      if(user.exists()){
        res.json({'alert': 'email already exist'})
      } else {
        //encriptar el password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password,salt, (err,hash)=>{
            req.body.password = hash
            req.body.seller = false
            //Subirlo a la base de datos
            setDoc(doc(users, email ), req.body).then(data => {
              res.json({
                name: req.body.name,
                email: req.body.email,
                seller: req.body.seller
              })
            })
          })
        })
      }
    })
  }
})

//Ruta de Login

//Ruta para registrar
app.get('/login', (req, res) => {
  res.sendFile('login.html', { root: 'public' })
})

app.post('/login', (req, res) => {
  let { email, password } = req.body

  //Validaciones
  if( !email.length || !password.length ) {
    return res.json({
      'alert' : 'fill all the inputs'
    })
  }

  const users = collection(db, 'users')
  getDoc(doc(users, email))
    .then( user => {
      if( !user.exists() ) {
        return res.json({
          'alert': 'email doesnt exist'
        })
      } else {
        bcrypt.compare(password, user.data().password, (err, result) => {
          if(result){
            let data = user.data()
          return res.json({
            name: data.name,
            email: data.email,
            seller: data.seller
          })
        } else {
          return res.json({ 'alert': 'password incorrect'})
        }
        })      
      }
    })

})
app.get('/seller',(req,res)=>{
  res.sendFile('seller.html',{root:'public'})
})
app.post('/seller',(req,res)=>{
  let{name,address,about,number,email}=req.body
  if(!name.length || !address.length ||
     !about.length        || number.length   ||
     !Number(number)){
    return res.json({
      'alert': 'Something went wrong'
    })
  }else{
    const sellers = collection(db,"sellers")
    setDoc(doc(sellers,email),req.body)
      .then(laCosa =>{
        const users = collection(db,"users")
        updateDoc(doc(users, email),{
          seller: true
        }).then(laCosa =>{
          res.json({
            'seller': true
          })
        })
      })
  }
})
app.get('/dashboard',(req,res)=>{
  res.sendFile('dashboard.html',{root:'public'})
})
app.post('get-products',(req,res)=>{
  let { email,id,tag } = req.body
  let products = collection(db,'products')
  let docRef
  if(id){
    docRef= getDoc(doc(products,id))
  }else if(tag){
    docRef=getDocs(query(products,where("tags","array-contains",tag)))
  }else{
    docRef=getDocs(query(products,where("email","==",email)))
  }
  docRef.then(products => {
    if(products.empty){
      return res.json('no products')
    }
    let arr=[]
    if(id){ return res.json(products.data()) }
    else{
      products.forEach(element => {
        let data = element.data()
        data.id = element.id
        arr.push(data)
      });
    }
  })
})

app.listen(3000, () => {
  console.log('Servidor en Ejecucion...');
})
