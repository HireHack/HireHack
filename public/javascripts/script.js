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
let initialOffers = document.getElementById('filtered-offer');

window.onscroll = function (ev) {

  if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
    loadMore++;
    console.log(loadMore);

    axios.get(`/offers-filtered?page=${loadMore}&limit=7`)
      .then((response) => {
        console.log(response.data)
        let filteredOffers = [];

        response.data.forEach(item => {
          console.log(item.name, item.createdAt)

          filteredOffers.push(`
          <div class="border rounded p-3 mb-2">
          <h3>${item.name}</h3>
          <p>Estado: {{#if active}}<span style="color: green;">ABIERTA</span>{{else}}<span style="color: red;">CERRADA</span>{{/if}}</p>
          <p><b>Descripción:</b> <br> ${item.description}</p>
          <b>Requisitos:</b>
          <span>${item.skills}</span>
          <br>
          <p>Oferta publicada por: <strong>${item.offers_publishedByCompany.name}</strong></p>
          <a href="/offer-detail/${item._id}">Ver detalle de la oferta</a>
          </div>
          `)
        })
        
        initialOffers.innerHTML += filteredOffers;
      })
      .catch(e => console.log(e));
  }
};

document.getElementById('scroll-top').addEventListener('click', () => {
  window.scrollTo(0, 0);
  location.reload();
  initialOffers.innerHTML = innerHTML
  loadMore = 1;
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