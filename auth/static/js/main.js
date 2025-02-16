var token=document.getElementsByName('csrfmiddlewaretoken')[0].value
// var id_qualification=0
// var id_category=0
// var offset_qualification=0
// var offset_category=0
// var offset_company=0
// function loginUser(){
//     var email=document.getElementById("email").value;
//     var password=document.getElementById("password").value;
//     if(email!="" && password!=""){
//         var f=new FormData();
//         f.append("email",email);
//         f.append("password",password);
//         f.append("csrfmiddlewaretoken",token)
//         var xhr=new XMLHttpRequest();
//         xhr.onreadystatechange=function(){
//             if(this.status==200 && this.readyState==4){
//                 var {message,type}=JSON.parse(this.responseText);
//                 if(type=="Success"){
                    
//                     toastr.success(message,type,{positionClass:"toast-bottom-right"});
//                     document.getElementById("email").value="";
//                     document.getElementById("password").value="";
//                     window.location.href="/"
//                 }
//                 if(type=="Warning")
//                      toastr.warning(message,type,{positionClass:"toast-bottom-right"});

//             }
//         }
//         xhr.open("POST","loginUser",true);
//         xhr.send(f);

//     }else{
//         toastr.warning("All the fields are required !!","Warning",{positionClass:"toast-bottom-right"});

//     }
// }
// function signIng(){
//     var first_name=document.getElementById("first_name").value;
//     var last_name=document.getElementById("last_name").value;
//     var phone=document.getElementById("phone").value;
//     var email=document.getElementById("email").value;
//     var password=document.getElementById("password").value;
//     if(first_name!="" && last_name!="" &&
//     phone!="" &&
//     email!="" &&
//     password!=""){
//             var f=new FormData();
//             f.append("email",email);
//             f.append("password",password);
//             f.append("csrfmiddlewaretoken",token)
//             f.append("first_name",first_name);
//             f.append("last_name",last_name);
//             f.append("phone",phone);
//             var xhr=new XMLHttpRequest();
//             xhr.onreadystatechange=function(){
//                 if(this.status==200 && this.readyState==4){
//                     var {message,type}=JSON.parse(this.responseText);
//                     if(type=="Success"){
                        
//                         toastr.success(message,type,{positionClass:"toast-bottom-right"});
//                         document.getElementById("first_name").value="";
//                         document.getElementById("last_name").value="";
//                         document.getElementById("phone").value="";
//                         document.getElementById("email").value="";
//                         document.getElementById("password").value="";
    
//                     }
//                     if(type=="Warning")
//                          toastr.warning(message,type,{positionClass:"toast-bottom-right"});
    
//                 }
//             }
//             xhr.open("POST","signinUser",true);
//             xhr.send(f);
//         // toastr.success("message","Succès",{positionClass:"toast-bottom-right"});
//     }else{
//         toastr.warning("All the fields are required !!","Warning",{positionClass:"toast-bottom-right"});
        
//     }
   
// }
// function submitQualification(){
//     var name=document.getElementById("name").value;
//     var Description=document.getElementById("Description").value;
//     var color=document.getElementById("color").value;
//     if(name!="" && Description!="" && color!=""){
//         var f=new FormData()
//         f.append("name",name)
//         f.append("DescriptionQ",Description);
//         f.append("color",color);
//         f.append("csrfmiddlewaretoken",token)
//         f.append("id",id_qualification);
//         var xhr=new XMLHttpRequest();
//         xhr.onreadystatechange=function(){
//             if(this.status==200 && this.readyState==4){
//                 var {message,type}=JSON.parse(this.responseText);
//                 if(type=="Success"){
                    
//                     toastr.success(message,type,{positionClass:"toast-bottom-right"});
//                     document.getElementById("name").value="";
//                     document.getElementById("Description").value="";
//                     document.getElementById("color").value="";
//                     getDataQulaifications()
//                 }
//                 if(type=="Warning")
//                      toastr.warning(message,type,{positionClass:"toast-bottom-right"});

//             }

