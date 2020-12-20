import Axios from 'axios';
import Layout from '../components/Layout'
import { Offer } from '../types';
import getOffers from '../utils/getOffers';

type Props = {
  data: Offer[];
};

const IndexPage = () => {
  return (
    <Layout title="Yo!">
      MAP
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const data = await getOffers();
  return {
    props: {
      data,
    },
  };
};

export default IndexPage
