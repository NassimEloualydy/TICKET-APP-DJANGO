var token=document.getElementsByName('csrfmiddlewaretoken')[0].value
function signIn(){
    var first_name=document.getElementById("first_name").value;
    var last_name=document.getElementById("last_name").value;
    var email=document.getElementById("email").value;
    var phone=document.getElementById("phone").value;
    var pw=document.getElementById("pw").value;
    var photo=document.getElementById("photo").files[0];
    if(first_name!="" && last_name!="" && email!="" && phone!="" && pw!="" && document.getElementById("photo").files.length==1){

        var xhr=new XMLHttpRequest();
        xhr.onreadystatechange=function(){
            if(this.status==200 && this.readyState==4){
                                var {message,type}=JSON.parse(this.responseText);
                                if(type=="Success"){
                            
                            toastr.success(message,"success",{positionClass:"toast-bottom-right"});
                            document.getElementById("first_name").value="";
                            document.getElementById("last_name").value="";
                            document.getElementById("email").value="";
                            document.getElementById("phone").value="";
                            document.getElementById("pw").value="";
                        
                            }
                        if(type=="Warning")
                             toastr.warning(message,"warning",{positionClass:"toast-bottom-right"});
        
            }
        }
        xhr.open("POST","signInUser",true);
        var f=new FormData();
        f.append("first_name",first_name);
        f.append("last_name",last_name);
        f.append("email",email);
        f.append("phone",phone);
        f.append("pw",pw);
        f.append("photo",photo);
                f.append("csrfmiddlewaretoken",token)
        
        xhr.send(f);
    }else{
        toastr.warning("Plase all the filds are required !!","warning",{positionClass:"toast-bottom-right"});

    }
}
function login(){
    var email=document.getElementById("email").value;
    var pw=document.getElementById("pw").value;
    if(email!="" && pw!=""){
        var xhr=new XMLHttpRequest();
        xhr.onreadystatechange=function(){
            if(this.status==200 && this.readyState==4){

                var {message,type}=JSON.parse(this.responseText);

                if(type=="success"){
        toastr.success(message,type,{positionClass:"toast-bottom-right"});
                    
                }
                if(type=="warning"){
                    toastr.warning(message,type,{positionClass:"toast-bottom-right"});
                                
                            }
            
            }
        }
        xhr.open("POST","loginUser",true);
        var f=new FormData();
        f.append("email",email);
        f.append("pw",pw);
        f.append("csrfmiddlewaretoken",token)

        xhr.send(f);
    }else{
        toastr.warning("Pleas all the fields are required !!","warning",{positionClass:"toast-bottom-right"});
    }
}
function submitCategory(){
 var name=document.getElementById("name").value;
 var parent=document.getElementById("parent").value;
 var xhr=new XMLHttpRequest();

 xhr.onreadystatechange=function(){
    if(this.status==200 && this.readyState==4){
        var {message,type}=JSON.parse(this.responseText);

        if(type=="success"){
toastr.success(message,type,{positionClass:"toast-bottom-right"});
get_data_category()
            
        }
        if(type=="warning"){
            toastr.warning(message,type,{positionClass:"toast-bottom-right"});
                        
                    }
    

    }
 }
 xhr.open("post","submitCategory",true);
 var f=new FormData();  
 f.append("csrfmiddlewaretoken",token)
  alert(token)
 f.append("name",name);
 f.append("parent",parent);
 f.append("id",idCategory)
 xhr.send(f);
}
function getParentCategory(){
    if(!document.getElementById("parent"))
        return 
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(this.status==200 && this.readyState==4){
            var {type,message}=JSON.parse(this.responseText);
            if(type=="success"){
               var data="<option value=''>Choose a parent</option>";
               for(var i=0;i<message.length;i++){
                data+="<option value='"+message[i]['id']+"'>"+message[i]['name']+"</option>"

               }                
               document.getElementById('parent').innerHTML=data
            }
            if(type=="warning"){
                toastr.warning(message,type,{positionClass:"toast-bottom-right"});
                            
                        }
        
        }
    }
    xhr.open("POST","getParentCategory",true);
    var f=new FormData();
    f.append("csrfmiddlewaretoken",token)

    xhr.send(f);   
}
function get_data_category(){
    if(!document.getElementById("dataCategory"))
        return 
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(this.status==200 && this.readyState==4){
            var {type,message}=JSON.parse(this.responseText);
            if(type=="success"){
                $('#example').DataTable({
                    data: message,
                    columns: [
    
                        { data: "id" ,visible: false},
                        { data: "parent_id" ,visible: false},
    
                        { data: "name" ,
                            createdCell: function (td, cellData, rowData, row, col) {
                                $(td).addClass('custom-td-class'); // Add a CSS class to the <td>
                            }
                        },
                        { data: "parent" ,
                            createdCell: function (td, cellData, rowData, row, col) {
                                $(td).addClass('custom-td-class'); // Add a CSS class to the <td>
                            }
                        },

                        { data: null,   // No data binding for this column
                            orderable: false,  // Disable ordering for this column
                            render: function (data, type, row) {
                                // alert(JSON(row))
                                return "<span className='Icon Icon_delete' style='color: #d62828 !important;border-color: #d62828 !important;transition: .3s !important;cursor: pointer !important;    border: 1px solid #d62828 !important;border-radius: 5px  !important;padding: 5px !important;'  onClick='deleteCategory("+row.id+")'><ion-icon   name='trash-outline'></ion-icon></span>&nbsp;            <span  className='Icon Icon_update' style='color: #f77f00 !important;border-color: #f77f00 !important;transition: .3s !important;cursor: pointer !important;    border: 1px solid #f77f00 !important;border-radius: 5px  !important;padding: 5px !important;' data-bs-toggle='modal' data-bs-target='#modelForm'  onClick='loadDataCategory("+JSON.stringify(row)+")'><ion-icon   name='pencil-outline' ></ion-icon></span>"
                                // return '<button class="btn btn-primary" onclick="handleButtonClick(\'' + row.Name + '\')">Click Me</button>';
                            }}
                    ]          ,
                    stateSave: true,
                    "bDestroy": true,
                      });
    
                }
            if(type=="warning"){
                toastr.warning(message,type,{positionClass:"toast-bottom-right"});
                            
                        }
        
        }
    }
    xhr.open("POST","get_data",true);
    var f=new FormData();
    f.append("name","");
    f.append("parent","");
    f.append("csrfmiddlewaretoken",token)

    xhr.send(f);   

}
function deleteCategory(id){
var xhr=new XMLHttpRequest();
xhr.onreadystatechange=function(){

    if(this.status==200 && this.readyState==4){
        var {message,type}=JSON.parse(this.responseText);

        if(type=="success"){
toastr.success(message,type,{positionClass:"toast-bottom-right"});
            get_data_category()
        }
        if(type=="warning"){
            toastr.warning(message,type,{positionClass:"toast-bottom-right"});
                        
                    }

    }
}
xhr.open("POST","deleteCategory",true);
var f=new FormData();
f.append("id",id);
f.append("csrfmiddlewaretoken",token)

xhr.send(f)
}
var idCategory=""
function loadDataCategory(data){
    document.getElementById("name").value=data.name    
    document.getElementById("parent").value=data.parent_id   
    document.getElementById("submitCategory").value="Update"
    idCategory=data.id
        
}
function clearDataCategory(){
    document.getElementById("name").value=""    
    document.getElementById("parent").value=""   
    document.getElementById("submitCategory").value="Submit"
    idCategory=""

}
function submitStade(){
    var name=document.getElementById("name").value;
    var city=document.getElementById("city").value;
    var country=document.getElementById("country").value;
    var location=document.getElementById("location").value;
    var status=document.getElementById("status").value;
    var number_of_places=document.getElementById("number_of_places").value;
    
    var photo=document.getElementById("photo_location").files[0];
    if(number_of_places!="" && name!="" && city!="" && country!="" && location!="" && status!="" && photo){
        var xhr=new XMLHttpRequest();

 xhr.onreadystatechange=function(){
    if(this.status==200 && this.readyState==4){
        var {message,type}=JSON.parse(this.responseText);

        if(type=="success"){
toastr.success(message,type,{positionClass:"toast-bottom-right"});
// get_data_category()
clearDataSrades()
        }
        if(type=="warning"){
            toastr.warning(message,type,{positionClass:"toast-bottom-right"});
                        
                    }
    

    }
 }
 xhr.open("post","submitStades",true);
 var f=new FormData();  
 f.append("csrfmiddlewaretoken",token)
 f.append("name",name);
 f.append("number_of_places",number_of_places);
 f.append("city",city);
 f.append("country",country);
 f.append("location",location);
 f.append("status",status);
 f.append("photo",photo);
 f.append("id",idStade)
 xhr.send(f);
    }else{
        toastr.warning("Please all the fields are required !!","warning",{positionClass:"toast-bottom-right"});

    }
    
}
function clearDataSrades(){
    document.getElementById("name").value="";
    document.getElementById("city").value="";
    document.getElementById("country").value="";
    document.getElementById("location").value="";
    document.getElementById("status").value="";
    idStade=false
    get_data_stades();

}

