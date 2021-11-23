import React from "react";
import ReactDOM from "react-dom";
import './index.css';

import Profile from "./components/Profile";
import Dog from "./components/Dog";
import Joke from "./components/Joke";
import Weather from "./components/Weather";
import Coronavirus from "./components/Coronavirus";
import Graphique from "./components/Graphique";

var urls = [
    'https://randomuser.me/api/',
    'https://dog.ceo/api/breeds/image/random',
    'https://geek-jokes.sameerkumar.website/api',
    'https://api.openweathermap.org/data/2.5/weather?q=paris&units=metric&appid=4081444b7b90198136fefe6ed4ccf35b',
    'https://api.covidtracking.com/v1/us/current.json'
]

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

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            dog: [],
            joke: [],
            weather: [],
            coronavirus: [],
            graphique: [],
            isLoaded: false,
        }
    }

    componentDidMount() {
        Promise.all(urls.map(url =>
            fetch(url)
                .then(checkStatus)  // check the response of our APIs
                .then(parseJSON)    // parse it to Json
                .catch(error => console.log('There was a problem!', error))
        ))
            .then(data => {
                // assign to requested URL as define in array with array index.
                const data_user = data[0];
                const data_dog = data[1];
                const data_joke = data[2];
                const data_weather = data[3];
                const data_coronavirus = data[4];
                this.setState({
                            isLoaded: true,
                            users: data_user,
                            dog: data_dog,
                            joke: data_joke,  
                            weather: data_weather, 
                            coronavirus: data_coronavirus
                        })
                        console.log(this.state);
            })
    }

    render() {

        var { isLoaded, users, dog, joke, weather, coronavirus, graphique } = this.state;

        if (!isLoaded) {
            return <div>Loading...</div>
        }

        else {
            return (
                <div className="App">  
                    <header>
                        <form id="form">
                            <h1>The most crappy site in the world</h1>
                        </form>
                    </header>  

                <div class="widgets">
                        <div class="container_fluid">
                            <div class="first_floor">
                                <div class="row">

                                    <div class="col-3">
                                    {users.results.map(item => (
                                        <Profile
                                            key={item.id}
                                            item={item}
                                        />
                                    ))}
                                    </div>
                    
                                    <div class="col-7">
                                        <Graphique
                                            item={graphique}
                                        />
                    
                                    </div>
                    
                                    <div class="col">
                                        <Dog
                                            item={dog}
                                        />
                                    </div>
                                </div>
                                
                            </div>

                            <div class="row">

                                <div class="col">
                                        <Weather
                                            item={weather}
                                        />
                                </div>

                                <div class="col">
                                    {coronavirus.map(item => (
                                        <Coronavirus
                                            item={item}
                                        />
                                    ))}
                                </div>

                                <div class="col">
                                <Joke
                                    item={joke}
                                />
                                </div>
                                
                            </div>  
                        </div> 
                    </div>
                </div>
            );
        }
        
    }
    
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);