import { datatype, image, internet, name } from 'faker';
import { Film } from '../types/film.type';
import { Genre } from '../types/genre.enum';
import { Review } from '../types/review.type';
import { User } from '../types/user.type';

export const makeFakeFilm = (): Film => ({
  name: name.title(),
  posterImage: image.imageUrl(),
  previewImage: image.imageUrl(),
  backgroundImage: image.imageUrl(),
  backgroundColor: internet.color(),
  description: datatype.string(200),
  rating: datatype.float(1),
  scoresCount: datatype.number(100000),
  director: `${name.firstName()} ${name.lastName()}`,
  starring: [
    `${name.firstName()} ${name.lastName()}`,
    `${name.firstName()} ${name.lastName()}`,
    `${name.firstName()} ${name.lastName()}`
  ],
  runTime: datatype.number(300),
  genre: Genre.Documentary,
  released: datatype.number(2023),
  id: datatype.number(),
  isFavorite: datatype.boolean(),
  videoLink: internet.url(),
  previewVideoLink: internet.url()
});

export const makeFakeReview = (): Review => ({
  id: datatype.number(),
  rating: datatype.number(10),
  comment: datatype.string(70),
  date: datatype.datetime().toDateString(),
  user: {
    id: datatype.number(),
    name: `${name.firstName()} ${name.lastName()}`
  }
});

export const makeFakeUser = (): User => ({
  name: `${name.firstName()} ${name.lastName()}`,
  id: datatype.number(),
  avatarUrl: image.imageUrl(),
  email: internet.email(),
  token: datatype.string(20)
});
