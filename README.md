# City Bucket List

A web app to create a bucket list of cities you want to visit ans store data in a Database. App is responsive. 
The app has been developed using Vue.js (Composition API). The back-end makes use of Supabase to store data.

This is my first project developing a front-end web app using Vue.js and Quasar App as the CSS framework. The project also calls the Unsplsh API to retrieve live images of the cities inserted in the list and Leaflet Maps (Openstreet maps) to display a map.

## Tech Stack

*Client* : Vue.js, Vite (dev server)
*Router* : Vue Router
*Store* : Pinia and Pinia Persist for persistent login
*Database as a service* : Supabase

## Vue Modules

### Vue Router

Used to quickly route to different components, as the Auth or the Main Dashboard

### Vue Pinia (with Pinia Persist plugin)

Three stores are currently used by the project: a USER store to tore user authentication, a CITIES store to store city data and an ALERT store to handle notifications adn pop up alerts.

## Description

The app provides a sign up/sign screen that will be displayed when the user is not logged in. The signup form requests an email address, password and password confirmation from the user. After successful logging in, the user is shown the main app content, being it a list of cities already inserted, a countdow to the selected date to visit the city, if any and the distance to that city from the user's current location (using Geolocation). A Leaflet map is also used to present a map with some info to the user.
The app fetches all cities from the logged-in user’s list stored in Supabase, displaying am image of the selected city (from Unsplash API) and most relevant info directly on a card. An expandable dropdown would show additional information (notes that the user has about that city).

## Technical Information

* All of the CRUD actions are implemented (Create, Read, Update, Delete) for a city.
* Integration of the client-side Vue application with the Supabase DB: 
   - implemented dynamic SPA routing to display components with specific content in addition to the basic routing. 
   - Used props to establish the two-way data flow between the components (data/functions down, actions up). This can be found in the NewCity component, which makes use of a subcomponent to search the city and emits back to the parent. 
* Status Handling: three store managers are integrated with the project. Sotres use getters to select the data when applying from the template. 
* Asynchronous operations handling: the project uses promises to handle asyncronous operations adn fetching data from external APIs.
* Styling: Quasar CSS framework is used and the project is fully responsive (600px breakpoint).
* Functional app deployed using Netlify service: [Cities Bucket List]


[1]: https://city-bucket-list.netlify.app/#/ "Cities Bucket List"

## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Lint the files
```bash
yarn lint
# or
npm run lint
```


### Format the files
```bash
yarn format
# or
npm run format
```

## Credits

As a first front-end development project, I was supported by the Ironhack Bootcampexcellent staff solving doubts and helping with some issues. Thank you Marc Compte, Pablo Mateos and Cristian Perdomo ;)

## License

Copyright 2022 Lorenzo Corio <lorenzocorio@duck.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
