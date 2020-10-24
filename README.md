# commute-weather [![Owlaukka](https://circleci.com/gh/Owlaukka/commute-weather.svg?style=svg)](https://app.circleci.com/pipelines/github/Owlaukka/commute-weather)
Web-app for seeing weather at a requested time for roughly the next week. Original motivation for this was to use it for determining whether or not it makes sense to make a work-commute by foot or use a car/public transport.

## TODO (in no particular order)
* Add additional ways to express one's location beyond browser location, and remove automatic browser geolocation on page load (bad practise).
  * Will likely require an additional integration to an external API (?) to find location coordinates for a specific named location (the weather API that is used uses location coordinates).
* Add users in the backend
* Further develop weather preferences (add to users in backend, add further aspects of weather like raining or not, etc...).
* Connect preferred commute time and other preferences to the user's account
* Allow for time range in commutes and calculate the weather for the whole period.
* Convert backend to typescript as well.
* Add dedicated backend tests or perhaps test the API with cypress requests directly.
* Optimize bundle
  * Change @apollo/client to a smaller alternative as it's huge in size and there seems to be smaller alternatives that might do the job.
  * Find other optimization opportunities.
* Related to above; optimize app to be a bit faster on mobile with slow connection.
