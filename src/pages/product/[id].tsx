import { IDataCardModel } from '@/Model/ICardModel';
import DetailProductView from '@/components/DetailProduct';
import { fetcher } from '@/lib/swr/fetcher';
import axios from 'axios';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const DetailProduct = ({ products }: { products: any }) => {
  // const { query } = useRouter();

  // Client Side
  // const { data, error, isLoading } = useSWR(`/api/products/${query.id}`, fetcher);

  return (
    <div>
      {/* Client Side */}
      {/* <DetailProductView product={isLoading ? [] : data?.data} /> */}

      {/* Server Side */}
      {/* <DetailProductView product={products} /> */}

      {/* Statuc Side */}
      <DetailProductView product={products} />
    </div>
  );
};

export default DetailProduct;

// export async function getServerSideProps({ params }: { params: { id: string } }) {
//   //Fetch Data
//   const res = await axios.get(`http://localhost:3000/api/products/${params.id}`);

//   return {
//     props: {
//       products: res.data.data,
//     },
//   };
// }

export async function getStaticPaths() {
  const res = await axios.get(`http://localhost:3000/api/products`);

  const paths = res.data.data.map((product: any) => ({
    params: {
      id: product.id,
    },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  //Fetch Data
  const res = await axios.get(`http://localhost:3000/api/products/${params.id}`);

  return {
    props: {
      products: res.data.data,
    },
  };
}
