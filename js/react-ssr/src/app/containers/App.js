import config from '../../../config/conf';
import React, {Component} from 'react';
import createHistory from 'history/createBrowserHistory';

import {getResponse} from '../utils/apiLoader';

import Router from '../components/Router';
import {Navigation} from '../components/Navigation';

class App extends Component {
    
    constructor(props) {
        
        super(props);
        
        this.state = {
            data: this.props.data,
            history: null,
        };
        
        this.routing = this.routing.bind(this);
        
    }
    
    componentDidMount() {
        
        let history = createHistory();
        history.listen((location)=> {
            
            setTimeout(()=> {
                
                this.setState((prevState)=> {
                    
                    prevState.data = location.state.data;
                    
                });
                
            }, 50);
            
        });
        
        this.setState((prevState, props) => {
            prevState.history = history;
        });
        
    }
    
    routing(e) {
        
        e.preventDefault();
        
        let link = e.target,
            url = link.href;
        
        let host = location.protocol + '//' + location.host;
        
        getResponse(url, {
            cache: config.cache.front,
            headers: config.apiProxy.headers
        }).then((data, response)=> {
            url = url.replace(host, '');
            
            this.setState((prevState, props) => {
                prevState.history.push(url, {data: data});
            });
            
        });
        
    }
    
    render() {
        return (
            <div>
                <header>
                    <Navigation routing={this.routing}/>
                </header>
                
                <Router paths={this.state.data.paths}/>
                
                <footer>
                
                </footer>
            </div>
        );
    }
    
}


export {App};