'use strict';

const dotenv = require('dotenv');
dotenv.config();
const TEXT_SEARCH_ENDPOINT = process.env.TEXTSEARCH_ENDPOINT;
const NEARBY_SEARCH_ENDPOINT = process.env.NEARBYSEARCH_ENDPOINT;
const PLACE_DETAILS_ENDPOINT = process.env.PLACE_DETAILS_ENDPOINT;
const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const fetch = require('node-fetch');
const fs = require('fs');

const query = 'restaurants+Paris+11';
const location = '42.3675294,-71.186966';
const radius = 1000;
const placeId = 'ChIJ3yn11Pxt5kcRjMyRkVFktAQ';

const textSearchParams = new URLSearchParams([
  ['key', GOOGLE_PLACES_API_KEY],
  ['query', query]
]);

const nearbySearchParams = new URLSearchParams([
  ['key', GOOGLE_PLACES_API_KEY],
  ['location', location],
  ['radius', radius]
]);

const placeDetailsParams = new URLSearchParams([
  ['key', GOOGLE_PLACES_API_KEY],
  ['place_id', placeId]
]);

const textSearchUrl = new URL(`${TEXT_SEARCH_ENDPOINT}?${textSearchParams}`).href;
const nearbySearchUrl = new URL(`${NEARBY_SEARCH_ENDPOINT}?${nearbySearchParams}`).href;
const placeDetailsUrl = new URL(`${PLACE_DETAILS_ENDPOINT}?${placeDetailsParams}`).href;

function nearbySearch () {
  fetch(nearbySearchUrl)
		.then(res => {
		  const dest = fs.createWriteStream('./nearby-search-results.json');
		  res.body.pipe(dest);
		});
}

function textSearch () {
  fetch(textSearchUrl)
	 .then(res => {
	    const dest = fs.createWriteStream('./text-search-results.json');
	    res.body.pipe(dest);
	  });
}

function placeDetails () {
  fetch(placeDetailsUrl)
	 .then(res => {
	    const dest = fs.createWriteStream('./place-details-results.json');
	    res.body.pipe(dest);
	  });
}

module.exports = {
  textSearch,
  nearbySearch,
  placeDetails
};
