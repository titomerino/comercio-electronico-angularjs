var app = angular.module("app", []);
var apiURL = "http://localhost:8080/api/promotion";
const dateFormat = "YYYY-MM-DD HH:mm:ss";

app.controller("appController", function ($scope, $http) {

    /** functions */
    /**
     * Busca por medio de una fecha la promoción
     * que está activa justo para ese día
     */
    $scope.searchPromotion = function () {
        $scope.dataDB = [];
        var formData = {
            aplicationDate: "",
            brandId: "",
            productId: ""
        };
        $scope.txtMessage = "Buscando Promociones ...";
        formData.aplicationDate = moment($scope.promotionForm.aplicationDate).format(dateFormat);
        formData.brandId = $scope.promotionForm.brandId;
        formData.productId = $scope.promotionForm.productId;
        console.log(formData);

        // $http.get(apiURL + "/getPrice").then(function (data) {
        //     $scope.dataDB = data.data;
        // }, function (error) {
        //     console.log(error);
        // });
    }

    /**
     * Obtiene todo los precios almacenados
     */
    $scope.getAllPrices = function () {
        $http.get(apiURL + "/getAllPrices").then(function (data) {
            $scope.dataDB = data.data;
        }, function (error) {
            console.log(error);
        });
    }

    /**
     * Obtiene todas las cadenas de distribución
     */
    $scope.getAllBrands = function () {
        $http.get(apiURL + "/getAllBrans").then(
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
            $http.get(apiURL + "/getAllProducts").then(
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
        $scope.promotionForm.aplicationDate = '';
        $scope.promotionForm.brandId = '';
        $scope.promotionForm.productId = '';
        $scope.getAllPrices();
    }
    /** functions end */
    /** Varibles */
    $scope.brands = [];

    $scope.products = [
        {
            idProduct: 1,
            name: "Camisa Negra"
        }

    ];

    $scope.promotionForm = {};
    $scope.dataDB = [];
    $scope.statusMessage = true;
    $scope.txtMessage = "No hay promociones";
    /** Varibles end */

    $scope.getAllBrands();
    $scope.getAllProducts();
    $scope.getAllPrices();
});