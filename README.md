# Deezer-data-search
Application to display songtracks' informations returned by deezer's api. I used the following tools:
* [react data grid](https://github.com/adazzle/react-data-grid)
* [react boilerplate](https://github.com/react-boilerplate/react-boilerplate)(which includes react, redux, saga, reselect, i18n, jest, ...)
* [Deezer's javascript sdk](https://developers.deezer.com/sdk/javascript/api) to fetch data from deezer's api.


To run this project write the following in your terminal:
1. npm install
2. npm start

Open localhost:3000 on your favorite webbrowser

As I used react boilerplate to start this project, you can look at [this page](https://github.com/react-boilerplate/react-boilerplate/blob/master/docs/general/commands.md) to see a set of other npm commands you can run this project with.

I wrote some unit tests using jests which are located in app/containers/App/tests/selectors.test.js. You can run the the test suite using *npm test*. I changed the package.json file testRegex's variable so that only the tests in this file are run.
