import Layout from '../../components/Layout'
import { Offer } from '../../types';
import getOffers from '../../utils/getOffers';

type Props = {
  data: Offer[]
}

const OffersPage: React.FC<Props> = ({ data }) => (
  <Layout title="Offers List">
    {
        data.map(item => (
          <div key={item.id}>
            {`${item.company_name} - ${item.title}`}
          </div>
        ))
      }
  </Layout>
);

export const getServerSideProps = async () => {
  const data = await getOffers();
  return {
    props: {
      data,
    },
  };
};

export default OffersPage
