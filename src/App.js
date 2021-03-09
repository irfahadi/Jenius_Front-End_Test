import { useEffect, useState } from "react";
import Table from "./components/Table";
import ModalAddUpdate from "./components/ModalAddUpdate";
import { useSelector, useDispatch } from "react-redux";
import { fetchContact } from "./features/contact/contactSlices";
import useDarkMode from "./features/useDarkMode"

function App() {
  const [ShowModal, setShowModal] = useState(false);
  const [EditRow, setEditRow] = useState(null);
  const dispatch = useDispatch();
  const { entities } = useSelector((state) => state.contact);
  const loading = useSelector((state) => state.loading);
  const { toggleDarkMode, darkMode } = useDarkMode(); // destructuring object yang dikembalikan oleh useDarkMode hooks.

  useEffect(() => {
    dispatch(fetchContact());
  }, [dispatch]);

  const showModal = (value) => {
    setShowModal(value);
  };

  const editRow = (value) => {
    setEditRow(value);
    showModal(true);
  };

  return (
    <div className="bg-background dark:bg-dk-background flex flex-wrap">
      <div className="w-full sm:w-1/4 bg-white dark:bg-dk-nav dark:text-gray-100 text-gray-500  text-center text-2xl font-bold py-10 sm:min-h-screen sm:h-auto h-40 shadow-lg ">
        <p>Contacts</p>
        <button
            className="p-2 md:px-6 md:py-2 text-white dark:text-black bg-gray-700 dark:bg-white hover:bg-gray-800 duration-300 rounded-sm shadow-lg focus:ring focus :ring-gray-300 focus:outline-none my-5"
            type="button"
            onClick={toggleDarkMode} // kita hanya perlu memasukkan nama fungsi dari useDarkMode ke dalam onClick attributes, sehingga React JS mampu mengeksekusi fungsi dari useDarkMode hooks tersebut.
          >
            {darkMode ? (
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth={2}
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                height="1.4em"
                width="1.4em"
                xmlns="http://www.w3.org/2000/svg"
                className="block md:hidden"
              >
                <circle cx={12} cy={12} r={5} />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth={2}
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                height="1.4em"
                width="1.4em"
                xmlns="http://www.w3.org/2000/svg"
                className="block md:hidden"
              >
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            )}
            <span className="hidden md:block">Toggle Dark Mode</span>
          </button>
      </div>
      <div className="w-full sm:w-3/4 p-4 shadow-md ">
        {loading ? (
          "Loading..."
        ) : (
          <Table
            Contact={entities}
            showModal={showModal}
            editRow={editRow}
            setEditRow={setEditRow}
          />
        )}
      </div>
      {ShowModal ? (
        <ModalAddUpdate
          showModal={showModal}
          Contact={EditRow}
          setEditRow={setEditRow}
          update = {()=>dispatch(fetchContact())}
        />
      ) : null}
    </div>
  );
}

export default App;
