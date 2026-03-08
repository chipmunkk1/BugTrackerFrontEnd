async function fetchAllBugs(){
    const GroupNum = localStorage.getItem('GroupNumber');
    document.getElementById('display-group-code').innerHTML = GroupNum ;

    const fetchUrl = `https://bug-tracker-application-hkgggfgtg8bphpew.israelcentral-01.azurewebsites.net/api/Bugs/getAllBugs`

    

    const GroupNumberData = {
        GroupNumber : GroupNum
    }

    try{
        const response = await fetch(fetchUrl,{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify(GroupNumberData)
    });

        

        if(response.ok){
            const allbugs = await response.json();
            const container = document.getElementById("bugs-container");
            container.innerHTML = ""; // Clear it out just in case

            console.log(response);

            if (allbugs.length === 0) {
                container.innerHTML = "<h3>No active bugs right now! Great job!</h3>";
                return; // Stop here
            }

            allbugs.forEach(bug => {
                
                const bugCard = `
                    <div class="bug-card" style="background-color: ${getSeverityColor(bug.bug_severity)}; border: 1px solid #ccc; padding: 15px; border-radius: 8px; margin-bottom: 10px;">
                        <p>file name: ${bug.file_name}</p>
                        <p>bug name: ${bug.bug_name}</p>
                        <p>bug description: ${bug.bug_description}</p>
                        <p>bug severity: ${bug.bug_severity}</p>
                        <p>Created at: ${bug.creation_date}</p>
                        <button onclick="solveBug(${bug.id})">Mark as Solved</button>
                        <button onclick="deleteBug(${bug.id})">Delete bug</button>
                    </div>
                `;

                // Inject it into the container! (The += means "add this to the end")
                container.innerHTML += bugCard;
            });

        }
        else{
            const errorMessage = await response.text();
            alert("No bugs: " + errorMessage); 
        }
    }
    catch(error){
        console.error("Server connection error:", error);
    }
}



document.addEventListener("DOMContentLoaded", async () => {
    // This function will automatically run the second the page opens!
    await fetchAllBugs();
});


function LogOut(event){
    event.preventDefault();
    window.location.href = 'index.html'
}

async function solveBug(id){
    const fetchUrl = `https://bug-tracker-application-hkgggfgtg8bphpew.israelcentral-01.azurewebsites.net/api/Bugs/Solved/${id}`

    const response = await fetch( fetchUrl,{
    method:"PUT", 
    });

    if(response.ok){
        console.log("Bug added to checklist");
        window.location.href = "main.html"       
    }

}

function SolvedBugs(event){
    event.preventDefault();
    var GN = document.getElementById('display-group-code').innerHTML;
    localStorage.setItem('GroupNumber', GN);
    window.location.href = "checkList.html";
}



async function deleteBug(id){
    const fetchUrl = `https://bug-tracker-application-hkgggfgtg8bphpew.israelcentral-01.azurewebsites.net/api/Bugs/DeleteBug/${id}`

    const response = await fetch( fetchUrl,{
    method:"DELETE", 
    });

    if(response.ok){
        console.log("Bug Deleted successfuly!");
        window.location.href = "main.html"       
    }
}

async function ReportBug(event){

    const enteredFileName = document.getElementById('file-name').value;
    const enteredBugName = document.getElementById('bug-title').value;
    const enteredBugDesc = document.getElementById('bug-description').value;
    const enteredBugSev = document.getElementById('bug-severity').value;
    const CurrentGroupNumber = localStorage.getItem('GroupNumber');

    const BugData = {
        file_name : enteredFileName,
        bug_name: enteredBugName,
        bug_description: enteredBugDesc,
        bug_severity: enteredBugSev,
        bug_group_number : CurrentGroupNumber
    }

    const fetchUrl = `https://bug-tracker-application-hkgggfgtg8bphpew.israelcentral-01.azurewebsites.net/api/Bugs/reportBug`

    const response = await fetch (fetchUrl,{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },

        body:JSON.stringify(BugData)
    });

    if(response.ok){
        console.log("Bug reported successfuly!");
        window.location.href = "main.html" ;
    }

    else{
        const errorMessage = await response.text();
        alert("report failed : " + errorMessage);
    }
}


function getSeverityColor(severity){
    if(severity >= 7 && severity<=10){
        return "#b40f1f";
    }

    else if (severity >= 4  && severity<=6){
        return "#dacb46";

    }

}







