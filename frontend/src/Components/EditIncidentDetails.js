import React, { Component } from 'react';
//import DatePicker from "react-datepicker";
import axios from 'axios';
 
//import "react-datepicker/dist/react-datepicker.css";

export default class EditINC extends Component {

    constructor(props) {
        super(props);

        this.onChangeINCSubject = this.onChangeINCSubject.bind(this);
        //this.onChangeINCRaisedOn = this.onChangeINCRaisedOn.bind(this);
        this.onChangeINCImpactedApplications = this.onChangeINCImpactedApplications.bind(this);
        this.onChangeINCType = this.onChangeINCType.bind(this);
        this.onChangeINCDescription = this.onChangeINCDescription.bind(this);
        this.onChangeINCAssignedTo = this.onChangeINCAssignedTo.bind(this);
        this.onChangeINCPriority = this.onChangeINCPriority.bind(this);
        this.onChangeINCStatus = this.onChangeINCStatus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            INC_Subject: '',
            //INC_RaisedOn: new Date(),
            INC_ImpactedApplications: '',
            INC_Type: '',
            INC_Description: '',
            INC_AssignedTo: '',
            INC_Priority: '',
            INC_Status: ''
        }
    }

    onChangeINCSubject(e) {
        this.setState({
            INC_Subject: e.target.value
        });
    }

    /* onChangeINCRaisedOn = date => {

        console.log(`INC Raised Date: ${this.state.INC_RaisedOn} ` + 'e');
        this.setState({
            INC_RaisedOn: date
        });
    } */
    onChangeINCImpactedApplications(e) {
        this.setState({
            INC_ImpactedApplications: e.target.value
        });
    }
    onChangeINCType(e) {
        this.setState({
            INC_Type: e.target.value
        });
    }

    onChangeINCDescription(e) {
        this.setState({
            INC_Description: e.target.value
        });
    }
    onChangeINCAssignedTo(e) {
        this.setState({
            INC_AssignedTo: e.target.value
        });
    }
    onChangeINCStatus(e) {
        this.setState({
            INC_Status: e.target.value
        });
    }

    onChangeINCPriority(e) {
        this.setState({
            INC_Priority: e.target.value
        });
    }

    componentDidMount() {
        axios.get('http://localhost:4000/incs/'+this.props.match.params.id)
            .then(response => {
                this.setState({ 
                    INC_Subject: response.data.INC_Subject,
                    //INC_RaisedOn:  response.data.INC_RaisedOn ,
                    INC_ImpactedApplications: response.data.INC_ImpactedApplications,
                    INC_Type: response.data.INC_Type,
                    INC_Description: response.data.INC_Description,
                    INC_AssignedTo: response.data.INC_AssignedTo,
                    INC_Priority: response.data.INC_Priority,
                    INC_Status: response.data.INC_Status 

                });
            })
            .catch(function (error){
                console.log(error);
            })
    }
    
    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`);
        
        console.log(`INC Priority: ${this.state.INC_Priority}`);

        const INCs = {
            
            INC_Subject: this.state.INC_Subject,
           // INC_RaisedOn:  this.state.INC_RaisedOn ,
            INC_ImpactedApplications: this.state.INC_ImpactedApplications,
            INC_Type: this.state.INC_Type,
            INC_Description: this.state.INC_Description,
            INC_AssignedTo: this.state.INC_AssignedTo,
            INC_Priority: this.state.INC_Priority,
            INC_Status: this.state.INC_Status
        }
        
        console.log(INCs);
        console.log('list of INC raised');
        axios.post('http://localhost:4000/incs/update/'+this.props.match.params.id, INCs)
            .then(res => console.log(res.data));
        
        this.props.history.push('/');

        

        
    }

    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <h3>Create New INC</h3>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label>Subject: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.INC_Subject}
                            onChange={this.onChangeINCSubject}
                        />
                    </div>

                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.INC_Description}
                            onChange={this.onChangeINCDescription}
                        />
                    </div>

                    {/* <div className="form-group">
                        <label>Raised On: </label>
                        <DatePicker
                            selected={this.state.INC_RaisedOn}
                            onChange={this.onChangeINCRaisedOn}
                        />
                    </div> */}

                    

                    <div className="form-group">
                        <label>Impacted Application: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.INC_ImpactedApplications}
                            onChange={this.onChangeINCImpactedApplications}
                        />
                    </div>

                    <div className="form-group">
                        <label>Issue Type : </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.INC_Type}
                            onChange={this.onChangeINCType}
                        />
                    </div>
                    <div className="form-group">
                        <label>Assigned To: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.INC_AssignedTo}
                            onChange={this.onChangeINCAssignedTo}
                        />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                        <label>Issue Priority : </label>
                        

                            <input className="form-check-input"
                                type="radio"
                                name="priorityOptions"
                                id="priorityLow"
                                value="Low"
                                checked={this.state.INC_Priority === 'Low'}
                                onChange={this.onChangeINCPriority}
                            />
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                type="radio"
                                name="priorityOptions"
                                id="priorityMedium"
                                value="Medium"
                                checked={this.state.INC_Priority === 'Medium'}
                                onChange={this.onChangeINCPriority}
                            />
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                type="radio"
                                name="priorityOptions"
                                id="priorityHigh"
                                value="High"
                                checked={this.state.INC_Priority === 'High'}
                                onChange={this.onChangeINCPriority}
                            />
                            <label className="form-check-label">High</label>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Issue Current Status : </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.INC_Status}
                            onChange={this.onChangeINCStatus}
                        />
                    </div>


                    <div className="form-group">
                        <input type="submit" value="Edit INC" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}