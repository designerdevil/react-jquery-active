import React from 'react';
import {Provider} from 'react-redux';
import moduleStore from './moduleStore/store';
import MainContainer from "./component/MainContainer";


class moduleView extends React.Component {
    render() {
        return <div>
           <Provider store={moduleStore}>
                <MainContainer />
            </Provider>
        </div>
    }
}

export default moduleView;
