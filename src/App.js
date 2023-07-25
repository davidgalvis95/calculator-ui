import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RoutesComponent from "./Routes";
import "./App.css";
import Modal from "./components/modal/Modal";

function App() {
  const error = useSelector((state) => state.error);
  const [modalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.log(process.env.REACT_APP_API_BASE_URL);
  }, []);
  
  useEffect(() => {
    if (error.title) {
      setIsModalOpen(true);
    }
  }, [error.title]);

  const setIsOpen = (value) => {
    setIsModalOpen(value);
  };
  return (
    <div className="container">
      {modalOpen && (
        <Modal
          setIsOpen={setIsOpen}
          message={error.message}
          title={error.title}
        />
      )}
      <RoutesComponent />
    </div>
  );
}

export default App;
