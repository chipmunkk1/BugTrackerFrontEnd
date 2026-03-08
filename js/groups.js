async function JoinGroup(event){
    event.preventDefault();

    const enteredGroupNumber = document.getElementById('group-code-input').value;

    const FetchUrl=  `https://bug-tracker-application-hkgggfgtg8bphpew.israelcentral-01.azurewebsites.net/api/Users/JoinGroup`

    const GroupNumberData = {
        GroupNumber:enteredGroupNumber
    }

    try{

        const response = await fetch(FetchUrl,{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify(GroupNumberData)
        });

        if(response.ok){
            console.log("joined successfully");
            //saving the group number so i can use it later to getallbugs(groupNumber)
            localStorage.setItem("GroupNumber",enteredGroupNumber);
            window.location.href= "main.html";
        }
        else{
             const errorMessage = await response.text();
            alert("Join failed: " + errorMessage);
        }

    }
    catch(error){
        console.error("Server connection error:", error);
    }
}


async function CreateNewGroupNumber(event){
    event.preventDefault();

    const fetchUrl= `https://bug-tracker-application-hkgggfgtg8bphpew.israelcentral-01.azurewebsites.net/api/Users/Create`

     try{

        const response = await fetch(fetchUrl,{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        });

        if(response.ok){
            console.log("Group created successfully");
            const GroupNum = await response.text();

            localStorage.setItem("GroupNumber",GroupNum);

            window.location.href= "main.html";
        }
        else{
            const errorMessage = await response.text();
            alert("creation failed: " + errorMessage);
        }

    }
    catch(error){
        console.error("Server connection error:", error);
    }




}




