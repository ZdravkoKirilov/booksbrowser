"# booksbrowser"
Overview
---------

A sample Express/React application fetching book records from Google's Books API

The query to the API is based on a randomly chosen string from a predefined set of choices

Repetition of same books is not prevented with the purpose of being able to load a bigger quantity


An initial set of books is loaded upon initialization and a "Load more" button is present at the bottom of the list which fetches additional records

Sorting of the records is only ascending for now and the user can choose between 2 criteria: Author Name / Book title

Basic filtering is also available and it can match a set of selected authors from a checkbox

Clicking on a book title expands/shrinks the elements. Purchase link, genre, publish date can be seen.


Installing. Prerequisites: NodeJS, Git
--------------------------------------

The project can be downloaded locally via command line: git clone https://github.com/ZdravkoKirilov/booksbrowser.git

Once the project is downloaded locally, navigate to the project folder in command line and execute "npm install"

After the install is done the project is ready to be launched by executing "node server.js"

Navigate to localhost:3000 in a browser and the project will be running


Technical Details
-----------------

No transpilers are being used: Javascript code is written entirely in ES5, React is used without JSX

A simple module loader utility is used just as a syntactic sugar aiming to be close to the soon to be implemented ES6 imports. public/app.js serves as the client side root of the application and the place where all modules can be reviewed. CDN links for the 3rd party libraries are being used as a more simplistic approach to the task

There is 1 root component which serves as a state container, handling data changes and passing data as props to children. At this scale using Redux seemed like a bit of an overkill

Axios library is used for the AJAX requests, Lodash is used as an utility library


TO DO
------
Mocha + Chai + React-with-addons testing // well above 4 hours
