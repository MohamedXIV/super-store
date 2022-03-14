import React from 'react';

const types = [
    {
        "id": 0,
        "name": "Book",
        "image-light": "/images/book_light_64.png",
        "data": {
            "weight": 0
        }
    },
    {
        "id": 1,
        "name": "DVD",
        "image-light": "/images/dvd_light_64.png",
        "data": {
            "size": 0
        }
    },
    {
        "id": 2,
        "name": "Furniture",
        "image-light": "/images/furniture_light_64.png",
        "data": {
            "height": 0,
            "width": 0,
            "length": 0
        }
    }
    // {
    //     "id": 3,
    //     "name": "Another Thing",
    //     "image": "/images/furniture.png",
    //     "elements": <h2>Another Thing</h2>
    // }
]

Object.freeze(types)

export default types
