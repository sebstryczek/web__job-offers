import { GetStaticProps } from 'next';
import Layout from '../../components/Layout';
import { Offer } from '../../types';
import getOffers from '../../utils/getOffers';

type Props = {
  offer?: Offer;
  error?: string;
};

const OfferDetailsPage: React.FC<Props> = ({ offer, error }) => {
  if (!offer || error) {
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
  return {
    paths: [],
    fallback: true,
  };
};

// export const getStaticPaths: GetStaticPaths = async () => {
//   // Get the paths we want to pre-render based on users
//   // const paths = sampleUserData.map((user) => ({
//   //   params: { id: user.id.toString() },
//   // }))

//   // // We'll pre-render only these paths at build time.
//   // // { fallback: false } means other routes should 404.
//   // return { paths, fallback: false }
// }

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await getOffers();
  
  try {
    const id = params?.id;
    const item = data.find(item => item.id === id) || null;
    return { props: { item } }
  } catch (err) {
    return { props: { error: err.message } }
  }
}

export default OfferDetailsPage;
