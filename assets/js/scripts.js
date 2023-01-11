const app = angular.module('myApp',["ngRoute"]);

app.controller('viewCtrl', ($scope, $http) => {

    $http.get('http://localhost:3005/')
        .then((res) => {
            $scope.data = res.data;
        });
});



app.controller('addCtrl',function($scope){
    $scope.addEntry = function() {
        const newEntry = `{"Emp_ID": "${$scope.Emp_ID}","Emp_name":"${$scope.Emp_name}","Emp_Designation":"${$scope.Emp_Designation}","Emp_Department":"${$scope.Emp_Department}","Emp_Salary":"${$scope.Emp_Salary}","Emp_Location":"${$scope.Emp_Location}"}`;
        console.log(newEntry);
        fetch('http://localhost:3005/add',{
            method: "POST",
            body: newEntry,
            headers: { "content-type":"application/json; charset=UTF-8"}
        })
            .then(res => console.log(res))
            .catch(res => console.log(err));

        $scope.Emp_ID = "";
        $scope.Emp_name = "";
        $scope.Emp_Designation = "";
        $scope.Emp_Department = "";
        $scope.Emp_Salary = "";
        $scope.Emp_Location  = "";

    }
})

app.controller('updateCtrl',function($scope, $http, $route){
    $http.get('http://localhost:3005/')
        .then((res)=>{
            $scope.datas = res.data;
        })

    $scope.getId = function() {
        const selectedID = $scope.Emp_ID;
        console.log(selectedID);
        $scope.name = selectedID['Emp_name'];
        $scope.phone_number = selectedID['Emp_Designation'];
        $scope.dob = selectedID['Emp_Department'];
        $scope.qualification = selectedID['Emp_Salary'];
        $scope.address  = selectedID['Emp_Location'];
    }

    $scope.update = function() {
        const newEntry = `{"Emp_ID": "${$scope.Emp_ID['Emp_ID']}","Emp_name":"${$scope.Emp_name}","Emp_Designation":"${$scope.Emp_Designation}","Emp_Department":"${$scope.Emp_Department}","Emp_Salary":"${$scope.Emp_Salary}","Emp_Location":"${$scope.Emp_Location}"}`;

        fetch('http://localhost:3005/update',{
            method: "POST",
            body: newEntry,
            headers: { "content-type":"application/json; charset=UTF-8"}
        })
            .then(res => console.log(res))
            .catch(err => console.log(err));

        $route.reload();
        $scope.Emp_ID = "";
        $scope.Emp_name = "";
        $scope.Emp_Designation = "";
        $scope.Emp_Department = "";
        $scope.Emp_Salary = "";
        $scope.Emp_Location  = "";
    }
})

app.controller('deleteCtrl',($scope, $http) => {
    $http.get('http://localhost:3005/')
    .then((res) =>{
        $scope.data = res.data;
    })
    $scope.delete = function () {
        const delId = `{"Emp_ID":${$scope.Emp_ID['Emp_ID']}}`;

        fetch('http://localhost:3005/delete',{
            method: 'POST',
            body: delId,
            headers:  {'Content-Type': 'application/json; charset=UTF-8'}
        })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }
});


app.config(($routeProvider) => {
    $routeProvider
    .when("/",{
        templateUrl: "view.html",
    })
    .when("/add",{
        templateUrl: "add.html",
    })
    .when("/update",{
        templateUrl: "update.html",
    })
    .when("/delete",{
        templateUrl: "delete.html",
    })
});
