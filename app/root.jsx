import React from 'react';
import SmogMap from './components/map';
import Data from './components/data';


class Root extends React.Component {
    render () {
        return (
            <div className="root">
                <SmogMap/>
                <Data/>
            </div>
        );
    }
}

export default Root;
