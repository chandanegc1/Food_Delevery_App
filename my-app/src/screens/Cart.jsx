import React from "react";
import axios from "axios";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dropItems, removeItem } from "../App/cartReducer";
import {
  API_CHEKOUT_ORDER,
  API_GET_KEY,
  API_SET_ORDER,
  API_VALIDATE,
} from "../Utils/APIs";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart.cart);
  const jsonData = localStorage.getItem("user");
  const user = JSON.parse(jsonData);

  const totalPrice = cart.reduce((total, food) => total + food.price, 0);

  const placeOrder = async () => {
    const data = localStorage.getItem("user");
    const user = JSON.parse(data);
    try {
      await Promise.all(
        cart.map(async (item) => {
          await axios.post(API_SET_ORDER, {
            name: item.name,
            qty: item.qty,
            price: item.price,
            userId: user._id,
          });
        })
      );
      dispatch(dropItems());
      toast.success("Order Placed");
      navigate("/orders", { replace: true });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!!");
    }
  };

  const checkout = async () => {
    try {
      const {
        data: { key },
      } = await axios.get(API_GET_KEY);

      const response = await axios.post(API_CHEKOUT_ORDER, {
        totalPrice,
      });

      // Razorpay Configurations
      const options = {
        key,
        amount: response.data.order.price,
        currency: "INR",
        name: `${user.name.split(" ")[0]}'s Cart`,
        description: `${
          user.name.split(" ")[0]
        }'s Transaction is under Processing...`,
        image: "https://avatars.githubusercontent.com/u/114284694?v=4",
        order_id: response.data.order.id,
        handler: async function (response) {
          const body = { ...response };
          const validateRes = await axios.post(API_VALIDATE, body);
          if (validateRes) {
            await placeOrder();
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        notes: {
          address: user.address,
        },
        theme: {
          color: "#d90429",
        },
      };

      const razor = new window.Razorpay(options);
      razor.on("payment.failed", function (response) {
        toast.error("Payment Failed");
        console.log(response);
      });
      razor.open();

      toast.success("Order is processing...");
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error("Failed to checkout");
    }
  };

  return cart.length > 0 ? (
    <div>
      <div className="m-auto mt-5 table-responsive table-responsive-sm table-responsive-md table-responsive-lg">
        <table className="table">
          <thead className="text-danger fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((food, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button
                    type="button"
                    className=" hover:scale-110 duration-300"
                    onClick={() => dispatch(removeItem(food))}
                  >
                    <RiDeleteBin6Fill size={25} color="red" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-2">
          <h1 className="fs-2">Total Price : ₹ {totalPrice}/-</h1>
        </div>
        <div>
          <button className="btn bg-danger text-white mt-5" onClick={checkout}>
            Check Out
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <div className="m-5 w-100 text-center text-danger font-weight-bold fs-2">
        The Cart is Empty !
      </div>
    </div>
  );
};

export default Cart;
