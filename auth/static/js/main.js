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