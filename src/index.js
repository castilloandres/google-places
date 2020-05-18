'use strict';

const dotenv = require('dotenv');
dotenv.config();
const TEXTSEARCH_ENDPOINT = process.env.TEXTSEARCH_ENDPOINT;
const NEARBYSEARCH_ENDPOINT = process.env.NEARBYSEARCH_ENDPOINT;
const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const fetch = require('node-fetch');
const fs = require('fs');

const query = 'restaurants+Paris+11';
const location = '42.3675294,-71.186966';
const radius = 1000;

const textSearchParams = new URLSearchParams([
  ['key', GOOGLE_PLACES_API_KEY],
  ['query', query]
]);

const nearbySearchParams = new URLSearchParams([
  ['key', GOOGLE_PLACES_API_KEY],
  ['location', location],
  ['radius', radius]
]);

const textSearchUrl = new URL(`${TEXTSEARCH_ENDPOINT}?${textSearchParams}`).href;
const nearbySearchUrl = new URL(`${NEARBYSEARCH_ENDPOINT}?${nearbySearchParams}`).href;

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

module.exports = {
  textSearch,
  nearbySearch
};
