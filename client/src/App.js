import React from "react";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Home from './Components/Home';
import AddNew from './Components/AddNew';
import SingleClient from './Components/SingleClient';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
  const [data, setData] = useState([]);

  const getData = async () => {
    const { data } = await axios.get(`http://localhost:8080/api/client/all`);
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);


  return (
      <BrowserRouter>
        <Routes>
          <Route index element={<Home getData={getData} data={data} setData={setData} />}/>
          <Route path="/add" element={<AddNew getData={getData}/>}/>
          <Route path= "/:id" element={<SingleClient />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
