import React from "react";
import ReactDOM from "react-dom";
import '../index.css';

// All Component use for our Widgets
import Profile from "../components/Profile";
import Dog from "../components/Dog";
import Joke from "../components/Joke";
import Weather from "../components/Weather";
import Coronavirus from "../components/Coronavirus";
import Graphique from "../components/Graphique";

import ApiProfile from "./ApiProfile";

const apiProfile = new ApiProfile();

// All urls link for the widget page
var urls = [
    'https://randomuser.me/api/',
    'https://dog.ceo/api/breeds/image/random',
    'https://geek-jokes.sameerkumar.website/api',
    'https://api.openweathermap.org/data/2.5/weather?q=paris&units=metric&appid=fb8a28ca1a7d37be07c561ef6b1736a8',
    'https://api.covidtracking.com/v1/us/current.json',
    'http://localhost:3000/profiles'
]

// Function to check the status of the API
function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

function parseJSON(response) {
return response.json();
}

class Widgets extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: [],
            dog: [],
            joke: [],
            weather: [],
            coronavirus: [],
            all_profiles: [],
            isLoaded: false,
        }
    }

    // On start web page do this...
    componentDidMount() {
        // For all API
        Promise.all(urls.map(url =>
            fetch(url)
                .then(checkStatus)  // check the response of our APIs
                .then(parseJSON)    // parse it to Json
                .catch(error => console.log('There was a problem!', error))
        ))
            .then(data => {
                // assign to requested URL as define in array with array index.
                const data_profile = data[0];
                const data_dog = data[1];
                const data_joke = data[2];
                const data_weather = data[3];
                const data_coronavirus = data[4];
                const data_all_profiles = data[5];
                this.setState({
                            isLoaded: true,
                            profile: data_profile,
                            dog: data_dog,
                            joke: data_joke,  
                            weather: data_weather, 
                            coronavirus: data_coronavirus,
                            all_profiles: data_all_profiles
                        })
                        // console.log(this.state);
                        // Create const Profile to inject in our own Database
                        const profile = {
                        firstName: this.state.profile.results[0].name.first,
                        lastName: this.state.profile.results[0].name.last,
                        age: this.state.profile.results[0].registered.age,
                        country: this.state.profile.results[0].location.country,
                        city: this.state.profile.results[0].location.city
            };
            // Inject the new profile load on our Database
            apiProfile
                .createProfile(profile)
                .then(res => {
                    const data = res.data;
                    if (data !== '') {
                        this.setState({ successValue: "Completed" })
                        setTimeout(function () {
                        }, 2000);
                    } else {
                        alert("Can't add new data on database");
                    }
                })         
            })
    }

    render() {

        var { isLoaded, profile, dog, joke, weather, coronavirus, all_profiles } = this.state;

        // If don't get already our data of API...
        if (!isLoaded) {
            return <div>Loading...</div>
        }
        // Render all the html for all our Widgets
        else {
            return (   
                <div class="widgets">
                    <div class="container_fluid">
                        <div class="row">
                            <div class="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3">
                                {profile.results.map(item => (
                                    <Profile
                                        key={item.id}
                                        item={item}
                                    />
                                ))}
                            </div>
            
                            <div class="col-12 col-sm-12 col-md-8 col-lg-7 col-xl-7">
                                <Graphique
                                    item={all_profiles}
                                />
                            </div>
            
                            <div class="col-12 col-sm-6 col-md-3 col-lg-2 col-xl-2">
                                <Dog
                                    item={dog}
                                />
                            </div>

                            <div class="col-12 col-sm-6 col-md-3 col-lg-4 col-xl-4">
                                <Weather
                                    item={weather}
                                />
                            </div>

                            <div class="col-12 col-sm-6 col-md-3 col-lg-4 col-xl-4">
                                {coronavirus.map(item => (
                                    <Coronavirus
                                        item={item}
                                    />
                                ))}
                            </div>

                            <div class="col-12 col-sm-6 col-md-3 col-lg-4 col-xl-4">
                                <Joke
                                    item={joke}
                                />
                            </div>     
                        </div>      
                    </div> 
                </div>
            );
        }
        
    } 
};

export default Widgets;