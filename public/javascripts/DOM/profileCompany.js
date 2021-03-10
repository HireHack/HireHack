document.getElementById('show-more').addEventListener('click', () => {
    const showMoreBtn = document.getElementById('show-more')
    const description = document.getElementById('description')

    description.classList.toggle('d-none');

    if (description.className != "d-none") {
        showMoreBtn.innerHTML = "Ver menos" 
    } else {
        showMoreBtn.innerHTML = "Ver más"
    }
})

document.getElementById('show-more-profile').addEventListener('click', () => {
    const showMoreBtn = document.getElementById('show-more-profile')
    const description = document.getElementById('description-offer')

    description.classList.toggle('d-none');

    if (description.className != "d-none") {
        showMoreBtn.innerHTML = "Ver menos" 
    } else {
        showMoreBtn.innerHTML = "Ver más"
    }
})