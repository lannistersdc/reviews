const mongoose = require('mongoose');
const Review = require('./index.js');

let seedData = [];

var randomElement = array => {
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

var normalRand = (min, max, skew) => {
  var u = 0;
  var v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  num = num / 10.0 + 0.5;
  if (num > 1 || num < 0) num = normalRand(min, max, skew);
  num = Math.pow(num, skew);
  num *= max - min;
  num += min;
  return Math.round(num);
};

var firstName = [
  'Liezel',
  'Olivia',
  'Ava',
  'Isabella',
  'Sophia',
  'Mia',
  'Charlotte',
  'Amelia',
  'Evelyn',
  'Abigail',
  'Harper',
  'Emily',
  'Elizabeth',
  'Avery',
  'Sofia',
  'Ella',
  'Madison',
  'Scarlett',
  'Victoria',
  'Aria',
  'Grace',
  'Chloe',
  'Camila',
  'Penelope',
  'Riley',
  'Jeff',
  'Uttej',
  'William',
  'James',
  'Logan',
  'Benjamin',
  'Mason',
  'Elijah',
  'Oliver',
  'Jacob',
  'Lucas',
  'Michael',
  'Alexander',
  'Ethan',
  'Daniel',
  'Matthew',
  'Aiden',
  'Henry',
  'Joseph',
  'Jackson',
  'Samuel',
  'Sebastian',
  'David',
  'Carter',
  'Wyatt'
];

var lastName = [
  'Jardine',
  'Gujral',
  'Manalo',
  'Su',
  'Brown',
  'Davis',
  'Miller',
  'Wilson',
  'Moore',
  'Taylor',
  'Anderson',
  'Thomas',
  'Jackson',
  'White',
  'Harris',
  'Martin',
  'Thompson',
  'Garcia',
  'Martinez',
  'Robinson',
  'Clark',
  'Rodriguez',
  'Lewis',
  'Lee',
  'Walker',
  'Hall',
  'Allen',
  'Young',
  'Hernandez',
  'King',
  'Wright',
  'Lopez',
  'Hill',
  'Scott',
  'Green',
  'Adams',
  'Baker',
  'Gonzalez',
  'Nelson',
  'Carter',
  'Mitchell',
  'Perez',
  'Roberts',
  'Turner',
  'Phillips',
  'Campbell',
  'Parker',
  'Evans',
  'Edwards',
  'Collins'
];

var places = [
  'Los Angeles',
  'San Francisco',
  'Sacramento',
  'San Diego',
  'Fresno',
  'Long Beach',
  'New York'
];

var opening = [
  'just',
  '',
  '',
  '',
  '',
  'went with family,',
  'went with girlfriend,',
  'went with boyfriend,',
  'totally',
  'heard about this place,',
  'last night i',
  'i',
  'the guy next to me',
  'great date spot,',
  'ordered the special,'
];

var verbs = [
  'ate',
  'dined',
  'enjoyed',
  'devoured',
  'noshed',
  'consumed',
  'experienced',
  'ordered',
  'got',
  'inhaled',
  'nibbled',
  'slurped',
  'shooped',
  'nommed'
];

var objects = [
  'my',
  'some',
  'the',
  'a',
  'my',
  'an entire',
  'this',
  'that',
  'the',
  'the big',
  'a new style of'
];

var nouns = [
  'cat',
  'pizza',
  'pasta',
  'sushi roll',
  'plate of nachos',
  'taco',
  'potato',
  'crumpet',
  'ice cream',
  'pancake',
  'waffle',
  'burger',
  'plate of fries',
  'buffalo wings',
  'dim sum',
  'curry'
];

var tags = [
  '#thuglife',
  '#jank',
  '#gucci',
  'would recommend',
  'for real',
  '#notanad',
  '#ballin',
  '#omg',
  '#yolo',
  '#delicious',
  '',
  '',
  '',
  ''
];

for (let i = 1; i <= 100; i++) {
  let reviewCount = Math.floor(Math.random() * 500) + 1;
  let skew = Math.random() * 1.464973;
  for (let j = 0; j < reviewCount; j++) {
    let review = {
      restaurantID: 0,
      username: '',
      location: '',
      vip: false,
      totalReviews: 0,
      overall: 0,
      food: 0,
      service: 0,
      ambience: 0,
      value: 0,
      recommend: false,
      date: new Date(),
      text: ''
    };

    review.restaurantID = i;

    review.username = [randomElement(firstName), randomElement(lastName)].join(
      ''
    );

    review.location = randomElement(places);

    if (!Math.floor(Math.random() * 5)) {
      review.vip = true;
    }

    review.totalReviews = Math.floor(Math.random() * 300) + 1;

    review.food = normalRand(1, 5, skew);
    review.service = normalRand(1, 5, skew);
    review.ambience = normalRand(1, 5, skew);
    review.value = normalRand(1, 5, skew);

    review.overall = Math.round(
      (review.food + review.service + review.ambience + review.value) / 4
    );

    if (review.overall === 5) {
      review.recommend = true;
    } else if (review.overall === 4) {
      if (!Math.floor(Math.random() * 5)) {
        review.recommend = true;
      }
    } else if (review.overall === 3) {
      if (!Math.floor(Math.random() * 3)) {
        review.recommend = true;
      }
    }

    review.text = [
      randomElement(opening),
      randomElement(verbs),
      randomElement(objects),
      randomElement(nouns),
      randomElement(tags)
    ].join(' ');

    if (review.text.charAt(0) === ' ') {
      review.text.slice(1, review.text.length);
    }

    seedData.push(review);
  }
}

const seedFunction = () => {
  Review.create(seedData)
    .then(() => {
      console.log('Database seeded');
      mongoose.connection.close();
    })
    .catch(error => console.error(error));
};

seedFunction();
