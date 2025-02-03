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
var xhr=new XMLHttpRequest();
xhr.onreadystatechange=()=>{
    if(this.status==200 && this.readyState==4){
        alert(this.responseText);
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
}