import React from "react";
import ReactDOM from "react-dom";
import '../index.css';
import ApiProfile from "./ApiProfile";

import Admin from "../components/Admin";

const apiProfile = new ApiProfile();
    
class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profiles: [],
            deleteValue: "",
            firstName: "", lastName: "", age: "", country: "", city: "",
            updateFirstName: "", updateLastName: "", updateAge: "", updateCountry: "", updateCity: "",
            successValue: "",
            isLoaded: false,
        };

        this.handleChange = this.handleChange.bind(this);

    }

    // componentDidMount() {
    //     apiProfile
    //         .getAllProfiles()
    //         .then(res => {
    //             const data = res.data;
    //             var temp = "<table class='content-table'>";
    //             temp += "<thead><tr><td>firstName</td><td>lastName</td><td>age</td><td>country</td><td>city</td></tr></thead><tbody>";
    //             for (var i = 0; i < data.length; i++) {
    //                 temp += "<tr><td>";
    //                 temp += data[i].firstName + "</td><td>";
    //                 temp += data[i].lastName + "</td><td>";
    //                 temp += data[i].age + "</td><td>";
    //                 temp += data[i].country + "</td><td>";
    //                 temp += data[i].city + "</td></tr>";
    //                 temp += <button type="button" className="col-auto" onClick={() => this.CreateProfile()}>Add</button>
    //                 temp += "</td></tr>";
    //             }
    //             temp += "</tbody></table>";
    //             this.setState({ profiles: temp });
    //             this.setState({ isLoaded: true });
    //         })
    // }

    componentDidMount() {
        apiProfile
            .getAllProfiles()
            .then(data => {
                // assign to requested URL as define in array with array index.
                const data_profile = data;
                this.setState({
                            isLoaded: true,
                            profiles: data_profile
                        })
                        console.log(this.state);
            })
    }

    DeleteProfile()
    {
        var name = this.state.deleteValue;
        if(window.confirm('Do you really want to delete ${name} ?')) {
            apiProfile.deleteProfile(name);
            window.location.reload(false);
        }
    }

    CreateProfile() {
        const profile = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            age: this.state.age,
            country: this.state.country,
            city: this.state.city
        };
        apiProfile
            .createProfile(profile)
            .then(res => {
                const data = res.data;
                if (data !== '') {
                    this.setState({ successValue: "Completed" })
                    setTimeout(function () {
                        window.location.reload(false);
                    }, 2000);
                } else {
                    alert("Can't add new data on database");
                }
            })

    }

    handleChange(choice, event) {
        switch (choice) {
            case 'delete':
                this.setState({ deleteValue: event.target.value });
                break;
            case 'firstName':
                this.setState({ firstName: event.target.value });
                break;
            case 'lastName':
                this.setState({ lastName: event.target.value });
                break;
            case 'age':
                this.setState({ age: event.target.value });
                break;
            case 'country':
                this.setState({ country: event.target.value });
                break;
            case 'city':
                this.setState({ city: event.target.value });
                break;
            default:
                break;
        }
    }

    render() {  
        var { isLoaded, profiles } = this.state;

        if (!isLoaded) {
            return <div>Loading...</div>
        }
        else{
            return (   
                <div class="dashboard">
                    <div className="container-fluid">
                        
                    <div className="all_profiles">

                                    <table class="ui celled table">
                                        <thead>
                                            <tr>
                                            <th>FirstName</th>
                                            <th>LastName</th>
                                            <th>Age</th>
                                            <th>Country</th>
                                            <th>City</th>
                                            <th>Edit</th>
                                            <th>Remove</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {profiles.map(item => (
                                                <tr>
                                                <td>{item.firstName}</td>
                                                <td>{item.lastName}</td>
                                                <td>{item.age}</td>
                                                <td>{item.country}</td>
                                                <td>{item.city}</td>
                                                <td class="selectable">
                                                    <a href="#">Edit</a>
                                                </td>
                                                <td class="selectable">
                                                    <a href="#">Remove</a>
                                                </td>
                                                </tr>
                                            ))}
                                            
                                        </tbody>
                                        </table>
                                        
                                    </div>
                        <div className="row input-section">
                            <input type="text" className="col-2" value={this.state.deleteValue} placeholder="Last name" required onChange={(e) => this.handleChange("delete", e)} />
                            <button type="button" className="col-auto" onClick={() => this.DeleteProfile()}>Supprimer</button>
                        </div>
                        <div className="row input-section">
                            <input type="text" className="col-2" value={this.state.firstName} placeholder="firstName" required onChange={(e) => this.handleChange("firstName", e)} />
                            <input type="text" className="col-2" value={this.state.lastName} placeholder="lastName" required onChange={(e) => this.handleChange("lastName", e)} />
                            <input type="text" className="col-2" value={this.state.age} placeholder="age" required onChange={(e) => this.handleChange("age", e)} />
                            <input type="text" className="col-2" value={this.state.country} placeholder="contry" required onChange={(e) => this.handleChange("country", e)} />
                            <input type="text" className="col-2" value={this.state.city} placeholder="city" required onChange={(e) => this.handleChange("city", e)} />
                            <button type="button" className="col-auto" onClick={() => this.CreateProfile()}>Add</button>
                        </div>
                        <div className="row justify-content-end success">{this.state.successValue}</div>

                        <div className="row input-section">
                            <input type="text" className="col-2" value={this.state.updateFirstName} placeholder="firstName" required onChange={(e) => this.handleChange("firstName", e)} />
                            <input type="text" className="col-2" value={this.state.updateLastName} placeholder="lastName" required onChange={(e) => this.handleChange("lastName", e)} />
                            <input type="text" className="col-2" value={this.state.updateAge} placeholder="age" required onChange={(e) => this.handleChange("age", e)} />
                            <input type="text" className="col-2" value={this.state.updateCountry} placeholder="contry" required onChange={(e) => this.handleChange("country", e)} />
                            <input type="text" className="col-2" value={this.state.updateCity} placeholder="city" required onChange={(e) => this.handleChange("city", e)} />
                            <button type="button" className="col-auto" onClick={() => this.CreateProfile()}>Add</button>
                        </div>

                    </div>
                     
                </div>
            );
        }
        
        
    } 
};

export default Dashboard;

