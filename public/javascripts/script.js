function clicked(input) {
    return confirm(`¿Seguro que quieres eleiminar?`);
}
  
setTimeout(() => {
  document.querySelectorAll('.toast').forEach(toast => {
    console.log(toast)
    new bootstrap.Toast(toast).hide()
  })  
}, 5000);