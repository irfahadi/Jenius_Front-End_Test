import axios from "axios";
import React, { useState } from "react";


export default function ModalDelete(props) {
  console.log(props)
  const [Loading, setLoading] = useState(false)

  async function deleteCart() {
    setLoading(true)
    return await axios({
      url: `https://simple-contact-crud.herokuapp.com/contact/${props.id}`,
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
        },
    })
      .then(()=>{
        setLoading(false)
        return props.close()
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
        return props.close()});
  }

  return (
    <div className="fixed inset-0 w-full h-full z-20 bg-black bg-opacity-50 duration-300 overflow-y-auto-auto pt-40">
      <div className="bg-white rounded-lg w-full sm:w-2/3 lg:w-1/3 mx-auto">
        <div className="w-98 border-t-8 border-btn-delete rounded-lg flex">
          <div className="w-1/3 pt-6 flex justify-center">
            <img
              src={props.image==='N/A'?'foto.png':props.image}
              alt="product"
              className="w-24 h-24 text-white p-3 rounded-full"
              fill="none"
              viewBox="0 0 24 24"
              height="24"
              width="24"
            />
          </div>
          <div className="w-full pt-9 pr-4">
            <h3 className="font-bold text-btn-delete">Delete {props.name}?</h3>
            <p className="py-4 text-sm text-gray-400">
              Are you sure you want to delete Contact {props.name}?
            </p>
          </div>
        </div>

        <div className="p-4 flex space-x-4">
          <button
            className="w-1/2 px-4 py-3 text-center bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-black font-bold rounded-lg text-sm"
            onClick={props.close}
          >
            Cancel
          </button>
          {Loading? <button class="animate-pulse w-1/2 px-4 py-3 bg-btn-delete text-red-100 rounded-lg text-sm" disabled>Please Wait...</button>:
          <button
          className="w-1/2 px-4 py-3 text-center text-white bg-gray-600 rounded-lg hover:bg-btn-delete hover:text-white font-bold text-sm"
          onClick={deleteCart}
        >
          Delete Product
        </button>
          }
          
        </div>
      </div>
    </div>
  );
}
