import React from 'react';


let NavLink = (props) => {
    return <a onClick={props.click} href={props.url}>{props.title}</a>;
};


let Navigation = (props) => {
    return (
        <nav>
            <NavLink click={props.routing} url="/" title="home"/>
            <br/>
            <NavLink click={props.routing} url="/1-klass" title="1-klass"/>
            <br/>
            <NavLink click={props.routing} url="/matematika" title="matematika"/>
            <br/>
            <NavLink click={props.routing} url="/matematika/9-klass" title="data-2"/>
        </nav>
    );
};


export {Navigation, NavLink};