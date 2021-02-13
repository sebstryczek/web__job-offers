import Axios from 'axios';
import { Offer } from '../types';

let offers: Offer[] | null = null;

const getOffers = async (): Promise<Offer[]> => {
  // TODO use "real" caching
  if (offers) {
    return offers;
  }

  const API_URL = 'https://test.justjoin.it/offers';
  const { data } = await Axios.get(API_URL);
  
  offers = data;

  return data;
};

export default getOffers;
