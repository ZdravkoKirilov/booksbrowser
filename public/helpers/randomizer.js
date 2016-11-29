(function(global, app) {

    var lodash = global._import('Lodash').from(app.modules);

    var authors = [
        'Tolkien',
        'JK Rowling',
        'Steven Erikson',
        'Robert Jordan',
        'Patrick Rothfuss',
        'Robin Hobb',
        'Raymond Feist',
        'Ursula Le Guin',
        'Brandon Sanderson',
        'Terry Pratchett',
        'George Martin',
        'Jim Butcher',
        'David Eddings',
        'Joe Abercrombie',
        'Glen Cook',
        'Terry Goodkind',
        'Roger Zelazny',
        'Tad Williams',
    ]

    var books = [
      'Harry Poter',
      'Wheel of Time',
      'Malazan book of the dead',
      'Riftwar Saga',
      'Farseer Series',
    ]

    var randomizer = {
        getRandomAuthor: function(format_as_query) {
            var author = lodash.sample(authors);

            if (format_as_query) {
              author = author.replace(/ /g, '+');
            }

            return author;
        },
        getRandomBook: function(format_as_query) {
            var book = lodash.sample(books);

            if (format_as_query) {
              book = book.replace(/ /g, '+');
            }

            return book;
        },
    }

    app.export('Randomizer', randomizer);

})(window, window.app);
