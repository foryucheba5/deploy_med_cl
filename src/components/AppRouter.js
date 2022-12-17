import React, { useContext, useEffect, useState } from 'react';
import { Routes ,Route} from 'react-router-dom';
import { authRoutes, publicRoutes } from "../routes";
import {Context} from "../index";
import Check from '../pages/Check';

const AppRouter = () => {
    const [user, setUser] = useContext(Context);
    return (
        <Routes>       
            {user===true && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )} 
            <Route path="*" element={<Check/>} />
        </Routes>
    );  
}; 

export default AppRouter;