var app = angular.module("app", []);
var apiURL = "https://74ce-190-86-105-69.ngrok.io/api/promotion";
const dateFormat = "YYYY-MM-DD HH:mm:ss";
const headers = {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': true
};

app.controller("appController", function ($scope, $http) {

    /** functions */
    /**
     * Busca por medio de una fecha la promoción
     * que está activa justo para ese día
     */
    $scope.searchPromotion = function () {
        $scope.dataDB = [];
        var formData = {
            applicationDate: "",
            brandId: "",
            productId: ""
        };
        $scope.txtMessage = "Buscando Promociones ...";
        formData.applicationDate = moment($scope.promotionForm.applicationDate).format(dateFormat);
        formData.brandId = String($scope.promotionForm.brandId);
        formData.productId = String($scope.promotionForm.productId);
        
        let params = '?' + new URLSearchParams(formData).toString();
        $http({
            method: 'GET',
            url: apiURL + "/getPromotionNow" + params,
            headers: headers
        }).then(function (data) {
            $scope.dataDB = data.data;
            if ($scope.dataDB.length == 0) {
                $scope.txtMessage = "No hay promociones disponibles";
            }
        }, function (error) {
            console.log(error);
        });
    }

    /**
     * Obtiene todo los precios almacenados
     */
    $scope.getAllPrices = function () {
        $http({
            method: 'GET',
            url: apiURL + "/getAllPrices",
            headers: headers
        }).then(function (data) {
            $scope.dataDB = data.data;
        }, function (error) {
            console.log(error);
        });
    }

    /**
     * Obtiene todas las cadenas de distribución
     */
    $scope.getAllBrands = function () {
        $http({
            method: 'GET',
            url: apiURL + "/getAllBrans",
            headers: headers
        }).then(
            function (data) {
                $scope.brands = data.data;
            },
            function (error) {
                console.log(error);
            }
        )
    }

    /**
     * Obtiene todos los productos
     */
        $scope.getAllProducts = function () {
            $http({
                method: 'GET',
                url: apiURL + "/getAllProducts",
                headers: headers
            }).then(
                function (data) {
                    $scope.products = data.data;
                },
                function (error) {
                    console.log(error);
                }
            )
        }

    /**
     * Limpia el formulario
     */
    $scope.cleanForm = function () {
        $scope.promotionForm.applicationDate = null;
        $scope.promotionForm.brandId = null;
        $scope.promotionForm.productId = null;
        $scope.getAllPrices();
    }
    /** functions end */
    /** Varibles */
    $scope.brands = [];
    $scope.products = [];

    $scope.promotionForm = {};
    $scope.dataDB = [];
    $scope.statusMessage = true;
    $scope.txtMessage = "No hay promociones";
    /** Varibles end */

    $scope.getAllBrands();
    $scope.getAllProducts();
    $scope.getAllPrices();
});