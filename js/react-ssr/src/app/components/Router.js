import React, {Component} from 'react';

//-------------------------------------------------------------+
// containers
//-------------------------------------------------------------+
import {Main} from '../containers/Main';
import {ListByClass} from '../containers/ListByClass';
import {ListBySubject} from '../containers/ListBySubject';
import {ListByBoth} from '../containers/ListByBoth';
//-------------------------containers ends here----------------+

export default class Router extends Component {
    
    renderView() {
       
        if (this.props.paths) {
          
            let action = this.props.paths.action;
            
            if ('index' == action) {
                
                return <Main/>;
                
            }
            else if ('listByClass' == action) {
                
                return <ListByClass/>;
                
            }
            else if ('listBySubject' == action) {
                
                return <ListBySubject/>;
                
            }
            else if ('listByBoth' == action) {
                
                return <ListByBoth/>;
                
            }
            
        }
        
    }
    
    render() {
        
        return (
            <main>
                page by route
                {this.renderView()}
            </main>
        );
        
    }
    
}