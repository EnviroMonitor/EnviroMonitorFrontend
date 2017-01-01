import React from 'react';
import SmogMap from './components/SmogMap';
import DataHolder from './components/DataHolder';

class Root extends React.Component {
    render () {
        return (
            <div className="root">
                <SmogMap/>
                <DataHolder/>
            </div>
        );
    }
}

export default Root;
