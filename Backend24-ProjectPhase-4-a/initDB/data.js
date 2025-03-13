const sampleListings =[
    
    {
      title: "Hillside Villa Retreat",
      description: "Nestled in the hills, this villa offers serene surroundings and panoramic views.",
      image: {
        filename: "hillside_villa_retreat.jpg",
        url: "https://media.istockphoto.com/id/1938106570/photo/digitally-generated-domestic-bedroom-interior.jpg?s=612x612&w=0&k=20&c=bC_YWy11iWh0ZtHJIT5ia4v9QELdl94SVqDge9XNZcc="
      },
      price: 2200,
      location: "Santorini",
      country: "Greece"
    },
    {
      title: "Modern City Hotel",
      description: "Stay in the heart of the city in this stylish and modern hotel with exceptional amenities.",
      image: {
        filename: "modern_city_hotel.jpg",
        url: "https://media.istockphoto.com/id/1938106570/photo/digitally-generated-domestic-bedroom-interior.jpg?s=612x612&w=0&k=20&c=bC_YWy11iWh0ZtHJIT5ia4v9QELdl94SVqDge9XNZcc="
      },
      price: 2100,
      location: "New York",
      country: "USA"
    },
    {
      title: "Secluded Beachfront Cottage",
      description: "Unwind in a private beachfront cottage with direct access to pristine white sands.",
      image: {
        filename: "secluded_beachfront_cottage.jpg",
        url: "https://media.istockphoto.com/id/2181349858/photo/porec-croatia-05-07-24-sunset-by-the-pool-under-the-pine-trees.jpg?s=612x612&w=0&k=20&c=2ZRM8J5jaBHYxWLiTucCunMG4ZOXYaS5CaRcDSuJp70="
      },
      price: 1700,
      location: "Phuket",
      country: "Thailand"
    },
    {
      title: "Historic Luxury Hotel",
      description: "Experience the elegance of a historic luxury hotel with grand architecture.",
      image: {
        filename: "historic_luxury_hotel.jpg",
        url: "https://media.istockphoto.com/id/1980326931/photo/modern-cozy-bedroom-in-pastel-tones.jpg?s=612x612&w=0&k=20&c=Bg4ndZQqPT3phgwstL8ULQs_JEJazdrFOvdsI6_KNks="
      },
      price: 2900,
      location: "Vienna",
      country: "Austria"
    },
    {
      title: "Eco-Friendly Jungle Lodge",
      description: "Reconnect with nature in this eco-friendly jungle lodge with sustainable design.",
      image: {
        filename: "eco_friendly_jungle_lodge.jpg",
        url: "https://media.istockphoto.com/id/1644356351/photo/luxury-swimming-pool-in-tropical-resort-relaxing-holidays-in-seychelles-islands-la-digue.jpg?s=612x612&w=0&k=20&c=-ORi5svUcoZQXCAa9bObiCqAOP0J9lAh32XlefMqeP8="
      },
      price: 1600,
      location: "Ubud",
      country: "Indonesia"
    },
    {
      title: "Clifftop Infinity Resort",
      description: "Enjoy stunning ocean views from this clifftop resort with an infinity pool.",
      image: {
        filename: "clifftop_infinity_resort.jpg",
        url: "https://media.istockphoto.com/id/2110310187/photo/luxury-tropical-pool-villa-at-dusk.jpg?s=612x612&w=0&k=20&c=r8UTpMnbLWD_DOKHAcu6dw-MJEcGg0CTqt0ICa84D84="
      },
      price: 3200,
      location: "Amalfi Coast",
      country: "Italy"
    },
    {
      title: "Urban Chic Hotel",
      description: "A stylish urban chic hotel offering the best blend of luxury and convenience.",
      image: {
        filename: "urban_chic_hotel.jpg",
        url: "https://images.unsplash.com/photo-1657002865844-c4127d542c41?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D"
      },
      price: 2000,
      location: "Tokyo",
      country: "Japan"
    },
    {
      title: "Tropical Paradise Resort",
      description: "Discover paradise at this tropical resort surrounded by lush greenery and clear waters.",
      image: {
        filename: "tropical_paradise_resort.jpg",
        url: "https://images.unsplash.com/photo-1711470623168-885d5b054e57?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D"
      },
      price: 2500,
      location: "Bora Bora",
      country: "French Polynesia"
    },
    {
      title: "Chateau in the Countryside",
      description: "Stay in a majestic countryside chateau with picturesque surroundings.",
      image: {
        filename: "countryside_chateau.jpg",
        url: "https://images.unsplash.com/photo-1706647899574-f687793c1b2e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmVzdHVyYW50c3xlbnwwfHwwfHx8MA%3D%3D"
      },
      price: 2800,
      location: "Bordeaux",
      country: "France"
    },
    {
      title: "Waterfront Luxury Suite",
      description: "Wake up to stunning waterfront views in this luxury suite.",
      image: {
        filename: "waterfront_luxury_suite.jpg",
        url: "https://media.istockphoto.com/id/1792188989/photo/interior-design-of-a-modern-luxurious-spacious-hotel-indoor-lounge-with-an-indoor-pool.webp?a=1&b=1&s=612x612&w=0&k=20&c=5xeOpSPmWkIRN5D7vUwJuVRfzR28l-51t1VzAWeCNm4="
      },
      price: 3000,
      location: "Sydney",
      country: "Australia"
    },
    {
      title: "Snowy Mountain Chalet",
      description: "Relax in a cozy chalet surrounded by snowy mountain peaks.",
      image: {
        filename: "snowy_mountain_chalet.jpg",
        url: "https://media.istockphoto.com/id/1467742991/photo/tourist-resort-at-sunset.webp?a=1&b=1&s=612x612&w=0&k=20&c=2DdWD0jCHaubNJbWukpusqnoXV6l6BOlQBrhxzyMtPM="
      },
      price: 2700,
      location: "Zermatt",
      country: "Switzerland"
    },
    {
      title: "Scenic Lake Retreat",
      description: "Escape to this peaceful retreat on the shores of a crystal-clear lake.",
      image: {
        filename: "scenic_lake_retreat.jpg",
        url: "https://unsplash.com/photos/two-chairs-sitting-in-front-of-a-swimming-pool-k_My4rXk4Lc"
      },
      price: 2300,
      location: "Lake Tahoe",
      country: "USA"
    },
    {
      title: "Island Overwater Bungalow",
      description: "Experience unparalleled luxury in this overwater bungalow on a serene island.",
      image: {
        filename: "island_overwater_bungalow.jpg",
        url: "https://images.unsplash.com/photo-1711111038517-f5d61fe63008?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D"
      },
      price: 3500,
      location: "Maldives",
      country: "Maldives"
    }
  ]
  
  

module.exports = { data: sampleListings };