//             }
//             xhr.open("POST","submitQualification",true);
//             xhr.send(f);
            
        
//     }else{
//         toastr.warning("All the fields are required !!","Warning",{positionClass:"toast-bottom-right"});
//     }
// }
// function getDataQulaifications(){
// if(document.getElementById("dataQualification")){

//     var name=document.getElementById("name_search").value;
//     var Description=document.getElementById("description_search").value;
//     var color=document.getElementById("color_search").value;
//     var f=new FormData()
//     f.append("name",name)
//     f.append("Description",Description)
//     f.append("color",color)
//     f.append("offset",offset_qualification);
//     f.append("csrfmiddlewaretoken",token)
//     var xhr=new XMLHttpRequest()
//     xhr.onreadystatechange=function(){
//         if(this.status==200 && this.readyState==4){
//             var {message,data}=JSON.parse(this.responseText);
//             var dataFrontEnd=""
//             if(data.length>0){
//                 for(var i=0;i<data.length;i++){
//                     dataFrontEnd+="<tr><td>"+data[i][0]+"</td>"
//                     dataFrontEnd+="<td>"+data[i][1]+"</td>"
//                     dataFrontEnd+="<td>"+data[i][2]+"</td>"
//                     dataFrontEnd+="<td>"+data[i][3]+"</td>"
//                     dataFrontEnd+="<td><ion-icon  class='Icon Icon_delete' onclick='deleteQualification("+data[i][0]+")' name='trash-outline'></ion-icon></td><td><ion-icon   class='Icon Icon_update' onclick='loadDataQualification("+JSON.stringify(data[i])+");' data-bs-toggle='modal' data-bs-target='#modalDomain' name='pencil-outline'></ion-icon></td>"
//                     dataFrontEnd+="</tr>"
//                 }
//                 document.getElementById("dataQualification").innerHTML=dataFrontEnd
//             }else{
//                 offset_qualification-=6
//                 getDataQulaifications()
//             }
//         }
//     }
//     xhr.open("POST","getDataQualifications",true);
//     xhr.send(f);
// }

// }
// function deleteQualification(id){
//     var f=new FormData()
//     f.append("id",id)
//     f.append("csrfmiddlewaretoken",token)
//     var xhr=new XMLHttpRequest()
//     xhr.onreadystatechange=function(){
//         if(this.status==200 && this.readyState==4){
//             var {message,type}=JSON.parse(this.responseText);
//             if(type=="Success"){
                        
//                 toastr.success(message,type,{positionClass:"toast-bottom-right"});
//                 getDataQulaifications()
//             }
//             if(type=="Warning")
//                  toastr.warning(message,type,{positionClass:"toast-bottom-right"});


//         }
//     }
//     xhr.open("POST","deleteQualifications",true);
//     xhr.send(f);
        
// }
// function loadDataQualification(data){
    
//     document.getElementById("name").value=data[1];
//     document.getElementById("Description").value=data[2];
//     document.getElementById("color").value=data[3];
//     id_qualification=data[0]
//     document.getElementById("submitDeviceButton").innerHTML="Update";

// }
// function hideDataQualifiation(){
//     document.getElementById("name").value="";
//     document.getElementById("Description").value="";
//     document.getElementById("color").value="";
//     id_qualification=0
//     document.getElementById("submitDeviceButton").innerHTML="Add";
// }
// function navigateDataContacts(data){
//     if(data=="next"){
//         offset_qualification+=6
//     }
//     if(data=="prev" && offset_qualification>0){
//         offset_qualification-=6

//     }
//     getDataQulaifications();
// }   
// function submitCategory(){
//     var name=document.getElementById("name").value;
//     var description=document.getElementById("description").value;
//     if(name!="" && description!=""){
//         var xhr=new XMLHttpRequest();
//         xhr.onreadystatechange=function(){
//             if(this.status==200 && this.readyState==4){
//                 var {message,type}=JSON.parse(this.responseText);
//                 if(type=="Success"){
                            
//                     toastr.success(message,type,{positionClass:"toast-bottom-right"});
//                     getDataCategories()
//                 }
//                 if(type=="Warning")
//                      toastr.warning(message,type,{positionClass:"toast-bottom-right"});
    
