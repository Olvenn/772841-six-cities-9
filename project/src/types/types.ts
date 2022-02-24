export interface FunctionNumber {
  (item: number): void;
}

export interface FunctionArrayNumbers {
  (item: number[]): void;
}


export interface StringArray {
  [index: string]: string;
}

export type PersonData = {
  avatarUrl: string;
  id: number;
  isPro: boolean;
  name: string;
}

export type AuthData = PersonData & {
  email: string;
  token: string;
}

export type Comment =
  {
    comment: string;
    date: string;
    id: number;
    rating: number;
    user: PersonData;
  }

export type Comments = {
  offers: Offer[];
}


export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type City = {
  name: string;
  location: Location;
}


export type Offer = {
  bedrooms: number;
  city: City;
  description: string;
  goods: string[];
  host: PersonData;
  id: number;
  images: string[]
  isFavorite: boolean;
  isPremium: boolean;
  location: Location;
  maxAdults: number;
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  type: string;
}

export type OfferOne = {
  bedrooms: number;
  city: City;
  description: string;
  goods: [string];
  host: PersonData;
  id: number;
  images: [string]
  isFavorite: boolean;
  isPremium: boolean;
  location: Location;
  maxAdults: number;
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  type: string;
}

export type AllOffers = {
  offers: Offer[];
}

export const offersMoki: Offer[] = [
  {
    'city': {
      'name': 'Brussels',
      'location': {
        'latitude': 50.846557,
        'longitude': 4.351697,
        'zoom': 13,
      },
    },
    'previewImage': 'https://9.react.pages.academy/static/hotel/5.jpg',
    'images': [
      'https://9.react.pages.academy/static/hotel/7.jpg',
      'https://9.react.pages.academy/static/hotel/8.jpg',
      'https://9.react.pages.academy/static/hotel/9.jpg',
      'https://9.react.pages.academy/static/hotel/11.jpg',
      'https://9.react.pages.academy/static/hotel/1.jpg',
      'https://9.react.pages.academy/static/hotel/19.jpg',
      'https://9.react.pages.academy/static/hotel/20.jpg',
      'https://9.react.pages.academy/static/hotel/18.jpg',
      'https://9.react.pages.academy/static/hotel/14.jpg',
      'https://9.react.pages.academy/static/hotel/12.jpg',
      'https://9.react.pages.academy/static/hotel/10.jpg',
      'https://9.react.pages.academy/static/hotel/2.jpg',
      'https://9.react.pages.academy/static/hotel/17.jpg',
      'https://9.react.pages.academy/static/hotel/15.jpg',
    ],
    'title': 'The Pondhouse - A Magical Place',
    'isFavorite': false,
    'isPremium': false,
    'rating': 4.8,
    'type': 'house',
    'bedrooms': 5,
    'maxAdults': 7,
    'price': 907,
    'goods': [
      'Fridge',
      'Air conditioning',
      'Towels',
      'Baby seat',
      'Washer',
      'Laptop friendly workspace',
      'Breakfast',
    ],
    'host': {
      'id': 25,
      'name': 'Angelina',
      'isPro': true,
      'avatarUrl': 'img/avatar-angelina.jpg',
    },
    'description': 'Design interior in most sympathetic area! Complitely renovated, well-equipped, cosy studio in idyllic, over 100 years old wooden house. Calm street, fast connection to center and airport.',
    'location': {
      'latitude': 50.822556999999996,
      'longitude': 4.347697,
      'zoom': 16,
    },
    'id': 1,
  },
  {
    'city': {
      'name': 'Amsterdam',
      'location': {
        'latitude': 52.37454,
        'longitude': 4.897976,
        'zoom': 13,
      },
    },
    'previewImage': 'https://9.react.pages.academy/static/hotel/14.jpg',
    'images': [
      'https://9.react.pages.academy/static/hotel/6.jpg',
      'https://9.react.pages.academy/static/hotel/16.jpg',
      'https://9.react.pages.academy/static/hotel/14.jpg',
      'https://9.react.pages.academy/static/hotel/1.jpg',
      'https://9.react.pages.academy/static/hotel/10.jpg',
      'https://9.react.pages.academy/static/hotel/12.jpg',
      'https://9.react.pages.academy/static/hotel/20.jpg',
      'https://9.react.pages.academy/static/hotel/19.jpg',
      'https://9.react.pages.academy/static/hotel/2.jpg',
      'https://9.react.pages.academy/static/hotel/18.jpg',
      'https://9.react.pages.academy/static/hotel/15.jpg',
      'https://9.react.pages.academy/static/hotel/4.jpg',
      'https://9.react.pages.academy/static/hotel/5.jpg',
      'https://9.react.pages.academy/static/hotel/11.jpg',
    ],
    'title': 'Loft Studio in the Central Area',
    'isFavorite': false,
    'isPremium': false,
    'rating': 2.4,
    'type': 'hotel',
    'bedrooms': 2,
    'maxAdults': 7,
    'price': 343,
    'goods': [
      'Laptop friendly workspace',
      'Breakfast',
      'Washer',
    ],
    'host': {
      'id': 25,
      'name': 'Angelina',
      'isPro': true,
      'avatarUrl': 'img/avatar-angelina.jpg',
    },
    'description': 'Peaceful studio in the most wanted area in town. Quiet house Near of everything. Completely renovated. Lovely neighbourhood, lot of trendy shops, restaurants and bars in a walking distance.',
    'location': {
      'latitude': 52.397540000000006,
      'longitude': 4.9099759999999995,
      'zoom': 16,
    },
    'id': 2,
  },
];