function get_data_stades(){
    if(!document.getElementById("dataStades"))
        return 

    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(this.status==200 && this.readyState==4){
            var {type,message}=JSON.parse(this.responseText);
            if(type=="success"){
                $('#example').DataTable({
                    data: message,
                    columns: [
    
                        { data: "id" ,visible: false},
    
                        { data: "name" ,
                            createdCell: function (td, cellData, rowData, row, col) {
                                $(td).addClass('custom-td-class'); // Add a CSS class to the <td>
                            }
                        },
                        { data: "city" ,
                            createdCell: function (td, cellData, rowData, row, col) {
                                $(td).addClass('custom-td-class'); // Add a CSS class to the <td>
                            }
                        },
                        { data: "country" ,
                            createdCell: function (td, cellData, rowData, row, col) {
                                $(td).addClass('custom-td-class'); // Add a CSS class to the <td>
                            }
                        },
                        { data: "nbr_places" ,
                            createdCell: function (td, cellData, rowData, row, col) {
                                $(td).addClass('custom-td-class'); // Add a CSS class to the <td>
                            }
                        },
                        { data: "location" ,
                            createdCell: function (td, cellData, rowData, row, col) {
                                $(td).addClass('custom-td-class'); // Add a CSS class to the <td>
                            }
                        },
                        { data: "status" ,
                            createdCell: function (td, cellData, rowData, row, col) {
                                $(td).addClass('custom-td-class'); // Add a CSS class to the <td>
                            }, render: function (data, type, row) {
                                // alert(JSON.stringify(row));
                                if (row.status=="Open")
                                return  "<span style='margin: 1px;padding-bottom: 0px;background-color: #2a9d8f;display:inline-block;padding:.35em .65em;font-size:.75em;font-weight:700;line-height:1;color:#fff;text-align:center;white-space:nowrap;vertical-align:baseline;border-radius:.25rem;' className='badge pb-1'>Open</span>"
                                if (row.status=="Closed")
                                    return  "<span style='margin: 1px;padding-bottom: 0px;background-color: #e76f51;display:inline-block;padding:.35em .65em;font-size:.75em;font-weight:700;line-height:1;color:#fff;text-align:center;white-space:nowrap;vertical-align:baseline;border-radius:.25rem;' className='badge pb-1'>Closed</span>"
                                if (row.status=="Partial")
                                    return  "<span style='margin: 1px;padding-bottom: 0px;background-color: #e9c46a;display:inline-block;padding:.35em .65em;font-size:.75em;font-weight:700;line-height:1;color:#fff;text-align:center;white-space:nowrap;vertical-align:baseline;border-radius:.25rem;' className='badge pb-1'>Partial</span>"
                                if (row.status=="Need To Be Fixed")
                                    return  "<span style='margin: 1px;padding-bottom: 0px;background-color: #264653;display:inline-block;padding:.35em .65em;font-size:.75em;font-weight:700;line-height:1;color:#fff;text-align:center;white-space:nowrap;vertical-align:baseline;border-radius:.25rem;' className='badge pb-1'>Need To Be Fixed</span>"
    
                                // return "<span></span>"
                                // return '<button class="btn btn-primary" onclick="handleButtonClick(\'' + row.Name + '\')">Click Me</button>';
                            }
    
                        },

                        { data: null,   // No data binding for this column
                            orderable: false,  // Disable ordering for this column
                            render: function (data, type, row) {
                                // alert(JSON(row))
                                return "<span className='Icon Icon_delete' style='color: #d62828 !important;border-color: #d62828 !important;transition: .3s !important;cursor: pointer !important;    border: 1px solid #d62828 !important;border-radius: 5px  !important;padding: 5px !important;'  onClick='deleteStade("+row.id+")'><ion-icon   name='trash-outline'></ion-icon></span>&nbsp;            <span  className='Icon Icon_update' style='color: #f77f00 !important;border-color: #f77f00 !important;transition: .3s !important;cursor: pointer !important;    border: 1px solid #f77f00 !important;border-radius: 5px  !important;padding: 5px !important;' data-bs-toggle='modal' data-bs-target='#modelForm'  onClick='loadDataStades("+JSON.stringify(row)+")'><ion-icon   name='pencil-outline' ></ion-icon></span>"
                                // return '<button class="btn btn-primary" onclick="handleButtonClick(\'' + row.Name + '\')">Click Me</button>';
                            }}
                    ]          ,
                    stateSave: true,
                    "bDestroy": true,
                      });
    
                }
            if(type=="warning"){
                toastr.warning(message,type,{positionClass:"toast-bottom-right"});
                            
                        }
        
        }
    }
    xhr.open("POST","get_data_stades",true);
    var f=new FormData();
    f.append("name",document.getElementById("name_search").value);
    f.append("city",document.getElementById("city_search").value);
    f.append("location",document.getElementById("location_search").value);
    f.append("country",document.getElementById("contry_search").value);
    f.append("nbr_places",document.getElementById("nbr_places_search").value);
    f.append("status",document.getElementById("status_search").value);
    f.append("csrfmiddlewaretoken",token)

    xhr.send(f);   
   
}
function loadDemoDataStades(){
        var xhr=new XMLHttpRequest();

 xhr.onreadystatechange=function(){
    if(this.status==200 && this.readyState==4){
        var {message,type}=JSON.parse(this.responseText);

        if(type=="success"){
toastr.success(message,type,{positionClass:"toast-bottom-right"});
// get_data_category()
clearDataSrades()
        }
        if(type=="warning"){
            toastr.warning(message,type,{positionClass:"toast-bottom-right"});
                        
                    }
    

    }
 }
 xhr.open("post","loadDemoData",true);
 var f=new FormData();  
 f.append("csrfmiddlewaretoken",token)
 xhr.send(f);
   
}
function deleteStade(id){
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
    
        if(this.status==200 && this.readyState==4){
            var {message,type}=JSON.parse(this.responseText);
    
            if(type=="success"){
    toastr.success(message,type,{positionClass:"toast-bottom-right"});
                get_data_stades()
            }
            if(type=="warning"){
                toastr.warning(message,type,{positionClass:"toast-bottom-right"});
                            
                        }
    
        }
    }
    xhr.open("POST","deleteStade",true);
    var f=new FormData();
    f.append("id",id);
    f.append("csrfmiddlewaretoken",token)
    
    xhr.send(f)
}
var idStade=false
function loadDataStades(data){
    document.getElementById("name").value=data.name;
    document.getElementById("city").value=data.city;
    document.getElementById("country").value=data.country;
    document.getElementById("location").value=data.location;
    document.getElementById("status").value=data.status;
    document.getElementById("number_of_places").value=data.nbr_places;

   idStade=data.id
}
function chart_number_of_staduims_by_city(){
    var xhr=new XMLHttpRequest();
    xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){
            var {message,type}=JSON.parse(this.responseText);
        
            var labels=new Array();
            var values=new Array();
            for(i=0;i<message.length;i++){
               labels.push(message[i]['city'])
               values.push(message[i]['count'])
            }
            dataRedar = {
               labels:labels,
               datasets: [
                   {
                 label: 'Number of the stades by city ',
                 data: values,
                 fill: true,
                 backgroundColor: 
                 [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 205, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(201, 203, 207, 0.2)'
                ],
                 borderColor: [
                  'rgb(255, 99, 132)',
                  'rgb(255, 159, 64)',
                  'rgb(255, 205, 86)',
                  'rgb(75, 192, 192)',
                  'rgb(54, 162, 235)',
                  'rgb(153, 102, 255)',
                  'rgb(201, 203, 207)'
                ],
                 pointBackgroundColor: 'rgb(255, 99, 132)',
                 pointBorderColor: '#fff',
                 pointHoverBackgroundColor: '#fff',
                 pointHoverBorderColor: 'rgb(255, 99, 132)'
               }
           ]
             };
             var configRedar = {
               type: 'bar',
               data: dataRedar,
               options: {
                  responsive: true, // Enable responsiveness
                  maintainAspectRatio: false,
          
                 elements: {
                   line: {
                     borderWidth: 3
                   }
                 },
                 scales: {
                  yAxes: [{
                      display: true,
                      ticks: {
                          beginAtZero: true
                      }
                  }]
              }            
               },
             };
             
             if(number_of_staduims_by_city!=null){
               number_of_staduims_by_city.destroy();
           }
           // document.getElementById('number_of_staduims_by_city')
           number_of_staduims_by_city = new Chart(document.getElementById("number_of_staduims_by_city"),configRedar);
       //   }
        }
    }
    xhr.open("post","chart_number_of_staduims_by_city",true)
    var f=new FormData();
    f.append("csrfmiddlewaretoken",token)
    xhr.send(f);

 
    }
 //exeucter la fonction si en entre sur le dashboard
 if(document.getElementById("number_of_staduims_by_city")!=null){
    chart_number_of_staduims_by_city();
 }
 var number_of_staduims_by_city = null; 
 

 function chart_number_of_staduims_by_status(){
    var xhr=new XMLHttpRequest();
    xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){
            var {message,type}=JSON.parse(this.responseText);
        
            var labels=new Array();
            var values=new Array();
            for(i=0;i<message.length;i++){
               labels.push(message[i]['status'])
               values.push(message[i]['count'])
            }
            dataRedar = {
               labels:labels,
               datasets: [
                   {
                 label: 'Number of the stades by Status ',
                 data: values,
                 fill: true,
                 backgroundColor: 
                 [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 205, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(201, 203, 207, 0.2)'
                ],
                 borderColor: [
                  'rgb(255, 99, 132)',
                  'rgb(255, 159, 64)',
                  'rgb(255, 205, 86)',
                  'rgb(75, 192, 192)',
                  'rgb(54, 162, 235)',
                  'rgb(153, 102, 255)',
                  'rgb(201, 203, 207)'
                ],
                 pointBackgroundColor: 'rgb(255, 99, 132)',
                 pointBorderColor: '#fff',
                 pointHoverBackgroundColor: '#fff',
                 pointHoverBorderColor: 'rgb(255, 99, 132)'
               }
           ]
             };
             var configRedar = {
               type: 'bar',
               data: dataRedar,
               options: {
                  responsive: true, // Enable responsiveness
                  maintainAspectRatio: false,
          
                 elements: {
                   line: {
                     borderWidth: 3
                   }
                 },
                 scales: {
                  yAxes: [{
                      display: true,
                      ticks: {
                          beginAtZero: true
                      }
                  }]
              }            
               },
             };
             
             if(number_of_staduims_by_state!=null){
               number_of_staduims_by_state.destroy();
           }
           // document.getElementById('number_of_staduims_by_state')
           number_of_staduims_by_state = new Chart(document.getElementById("number_of_staduims_by_state"),configRedar);
       //   }
        }
    }
    xhr.open("post","chart_number_of_staduims_by_status",true)
    var f=new FormData();
    f.append("csrfmiddlewaretoken",token)
    xhr.send(f);

 
    }
 //exeucter la fonction si en entre sur le dashboard
 if(document.getElementById("number_of_staduims_by_state")!=null){
    chart_number_of_staduims_by_status();
 }
 var number_of_staduims_by_state = null; 
 
 function get_data_events(){
    
    if(!document.getElementById("dataEvent"))
        return
    var name=document.getElementById("name_search").value;
    var date=document.getElementById("date_search").value;
    var start=document.getElementById("start_search").value;
    var End=document.getElementById("End_search").value;
    var nbr_ticket=document.getElementById("nbr_ticket_search").value;
    var state=document.getElementById("state_search").value;
    var stade=document.getElementById("stade_search").value;
    var category=document.getElementById("category_search").value;
    var xhr=new XMLHttpRequest();
    xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){
            var {type,data_Categories,data_satded,data}=JSON.parse(this.responseText);
            document.getElementById("stade").innerHTML=data_satded
            document.getElementById("category").innerHTML=data_Categories
            $('#example').DataTable({
                data: data,
                columns: [

                    { data: "id" ,visible: false},

                    { data: "name" ,
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).addClass('custom-td-class'); // Add a CSS class to the <td>
                        }
                    },
                    { data: "date" ,
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).addClass('custom-td-class'); // Add a CSS class to the <td>
                        }
                    },
                    { data: "time_start" ,
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).addClass('custom-td-class'); // Add a CSS class to the <td>
                        }
                    },
                    { data: "time_end" ,
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).addClass('custom-td-class'); // Add a CSS class to the <td>
                        }
                    },
                    { data: "nbr_ticket" ,
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).addClass('custom-td-class'); // Add a CSS class to the <td>
                        }
                    },

                    { data: "state" ,
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).addClass('custom-td-class'); // Add a CSS class to the <td>
                        }, render: function (data, type, row) {
                            // alert(JSON.stringify(row));
                            if (row.state=="Open")
                            return  "<span style='margin: 1px;padding-bottom: 0px;background-color: #2a9d8f;display:inline-block;padding:.35em .65em;font-size:.75em;font-weight:700;line-height:1;color:#fff;text-align:center;white-space:nowrap;vertical-align:baseline;border-radius:.25rem;' className='badge pb-1'>Open</span>"
                            if (row.state=="Closed")
                                return  "<span style='margin: 1px;padding-bottom: 0px;background-color: #e76f51;display:inline-block;padding:.35em .65em;font-size:.75em;font-weight:700;line-height:1;color:#fff;text-align:center;white-space:nowrap;vertical-align:baseline;border-radius:.25rem;' className='badge pb-1'>Closed</span>"

                            // return "<span></span>"
                            // return '<button class="btn btn-primary" onclick="handleButtonClick(\'' + row.Name + '\')">Click Me</button>';
                        }

                    },
                    { data: "stade" ,
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).addClass('custom-td-class'); // Add a CSS class to the <td>
                        }
                    },
                    { data: "category" ,
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).addClass('custom-td-class'); // Add a CSS class to the <td>
                        }
                    },

                    { data: null,   // No data binding for this column
                        orderable: false,  // Disable ordering for this column
                        render: function (data, type, row) {
                            // alert(JSON(row))
                            return "<span className='Icon Icon_delete' style='color: #d62828 !important;border-color: #d62828 !important;transition: .3s !important;cursor: pointer !important;    border: 1px solid #d62828 !important;border-radius: 5px  !important;padding: 5px !important;'  onClick='deleteEvent("+row.id+")'><ion-icon   name='trash-outline'></ion-icon></span>&nbsp;            <span  className='Icon Icon_update' style='color: #f77f00 !important;border-color: #f77f00 !important;transition: .3s !important;cursor: pointer !important;    border: 1px solid #f77f00 !important;border-radius: 5px  !important;padding: 5px !important;' data-bs-toggle='modal' data-bs-target='#modelForm'  onClick='loadDataEvent("+JSON.stringify(row)+")'><ion-icon   name='pencil-outline' ></ion-icon></span>"
                            // return '<button class="btn btn-primary" onclick="handleButtonClick(\'' + row.Name + '\')">Click Me</button>';
                        }}
                ]          ,
                stateSave: true,
                "bDestroy": true,
                  });
        }
    }
    xhr.open("post","get_data_events",true)
    var f=new FormData();
    f.append("name",name);
    f.append("date",date);
    f.append("start",start);
    f.append("End",End);
    f.append("nbr_ticket",nbr_ticket);
    f.append("state",state);
    f.append("stade",stade);
    f.append("category",category);
    f.append("csrfmiddlewaretoken",token)
    xhr.send(f);

 }
 function submitEvent(){
    var name=document.getElementById("name").value;
    var date=document.getElementById("date").value;
    var start=document.getElementById("start").value;
    var end=document.getElementById("end").value;
    var nbr_ticket=document.getElementById("nbr_ticket").value;
    var status=document.getElementById("status").value;
    var stade=document.getElementById("stade").value;
    var category=document.getElementById("category").value;
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
    
        if(this.status==200 && this.readyState==4){
            var {message,type}=JSON.parse(this.responseText);
    
            if(type=="success"){
    toastr.success(message,type,{positionClass:"toast-bottom-right"});
                get_data_stades()
            }
            if(type=="warning"){
                toastr.warning(message,type,{positionClass:"toast-bottom-right"});
                            
                        }
    
        }
    }
    xhr.open("POST","submitEvent",true);
    var f=new FormData();
    f.append("name",name);
    f.append("date",date);
    f.append("start",start);
    f.append("end",end);
    f.append("nbr_ticket",nbr_ticket);
    f.append("status",status);
    f.append("stade",stade);
    f.append("category",category);
    f.append("csrfmiddlewaretoken",token)
    f.append("id",idEvent)
    xhr.send(f)    
 }
 function loadDemoDataEvent(){
    document.getElementById("loadDemoData_Event").disabled=true;
    var xhr=new XMLHttpRequest();

    xhr.onreadystatechange=function(){
       if(this.status==200 && this.readyState==4){
           var {message,type}=JSON.parse(this.responseText);
   
           if(type=="success"){
   toastr.success(message,type,{positionClass:"toast-bottom-right"});
   document.getElementById("loadDemoData_Event").disabled=false;

   get_data_events()
           }
           if(type=="warning"){
               toastr.warning(message,type,{positionClass:"toast-bottom-right"});
                           
                       }
       
   
       }
    }
    xhr.open("post","loadDemoDataEvent",true);
    var f=new FormData();  
    f.append("csrfmiddlewaretoken",token)
    xhr.send(f);
     
 }
 function deleteEvent(id){
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
    
        if(this.status==200 && this.readyState==4){
            var {message,type}=JSON.parse(this.responseText);
    
            if(type=="success"){
    toastr.success(message,type,{positionClass:"toast-bottom-right"});
                get_data_events()
            }
            if(type=="warning"){
                toastr.warning(message,type,{positionClass:"toast-bottom-right"});
                            
                        }
    
        }
    }
    xhr.open("POST","deleteEvent",true);
    var f=new FormData();
    f.append("id",id);
    f.append("csrfmiddlewaretoken",token)
    
    xhr.send(f)  
 }
 var idEvent=false
 function loadDataEvent(data){
    const selectElement=document.getElementById("stade")
    const options = selectElement.options;

for (let i = 0; i < options.length; i++) {
    const option = options[i];
    const optionText = option.innerHTML;
    if(option.innerHTML==data.stade){
        document.getElementById("stade").value=option.value;
        break
    }
}

const selectElementCategory=document.getElementById("category")
const optionsCategory = selectElement.options;

for (let i = 0; i < options.length; i++) {
const option = options[i];
const optionText = option.innerHTML;
if(option.innerHTML==data.category){
    document.getElementById("category").value=option.value;
    break
}
}

    document.getElementById("name").value=data.name;
    document.getElementById("date").value=data.date;
    document.getElementById("start").value=data.time_start;
    document.getElementById("end").value=data.time_end;
    document.getElementById("nbr_ticket").value=data.nbr_ticket;
    document.getElementById("status").value=data.state;
    idEvent=data.id  
    
}
function clearDataEvent(){
    document.getElementById("name").value="";
    document.getElementById("date").value="";
    document.getElementById("start").value="";
    document.getElementById("end").value="";
    document.getElementById("nbr_ticket").value="";
    document.getElementById("status").value="";
    document.getElementById("stade").value="";
    document.getElementById("category").value="";


    idEvent=false  

}

