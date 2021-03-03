//DELETE
function clicked(input) {
    return confirm(`¿Seguro que quieres eleiminar?`);
}
  
//FLASH
setTimeout(() => {
  document.querySelectorAll('.toast').forEach(toast => {
    console.log(toast)
    new bootstrap.Toast(toast).hide()
  })  
}, 3000);

//FILTERS OFFERS
// const host= "http://localhost:3000/offers-list"

// const category = document.getElementById('category')
// category.addEventListener('click', () => {
  
// })

// axios.get(`${host}`, {
//   params: {
//   category: 'Adm. empresas'
// }})
//     .then((res) => {
//     console.log(res)
//     })
//     .catch((e)=> console.error(e))

// document.getElementById('category').addEventListener('change', function () {
//   document.getElementById('formCategory').submit()
// })

