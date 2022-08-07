import "./App.css";

import React, { Component } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import NewsItem from "./components/NewsItem";

export default class App extends Component {
  pagesize= 15;
  render() {
    return (

      <>
        <Router>
          <NavBar/>
          <Routes>
            <Route exact path="/" element={<News key="general" pagesize={this.pagesize} country="in" category="general"/>}/>
            <Route exact path="/general" element={<News key="general" pagesize={this.pagesize} country="in" category="general"/>}/>
            <Route exact path="/business" element={<News key="business" pagesize={this.pagesize} country="in" category="business"/>}/>
            <Route exact path="/entertainment" element={<News key="entertainment" pagesize={this.pagesize} country="in" category="entertainment"/>}/>
            <Route exact path="/health" element={<News key="health" pagesize={this.pagesize} country="in" category="health"/>}/>
            <Route exact path="/science" element={<News key="science" pagesize={this.pagesize} country="in" category="science"/>}/>
            <Route exact path="/sports" element={<News key="sports" pagesize={this.pagesize} country="in" category="sports"/>}/>
            <Route exact path="/technology" element={<News key="technology" pagesize={this.pagesize} country="in" category="technology"/>}/>
          </Routes>
        </Router>
      </>
    );
  }
}
