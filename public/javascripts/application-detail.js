let showOfferDetail = document.getElementById('show-offer-detail');
document.getElementById('show-offer-detail').addEventListener('click', () => {
    document.getElementById('offer-detail').classList.toggle('d-none');

    if (showOfferDetail.innerHTML === 'Mostrar') {
        showOfferDetail.innertHTML = 'Ocultar'
    } else {
        showOfferDetail.innertHTML = 'Mostrar'
    }
});

function addFakeCandidate(n) {
    for (i=0; i<n; i++) {
    document.getElementById('fake-candidate').innerHTML += `
        <div class="d-flex flex-column col-2">
            <img class="profile-img"
                src="https://winaero.com/blog/wp-content/uploads/2015/05/windows-10-user-account-login-icon.png"
                alt="Foto de perfil" style="border-radius: ;">
            <p>Nombre y apellidos</p>
        </div>
    `
    }
}

addFakeCandidate(Math.ceil(Math.random() * 150) + 20);