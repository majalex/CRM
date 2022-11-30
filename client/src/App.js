import React from "react";
import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Costumers from './Components/Costumers';
import AddNew from './Components/AddNew';
import SingleCustomer from './Components/SingleCustomer';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
  const [data, setData] = useState([]);

  const getData = async () => {
    const { data } = await axios.get(`http://localhost:8080/api/all`);
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);


  return (
      <BrowserRouter>
        <Routes>
          <Route index element={<Costumers getData={getData} data={data} setData={setData} />}/>
          <Route path="/add" element={<AddNew getData={getData}/>}/>
          <Route path= "/:id" element={<SingleCustomer />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
