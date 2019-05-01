import React from 'react';
import Select from 'react-select';


class Positions extends React.Component {



	constructor() {
		super();
  
    	this.list = []
 

		var position = new XMLHttpRequest();
		position.open('GET', 'https://frontend-test-assignment-api.abz.agency/api/v1/positions', false);
		position.send();
		

		      for (var key in JSON.parse(position.responseText).positions) {
		         this.list.push({ 'label':  JSON.parse(position.responseText).positions[key].name ,  'value':  JSON.parse(position.responseText).positions[key].id });       
		      }


		      console.log(this.list);
	      
		}


		 render() {

		     return (
		     <div>	
		        <Select options={ this.list }  inputId="inputPosition"   />    
		     </div>                    
		     );
		  }		  




}

export default Positions;