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