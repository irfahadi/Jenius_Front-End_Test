import React, {  useEffect, useState } from "react";
import ModalDelete from "./ModalDelete";

export default function Table(props) {
  const [ShowMenu, setShowMenu] = useState(false)
  const [ShowDelete, setShowDelete] = useState(false)
  const [EditRow, setEditRow] = useState()
  const [Contact, setContact] = useState()

  useEffect(() => {
    console.log(props.Contact)
    setContact(props.Contact)
  }, [props.Contact])

  const showMenu = (value) =>{
      setEditRow(value)
      setShowMenu(true)
  }
  const closeMenu =()=>{
    props.setEditRow(null)
    setShowMenu(false)
  }
  return (
    <>
      <div className="grid justify-items-stretch mb-4">
        {ShowMenu ? (
          <div className="justify-self-start">
            <button
              onMouseDownCapture={() => props.editRow(EditRow)}
              className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left hover:bg-btn-edit hover:text-white mr-2 rounded-lg"
              type="button"
            >
              Edit category
            </button>
            <button
              onMouseDownCapture={() => setShowDelete(true)}
              className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left hover:bg-btn-delete hover:text-white rounded-lg"
              type="button"
            >
              Delete category
            </button>
          </div>
        ) : (
          <div className="justify-self-end">
            <button
              onClick={() => props.showModal(true)}
              className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left hover:bg-btn-add hover:text-white rounded-lg"
              type="button"
            >
              Add Contact
            </button>
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-dk-table flex flex-row text-center items-center rounded mb-2 py-2 px-10 md:px-20 xl:pl-48 xl:pr-40 text-gray-500 font-bold">
        <div className="w-1/3"></div>
        <div className="w-1/3">First Name</div>
        <div className="w-1/3">Last Name</div>
        <div className="w-1/3">Age</div>
      </div>
      {Contact?.length>0?(
        Contact.map((x) => (
          <button
            className="bg-white dark:bg-dk-table w-full flex flex-row justify-start items-center rounded px-10 md:px-24 xl:px-56 mb-1 focus:bg-table focus:text-white"
            onFocus={() => showMenu(x)}
            onBlur={closeMenu}
          >
            <img
              src={x.photo === "N/A" ? "foto.png" : x.photo}
              alt="foto"
              className=" w-20 h-20 text-white p-3 rounded-full"
            />
            <div className="w-1/3 pl-5  md:pl-16 xl:pl-20">{x.firstName}</div>
            <div className="w-1/3 pl-5 md:pl-16 xl:pl-28 ">{x.lastName}</div>
            <div className="w-1/3 pl-1  md:pl-12 xl:pl-28">{x.age}</div>
          </button>
        ))
      )
      :
      <div>No Contact Found</div>
      }
      
      {ShowDelete ? (
        <ModalDelete
          image={EditRow.photo}
          name={EditRow.firstName}
          id={EditRow.id}
          close={()=>setShowDelete(false)}
        />
      ) : null}
    </>
  );
}
