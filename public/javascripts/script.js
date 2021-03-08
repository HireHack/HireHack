//const { load } = require("dotenv/types");

//const { offersFiltered } = require("../../controllers/offers.controller");

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


// PAGINATION
let loadMore = 1;
window.onscroll = function (ev) {
  console.log('scrolling')
  if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
    loadMore++;
    console.log(loadMore);
    axios.get(`/offers-filtered?page=${loadMore}&limit=7`)
      .then((response) => console.log(response.data))
      .catch(e => console.log(e));
  }
};

document.getElementById('scroll-top').addEventListener('click', () => {
  window.scrollTo(0, 0);
  loadMore = 1;
  console.log(loadMore)
})

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