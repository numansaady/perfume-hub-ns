/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';

const ProductItem = ({ product, handleAddToCart }) => {
  return (
    <div className="product-item card bg-slate-50 hover:shadow-xl">
      <Link href={`/product/${product.slug}`}>
        <a>
          <img
            src={product.image}
            alt={product.name}
            className="rounded shadow block mt-4 mx-auto"
          />
        </a>
      </Link>

      <div className="flex flex-col justify-center items-center p-5">
        <Link href={`/product/${product.slug}`}>
          <a>
            <h2 className="text-lg"><strong>{product.name}</strong></h2>
          </a>
        </Link>
        <p className="mb-2"><strong>Brand : </strong>{product.brand}</p>
        <p className="mb-2"><strong>Price : </strong>${product.price}</p>
        <button
          className="primary-button"
          type="button"
          onClick={() => handleAddToCart(product)}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
