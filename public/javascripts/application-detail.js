let showOfferDetail = document.getElementById('show-offer-detail');
document.getElementById('show-offer-detail').addEventListener('click', () => {
    document.getElementById('offer-detail').classList.toggle('d-none');

    if (showOfferDetail.innerHTML === 'Mostrar') {
        showOfferDetail.innertHTML = 'Ocultar'
    } else {
        showOfferDetail.innertHTML = 'Mostrar'
    }
});

// document.querySelectorAll('find-btn').addEventListener('click', () => {
//     document.querySelectorAll('form').forEach(btn => console.log(btn.innerHTML));
// })

function addFakeCandidate(n) {
    for (i=0; i<n; i++) {
    document.getElementById('fake-candidate').innerHTML += `
        <div class="d-flex flex-column align-items-center col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-4">
            <img class="profile-img img-fluid"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDO90KrTj9OJdcyg1ZIc9Ol7CMyKucyhmc6w&usqp=CAU"
                alt="Foto de perfil">
            <h5 class="p-2 text-center"><b>Antonio <br> García López</b></h5>
        </div>
        <div class="d-flex flex-column align-items-center col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-4">
        <img class="profile-img img-fluid"
            src="http://1.gravatar.com/avatar/7d5f7a9f5926aa8e4ed7702a65906167?s=400&"
            alt="Foto de perfil">
        <h5 class="p-2 text-center"><b>Carmen <br> Rodríguez Díaz</b></h5>
    </div>
    `
    }
}

addFakeCandidate(Math.ceil(Math.random() * 80) + 10);