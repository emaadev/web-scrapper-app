"use client";
import { actionTypes, useAppContext } from "@/context/AppContext";
import React, { useState } from "react";

const SearchComponent = () => {
  const { state, dispatch } = useAppContext();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    dispatch({ type: actionTypes.SET_LOADING, payload: true });

    try {
      const res = await fetch(
        "https://web-scrapper-production.up.railway.app/search",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ product: state.product, limit: state.limit }),
        }
      );

      if (res.ok) {
        const data = await res.json();
        dispatch({ type: actionTypes.SET_SEARCH_DATA, payload: data });
        dispatch({ type: actionTypes.SET_ALL_PRODUCTS, payload: data });
      } else {
        console.log(
          "An error has ocurred in the backend. Please try again later."
        );
      }
    } catch (error) {
      console.log(`An error has ocurred:`, error);
    } finally {
      dispatch({ type: actionTypes.SET_LOADING, payload: false });
    }
  };

  return (
    <form
      className="flex flex-col gap-4 max-w-[350px] mb-[60px] md:mb-0 leading-7"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-[2px]">
        <label htmlFor="product" className="text-[16px] font-medium">
          Type a Product
        </label>
        <input
          type="text"
          name="product"
          placeholder="Macbook 2023..."
          value={state.product}
          onChange={(e) =>
            dispatch({
              type: actionTypes.SET_PRODUCT,
              payload: e.target.value,
            })
          }
          className="rounded-[8px] h-[40px] border-[1px] shadow-xl border-gray-300 p-2"
        />
      </div>

      <div className="flex flex-col gap-[2px] mb-[10px]">
        <label htmlFor="limit" className="text-[16px] font-medium">
          Set a limit
        </label>
        <input
          type="number"
          name="limit"
          min={1}
          max={20}
          placeholder={`${state.limit}`}
          onChange={(e) =>
            dispatch({
              type: actionTypes.SET_LIMIT,
              payload: Number(e.target.value),
            })
          }
          className="rounded-[8px] h-[40px] border-[1px] shadow-xl border-gray-300 p-2"
        />
      </div>

      <div className="flex-1">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-400 text-white text-[16px] font-medium w-[120px] h-[45px] rounded-[8px] shadow-xl"
        >
          Search ✓
        </button>
      </div>
    </form>
  );
};

export default SearchComponent;
