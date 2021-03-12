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

window.onscroll = (ev) => {
  if (window.scrollY > 2 && document.body.scrollTop <= 0) {
    document.getElementById('navbar').classList.add('fixed-top');
    document.getElementById('navbar').classList.add('bg-white');
  } else if (window.scrollY < 2) {
    document.getElementById('navbar').classList.remove('fixed-top');
    document.getElementById('navbar').classList.remove('bg-white');
  }
}