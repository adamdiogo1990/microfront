import React from 'react';
import {
    Routes,
    Route
  } from "react-router-dom";
  
import CurrencyPosition from '../pages/CurrencyPosition';
import CurrencyPositionDetails from '../pages/CurrencyPositionDetails';
import Home from '../pages/Home';

const RoutesList: React.FC = () => (
    <Routes>
        
        <Route path="posicoes-cambiais" element={<CurrencyPosition />} />
        <Route path="motordecambio/posicoes-cambiais/detalhes/:date/:id" element={<CurrencyPositionDetails />} />
        <Route path="*" element={<CurrencyPosition />} />
    </Routes>
)

export default RoutesList;