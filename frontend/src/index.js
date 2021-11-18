import React from "react";
import ReactDOM from "react-dom";
import './index.css';
import Movie from "./components/Movie";

const API_KEY = 'api_key=aa090ed40895efe0d080b831bf9420ae';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+API_KEY;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
        }
    }

    componentDidMount() {
        fetch(API_URL)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    items: json,
                })
                console.log(json);
            });
            
    }
    render() {

        var { isLoaded, items } = this.state;

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

                    <main id="main">
                        {items.results.map(item => (
                            <Movie
                                key={item.id}
                                item={item}
                            />
                        ))}
                    </main>
                </div>
            );
        }
        
    }
    
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);