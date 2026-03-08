

async function fetchAllSolvedBugs(){
    const GN = localStorage.getItem('GroupNumber');
    document.getElementById('display-group-code').innerHTML = GN ;

    const fetchUrl=`https://bug-tracker-application-hkgggfgtg8bphpew.israelcentral-01.azurewebsites.net/api/Bugs/getAllSolvedBugs`

    const GroupNum = {
        GroupNumber : GN
    }

    const response = await fetch(fetchUrl,{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify(GroupNum)
    });

    if(response.ok){
            const allSolvedBugs = await response.json();
            const container = document.getElementById("solved-bugs-container");
            container.innerHTML = ""; // Clear it out just in case

            console.log(response);

            if (allSolvedBugs.length === 0) {
                container.innerHTML = "<h3>No solved bugs right now!</h3>";
                return; // Stop here
            }

            allSolvedBugs.forEach(bug => {
                
                const bugCard = `
                    <div class="bug-card">
                        <p>file name: ${bug.file_name}</p>
                        <p>bug name: ${bug.bug_name}</p>
                        <p>bug description: ${bug.bug_description}</p>
                        <p>bug severity: ${bug.bug_severity}</p>
                        <p>Created at: ${bug.creation_date}</p>
                    </div>
                `;

                // Inject it into the container! (The += means "add this to the end")
                container.innerHTML += bugCard;
            });

    }

    else{
        const errorMessage = await response.text();
        alert("No solved bugs: " + errorMessage);
    }
}


document.addEventListener("DOMContentLoaded", async () => {
    // This function will automatically run the second the page opens!
    await fetchAllSolvedBugs();
});



function ExitSolvedBugs(event){
    event.preventDefault();
    window.location.href = 'main.html'

}

function LogOut(event){
    event.preventDefault();
    window.location.href = 'index.html'
}



