import React from "react";
import ReactDOM from "react-dom";
import '../index.css';

import ApiProfile from "./ApiProfile";

const apiProfile = new ApiProfile();
    
class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profiles: [],
            deleteValue: "",
            firstName: "", lastName: "", age: "", country: "", city: "",
            updateFirstName: "", updateLastName: "", updateAge: "", updateCountry: "", updateCity: "", updateId: "",
            successValue: "",
            successUpdate: "",
            isLoaded: false,
        };

        this.handleChange = this.handleChange.bind(this);

    }

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
        if(window.confirm(`Do you really want to delete ${name}`)) {
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

    AddProfileOnUpdate(item) {
        this.setState({
            updateFirstName: item.firstName,
            updateLastName: item.lastName,
            updateAge: item.age,
            updateCountry: item.country,
            updateCity: item.city,
            updateId: item._id
        })
        
    }

    UpdateProfile() {
        const profile = {
            firstName: this.state.updateFirstName,
            lastName: this.state.updateLastName,
            age: this.state.updateAge,
            country: this.state.updateCountry,
            city: this.state.updateCity,
            id: this.state.updateId
        };

        var id = profile.id;
        console.log(profile);
        apiProfile
            .updateProfile(profile)
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
            case 'updateFirstName':
                this.setState({ updateFirstName: event.target.value });
                break;
            case 'updateLastName':
                this.setState({ updateLastName: event.target.value });
                break;
            case 'updateAge':
                this.setState({ updateAge: event.target.value });
                break;
            case 'updateCountry':
                this.setState({ updateCountry: event.target.value });
                break;
            case 'updateCity':
                this.setState({ updateCity: event.target.value });
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
                        <div className='table_profiles'>
                            <table>
                                <tr>
                                    <th>FirstName</th>
                                    <th>LastName</th>
                                    <th>Age</th>
                                    <th>Country</th>
                                    <th>City</th>
                                    <th>Button</th>
                                </tr>
                                    {profiles.data.map(item => (
                                        <tr>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.age}</td>
                                        <td>{item.country}</td>
                                        <td>{item.city}</td>
                                        <td><button type="button" className="col-auto" onClick={() => this.AddProfileOnUpdate(item)}>Update</button></td>
                                    </tr>
                                    ))}
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
                            <input type="text" className="col-2" value={this.state.updateFirstName} placeholder="updateFirstName" required onChange={(e) => this.handleChange("updateFirstName", e)} />
                            <input type="text" className="col-2" value={this.state.updateLastName} placeholder="updateLastName" required onChange={(e) => this.handleChange("updateLastName", e)} />
                            <input type="text" className="col-2" value={this.state.updateAge} placeholder="updateAge" required onChange={(e) => this.handleChange("updateAge", e)} />
                            <input type="text" className="col-2" value={this.state.updateCountry} placeholder="updateCountry" required onChange={(e) => this.handleChange("updateCountry", e)} />
                            <input type="text" className="col-2" value={this.state.updateCity} placeholder="updateCity" required onChange={(e) => this.handleChange("updateCity", e)} />
                            <button type="button" className="col-auto" onClick={() => this.UpdateProfile()}>Update</button>
                        </div>
                        <div className="row justify-content-end success">{this.state.successUpdate}</div>

                    </div>
                     
                </div>
            );
        }
        
        
    } 
};

export default Dashboard;

