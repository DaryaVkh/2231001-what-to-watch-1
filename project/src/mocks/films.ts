import { Film } from '../types/film.type';
import { Genre } from '../types/genre.enum';

export const PROMO_FILM: Film = {
  id: 22,
  name: 'The Grand Budapest Hotel',
  posterImage: 'img/the-grand-budapest-hotel-poster.jpg',
  previewImage: 'img/the-grand-budapest-hotel-poster.jpg',
  backgroundImage: 'img/bg-the-grand-budapest-hotel.jpg',
  backgroundColor: 'black',
  videoLink: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4',
  previewVideoLink: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4',
  description: 'Description',
  rating: 8.9,
  scoresCount: 10,
  director: 'Director',
  starring: ['Actor 1', 'Actor 2', 'Actor 3'],
  runTime: 60,
  genre: Genre.CRIME,
  released: 2010,
  isFavorite: true
};
