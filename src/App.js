import { useEffect, useState } from "react";
import Table from "./components/Table";
import ModalAddUpdate from "./components/ModalAddUpdate";
import { useSelector, useDispatch } from "react-redux";
import { fetchContact } from "./features/contact/contactSlices";

function App() {
  const [ShowModal, setShowModal] = useState(false);
  const [EditRow, setEditRow] = useState(null);
  const dispatch = useDispatch();
  const { entities } = useSelector((state) => state.contact);
  const loading = useSelector((state) => state.loading);

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
    <div className="bg-background flex flex-wrap">
      {/* {console.log(entities)} */}
      <div className="w-full sm:w-1/4 bg-white text-gray-500 text-center text-2xl font-bold py-10 sm:min-h-screen sm:h-auto h-40 shadow-lg ">
        Contacts
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
        />
      ) : null}
    </div>
  );
}

export default App;
