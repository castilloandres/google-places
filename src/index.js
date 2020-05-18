'use strict';

const dotenv = require('dotenv');
dotenv.config()
const url = require('url');
const GOOGLE_PLACES_ENDPOINT = process.env.GOOGLE_PLACES_ENDPOINT;
const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
console.log('GOOGLE_PLACES_API_KEY', GOOGLE_PLACES_API_KEY);

const textSearchUrl = new URL(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+Paris+11&key=${GOOGLE_PLACES_API_KEY}`).href;
console.log(textSearchUrl);
const fetch = require('node-fetch');

const options = {
	location: '',
	radius: '',
	types: '',
	name: '',
	key: ''
};

async function nearbySearch (options) {
  // const url = concatenate url here
  const result = await fetch(textSearchUrl);
}

function textSearch (options) {
  fetch(textSearchUrl)
	 .then(res => {
	    const dest = fs.createWriteStream('./results.json');
	    res.body.pipe(dest);
	    console.log("call is done");
	  });
}


// https://maps.googleapis.com/maps/api/place/nearbysearch/json?
// location=-33.8670522,151.1957362
// &radius=1500
// &type=restaurant
// &keyword=cruise
// &key=YOUR_API_KEY

// https://maps.googleapis.com/maps/api/place/textsearch/xml?
// query=restaurants+in+Sydney&
// key=YOUR_API_KEY

module.exports = {
  nearbySearch,
  textSearch
}
