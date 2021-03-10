document.getElementById('show-employment').addEventListener('click', () => {
    document.getElementById('employment').classList.remove('d-none');
    document.getElementById('skills').classList.add('d-none');
}) 

document.getElementById('show-skills').addEventListener('click', () => {
    document.getElementById('skills').classList.remove('d-none');
    document.getElementById('employment').classList.add('d-none');
}) 