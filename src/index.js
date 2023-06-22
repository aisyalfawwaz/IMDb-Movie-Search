import './style.css';
import './components/footer-bar';

const getPopularMovies = () => {
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=5ecb41a48f0a6f33c494f7dbe7db6001&language=en-US&page=1')
    .then(response => response.json())
    .then(data => {
        const image = 'https://image.tmdb.org/t/p/w500/';
        const movies = data.results;
        const mappedMovies = movies.map(item => {
            const card = document.createElement('div');
            const img = document.createElement('img');
            const title = document.createElement('h3');
            const date = document.createElement('p');
            const overview = document.createElement('p');
            const toggleButton = document.createElement('button');
            
            let showMore = true;
            let longText = item.overview;
            let shortText = longText.substring(0, 100);
            let longTitle = item.title;
            let shortTitle = longTitle.substring(0,15);

            img.classList.add('card-img');
            card.classList.add('card');
            title.classList.add('card-header');
            overview.classList.add('card-descript');
            date.classList.add('date');
            toggleButton.classList.add('button-show')

            toggleButton.textContent = 'Show More';
            img.src = image+item.poster_path;
            title.innerHTML = shortTitle;
            date.textContent = item.release_date
            overview.innerHTML = shortText;

            toggleButton.addEventListener('click', () => {
                if(showMore) {
                    overview.innerHTML = longText;
                    title.innerHTML = longTitle;
                    toggleButton.textContent = 'Show Less';
                } else {
                    overview.innerHTML = shortText;
                    title.innerHTML = shortTitle;
                    toggleButton.textContent = 'Show More';
                }
                showMore = !showMore;
            });

            card.appendChild(img);
            card.appendChild(title);
            card.appendChild(date);
            card.appendChild(overview);
            card.appendChild(toggleButton);

            return card;
        });

        const container = document.getElementById('containerPopular');
        mappedMovies.forEach(item => container.appendChild(item));
    })
    .catch(error => {
        console.log(error);
    })
}

getPopularMovies();
