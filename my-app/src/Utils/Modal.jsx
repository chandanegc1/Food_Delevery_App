import React from "react";
import ReactDom from "react-dom";
import { RxCross1 } from "react-icons/rx";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  backgroundColor: "rgb(250,250,250)",
  transform: "translate(-50%, -50%)",
  zIndex: 1000,
  height: "90%",
  width: "90%",
  overflow: "auto",
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  zIndex: 1000,
};

export default function Modal({ children, onClose }) {
  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <button
          className="bg-red-600 p-2 rounded ml-[95%] mt-1 font-bold"
          style={{ marginLeft: "95%", marginTop: "5px" }}
          onClick={onClose}
        >
          <RxCross1 size={30} color="white" />
        </button>
        {children}
      </div>
    </>,
    document.getElementById("cart-root")
  );
}
