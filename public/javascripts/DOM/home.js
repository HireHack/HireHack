window.onscroll = (ev) => {
    if (window.scrollY > 2 && document.body.scrollTop <= 0) {
      document.getElementById('navbar').classList.add('fixed-top');
      document.getElementById('navbar').classList.add('bg-white');
    } else if (window.scrollY < 2) {
      document.getElementById('navbar').classList.remove('fixed-top');
      document.getElementById('navbar').classList.remove('bg-white');
    }
  }


document.getElementById('show-skills').addEventListener('click', () => {
    document.getElementById('skills').classList.remove('d-none');
    //document.getElementById('skills').classList.add('d-flex');
    document.getElementById('employment').classList.add('d-none');
    document.getElementById('employment').classList.remove('d-flex');
}) 

document.getElementById('show-employment').addEventListener('click', () => {
    document.getElementById('employment').classList.remove('d-none');
    document.getElementById('employment').classList.add('d-flex');
    document.getElementById('skills').classList.add('d-none');
    //document.getElementById('skills').classList.remove('d-flex');
}) 

document.onscroll = () => {
    const slides = document.querySelector('.parallax')
    //console.log(slides)
    
    let diff = slides.getBoundingClientRect().top
    let speed = slides.dataset.speed
    let axis = slides.dataset.axis
    
    let horizontalSum = diff * speed
    //let verticalSum = diff * speed
    
    // if (axis === 'horizontal') verticalSum = 0
    // if (axis === 'vertical') horizontalSum = 0
    
    slides.style.transform = `translate(${horizontalSum}px, 0px)`
}
