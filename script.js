const animeData = [
    {nome: "Spy x Family", genero: ["Ação", "acao", "comedia"], classificacao: "PG-13", nota: 8.56},
    {nome: "One Piece", genero: ["Ação", "acao", "fantasia", "aventura"], classificacao: "PG-13", nota: 8.71},
    {nome: "Oshi no Ko", genero: ["Drama", "drama", "sobrenatural"], classificacao: "PG-13", nota: 8.75},
    {nome: "Cowboy Bebop", genero: ["Ação", "acao", "Sci-Fi"], classificacao: "R - 17+", nota: 8.75},
    {nome: "Dororo", genero: ["Ação", "acao", "aventura", "samurai"], classificacao: "R - 17+", nota: 8.25},
    {nome: "Saint Seiya", genero: ["Ação", "acao", "fantasia", "aventura", "Sci-Fi"], classificacao: "PG-13", nota: 7.75},
    {nome: "Akame ga Kill!", genero: ["Ação", "acao", "fantasia"], classificacao: "R - 17+", nota: 7.47},
    {nome: "Angel Beats!", genero: ["Drama", "drama", "sobrenatural"], classificacao: "PG-13", nota: 8.06},
    {nome: "Another", genero: ["Misterio", "Horror", "Sobrenatural"], classificacao: "R - 17+", nota: 7.47},
    {nome: "Baki", genero: ["Esportes", "Gore"], classificacao: "R - 17+", nota: 7.31},
    {nome: "Boku no Hero Academia", genero: ["Escola", "Super poderes"], classificacao: "PG-13", nota: 7.88},
    {nome: "Chainsaw Man", genero: ["Ação", "acao", "fantasia", "gore"], classificacao: "R - 17+", nota: 8.55},
    {nome: "Charlotte", genero: ["Escola", "Super poderes", "drama"], classificacao: "PG-13", nota: 7.75},
    {nome: "Death Note", genero: ["Sobrenatural", "Suspense", "Detetive"], classificacao: "R - 17+", nota: 8.62},
    {nome: "Elfen Lied", genero: ["Ação", "acao", "Drama", "Horror", "gore", "Romance"], classificacao: "R+", nota: 7.48},
    {nome: "Grand Blue", genero: ["Comedia", "comedia"], classificacao: "PG-13", nota: 8.43},
    {nome: "Kimetsu no Yaiba", genero: ["Ação", "acao", "fantasia"], classificacao: "R - 17+", nota: 8.49},
    {nome: "Kimi no Na wa.", genero: ["Drama", "Sobrenatural"], classificacao: "PG-13", nota: 8.84},
    {nome: "Koe no Katachi", genero: ["Drama", "drama"], classificacao: "PG-13", nota: 8.93},
];

function recommendAnimes(userInput) {
    const lowerUserInput = userInput.toLowerCase();
    const words = lowerUserInput.split(" ");

    const genreSearch = words.filter(word => {
        return animeData.some(anime => {
            if (anime.genero && Array.isArray(anime.genero)) {
                return anime.genero.includes(word);
            }
        });
    });

    const matchedAnimes = animeData.filter(anime => {
        return words.some(word => {
            return Object.values(anime).some(value => {
                if (Array.isArray(value)) {
                    return value.some(val => val.toLowerCase().includes(word));
                } else if (typeof value === 'number') {
                    return false;
                } else {
                    return value.toLowerCase().includes(word);
                }
            });
        });
    });

    if (genreSearch.length > 0) {
        return matchedAnimes.filter(anime => {
            if (anime.genero && Array.isArray(anime.genero)) {
                return anime.genero.some(genre => genreSearch.includes(genre));
            }
        });
    }

    return matchedAnimes;
}

document.getElementById("anime-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const userInput = document.getElementById("search").value;
    const recommendations = recommendAnimes(userInput);

    // Ordenar as recomendações por nota (da mais alta para a mais baixa)
    recommendations.sort((a, b) => b.nota - a.nota);

    const recommendationsDiv = document.getElementById("recommendations");
    recommendationsDiv.innerHTML = "<h2>Recomendações:</h2>";
    
    if (recommendations.length > 0) {
        recommendations.forEach(anime => {
            recommendationsDiv.innerHTML += `<p>${anime.nome} sua nota é de: ${anime.nota}</p>`;
        });
    } else {
        recommendationsDiv.innerHTML += "<p>Nenhum resultado encontrado.</p>";
    }
});

document.getElementById("search").addEventListener("input", function() {
    const searchButton = document.getElementById("search-button");
    searchButton.disabled = this.value.trim() === ''; 
});

document.getElementById("clear-button").addEventListener("click", function() {
    document.getElementById("search").value = "";
    document.getElementById("recommendations").innerHTML = "";
});

