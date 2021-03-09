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
document.getElementById('show-filters').addEventListener('click', () => {
  document.getElementById('filters').classList.toggle('d-none')
})