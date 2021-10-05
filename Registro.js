let User=function(id, name, username, email, phone, website, street, city, zipcode, companyname)
    {
        this.id=id;
        this.name=name;
        this.username=username;
        this.email=email;
        this.phone=phone;
        this.website=website;
        this.address={street:street, city:city, zipcode:zipcode};
        this.company={name:companyname};
    };

let Control=function()
    {
        this.Registration=new Map();

        this.AddUser=function()
            {
                let id=document.getElementById('IntroId').value;
                let name=document.getElementById('IntroName').value;
                let username=document.getElementById('IntroUserName').value;
                let email=document.getElementById('IntroEmail').value;
                let phone=document.getElementById('IntroPhone').value;
                let website=document.getElementById('IntroWebsite').value;
                let street=document.getElementById('IntroStreet').value;
                let city=document.getElementById('IntroCity').value;
                let zipcode=document.getElementById('IntroZipcode').value;
                let companyname=document.getElementById('IntroCompanyName').value;
                // if(id=="" || name=="" || username=="" || email=="" || phone=="" || website=="" || street=="" || city=="" || zipcode=="" || companyname=="")
                        // {
                            // Result.ShowMessageDanger('The information entered is incomplete',1);  
                        // }
                // else
                        // {
                let nuevo=new User(id, name, username, email, phone, website, street, city, zipcode, companyname);
                let key=this.Registration.has(nuevo.id);
                if(key!=true)
                    {
                        this.Registration.set(nuevo.id, nuevo);
                        document.getElementById("Form").reset();
                        console.log(this.Registration.get(nuevo.id));
                        console.log(Register);
                        Result.ShowMessageInfo('the user was added successfully',1);
                        return true;
                    }
                else
                    {
                        document.getElementById("Form").reset();
                        Result.ShowMessageDanger('the id is repeated try again',1);
                        return false;
                    }
                        // }
            };
            
        this.Search=function()
            {     
                let id=document.getElementById('IntroId').value;
                let Found=this.Registration.has(id);
                if(Found==true)
                    {
                        console.log(this.Registration.get(id));
                        Result.ShowMessageInfo('User was found successfully',1);
                        return true;
                        
                    }
                else
                    {
                        console.log(Register);
                        Result.ShowMessageDanger('User was not found or does not exist',1);
                        return false;
                    }    
            };

        this.Deleted=function()
            {
                let id=document.getElementById('IntroId').value;
                let Erased=this.Registration.delete(id);
                if(Erased===true)
                    {
                        console.log(Register);
                        Result.ShowMessageInfo('User was successfully removed',1);
                        return true;
                    }
                else
                    {
                        console.log(Register);
                        Result.ShowMessageDanger('User has already been deleted or does not exist',1);
                        return false;
                    }
            };

        this.AddOption=function()
            {   
                let i=0;
                option=document.getElementById('Users');
                if(option[i].text=="--Users--" && option[i+1]==undefined)
                    {
                    this.Registration.forEach(User=>
                        {
                            let NewOption=document.createElement("OPTION");
                            NewOption.value=User.id;
                            NewOption.text=User.name;
                            let Select=document.getElementById("Users");
                            Select.appendChild(NewOption);
                            console.log(NewOption);
                            return true;
                        });   
                    }
                else
                    {
                        i++;
                        this.Registration.forEach(User=>
                            {
                                if(option[i]!=undefined)
                                    {
                                        i++;
                                        return false;    
                                    }
                                else
                                    {
                                        let NewOption=document.createElement("OPTION");
                                        NewOption.value=User.id;
                                        NewOption.text=User.name;
                                        let Select=document.getElementById("Users");
                                        Select.appendChild(NewOption);
                                        console.log(NewOption);
                                        i++
                                        return true;   
                                    }
                            });
                    }        
            };

        this.ShowList=function()
            {
                document.getElementById("Result").innerHTML="";
                let SelectList=document.getElementById("Users");
                let Data=SelectList.options[SelectList.selectedIndex].value;
                this.Registration.forEach(User=>
                    {
                        if(Data!=User.id)
                            return false;  
                        else
                            {
                                Result.AddInfo(User);
                                return true;
                            }        
                    }); 
                            };
                        
        this.Validate=function()
            {
                Register.CreateForm();
                Register.Edit();
                return true;
            };

        this.CreateForm=function()
            {
                document.getElementById("Result").innerHTML="";

                document.getElementById('Result').value="";
                let List=document.getElementById('Result');  
                let User=document.createElement('div');
                User.innerHTML=`
                            <form id="Form" class="FormUser" onsubmit="event.preventDefault();Register.Validate();" autocomplete="off">
                                <fieldset>
                                    <legend><a>Enter User</a></legend>
                                        <label for="IntroId">Id: <input type="text" id="IntroId"></label><br>
                                        <label for="IntroName">Name: <input type="text" id="IntroName"></label><br>
                                        <label for="IntroUserName">Username: <input type="text" id="IntroUserName"></label><br>
                                        <label for="IntroEmail">E-Mail: <input type="text" id="IntroEmail"></label><br>
                                        <label for="IntroPhone">Phone: <input type="text" id="IntroPhone"></label><br>
                                        <label for="IntroWebsite">Website: <input type="text" id="IntroWebsite"></label><br>
                                </fieldset>
                                <fieldset>
                                    <legend><a>Enter Company</a></legend>
                                        <label for="IntroCompanyName">Name: <input type="text" id="IntroCompanyName"></label><br>       
                                        <label for="IntroStreet">Street: <input type="text" id="IntroStreet"></label><br>
                                        <label for="IntroCity">City: <input type="text" id="IntroCity"></label><br>
                                        <label for="IntroZipcode">Zipcode: <input type="text" id="IntroZipcode"></label><br>
                                </fieldset>
                                <div class="DisplayButton" id="DisplayButton">
                                    <button class="Update" type="submit" id="btnUpdate" onclick="Register.Update()">UPDATE</button>
                                </div> 
                            </form>    
                `;
                List.appendChild(User);
            };
        
        this.Edit=function()
            {   
                let SelectList=document.getElementById("Users");
                let Data=SelectList.options[SelectList.selectedIndex].value;
                this.Registration.forEach(User=>
                    {
                        if(Data==User.id)
                            {
                                let Id=document.getElementById("IntroId");
                                Id.value=User.id, Id.disabled=true;
                                document.getElementById("IntroName").value = User.name;
                                document.getElementById("IntroUserName").value = User.username;
                                document.getElementById("IntroEmail").value = User.email;
                                document.getElementById("IntroPhone").value = User.phone;
                                document.getElementById("IntroWebsite").value = User.website;
                                document.getElementById("IntroStreet").value = User.address.street;
                                document.getElementById("IntroCity").value = User.address.city;
                                document.getElementById("IntroZipcode").value = User.address.zipcode;
                                document.getElementById("IntroCompanyName").value = User.company.name;
                                return true;
                            }  
                        else
                            return true;       
                    }); 
            };

        this.Update=function()
            {
                let SelectList=document.getElementById("Users");
                let Data=SelectList.options[SelectList.selectedIndex].value;
                this.Registration.forEach(User=>
                    {
                        if(Data==User.id)
                            {
                                console.log(User)
                                let Id=document.getElementById("IntroId");
                                User.id=Id.value, Id.disabled=false;
                                let renomb=SelectList.options[SelectList.selectedIndex];
                                renomb.text=document.getElementById("IntroName").value;
                                User.name=document.getElementById("IntroName").value;
                                let Username=document.getElementById("IntroUserName");
                                User.username=Username.value, Username.disabled=false;
                                User.email=document.getElementById("IntroEmail").value;
                                User.phone=document.getElementById("IntroPhone").value;
                                User.website=document.getElementById("IntroWebsite").value;
                                User.address.street=document.getElementById("IntroStreet").value;
                                User.address.city=document.getElementById("IntroCity").value;
                                User.address.zipcode=document.getElementById("IntroZipcode").value;
                                User.company.name=document.getElementById("IntroCompanyName").value;
                                let DivREsult=document.getElementById("Result");
                                if (DivREsult.hasChildNodes())
                                    {
                                        while (DivREsult.childNodes.length>=1)
                                            {
                                                DivREsult.removeChild( DivREsult.firstChild );
                                            }
                                    }
                                    Result.AddInfo(User);         
                                    console.log(User)
                                    return true;
                                    }  
                                else
                                    return true;     
                    }); 
            };
        
        this.ShowListing=function()
            {
                value=true;
                document.getElementById('ShowList').innerHTML="";
                this.Registration.forEach(User=>
                    {
                        if(value==true)
                            {
                                let Div=document.getElementById('ShowList');
                                let ShowUser=document.createElement('div');
                                ShowUser.innerHTML=`
                                        <div class ='Show' id='cod${User.id}'>
                                            <div class='Info'>
                                                Id: ${User.id}<br>
                                                Name: ${User.name}<br>
                                                Username: ${User.username}<br>
                                                E-Mail: ${User.email}<br>
                                                Phone: ${User.phone}<br>
                                                Website: ${User.website}<br>
                                                Street: ${User.address.street}<br>
                                                City: ${User.address.city}<br>
                                                Zipcode: ${User.address.zipcode}<br>
                                                Company Name: ${User.company.name}<br>   
                                            </div>
                                        </div>
                                    `;
                                Div.appendChild(ShowUser);
                                console.log(User);
                                return true;
                            }
                    });
            };
    };

