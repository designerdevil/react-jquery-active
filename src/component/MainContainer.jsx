import React, {Component} from 'react';
import { connect } from 'react-redux';
import ModuleButton from '../component/buttonComponent';
import ServiceHolder from '../component/serviceHolder';
import REDUCERACTION from '../actions/actions';
import services from '../config/config';

const secondsRemaining = 3;

class MainContainer extends Component {
    

    constructor(props) {
        super(props);
        this.onClickVal = this.onClickVal.bind(this);
        this.state = {}
    }

    componentDidMount() {
        this.props.dispatch(REDUCERACTION.init({}));
    }

    handleResponse(service, type, data, serviceId){ 
        var newData = {}
        newData[service] = data
        newData[service]['serviceType'] = type
        newData[service]['serviceId'] = serviceId
        // this.props.dispatch(REDUCERACTION.onNewCall(newData));
        this.setState(newData)
        $('.service').addClass('active');
        $(".button-holder").hide();
    }

    executeAjax(url, type, service, id){
        var that = this;
        $('.service').removeClass('active');
        fetch(url, {'mode': 'cors'})  
          .then(  
            function(response) {  
              if (response.status !== 200) {  
                console.log('Looks like there was a problem. Status Code: ' +  response.status);  
                return;  
              }
              // Examine the text in the response  
              response.json().then(function(data) {                      
                that.handleResponse(service, type, data, id);
              });  
            }  
          )  
          .catch(function(err) {  
            console.log('Fetch Error :-S', err);  
          });
    }

    callServices(){
        var that = this;
        setInterval(function(){
            $(services).each(function(i, v){
                that.executeAjax(v.url, v.type, v.servicename, v.serviceId);
            })
        }, secondsRemaining*1000);
    }

	onClickVal(_this, val) {
        this.callServices()
        $(".button-holder button").text("Wait for " + secondsRemaining + " seconds...");
	}

    renderService() {
        let data = this.state
        let obj = []
        for (var prop in data) {
            obj.push(data[prop])
        }

        return obj.map((key, ind)=>{
            return <ServiceHolder renderType={key.serviceType} renderdata={key} key={key.serviceId} />
        });
    }

    render(){
        return <div>
            <div className="button-holder">
                <ModuleButton onClickVal={this.onClickVal} />
            </div>
            <div className="services-holder">
                {this.renderService()}
            </div>
        </div>
    }
}


let mapStateToProps = (state) => {
    return {
        data: state
    };
};

let mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
