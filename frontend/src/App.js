import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Row, Col} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header.js";
import FunctionalBar from "./FunctionalBar.js";
import NavMenuBar from "./NavMenuBar.js";
import AddINC from "./Components/AddIncidentDetails.js";
import EditINC from "./Components/EditIncidentDetails.js";
import ViewINC from "./Components/ViewIncidentDetails.js";
import FilteredList from "./Components/SearchIncidentDetails.js";
import Footer from "./Footer.js";


class App extends Component {
  render() {
    return (






      <Router>
        <Header></Header>

        <Row>
          <Col xs={2}><NavMenuBar></NavMenuBar></Col>
          <Col xs={10}>
            <FunctionalBar></FunctionalBar>
            
            </Col>
        </Row>

        <Footer></Footer> 
        

        
      </Router>
    );
  }
}

export default App;