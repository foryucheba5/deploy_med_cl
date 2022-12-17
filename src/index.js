import React, {createContext, useState} from 'react';
import App from './App';
import { createRoot } from "react-dom/client";


export const Context = React.createContext();



export default function Main(){
const [user, setUser] = useState(false);
return(  
<Context.Provider value={[user, setUser]}>
  <App />
</Context.Provider>)

}
createRoot(document.getElementById('root')).render(
  <Main />

);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

