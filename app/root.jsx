import React from 'react';
import PollutionMap from './components/PollutionMap';
import DataHolder from './components/DataHolder';

class Root extends React.Component {
    render () {
        return (
            <div className="root">
                <PollutionMap/>
                <DataHolder/>
            </div>
        );
    }
}

export default Root;
