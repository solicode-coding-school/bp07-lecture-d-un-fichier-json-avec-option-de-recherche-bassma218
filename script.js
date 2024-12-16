fetch("script.json")
    .then((response) => { 
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        return response.json();
    })
    .then((data) => {
        console.log(data);
        populateTable(data);
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });

function populateTable(data) {
    const tbody = document.querySelector("table tbody");
    tbody.innerHTML = "";

    data.forEach((employee) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${employee.id}</td>        
            <td>${employee.name}</td>      
            <td>${employee.department}</td>  
            <td>${employee.age}</td>           
            <td>${employee.isActive ? "Yes" : "No"}</td> 
            <td>${employee.skills.join(", ")}</td>             
            <td>${employee.address.city}</td>          
            <td>${employee.address.country}</td>          
        `;

        tbody.appendChild(row);
    });
}

const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", function () {
    fetch("script.json")
        .then((response) => response.json())
        .then((data) => {
            const searchTerm = searchInput.value.toLowerCase();
            const filteredEmployees = data.filter((employee) =>
                employee.name.toLowerCase().includes(searchTerm) || 
                employee.department.toLowerCase().includes(searchTerm) 
            );
            populateTable(filteredEmployees);
        });
});



