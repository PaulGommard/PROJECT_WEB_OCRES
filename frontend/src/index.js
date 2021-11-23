import React from "react";
import ReactDOM from "react-dom";
import './index.css';

import Profile from "./components/Profile";
import Dog from "./components/Dog";
import Joke from "./components/Joke";
import Weather from "./components/Weather";

const API_KEY = 'api_key=aa090ed40895efe0d080b831bf9420ae';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const searchURL = BASE_URL + '/search/movie?'+API_KEY;

const form = document.getElementById('form');
const search = document.getElementById('search');

const API_RANDOM_USER = 'https://randomuser.me/api/';
const API_RANDOM_DOG = 'https://dog.ceo/api/breeds/image/random'

var urls = [
    'https://randomuser.me/api/',
    'https://dog.ceo/api/breeds/image/random',
    'https://geek-jokes.sameerkumar.website/api',
    'https://api.openweathermap.org/data/2.5/weather?q=paris&units=metric&appid=4081444b7b90198136fefe6ed4ccf35b'
    // 'https://api.spoonacular.com/recipes/random?apiKey=2ae811ba80a24c319622d0fa5d4d0315'
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
                this.setState({
                            isLoaded: true,
                            users: data_user,
                            dog: data_dog,
                            joke: data_joke,  
                            weather: data_weather 
                        })
                        console.log(this.state);
            })
    }

    render() {

        var { isLoaded, users, dog, joke, weather } = this.state;

        if (!isLoaded) {
            return <div>Loading...</div>
        }

        else {
            return (
                <div className="App">  
                    <header>
                        <form id="form">
                            <input type="text" placeholder="search" id="search" class="search" />
                        </form>
                    </header>  

                    {/* <main id="main">
                        {items.results.map(item => (
                            <Movie
                                key={item.id}
                                item={item}
                            />
                        ))}
                    </main> */}

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
                                        <div class="graph">
                                            <div class="title">
                                                <h2>Graphique</h2>
                                            </div>
                    
                                        </div>
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
                                    <div class="music">
                                        <div class="title">
                                            <h2>Your Favorite Music</h2>
                                        </div>

                                    </div>
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

// form.addEventListener('submit', (e) => {
//     e.preventDefault();

//     const searchTerm = search.value;
// })

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);