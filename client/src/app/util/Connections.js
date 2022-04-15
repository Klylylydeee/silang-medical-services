import { useEffect } from "react";

function UseNetwork(variable, setter){
    const updateNetwork = () => {
        setter(window.navigator.onLine);
    };
    useEffect(() => {
       window.addEventListener("offline", updateNetwork);
       window.addEventListener("online", updateNetwork);
       console.log(variable)
       return () => {
          window.removeEventListener("offline", updateNetwork);
          window.removeEventListener("online", updateNetwork);
       };
    });
};

export default UseNetwork;