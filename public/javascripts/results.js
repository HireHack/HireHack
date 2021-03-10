
// PAGINATION
let loadMore = 0;
let initialOffers = document.getElementById('filtered-offer');

window.onscroll = function (ev) {
console.log('scrolling')

  if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
    loadMore++;
    console.log(loadMore);

    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get('search');

    axios.get(`/offers-filtered?page=${loadMore}&limit=7&search=${search}`)
      .then((response) => {
        console.log(response.data)
        let filteredOffers = [];

        response.data.forEach(offer => {
          console.log(offer.name, offer.createdAt)
          
          filteredOffers.push(`
          <div class="border rounded p-3 mb-2">
          <h3>${offer.name}</h3>
          <p>Estado: ${offer.active ? '<span style="color: green;">ABIERTA</span>' : '<span style="color: red;">CERRADA</span>'}</p>
          <p><b>Descripción:</b> <br> ${offer.description}</p>
          <b>Requisitos:</b>
          <span>${offer.skills.join(', ')}</span>
          <br>
          <p>Oferta publicada por: <strong>${offer.offers_publishedByCompany.name}</strong></p>
          <a href="/offer-detail/${offer._id}">Ver detalle de la oferta</a>
          </div>
          `)
        })

        initialOffers.innerHTML += filteredOffers
      })
      .catch(e => console.log(e));
  }
};

document.getElementById('scroll-top').addEventListener('click', () => {
  window.scrollTo(0, 0);
  location.reload();
  initialOffers.innerHTML = initialOffers;
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