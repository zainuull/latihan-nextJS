import { IDataCardModel } from '@/Model/ICardModel';
import CardProduct from '@/components/CardProduct';
import axios from 'axios';

interface ICardProps {
  products: IDataCardModel[];
}

const StaticSide = ({ products }: ICardProps) => {
  return <CardProduct products={products} />;
};

export default StaticSide;

export async function getStaticProps() {
  //Fetch Data
  const res = await axios.get('http://localhost:3000/api/products');

  return {
    props: {
      products: res.data.data,
    },
    revalidate: 10,
  };
}
