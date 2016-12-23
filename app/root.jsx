import React from 'react';
import Map from './components/map';
import Data from './components/data';


class Root extends React.Component {
    render () {
        return (
            <div className="root">
                <Map/>
                <Data/>
            </div>
        );
    }
}

export default Root;
