import React from 'react';

const ServiceHolder = (props) => {
		let data = props.renderdata
		let serviceType = data.serviceType
        return( 
            <div className="service">
               <div className="holder">
               		<p>{serviceType}</p> 
               		<p>{props.renderdata.metadata.resourceVersion}</p>
               	</div>
                <div className="service-name">{data.kind}</div>
            </div>
        )
    };

export default ServiceHolder;