//                }
//         }
//         var f=new FormData();
//         f.append("name",name);
//         f.append("description",description);
//         f.append("csrfmiddlewaretoken",token)
//         f.append("id",id_category);
//         xhr.open("POST","addCategory",true);
//         xhr.send(f)
//     }else{
//         toastr.warning("Please all the field required !!","Warning",{positionClass:"toast-bottom-right"})
//     }
// }

// function getDataCategories(){
//     if(document.getElementById("dataCategories")){
//         var name=document.getElementById("name_search").value;
//         var Description=document.getElementById("description_search").value;
//         var f=new FormData()
//         f.append("name",name)
//         f.append("Description",Description)
//         f.append("offset",offset_category);
//         f.append("csrfmiddlewaretoken",token)
//         var xhr=new XMLHttpRequest()
//         xhr.onreadystatechange=function(){
//             if(this.status==200 && this.readyState==4){
//                 var {message,data}=JSON.parse(this.responseText);
//                 var dataFrontEnd=""
//                 if(data.length>0){
//                     for(var i=0;i<data.length;i++){
//                         dataFrontEnd+="<tr><td>"+data[i][0]+"</td>"
//                         dataFrontEnd+="<td>"+data[i][1]+"</td>"
//                         dataFrontEnd+="<td>"+data[i][2]+"</td>"
//                         dataFrontEnd+="<td><ion-icon  class='Icon Icon_delete' onclick='deleteCategory("+data[i][0]+")' name='trash-outline'></ion-icon></td><td><ion-icon   class='Icon Icon_update' onclick='loadDataCategory("+JSON.stringify(data[i])+");' data-bs-toggle='modal' data-bs-target='#modalDomain' name='pencil-outline'></ion-icon></td>"
//                         dataFrontEnd+="</tr>"
//                     }
//                     document.getElementById("dataCategories").innerHTML=dataFrontEnd
//                 }else{
//                     if(message=="full"){
//                         offset_qualification-=6
//                         getDataQulaifications()
//                     }else{
//                         document.getElementById("dataCategories").innerHTML=""
//                     }
//                 }
//             }
//         }
//         xhr.open("POST","getdataCategories",true);
//         xhr.send(f);
//     }
    
//     }
// function deleteCategory(id){
//     var f=new FormData()
//     f.append("id",id)
//     f.append("csrfmiddlewaretoken",token)
//     var xhr=new XMLHttpRequest()
//     xhr.onreadystatechange=function(){
//         if(this.status==200 && this.readyState==4){
//             var {message,type}=JSON.parse(this.responseText);
//             if(type=="Success"){
                        
//                 toastr.success(message,type,{positionClass:"toast-bottom-right"});
//                 getDataCategories()
                
//             }
//             if(type=="Warning")
//                  toastr.warning(message,type,{positionClass:"toast-bottom-right"});


//         }
//     }
//     xhr.open("POST","deleteCategory",true);
//     xhr.send(f);

// }
// function loadDataCategory(data){
    
//     document.getElementById("name").value=data[1];
//     document.getElementById("description").value=data[2];
//     id_category=data[0]
//     document.getElementById("submitDeviceButton").innerHTML="Update";

// }

// function hideDataCaegory(){
//     document.getElementById("name").value="";
//     document.getElementById("description").value="";
//     id_category=0
//     document.getElementById("submitDeviceButton").innerHTML="Add";
// }

// function submitCompany(){
//     var Logo=document.getElementById("Logo").files[0];
//     var name=document.getElementById("name").value;
//     var City=document.getElementById("City").value;
//     var Email=document.getElementById("Email").value;
//     var Phone=document.getElementById("Phone").value;
//     var Owner=document.getElementById("Owner").value;
//     var VAT=document.getElementById("VAT").value;
//     var Adresse=document.getElementById("Adresse").value;

