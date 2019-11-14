import dotenv from 'dotenv';
dotenv.config();

const config = {
    somato_api: {
        database: 'https://developers.zomato.com/api/v2.1',
        api_key: '5c2c7424a8473ac218b27e6364f4726e'
    },
    menuCategories: [
        "Home"
        // "Breakfast",
        // "Lunch",
        // "Dinner",
        // "Pubs & Bars",
        // "Cafes"
    ],
    countries: [
        "Australia",
        "Brasil",
        "Canada",
        "Italy",
        "New Zealand",
        "United States"
    ]



};

export default config;

