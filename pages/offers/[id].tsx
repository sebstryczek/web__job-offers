import { GetStaticProps } from 'next';
import Layout from '../../components/Layout';
import { useState } from '../../components/Offers';
import { Offer } from '../../types';
import getOffers from '../../utils/getOffers';

type Props = {
  id: string;
  item?: Offer;
  error?: string;
};

const OfferDetailsPage: React.FC<Props> = ({ id, item, error }) => {
  if (error) {
    return (
      <Layout title='Error'>
        Offer not found!
      </Layout> 
    );
  };

  const { state } = useState();

  console.log(state.offers);

  const offer = item || state.offers.find(item => item.id === id);

  if (!offer) {
    return (
      <Layout title='Error'>
        Offer not found!
      </Layout> 
    );
  };

  return (
    <Layout
      title={'Details'}
    >
      {offer.title}
    </Layout>
  )
}
export const getStaticPaths = async () => {
  const data = await getOffers();

  const paths = data.map((item) => ({
    params: { id: item.id },
  }));
  
  return {
    paths: paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await getOffers();
  
  try {
    const id = params?.id;
    const item = data.find(item => item.id === id) || null;
    return { props: { id, item } }
  } catch (err) {
    return { props: { error: err.message } }
  }
}

export default OfferDetailsPage;
