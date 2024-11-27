import logo from './logo.svg';
import './App.css';
import Header from "./header/Header";

function App() {
    function PenisSwitch(penisSize)
    {
        if (penisSize === 1){
            console.log("понятно");
        return}
        if (penisSize === 0){
            console.log("буээ");
        return;}
    }
  return (
      <div className="App">
          <Header/>
        <h1 id="envelope"> suka </h1>
        <h2> какая у сани</h2>
        <button className="Popa" onClick={PenisSwitch(1)}> @=============3</button>
        <button className="Popa" onClick={PenisSwitch(0)}> @==3</button>
          <div className="container">
              <div className="div1"></div>
              <div className="div2"></div>
              <div className="div3"></div>

          </div>
      </div>
  );
}

export default App;
