const searchInput = document.getElementById('searchInput');
const resultsDiv = document.getElementById('results');

searchInput.addEventListener('input', async () => {
    const query = searchInput.value.trim();

    if (query.length < 4) {
        resultsDiv.innerHTML = '';
        return;
    }

    const response = await fetch(`https://api.thedogapi.com/v1/breeds/search?q=${query}`);
    const breeds = await response.json();

    resultsDiv.innerHTML = '';

    breeds.forEach(async (breed) => {
        const breedName = breed.name;
        const breedImages = await fetch(`https://api.thedogapi.com/v1/images/search?breed_id=${breed.id}&size=med&mime_types=jpg&format=json&limit=6`);
        const imagesData = await breedImages.json();

        imagesData.forEach((image) => {
            const imgElement = document.createElement('img');
            imgElement.src = image.url;
            resultsDiv.appendChild(imgElement);
        });
    });
});
