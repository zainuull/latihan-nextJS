import CardProduct from '@/components/CardProduct';
import { fetcher } from '@/lib/swr/fetcher';
import useSWR from 'swr';

const Product = () => {
  const { data, error, isLoading } = useSWR('/api/products', fetcher);

  return <CardProduct products={data?.data} />;
};

export default Product;
