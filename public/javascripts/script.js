//DELETE
function clicked(input) {
  return confirm(`¿Seguro que quieres eleiminar?`);
}

function update(input) {
  return confirm(`¿Seguro que quieres actualizar?`);
}

//FLASH
setTimeout(() => {
  document.querySelectorAll('.toast').forEach(toast => {
    console.log(toast)
    new bootstrap.Toast(toast).hide()
  })
}, 3000);

// //PAGINATION
// document.getElementById('page').addEventListener('click', ()  => {
//   const pageValue = document.getElementById('page').innerHTML;
//   console.log(pageValue);

//   axios.get(`http://localhost:3000/offers-list?page=${pageValue}`)
//   .then((response) => console.log(response))
// })

// let loadMore = 1;
// document.getElementById('load-more').addEventListener('click', ()  => {
//   loadMore++;
//   console.log(loadMore);
//   axios.get(`http://localhost:3000/offers-list?page=${loadMore}`)
//   .then((response) => console.log(response))
// })


//NAVBAR PARALLAX
let depth

document.onscroll = () => {

  depth = window.scrollY

  //console.log(depth)
  
  if (depth > 100) {
    document.querySelector('.navbar').classList.add('thin')  
  } else {
    document.querySelector('.navbar').classList.remove('thin')
  }
}