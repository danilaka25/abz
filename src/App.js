import React from 'react';
import logo from './logo.svg';
import './App.css';


import './App.css';



import  Positions  from './Positions.js'











class App extends React.Component {
  constructor() {
    super();
    this.state = {
      fields: {},
      errors: {},
      selectedFile: {}

    }
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleChangeFile = this.handleChangeFile.bind(this);
    this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);

    this.Token = '';
  };



    getToken () {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://frontend-test-assignment-api.abz.agency/api/v1/token', false);
      xhr.send();
      if (xhr.status === 200) {
        this.Token = JSON.parse(xhr.responseText).token;
        return true;
      } else {
        return false;
      }
    }


    postUser () {
      if  (this.getToken ()) {

        var xhr = new XMLHttpRequest();

        xhr.open("POST", "https://frontend-test-assignment-api.abz.agency/api/v1/users", false);

        xhr.setRequestHeader("Token", this.Token);

        // console.log('> POST api/v1/users/');
       //  console.log(xhr.status);
        console.log(this.Token);




          // обект в json
          // var object = {};
          // formData.forEach(function(value, key){
          //     object[key] = value;
          // });
          // var json = JSON.stringify(object);
          // console.log(json);


          var formData = new FormData();
          formData.append('name', document.getElementById('inputName').value);
          formData.append('email', document.getElementById('inputEmail').value);
          formData.append('phone',  document.getElementById('inputPhone').value);
          formData.append('position_id', document.getElementById('inputPosition').value);
          formData.append('photo', document.getElementById('inputFile').files[0]);
         

          xhr.send(formData);


           //  console.log(xhr.status);
           //    console.log(JSON.parse(xhr.responseText).fails);



        switch(xhr.status) {
          
          case 201: 
            // console.log('code 201');
            console.log(JSON.parse(xhr.responseText).success);
            console.log(JSON.parse(xhr.responseText).user_id);
            console.log(JSON.parse(xhr.responseText).message);

            break;

          case 409: 
            console.log(JSON.parse(xhr.responseText).message);  
            // console.log('code 409');    
            break;


           case 422: 
            //console.log(JSON.parse(xhr.responseText).fails);  
            // console.log('code 422');  

            for (var key in JSON.parse(xhr.responseText).fails) {
            console.log(  JSON.parse(xhr.responseText).fails[key] );
          }
            break;            

          // default:
          //  console.log('хз');  
          //   break;
        }



      }  

    }






   


  handleChangeInput(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;



    this.setState({
      fields 
    });
  }



  handleChangeFile(e) {
    let selectedFile = this.state.selectedFile;
    selectedFile[e.target.name] = e.target.value;

 

    this.setState({
      selectedFile: window.event.target.files[0]   
  });
}


  submituserRegistrationForm(e) {
    e.preventDefault();
     this.validateForm();
     this.postUser();

    // if (this.validateForm()) {
    //   alert("Form submitted");
    // }
  }


  validateForm() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    let avatar = this.state.selectedFile;
    if (!fields["username"]) {
      formIsValid = false;
      errors["username"] = "*Please enter your username.";
    }
    if (typeof fields["username"] !== "undefined") {
      if (fields["username"].length < 2 || fields["username"].length > 60) {
        formIsValid = false;
        errors["username"] = "*Please enter alphabet characters only.";
      }
    }
    if (!fields["emailid"]) {
      formIsValid = false;
      errors["emailid"] = "*Please enter your email-ID.";
    }
    if (typeof fields["emailid"] !== "undefined") {
      //regular expression for email validation
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(fields["emailid"])) {
        formIsValid = false;
        errors["emailid"] = "*Please enter valid email-ID.";
      }
    }
    if (!fields["mobileno"]) {
      formIsValid = false;
      errors["mobileno"] = "*Please enter your mobile no.";
    }
    if (typeof fields["mobileno"] !== "undefined") {
      // if (!fields["mobileno"].match(/^[0-9]{10}$/)) {
        formIsValid = false;
        errors["mobileno"] = "*Please enter valid mobile no.";
      // }
    }





    if (avatar.size) {
      // let file_size = this.state.selectedFile.size;
      // let file_type = this.state.selectedFile.type;
      if (avatar.size >= 2000000) {
        formIsValid = false;
        errors["image"] = "To big photo. ";
      }
      if (!(avatar.type == "image/jpeg") && !(avatar.type == "image/jpg")) {
        formIsValid = false;
        errors["image"] = "False format. ";
      }




      var minwidth = "79";
      var minheight = "79";
      


      var _URL = window.URL || window.webkitURL;
      
       function getImgSize(imgSrc) {
          
          var newImg = new Image();
    
          newImg.onload = function() {    

           if (minwidth >= newImg.width && minheight >= newImg.height) {
              formIsValid = false;
               //console.log("error");
               errors["image"] = "To small wight or hight.";                               
           } 
            console.log(errors["image"]); // читает
            //return errors["image"]; 
          }

          console.log(errors["image"]); // не читает
          newImg.src = imgSrc; // this must be done AFTER setting onload

      }
      getImgSize(_URL.createObjectURL(avatar));




      // var _URL = window.URL || window.webkitURL;
      
      //  function getImgSize(imgSrc) {
          
      //     var newImg = new Image();
    
      //     function onload(newImg) {  

      //        console.log(newImg);


      //      if (minwidth >= newImg.width && minheight >= newImg.height) {
      //         formIsValid = false;
              
      //          errors["image"] = "To small wight or hight.";                               
      //      } 
      //       console.log(errors["image"]); // читает
      //       //return errors["image"]; 
      //     }

      //     onload(newImg);


      //     console.log(errors["image"]); // не читает
      //     newImg.src = imgSrc; // this must be done AFTER setting onload

      // }

      // getImgSize(_URL.createObjectURL(avatar));
 

      

      

      










      

      // var _URL = window.URL || window.webkitURL;
      // var file = avatar;
      // var img = new Image();
      // img.src = _URL.createObjectURL(file);  
      // //console.log(file);
      // img.onload =  function(x) {
      //   console.log(this.width);
      //   if (minwidth >= this.width && minheight >= this.height) { //72                                                      
      //     formIsValid = false;
      //     console.log("error");
      //     errors["image"] = "To small wight or hight.";  
      //   } else {
      //     //formIsValid = true;
      //     console.log("no error");         
      //   }
      // }

     


    } else {
      formIsValid = false;
      errors["image"] = "*Please enter your image.";
    }


    this.setState({
      errors: errors
    });   

    return formIsValid;


  }


  // shouldComponentUpdate(){
  //      this.validateForm();  
  // }




  render() {
    return ( < div id = "main-registration-container" > < div id = "register" > < h3 > Registration page < /h3> < form method = "post"
      name = "userRegistrationForm"
      onSubmit = {
        this.submituserRegistrationForm
      } > < label > Name < /label> < input type = "text"
      name = "username"
      value = {
        this.state.fields.username
      }
      onChange = {
        this.handleChangeInput
      }
      id = "inputName"
      /> < div className = "errorMsg" > {
        this.state.errors.username
      } < /div> < label > Email ID: < /label> < input type = "text"
      name = "emailid"
      value = {
        this.state.fields.emailid
      }
      onChange = {
        this.handleChangeInput
      }
      id = "inputEmail"
      /> < div className = "errorMsg" > {
        this.state.errors.emailid
      } < /div> < label > Mobile No: < /label> < input type = "text"
      name = "mobileno"
      value = {
        this.state.fields.mobileno
      }
      onChange = {
        this.handleChangeInput
      }
      id = "inputPhone"
      /> < div className = "errorMsg" > {
        this.state.errors.mobileno
      } < /div> 
      < label > select < /label> 
       <Positions/>


      < label > image < /label> < input type = "file" name = "image" value = {this.state.avatar } onChange = {this.handleChangeFile } id="inputFile"/> 
      < div className = "errorMsg" > {this.state.errors.image } < /div>
      < input type = "submit"className = "button" value = "Register 22" / >
       < /form> < /div>
      < /div>
      );
  }
}
 
export default App;
