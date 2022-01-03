import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { myAsyncInSlice } from "src/app/store/user/userInformation";

function App() {
  const { name } = useSelector((state) => state.user);  
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(process.env)
  }, [] )
  return (
    <div className="App">
      { name }
      <button onClick={() => { dispatch(myAsyncInSlice("data")) }}>
        start
      </button>
    </div>
  );
}

export default App;
