import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Widget, addResponseMessage ,addLinkSnippet, addUserMessage } from 'react-chat-widget';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import 'react-chat-widget/lib/styles.css';

const INC = props => (
    <tr>
        <td>{props.incKey.INC_Subject}</td>
        <td>{props.incKey.INC_Description}</td>
        {/*  <td>{props.incKey.INC_RaisedOn}</td> */}
        <td>{props.incKey.INC_ImpactedApplications}</td>
        <td>{props.incKey.INC_AssignedTo}</td>
        <td>{props.incKey.INC_Type}</td>
        <td>{props.incKey.INC_Priority}</td>
        <td>{props.incKey.INC_Status}</td>

        <td>
            <Link to={"/edit/" + props.incKey._id}>Edit</Link>
        </td>
    </tr>
)

export default class SearchINC extends Component {

    constructor() {
        super();
        this.updateSearch=this.updateSearch.bind(this);
        this.state = { 
            incs: [],
            search:''  };
            
        


    }

    // componentDidMount() {
    //     addResponseMessage("Welcome to this automation Resolution chat!");
    //   }
     
      handleNewUserMessage = (newMessage) => {
        console.log(`New message incoming! ${newMessage}`);
        // Now send the message throught the backend API
        

        // var as = axios.get('http://localhost:8080/classify');
        // console.log(as)
        

        axios.get('http://localhost:8080/classify/'+newMessage)
        .then(response => {
            console.log(response)
            addResponseMessage(response.data);
            }
        )
        .catch(function (error) {
            console.log(error);
        })



      }

    updateSearch(e){
        
        this.setState({
            search: e.target.value
            
        });
        
    }


    componentDidMount() {
        axios.get('http://localhost:4000/incs/')
            .then(response => {
                this.setState({ incs: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    /* todoList() {
        return this.state.incs.map(function (currentTodo, i) {
            return <INC incKey={currentTodo} key={i} />;
        })
    } */

    

    


    render() {


        

        let SearchINCs=this.state.incs.filter(
            (inc)=>{
                return inc.INC_Description.toString().toLowerCase().indexOf(this.state.search.toString().toLowerCase()) !== -1;
            }
        );


        return (
            

            <div>
                <h3>INCIDENT Current List</h3>  <i class="fas fa-robot"></i>

                <div className="form-group">
                        <label>Search Filter : </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.search}

                            onChange={this.updateSearch}
                        />
                    </div>

                <div style={{ overflow: 'scroll', width: '100%', height: '550px' }}>
                <table className="table table-striped"  >
                    <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Description</th>
                            {/* <th>Raised On</th> */}
                            <th>Impacted Application</th>
                            <th>Assigned To</th>
                            <th>Issue Type</th>
                            <th>Priority</th>
                            <th>Current Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {SearchINCs.map(function (currentTodo, i) {
            return <INC incKey={currentTodo} key={i} />;
        })}

                        
                    </tbody>
                </table>
                </div>
               
                
                
                
                <div className="App">
                <Widget
          handleNewUserMessage={this.handleNewUserMessage}
          profileAvatar={logo}
          title="Automated INC Resolution"
          subtitle="Help Portal"
        />
      </div>

            </div>

            
        )
    }
}
