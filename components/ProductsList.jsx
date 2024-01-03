"use client";

import React from "react";
import { useAppContext } from "@/context/AppContext";
import Loader from "./shared/Loader";

const ProductsList = () => {
  const { state } = useAppContext();

  return (
    <section>
      {/* <h2 className="text-[16px] mb-2">You will see the products here ↓</h2> */}

      <div className="w-full bg-white shadow-xl p-5 rounded-[8px]">
        <h3 className="text-[18px] text-center mb-8 font-bold">
          Average Price of the Product in MercadoLibre: <br />
          <span className="pl-6 flex justify-center items-start">
            $
            <span className="text-[34px] font-bold">
              {state.allProducts[0] == undefined
                ? "---"
                : state.allProducts[state.allProducts.length - 1].average_price}
            </span>
          </span>
        </h3>

        <div>
          <h3 className="text-[18px] border-b-2 border-gray-400 mb-8 font-bold">
            Products
          </h3>

          {state.allProducts[0] == undefined && state.loading == false ? (
            <p className="text-gray-400">Waiting an entry...</p>
          ) : (
            ""
          )}

          {state.loading === true ? (
            <div className="flex gap-[10px] justify-center items-center text-[16px]">
              <Loader />
            </div>
          ) : (
            state.allProducts.map((product, index) => (
              <div
                key={index}
                className="flex justify-center md:justify-start items-start gap-8 flex-wrap"
              >
                {product.data.Titles.map((title, i) => (
                  <div
                    key={i}
                    className="max-w-[300px] mb-8 pb-6 pr-2 border-b-2 border-r-2 border-gray-200"
                  >
                    <p className="mb-4">{title}</p>
                    <p className="flex text-[14px]">
                      $
                      <span className="text-[20px] font-bold">
                        {product.data.Prices[i]}
                      </span>
                    </p>
                    <a
                      href={product.data.URLs[i]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 text-[16px] underline"
                    >
                      Ver Detalles
                    </a>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductsList;
