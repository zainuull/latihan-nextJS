import { BiCartAdd, BiTrash } from 'react-icons/bi';
import { BsGear } from 'react-icons/bs';
import { IDataCardModel } from '@/Model/ICardModel';
import React from 'react';
import Link from 'next/link';

interface ICardProductProps {
  products: IDataCardModel[];
}

const CardProduct = ({ products }: ICardProductProps) => {
  function formatPrice(price: number): string {
    const formattedPrice = price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
    return formattedPrice.replace(/\s/g, '');
  }

  return (
    <div className="w-full grid grid-cols-3">
      {products ? (
        products.length > 0 ? (
          <>
            {products?.map((product: IDataCardModel) => (
              <Link
                href={`/product/${product.id}`}
                className="rounded-lg grid-cols-1 relative group p-4"
                key={product.id}>
                <div className="flex flex-col gap-y-2 absolute top-10 right-7 opacity-0 group-hover:opacity-100 transition-all duration-300 text-white z-10">
                  <div className="bg-green-500 w-10 h-10 flex items-center justify-center rounded-l hover:bg-green-600 transition cursor-pointer">
                    <BiCartAdd size={25} />
                  </div>
                  <div className="bg-red-500 w-10 h-10 flex items-center justify-center rounded-l hover:bg-red-600 transition cursor-pointer">
                    <BiTrash size={20} />
                  </div>
                  <div className="bg-gray-500 w-10 h-10 flex items-center justify-center rounded-l hover:bg-gray-600 transition cursor-pointer">
                    <BsGear size={20} />
                  </div>
                </div>
                <div className="w-full relative cursor-pointer">
                  <div className="absolute w-full h-full top-0 left-0 opacity-0 group-hover:opacity-100 bg-black/20 transition-all duration-300"></div>
                  <img src={product.img} alt={product.name} />
                </div>
                <div className="w-full flex items-center justify-between mt-2">
                  <h1 className="text-xl font-bold">{product.name}</h1>
                  <h2 className="font-thin">{product.price && formatPrice(product.price)}</h2>
                </div>
                <h3 className="text-sm text-gray-400">{product.category}</h3>
              </Link>
            ))}
          </>
        ) : null
      ) : (
        <div className="w-full grid grid-cols-1 px-6">
          <div className="rounded-lg grid grid-cols-1 mt-4">
            <div className="w-full h-[300px] bg-gray-200 animate-pulse transition-all"></div>
            <div className="w-full h-[40px] bg-gray-200 animate-pulse transition-all mt-2"></div>
            <div className="w-full h-[20px] bg-gray-200 animate-pulse transition-all mt-2"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardProduct;
