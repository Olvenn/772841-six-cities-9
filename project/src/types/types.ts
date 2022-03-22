export type ErrorType = unknown;

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
  images: string[];
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