//     if(document.getElementById("Logo").files.length>0 && name!="" && City!="" && Email!="" && Phone!="" && Owner!="" && VAT!="" && Adresse!=""){
//         var f=new FormData()
//         f.append("Logo",Logo)
//         f.append("name",name)
//         f.append("City",City)
//         f.append("csrfmiddlewaretoken",token)

//         f.append("Email",Email)
//         f.append("Phone",Phone)
//         f.append("Owner",Owner)
//         f.append("VAT",VAT)
//         f.append("Adresse",Adresse)

//         var xhr=new XMLHttpRequest();
//         xhr.onreadystatechange=function(){
//             if(this.status==200 && this.readyState==4){
//                 var {message,type}=JSON.parse(this.responseText);
//                 if(type=="Success"){
                    
//                     toastr.success(message,type,{positionClass:"toast-bottom-right"});
//                     // document.getElementById("name").value="";
//                     // document.getElementById("Description").value="";
//                     // document.getElementById("color").value="";
//                     // getDataQulaifications()
//                 }
//                 if(type=="Warning")
//                      toastr.warning(message,type,{positionClass:"toast-bottom-right"});

//             }

//             }
//             xhr.open("POST","submitCompany",true);
//             xhr.send(f);
            
        
//     }else{
//         toastr.warning("All the fields are required !!","Warning",{positionClass:"toast-bottom-right"});
//     }   
// }

// function getOwners(){
//     if(document.getElementById("Owner")){

//         var f=new FormData()
//         f.append("csrfmiddlewaretoken",token)
//         var xhr=new XMLHttpRequest()
//         xhr.onreadystatechange=function(){
//             if(this.status==200 && this.readyState==4){
//                 var {message,type,data}=JSON.parse(this.responseText);
//                 if(type=="Success"){
//                     var onwers=""
//                     for(var i=0;i<data.length;i++){
//                         onwers+="<option value='"+data[i].id+"'>"+data[i].first_name+" "+data[i].last_name+"</option>"

//                     }
//                     document.getElementById("Owner").innerHTML=onwers
//                 }
//                 if(type=="Warning")
//                      toastr.warning(message,type,{positionClass:"toast-bottom-right"});
    
    
//             }
//         }
//         xhr.open("POST","getOwners",true);
//         xhr.send(f);
       
//     }
// }
// function getDataCompany(){
//     if(document.getElementById("dataCompany")){
    
//         var name=document.getElementById("name_search").value;
//         var city=document.getElementById("city_search").value;
//         var email=document.getElementById("email_search").value;
//         var phone=document.getElementById("phone_search").value;
//         var owner=document.getElementById("owner_search").value;
//         var vat=document.getElementById("vat_search").value;
//         var adresse=document.getElementById("adresse_search").value;
//         var f=new FormData()
//         f.append("name",name)
//         f.append("csrfmiddlewaretoken",token)

//         f.append("city",city)
//         f.append("email",email)
//         f.append("phone",phone)
//         f.append("owner",owner)
//         f.append("vat",vat)
//         f.append("adresse",adresse)
//         f.append("offset",offset_company)

//         var xhr=new XMLHttpRequest()
//         xhr.onreadystatechange=function(){
//             if(this.status==200 && this.readyState==4){
//                 var {message,data}=JSON.parse(this.responseText);
//                 var dataFrontEnd=""
//                 if(data.length>0){
//                     for(var i=0;i<data.length;i++){
//                         dataFrontEnd+="<div class='col-md-3 col-lg-3'>"
//                         dataFrontEnd+="<div class='card mt-3'>"
//                         dataFrontEnd+="<img src='/media/"+data[i][8]+"'  class='card-img-top img-main img-fluid'/>"
//                         dataFrontEnd+="<div class='card-body'>"
//                         dataFrontEnd+="<div class='card-text text-center'>"
//                         dataFrontEnd+="<div class='d-flex text-start'>"
//                         dataFrontEnd+="<div class='row py-2 p-3'>"
//                         dataFrontEnd+="<div class='fw-bolder'>Name</div>"
//                         dataFrontEnd+="<div class='fw-normal'>"+data[i][0]+"</div>"
//                         dataFrontEnd+="</div>"
//                         dataFrontEnd+="<div class='row py-2 p-3'>"
//                         dataFrontEnd+="<div class='fw-bolder'>City</div>"
//                         dataFrontEnd+="<div class='fw-normal'>"+data[i][1]+"</div>"
//                         dataFrontEnd+="</div>"
//                         dataFrontEnd+="<div class='row py-2 p-3'>"
//                         dataFrontEnd+="<div class='fw-bolder'>Email</div>"
//                         dataFrontEnd+="<div class='fw-normal'>"+data[i][2]+"</div>"
//                         dataFrontEnd+="</div></div>"
                        
