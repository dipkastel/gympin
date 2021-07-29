import React from 'react';
import Navbar from "../../components/navbar/Navbar";
import FastSearch from "../../components/fastSearch/FastSearch";
import Advertise from "../../components/advertise/Advertise";
import Data from "../../components/data/Data";
import Footer from "../../components/footer/Footer";
import "./App.css"

function App() {
  return (
    <div className="App">
        <Navbar/>
        <FastSearch/>

        <div className="pattern-top"> </div>
        <div className="container3" >
            <div className="row">
                <Advertise/>
                <div className="clear"></div>

            </div>
        </div>
        <Data/>
        <Footer/>
    </div>
  );
}

export default App;
