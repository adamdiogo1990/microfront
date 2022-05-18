import React from 'react';
import {
    Routes,
    Route
  } from "react-router-dom";
import Associations from '../pages/Associations';
  
import Home from '../pages/Home';

const RoutesList: React.FC = () => (
    <Routes>
        
        <Route path="*" element={<Associations />} />
    </Routes>
)

export default RoutesList;