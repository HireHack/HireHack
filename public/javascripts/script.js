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
  if(window.innerHeight + window.scrollY >=  document.getElementById('offer-list-navbar').scrollHeight) {
    document.getElementById('offer-list-navbar').classList.add('fixed-top');
    document.getElementById('navbar').classList.add('fixed-top');
  } else if (window.innerHeight + window.scrollY >=  document.getElementById('offer-list-navbar').scrollHeight){
    document.getElementById('offer-list-navbar').classList.add('fixed-top');
    document.getElementById('navbar').classList.add('fixed-top');
  }
}

document.getElementById('show-filters').addEventListener('click', () => {
  document.getElementById('filters').classList.toggle('d-none');
  document.getElementById('offer-list').classList.toggle('d-none');
})

document.getElementById('show-detail').addEventListener('click', () => {
  document.getElementById('detail').classList.toggle('d-none');
})

// document.querySelectorAll('show-detail').forEach(link => { 
//   link.addEventListener('click', () => {
//   document.getElementById('detail').classList.toggle('d-none');
//   })
// }