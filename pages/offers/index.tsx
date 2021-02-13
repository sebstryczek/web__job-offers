import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Layout from '../../components/Layout'
import { useStore } from '../../components/Offers';
import { Offer } from '../../types';
import getOffers from '../../utils/getOffers';

type Props = {
  data: Offer[]
}

const OffersPage: React.FC<Props> = ({ data }) => {
  const { dispatch } = useStore();
  useEffect(() => {
    dispatch({
      type: 'OFFERS_FETCHED',
      payload: data,
    });
  }, data);

  const categories: string[] = useMemo(() => {
    return data.reduce<string[]>((acc, item) => {
      const { skills } = item;
      skills.forEach(skill => {
        if (!acc.includes(skill.name)) {
          acc.push(skill.name);
        }
      })
      return acc;
    }, []);
  }, [data]);

  const [filters, setFilters] = useState<string[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);

  const router = useRouter();
  const { pathname, query } = router;

  const handleOnClick = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const clickedCategory = event.currentTarget.value.toLowerCase();
    const currentValue = query.filter || [];
    const currentCategories = Array.isArray(currentValue) ? currentValue : [currentValue]
    const filter = currentCategories.includes(clickedCategory)
      ? currentCategories.filter(f => f !== clickedCategory)
      : [...currentCategories, clickedCategory];

    router.push({
      pathname,
      query: {
        ...query,
        filter: filter,
      }
    })
  }, [filters, setFilters, query, router]);

  useEffect(() => {
    const offers = query.filter && query.filter.length > 0 ? data.filter(item => item.skills.find(skill => (query.filter || []).includes(skill.name.toLowerCase()))) : data;

    console.log(offers)
    setOffers(offers);
  }, [query, filters]);

  return (
    <Layout title="Offers List">
      {
        categories.map(category => (
          <button value={category} onClick={handleOnClick} style={{
            background: (query.filter || []).includes(category.toLowerCase()) ? 'red' : 'blue'
          }}>{category}</button>
        ))
      }
      {
        offers.map(item => (
          <div key={item.id}>
            <Link href={`/offers/${item.id}`}>
              {`${item.company_name} - ${item.title}`}
            </Link>
          </div>
        ))
      }
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

export default OffersPage
