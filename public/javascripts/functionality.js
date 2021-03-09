// HOME PAGE
document.getElementById('show-employment').addEventListener('click', () => {
    document.getElementById('employment').classList.remove('d-none');
    document.getElementById('skills').classList.add('d-none');
}) 

document.getElementById('show-skills').addEventListener('click', () => {
    document.getElementById('skills').classList.remove('d-none');
    document.getElementById('employment').classList.add('d-none');
}) 

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

//SIGNIN/ LOGIN
document.getElementById('candidate-forgot-password').addEventListener('click', () => {
  document.getElementById('restoreEmail').classList.toggle('d-none')
})

document.getElementById('privacity').addEventListener('click', () => {
  document.getElementById('dropOut').classList.toggle('d-none')
  document.getElementById('restorePass').classList.toggle('d-none')
  document.getElementById('restoreEm').classList.toggle('d-none')
})