function clicked(input) {
    return confirm(`¿Seguro que quieres eleiminar?`);
}

function update(input) {
  return confirm(`¿Seguro que quieres actualizar?`);
}
  
setTimeout(() => {
  document.querySelectorAll('.toast').forEach(toast => {
    console.log(toast)
    new bootstrap.Toast(toast).hide()
  })  
}, 5000);


//DOM
document.querySelectorAll('forgot-password').addEventListener('click', () => {
  document.querySelectorAll('hidden').forEach(selector => selector.classList.toggle('d-none'))
})