import { createContext } from 'react';
import { Genres } from '../types/Genres';

const { Provider, Consumer } = createContext<Genres[]>([]);

export { Provider, Consumer };
