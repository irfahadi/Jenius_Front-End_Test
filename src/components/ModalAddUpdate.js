import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function ModalAddUpdate(props) {
const initForm = { id: null, 
        firstName: '',
        lastName: '',
        age: 0,
        photo:'N/A'
        }
const [Contact, setContact] = useState(initForm);
const [isedit, setisedit] = useState(false)
const [Loading, setLoading] = useState(false)

useEffect(() => {
if(props.Contact !== null){
setContact(props.Contact)
setisedit(true)
}
// console.log(props)
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

const handleOnChange = e =>{
let updateChange = {...Contact}
if(e.target.name==='age'){
    updateChange[e.target.name] = Number(e.target.value)
}else{
    updateChange[e.target.name] = e.target.value
}         
setContact(updateChange)
}

async function addContact(){
    return await axios({
        data:{
            firstName: Contact.firstName,
            lastName: Contact.lastName,
            age: Contact.age,
            photo: 'N/A'
        },
        url: `https://simple-contact-crud.herokuapp.com/contact`,
        method: "post",
       
    })
      .then(()=>{
            setLoading(false)
            return props.update()
        })
      .catch((err) => {
            setLoading(false)
            return console.error(err)
        });
  }

  async function updateContact(){
    return await axios({
        data:{
            firstName: Contact.firstName,
            lastName: Contact.lastName,
            age: Contact.age,
            photo: Contact.photo
        },
        url: `https://cors-anywhere.herokuapp.com/https://simple-contact-crud.herokuapp.com/contact/${Contact.id}`,
        method: "put",
        
    })
    
    .then(()=>{
        setLoading(false)
        return props.update()
    })
    .catch((err) => {
        setLoading(false)
        return console.error(err)
    });
  }

const handleOnSubmit = async e => {
setLoading(true)
e.preventDefault();
    const { name, value } = e.target;
   setContact({...Contact, [name]:value});
if(isedit){
    await updateContact()
    
}else{
    await addContact()
}
props.showModal(false);
}

const closeButton = () =>{
    props.showModal(false)
    props.setEditRow(null)
    setContact(initForm)
    setisedit(false)
}

const uploadPhoto = (e) =>
   setContact({...Contact, photo:e.target.files[0].name});

return (
  <>
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-auto my-6 mx-auto max-w-sm">
        {/*content*/}
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/*header*/}
          <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
            <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase ">
              Add Edit Contact
            </h6>
            <button
              onClick={() => {
                props.showModal(false);
                setContact(initForm);
              }}
              className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
            >
              <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          {/*body*/}
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form onSubmit={handleOnSubmit} encType="multipart/form-data">
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Contact Id
                    </label>
                    <input
                      disabled
                      type="text"
                      name="id"
                      value={Contact.id}
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-xs shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                      Fist Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={Contact.firstName}
                      onChange={handleOnChange}
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={Contact.lastName}
                      onChange={handleOnChange}
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                      Age
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={Contact.age}
                      onChange={handleOnChange}
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                    Photo
                  </label>
                  <div class="bg-grey-lighter">
                    <label class=" flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
                      <svg
                        class="w-8 h-8"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                      </svg>
                      <span class="mt-2 text-base leading-normal">
                        Select a file
                      </span>
                      <input type="file" class="hidden" name="photo" onChange={uploadPhoto}/>
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                <button
                  onClick={closeButton}
                  className="text-red-500 background-transparent font-bold  px-10 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  Close
                </button>
                {Loading ? (
                  <button
                    class="animate-pulse px-6 py-3 bg-green-500 text-green-100 rounded-lg text-sm"
                    disabled
                  >
                    Please Wait...
                  </button>
                ) : (
                  <button
                    className="bg-green-500 text-white active:bg-green-700 font-bold text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                  >
                    Submit Form
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </>
);
}