let Display=function()
    {
        this.Register=function()
            {
                let List=document.getElementById('ShowMenu');
                if (List.style.display === "")
                    {
                        List.style.display = "block";
                        let User=document.createElement('div');
                        User.innerHTML=`
                                <div class="Message" id="Message">
                                    <div id="top">
                                        <div id="bottom">
                                        </div>
                                    </div>
                                </div>
                                <form id="Form" class="FormUser" onsubmit="event.preventDefault();Register.Validate();" autocomplete="off">
                                    <fieldset>
                                        <legend><a>Enter User</a></legend>
                                            <label for="IntroId">Id: <input type="text" id="IntroId"></label><br>
                                            <label for="IntroName">Name: <input type="text" id="IntroName"></label><br>
                                            <label for="IntroUserName">Username: <input type="text" id="IntroUserName"></label><br>
                                            <label for="IntroEmail">E-Mail: <input type="text" id="IntroEmail"></label><br>
                                            <label for="IntroPhone">Phone: <input type="text" id="IntroPhone"></label><br>
                                            <label for="IntroWebsite">Website: <input type="text" id="IntroWebsite"></label><br>
                                    </fieldset>
                                    <fieldset>
                                        <legend><a>Enter Company</a></legend>
                                            <label for="IntroCompanyName">Name: <input type="text" id="IntroCompanyName"></label><br>       
                                            <label for="IntroStreet">Street: <input type="text" id="IntroStreet"></label><br>
                                            <label for="IntroCity">City: <input type="text" id="IntroCity"></label><br>
                                            <label for="IntroZipcode">Zipcode: <input type="text" id="IntroZipcode"></label><br>
                                    </fieldset>
                                    <div class="buttons" id="buttons">
                                        <button class="Add" type="button" id="btnAdd" onclick="Register.AddUser()">ADD USER</button>
                                        <button class="Search" type="button" id="btnSearch" onclick="Register.Search()">SEARCH</button>
                                        <button class="Deleted" type="button" id="btnDeleted" onclick="Register.Deleted()">DELETED</button>
                                        <button class="Reset" type="reset" id="btnReset">RESET</button>
                                    </div> 
                                </form>  
                            `;
                            List.appendChild(User);
                    }
                else
                    {
                        let Erased=document.getElementById("ShowMenu");
                        if ( Erased.hasChildNodes() )
                            {
                                while ( Erased.childNodes.length>=1)
                                    {
                                        Erased.removeChild( Erased.firstChild );
                                    }
                            }
                            List.style.display = "";
                    }     
            };

            this.Consult=function()
                {
                    let List=document.getElementById('ShowMenu');
                    if (List.style.display === "")
                        {
                            List.style.display = "block";
                            let User=document.createElement('div');
                            User.innerHTML=`
                                    <a>SHOW INFORMATION</a>
                                    <br>
                                    <div class="Modify" id="Modify">
                                        <button class="LoadUser" type="button" id="btnLoadUser" onclick="Register.AddOption()">LOAD USERS</button>
                                        <label for="Users">SELECT USER</label>
                                        <select name="Users" id="Users" onchange="Register.ShowList()">
                                            <option value="">--Users--</option>
                                        </select>
                                    </div>   
                                    <div class="Result" id="Result"></div> 
                                    
                                    
                                `;
                            List.appendChild(User);
                        }
                    else
                        {
                            let Erased=document.getElementById("ShowMenu");
                            if ( Erased.hasChildNodes() )
                                {
                                    while ( Erased.childNodes.length>=1)
                                        {
                                            Erased.removeChild( Erased.firstChild );
                                        }
                                }
                                List.style.display = "";
                        }
                };

            this.Listing=function()
                {
                    let List=document.getElementById('ShowMenu');
                    if (List.style.display === "")
                        {
                            List.style.display = "block";
                            let User=document.createElement('div');
                            User.innerHTML=`
                                    <div class="DisplayList id="DisplayList">
                                        <a>LISTING<a>             
                                        <button class="Display" type="button" id="display" onclick="Register.ShowListing()">DISPLAY</button>
                                    </div>
                                    <div class="ShowList" id="ShowList"> 
                                    </div>
                                `;
                            List.appendChild(User);
                        }
                    else
                        {
                            let Erased=document.getElementById("ShowMenu");
                            if ( Erased.hasChildNodes() )
                                {
                                    while ( Erased.childNodes.length>=1)
                                        {
                                            Erased.removeChild( Erased.firstChild );
                                        }
                                }
                            List.style.display = "";
                        }
                };
            

    };