//                         dataFrontEnd+="<div class='d-flex text-start'>"
//                         dataFrontEnd+="<div class='row py-2 p-3'>"
//                         dataFrontEnd+="<div class='fw-bolder'>Phone</div>"
//                         dataFrontEnd+="<div class='fw-normal'>"+data[i][3]+"</div></div>"
//                         dataFrontEnd+="<div class='row py-2 p-3'>"
//                         dataFrontEnd+="<div class='fw-bolder'>VAT</div>"
//                         dataFrontEnd+="<div class='fw-normal'>"+data[i][4]+"</div></div>"
//                         dataFrontEnd+="<div class='row py-2 p-3'>"
//                         dataFrontEnd+="<div class='fw-bolder'>Adresse</div>"
//                         dataFrontEnd+="<div class='fw-normal'>"+data[i][5]+"</div></div>"
//                         dataFrontEnd+="</div><div class='d-flex text-start'>"
//                         dataFrontEnd+="<div class='row py-2 p-3'>"
//                         dataFrontEnd+="<div class='fw-bolder'>Owner</div>"
//                         dataFrontEnd+="<div class='fw-normal'>"+data[i][6]+" "+data[i][7]+"</div></div>"

//                         dataFrontEnd+="</div></div></div>"
        
//                     }
//                     document.getElementById("dataCompany").innerHTML=dataFrontEnd
//                 }else{
//                     if(message=="full"){
//                         offset_qualification-=6
//                         getDataQulaifications()
//                     }else{
//                         document.getElementById("dataCompany").innerHTML=""
//                     }
//                 }
//             }
//         }
//         xhr.open("POST","getDataCompany",true);
//         xhr.send(f);
//     }
    
//     }
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
 xhr.send(f);
}
function getParentCategory(){
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
                        { data: "parent" ,
                            createdCell: function (td, cellData, rowData, row, col) {
                                $(td).addClass('custom-td-class'); // Add a CSS class to the <td>
                            }
                        },

                        { data: null,   // No data binding for this column
                            orderable: false,  // Disable ordering for this column
                            render: function (data, type, row) {
                                // alert(JSON(row))
                                return "<span className='Icon Icon_delete' style='color: #d62828 !important;border-color: #d62828 !important;transition: .3s !important;cursor: pointer !important;    border: 1px solid #d62828 !important;border-radius: 5px  !important;padding: 5px !important;'  onClick='deleteCategory("+row.id+")'><ion-icon   name='trash-outline'></ion-icon></span>&nbsp;            <span  className='Icon Icon_update' style='color: #f77f00 !important;border-color: #f77f00 !important;transition: .3s !important;cursor: pointer !important;    border: 1px solid #f77f00 !important;border-radius: 5px  !important;padding: 5px !important;' data-bs-toggle='modal' data-bs-target='#modelForm'  onClick='loadDataUser("+JSON.stringify(row)+")'><ion-icon   name='pencil-outline' ></ion-icon></span>"
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
    if(this.status==200 && this.readyState==400){
        var {message,type}=JSON.parse(this.responseText);

        if(type=="success"){
toastr.success(message,type,{positionClass:"toast-bottom-right"});
            
        }
        if(type=="warning"){
            toastr.warning(message,type,{positionClass:"toast-bottom-right"});
                        
                    }

    }
}
xhr.open("POST","deleteCategory",true);
var f=new FormData();
f.append("id",id);
xhr.send(f)
}