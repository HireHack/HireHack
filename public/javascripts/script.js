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


// OFFERS LIST
window.onscroll = (ev) => {
  console.log('window.scrollY', window.scrollY)
  console.log('document.body.scrollTop', window.innerHeight)

  if (window.scrollY > 65 && document.body.scrollTop <= 0) {
    document.getElementById('offer-list-navbar').classList.add('fixed-top');
    document.getElementById('offer-list-navbar').classList.add('bg-white');
  } else if (window.scrollY < 30) {
    document.getElementById('offer-list-navbar').classList.remove('fixed-top');
    //document.getElementById('navbar').classList.remove('d-none');
    // document.getElementById('navbar').classList.add('fixed-top');
  }
}

let showFilters = document.getElementById('show-filters');

showFilters.addEventListener('click', () => {
  document.getElementById('offer-list').classList.toggle('d-none');
  document.getElementById('filters').classList.toggle('d-none');
  
  // if (window.scrollY > 65) {
  //   document.getElementById('navbar').classList.add('d-none');
  // } else if (window.scrollY > 65) {
  //   document.getElementById('navbar').classList.remove('d-none');
  // }

  if (showFilters.innerHTML === 'FILTROS') {
    showFilters.innerHTML ='OCULTAR'
    showFilters.classList.remove('btn-primary')
    showFilters.classList.add('btn-outline-success')
  } else {
    showFilters.innerHTML = 'FILTROS'
    showFilters.classList.remove('btn-success')
    showFilters.classList.add('btn-outline-primary')
  }
})

document.getElementById('show-detail').addEventListener('click', () => {
  document.getElementById('detail').classList.toggle('d-none');
})

// document.querySelectorAll('show-detail').forEach(link => { 
//   link.addEventListener('click', () => {
//   document.getElementById('detail').classList.toggle('d-none');
//   })
// }