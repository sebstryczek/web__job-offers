import Axios from 'axios';
import { Offer } from '../types';

const getOffers = async (): Promise<Offer[]> => {
  const API_URL = 'https://test.justjoin.it/offers';
  const { data } = await Axios.get(API_URL);

  return data;
};

export default getOffers;
