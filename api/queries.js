var apiKey = "<need to replace this with real apiKey>"

function getEmployee(employeeId){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("apiKey", apiKey);
    myHeaders.append("Access-Control-Request-Headers", "*");

    var raw = JSON.stringify({
    "collection": "employees",
    "database": "Gizmo-Gram",
    "dataSource": "Hypertech",
    "filter": {
        "employeeId": employeeId
    }
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };
    

    fetch("https://us-east-1.aws.data.mongodb-api.com/app/data-drbgr/endpoint/data/v1/action/findOne", requestOptions)
    .then(response => response.json())
    .then(function(result){
        console.log(result)
        //console.log(result.document.isManager)
    })
    .catch(error => console.log('error', error));

    
}

function getTime(employeeId){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("apiKey", apiKey);
    myHeaders.append("Access-Control-Request-Headers", "*");

    var raw = JSON.stringify({
    "collection": "time-entries",
    "database": "Gizmo-Gram",
    "dataSource": "Hypertech",
    "filter": {
        "employeeId": employeeId
    }
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("https://us-east-1.aws.data.mongodb-api.com/app/data-drbgr/endpoint/data/v1/action/findOne", requestOptions)
    .then(response => response.json())
    .then(function(result){
        let sum = 0;
        result.document.timeEntries.forEach(item => {sum += item.hoursWorked;});
        console.log(sum)
    })
    .catch(error => console.log('error', error));

}

function getDirectEmployees(managerId){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("apiKey", apiKey);
    myHeaders.append("Access-Control-Request-Headers", "*");

    var raw = JSON.stringify({
    "collection": "employees",
    "database": "Gizmo-Gram",
    "dataSource": "Hypertech",
    "filter": {
        "managerId": managerId
    }
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("https://us-east-1.aws.data.mongodb-api.com/app/data-drbgr/endpoint/data/v1/action/find", requestOptions)
    .then(response => response.json())
    .then(function(result){
        result.documents.forEach(function(message) {
            console.log(message);
         })
    })
    .catch(error => console.log('error', error));

}


getEmployee(2)
getTime(1)
getDirectEmployees(1)
