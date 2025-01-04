// this code was given on -> https://docs.mapbox.com/mapbox-gl-js/example/simple-map/
	mapboxgl.accessToken = mapToken;//This mapToken is coming from show.ejs as we are rendering this file there after all the code but at the top in our script tag we initializing this variable so we can use it here direclt 
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style : "mapbox://styles/mapbox/streets-v12",
               //langitude||latitude
        center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 9 // starting zoom
    });

    // Create a default Marker and add it to the map.
    const marker = new mapboxgl.Marker({color:"red"})
        .setLngLat(listing.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({offset: 25}).setHTML(`<h4>${listing.location}</h4><p>Complete location will be provided after booking</p>`))//we can set a popup which means that if anyone click on marker then a popup will be appeared with some text .We can get from link -> https://docs.mapbox.com/mapbox-gl-js/api/markers/#popup
        
        .addTo(map);

