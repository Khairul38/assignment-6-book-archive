// Search Book
const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // Display Spinner
    toggleSpinner('block');

    // Clear Input Field
    searchField.value = '';

    // Clean Search Result
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    const searchNumber = document.getElementById('search-number');
    searchNumber.textContent = '';

    // Error Massage
    const emptySearch = document.getElementById('error-massage');
    emptySearch.textContent = '';
    if (searchText === '') {
        const h5 = document.createElement('h5');
        h5.classList.add('text-center', 'text-danger');
        h5.innerText = 'Please Write Any Book Name';
        emptySearch.appendChild(h5);
        toggleSpinner('none');
    }
    else {
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchNumber(data))
    }
}

// Toggle Spinner
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}

// Show Result of Total Result
const displaySearchNumber = data => {
    const searchNumber = document.getElementById('search-number');

    // Error Massage
    const noResult = document.getElementById('error-massage');
    noResult.textContent = '';
    if (data.numFound === 0) {
        const h5 = document.createElement('h5');
        h5.classList.add('text-center', 'text-danger');
        h5.innerText = 'No Result Found';
        noResult.appendChild(h5);
        toggleSpinner('none');
    }
    else {
        const h5 = document.createElement('h5');
        h5.classList.add('text-end');
        h5.innerText = `Show results: ${data.docs.length}/${data.numFound}`;
        searchNumber.appendChild(h5);
        displaySearchResult(data.docs);
    }
}

// Display Book Result
const displaySearchResult = books => {
    const searchResult = document.getElementById('search-result');
    books.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h3 class="card-title">${book.title}</h3>
                    <h5>Author Name: ${book.author_name ? book.author_name : 'Not available'}</h5>
                    <p>First publish year: ${book.first_publish_year ? book.first_publish_year : 'Not available'}</p>
                    <p class="card-text">Publisher Name: ${book.publisher ? book.publisher : 'Not available'}</p>
                </div>
            </div>
        `;
        searchResult.appendChild(div);
    });
    toggleSpinner('none');
}