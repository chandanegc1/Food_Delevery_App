import React, { useEffect, useState } from "react";
import axios from "axios";
import FormatDate from "../Utils/FormatDate";
import { toast } from "react-toastify";
import { API_CLEAR_ORDER, API_GET_ORDER } from "../Utils/APIs";

const Myorder = () => {
  const [orderedData, setOrderedData] = useState([]);
  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData);

  const myOrder = async () => {
    try {
      const response = await axios.post(API_GET_ORDER, { userId: user._id });
      if (response) setOrderedData(response.data.sortedData);
    } catch (error) {
      console.error(error);
      toast.error("Erro while Getting your Data");
    }
  };

  const clearOrder = async () => {
    try {
      const response = await axios.post(API_CLEAR_ORDER, { userId: user._id });
      if (response) setOrderedData(response.data.order);
      toast.success("History Cleared");
    } catch (error) {
      console.error(error);
      toast.error("Something went Wrong!!");
    }
  };
  useEffect(() => {
    myOrder();
    // eslint-disable-next-line
  }, []);

  return orderedData.length > 0 ? (
    <div className="w-full h-full text-white py-4 md:px-12 px-4">
      <h1 className="text-2xl font-bold">My Order History</h1>
      <div className="grid md:grid-cols-4 grid-cols-3 p-8 text-xl font-semibold text-green-500">
        <p>Item</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Date</p>
      </div>
      <hr />
      {orderedData.map((currElem) => (
        <div
          key={currElem._id}
          className="grid md:grid-cols-4 grid-cols-3 md:text-xl md:p-6 p-4 font-semibold"
        >
          <h1>{currElem.name}</h1>
          <span className="price">{currElem.price}</span>
          <p className="amount">{currElem.qty}</p>
          <p className="md:block hidden">
            <FormatDate dateString={currElem.date.toString()} />
          </p>
        </div>
      ))}

      <button
        className="text-red-600 p-4 md:text-2xl text-xl font-bold"
        onClick={clearOrder}
      >
        Clear Order History
      </button>
    </div>
  ) : (
    <div className="text-white p-4 text-xl font-medium">
      You have not ordered Yet
    </div>
  );
};

export default Myorder;