function chart_number_of_event_by_stade(){
    var xhr=new XMLHttpRequest();
    xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){
            var {message,type}=JSON.parse(this.responseText);
        
            var labels=new Array();
            var values=new Array();
            for(i=0;i<message.length;i++){
               labels.push(message[i]['name'])
               values.push(message[i]['count'])
            }
            dataRedar = {
               labels:labels,
               datasets: [
                   {
                 label: 'Number of the Event by Stade ',
                 data: values,
                 fill: true,
                 backgroundColor: 
                 [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 205, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(201, 203, 207, 0.2)'
                ],
                 borderColor: [
                  'rgb(255, 99, 132)',
                  'rgb(255, 159, 64)',
                  'rgb(255, 205, 86)',
                  'rgb(75, 192, 192)',
                  'rgb(54, 162, 235)',
                  'rgb(153, 102, 255)',
                  'rgb(201, 203, 207)'
                ],
                 pointBackgroundColor: 'rgb(255, 99, 132)',
                 pointBorderColor: '#fff',
                 pointHoverBackgroundColor: '#fff',
                 pointHoverBorderColor: 'rgb(255, 99, 132)'
               }
           ]
             };
             var configRedar = {
               type: 'bar',
               data: dataRedar,
               options: {
                  responsive: true, // Enable responsiveness
                  maintainAspectRatio: false,
          
                 elements: {
                   line: {
                     borderWidth: 3
                   }
                 },
                 scales: {
                  yAxes: [{
                      display: true,
                      ticks: {
                          beginAtZero: true
                      }
                  }]
              }            
               },
             };
             
             if(number_of_event_by_stade!=null){
               number_of_event_by_stade.destroy();
           }
           // document.getElementById('number_of_event_by_stade')
           number_of_event_by_stade = new Chart(document.getElementById("number_of_event_by_stade"),configRedar);
       //   }
        }
    }
    xhr.open("post","chart_number_of_event_by_stade",true)
    var f=new FormData();
    f.append("csrfmiddlewaretoken",token)
    xhr.send(f);

 
    }
 //exeucter la fonction si en entre sur le dashboard
 if(document.getElementById("number_of_event_by_stade")!=null){
    chart_number_of_event_by_stade();
 }
 var number_of_event_by_stade = null; 
