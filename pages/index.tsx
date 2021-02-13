import Layout from '../components/Layout'
import getOffers from '../utils/getOffers';


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
