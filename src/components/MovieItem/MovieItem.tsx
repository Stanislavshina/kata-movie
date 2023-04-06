import React, { useEffect, useState } from 'react';
import { Rate, Typography } from 'antd';
import { format } from 'date-fns';

import { Movie } from '../../types/Movie';

import Rating from './Rating/Rating';
import MoviePoster from './MoviePoster/MoviePoster';
import './MovieItem.scss';
import { postRating } from '../../api/apiServices';

export type MovieItemProps = {
  movie: Movie;
};

const { Title, Paragraph } = Typography;

const MovieItem: React.FC<MovieItemProps> = ({ movie }) => {
  const { genres, title, overview, poster_path, release_date, vote_average, id } = movie;
  const [rate, setRate] = useState<number>(0)

  const token: string | null = localStorage.getItem('token');

  const tokenString = token ? token : null;


  useEffect(()=>{
    const getId = localStorage.getItem(id.toString())
    
    if(getId) {
      setRate(Number(getId));
      console.log(rate);
      
    }
  },[])

  const handleOnChange = (id: number, value: number) => {
    setRate(value)
    localStorage.setItem(id.toString(), value.toString());
    postRating(id, value, tokenString)
  }
  const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) {
      return text;
    }

    const lastSpace = text.lastIndexOf(' ', maxLength);
    if (lastSpace === -1) {
      return `${text.substring(0, maxLength)}...`;
    }

    const trimmedText = text.substring(0, lastSpace);
    if (trimmedText.length < text.length) {
      return `${trimmedText}...`;
    }

    return text;
  };
  const truncText = truncateText(overview, 120);

  const releaseDate = release_date ? new Date(release_date) : null;
  const date = releaseDate ? format(releaseDate, 'MMMM dd, yyyy') : 'unknown';

  return (
    <li className="movie-card">
      <MoviePoster poster_path={poster_path} className={'movie-card__img'} />
      <div className="movie-card__content">
        <header className="movie-card__header">
          <Title className="movie-card__title" level={4}>
            {title}
          </Title>
          <span className="movie-card__release-date">{date}</span>
          <ul className="movie-card__genres-list genres-list">
            {genres.map((genre) => (
              <li key={genre.id} className="genres-list__item">
                {genre.name}
              </li>
            ))}
          </ul>
          <Rating rating={vote_average} className={'movie-card__rating'} />
        </header>
        <Paragraph className="movie-card__info">{truncText}</Paragraph>
        <Rate
          className="movie-card__rate"
          count={10}
          allowHalf
          defaultValue={rate}
          onChange={(value)=>handleOnChange(id, value)}
        />
      </div>
    </li>
  );
};

export default MovieItem;
