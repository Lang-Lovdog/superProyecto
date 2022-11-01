//COLLAGE
const collageImages = [  ...document.querySelectorAll('.collage-img') ]
//filtro de las imagenes del collage
collageImages.map( (item, i) => {
  item.addEventListener('mouseover', () => {
    collageImages.map((imagen, index) => {
      if(index !== i) {
        imagen.style.filter = `blur(10px)`
        item.style.zIndex = 2
      }
    })
  })
  item.addEventListener('mouseleave', () => {
    collageImages.map((imagen, index) => {
      imagen.style = null
    })
  })
})