let ShowInfo=function()
    {
        this.AddInfo=function(nuevo)
            {
                let List=document.getElementById('Result');
                let User=document.createElement('div');
                User.innerHTML=`
                        <div class ='Show' id='cod${nuevo.id}'>              
                            Id: ${nuevo.id}<br>
                            Name: ${nuevo.name}<br>
                            Username: ${nuevo.username}<br>
                            E-Mail: ${nuevo.email}<br>
                            Phone: ${nuevo.phone}<br>
                            Website: ${nuevo.website}<br>
                            Street: ${nuevo.address.street}<br>
                            City: ${nuevo.address.city}<br>
                            Zipcode: ${nuevo.address.zipcode}<br>
                            Company Name: ${nuevo.company.name}<br>
                            <div class='Info'>
                            <button class="Edit" type="submit" id="btnEdit" onclick="Register.Validate()">EDIT</button>
                        </div>
                    `;
                List.appendChild(User);
            };

        this.ShowMessageInfo=function(message,type)
            {
                let top=document.getElementById('top');
                let bottom=document.getElementById('bottom');
                let div=document.createElement('div');
                div.className=`alertinfo`;
                div.appendChild(document.createTextNode(message))
                top.insertBefore(div,bottom);
                setTimeout(function()
                    {
                        document.querySelector('.alertinfo').remove();
                    },3000);
            };

        this.ShowMessageDanger=function(message,type)
            {
                let top=document.getElementById('top');
                let bottom=document.getElementById('bottom');
                let div=document.createElement('div');
                div.className=`alertdanger`;
                div.appendChild(document.createTextNode(message))
                top.insertBefore(div,bottom);
                setTimeout(function()
                    {
                        document.querySelector('.alertdanger').remove();
                    },3000);
                            };
            };

let Register=new Control();
let Result = new ShowInfo();
let Menu=new Display();
  
let btnRegister=document.getElementById('btnRegister');
btnRegister.addEventListener('click',()=>
    {
        Menu.Register();
    });

let btnConsult=document.getElementById('btnConsult');
btnConsult.addEventListener('click',()=>
    {
        Menu.Consult();
    });
    
let btnListing=document.getElementById('btnUpdateListing');
btnListing.addEventListener('click',()=>
    {
        Menu.Listing();
    }); 