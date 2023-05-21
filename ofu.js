var app = angular.module("myApp", ["ngRoute"]);
        app.config(function ($routeProvider) {
            $routeProvider
                .when("/", {
                    templateUrl: "home.html"
                })
                .when("/about", {
                    templateUrl: "about.html"
                })
                .when("/cart", {
                    templateUrl: "cart.html"
                })
                .when("/checkout", {
                    templateUrl: "checkout.html",
                    controller: 'CheckoutController'
                })
                .when("/helping", {
                    templateUrl: "/product/products.html",
                    controller: 'ProductController'
                })
                .when("/essentials", {
                    templateUrl: "/product/essentials.html",
                    controller: 'EssentialController'
                })
                .when("/lotions", {
                    templateUrl: "/product/lotions.html",
                    controller: 'LotionController'
                })
                .when("/accessories", {
                    templateUrl: "/product/accessories.html",
                    controller: 'AccessorieController'
                })
                .when('/lotions/:lotionName', {
                    templateUrl: '/product/lotion-detail.html',
                    controller: 'LotionDetailController'
                })
                .when('/helping/:productName', {
                    templateUrl: '/product/product-detail.html',
                    controller: 'ProductDetailController'
                })
                .when('/essentials/:essentialName', {
                    templateUrl: '/product/essential-detail.html',
                    controller: 'EssentialDetailController'
                })
                .when('/accessories/:accessorieName', {
                    templateUrl: '/product/accessories-detail.html',
                    controller: 'AccessorieDetailController'
                });
        });
        app.controller('CheckoutController', function($http){
            // Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  window.addEventListener('load', function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation')

    // Loop over them and prevent submission
    Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false) {
          event.preventDefault()
          event.stopPropagation()
        }
        form.classList.add('was-validated')
      }, false)
    })
  }, false)
}())
        })
        app.controller('ProductController', function ($scope, $http, CartService) {
            $http.get('/json/products.json').then(function (response) {
                $scope.products = response.data.product;
            });

            $scope.quantity = 1;

            $scope.addToCart = function (product) {
                var itemToAdd = angular.copy(product);
                itemToAdd.quantity = $scope.quantity;
                CartService.addToCart(itemToAdd);
            };
        });

        app.controller('ProductDetailController', function ($scope, $http, $routeParams, CartService) {
            var productName = $routeParams.productName;

            $http.get('/json/products.json').then(function (response) {
                $scope.products = response.data.product;
                $scope.product = $scope.products.find(function (product) {
                    return product.name === productName;
                });
            });

            $scope.selectThumbnail = function (thumbnail) {
                $scope.product.image = thumbnail;
            };

            $scope.quantity = 1;

            $scope.addToCart = function (product) {
                var itemToAdd = angular.copy(product);
                itemToAdd.quantity = $scope.quantity;
                CartService.addToCart(itemToAdd);
            };
        });

        app.controller('LotionController', function ($scope, $http, CartService) {
            $http.get('/json/lotions.json').then(function (response) {
                $scope.lotions = response.data.lotion;
            });
            $scope.quantity = 1;

            $scope.addToCart = function (lotion) {
                var itemToAdd = angular.copy(lotion);
                itemToAdd.quantity = $scope.quantity;
                CartService.addToCart(itemToAdd);
            };
        });

        app.controller('LotionDetailController', function ($scope, $http, $routeParams, CartService) {
            var lotionName = $routeParams.lotionName;

            $http.get('/json/lotions.json').then(function (response) {
                $scope.lotions = response.data.lotion;
                $scope.lotion = $scope.lotions.find(function (lotion) {
                    return lotion.name === lotionName;
                });
            });

            $scope.selectThumbnail = function (thumbnail) {
                $scope.lotion.image = thumbnail;
            };
            $scope.quantity = 1;

            $scope.addToCart = function (lotion) {
                var itemToAdd = angular.copy(lotion);
                itemToAdd.quantity = $scope.quantity;
                CartService.addToCart(itemToAdd);
            };
        });

        app.controller('EssentialController', function ($scope, $http, CartService) {
            $http.get('/json/essentials.json').then(function (response) {
                $scope.essentials = response.data.essential;
            });
            $scope.quantity = 1;

            $scope.addToCart = function (essential) {
                var itemToAdd = angular.copy(essential);
                itemToAdd.quantity = $scope.quantity;
                CartService.addToCart(itemToAdd);
            };
        });

        app.controller('EssentialDetailController', function ($scope, $http, $routeParams, CartService) {
            var essentialName = $routeParams.essentialName;

            $http.get('/json/essentials.json').then(function (response) {
                $scope.essentials = response.data.essential;
                $scope.essential = $scope.essentials.find(function (essential) {
                    return essential.name === essentialName;
                });
            });

            $scope.selectThumbnail = function (thumbnail) {
                $scope.essential.image = thumbnail;
            };
            $scope.quantity = 1;

            $scope.addToCart = function (essential) {
                var itemToAdd = angular.copy(essential);
                itemToAdd.quantity = $scope.quantity;
                CartService.addToCart(itemToAdd);
            };
        });

        app.controller('AccessorieController', function ($scope, $http, CartService) {
            $http.get('/json/accessories.json').then(function (response) {
                $scope.accessories = response.data.accessorie;
            });

            $scope.quantity = 1;

            $scope.addToCart = function (accessorie) {
                var itemToAdd = angular.copy(accessorie);
                itemToAdd.quantity = $scope.quantity;
                CartService.addToCart(itemToAdd);
            };
        });

        app.controller('AccessorieDetailController', function ($scope, $http, $routeParams, CartService) {
            var accessorieName = $routeParams.accessorieName;

            $http.get('/json/accessories.json').then(function (response) {
                $scope.accessories = response.data.accessorie;
                $scope.accessorie = $scope.accessories.find(function (accessorie) {
                    return accessorie.name === accessorieName;
                });
            });

            $scope.selectThumbnail = function (thumbnail) {
                $scope.accessorie.image = thumbnail;
            };

            $scope.quantity = 1;

            $scope.addToCart = function (accessorie) {
                var itemToAdd = angular.copy(accessorie);
                itemToAdd.quantity = $scope.quantity;
                CartService.addToCart(itemToAdd);
            };
        });

        app.service("CartService", function () {
            var cartItems = [];
            var cartItems = [];
            var couponCode = ""; // Mã coupon
            var discount = 0; // Giá trị giảm giá
            this.applyCoupon = function (code) {
                // Kiểm tra nếu mã coupon hợp lệ
                if (code === "nit") {
                    couponCode = code;
                    discount = 0.1; // Giảm giá 10%
                } else {
                    couponCode = "";
                    discount = 0;
                    alert("Sai coupon rồi cưng")
                }
            };

            this.getTotalPriceWithDiscount = function () {
                var totalPrice = this.getTotalPrice();
                var discountedPrice = totalPrice - (totalPrice * discount);
                return discountedPrice.toFixed(2);
            };
            this.addToCart = function (item) {
                var existingItem = cartItems.find(function (cartItem) {
                    return cartItem.name === item.name;
                });

                if (existingItem) {
                    existingItem.quantity += item.quantity;
                } else {
                    cartItems.push(angular.copy(item));
                }

                this.saveCartItems();
            };

            this.removeFromCart = function (item) {
                var index = cartItems.findIndex(function (cartItem) {
                    return cartItem.name === item.name;
                });

                if (index !== -1) {
                    cartItems.splice(index, 1);
                    this.saveCartItems();
                }
            };

            this.getCartItems = function () {
                this.loadCartItems();
                return cartItems;
            };

            this.getTotalPrice = function () {
                var totalPrice = 0;
                for (var i = 0; i < cartItems.length; i++) {
                    var item = cartItems[i];
                    totalPrice += item.price * item.quantity;
                }
                return totalPrice.toFixed(2);
            };

            this.saveCartItems = function () {
                localStorage.setItem("cartItems", JSON.stringify(cartItems));
            };

            this.loadCartItems = function () {
                var storedCartItems = localStorage.getItem("cartItems");
                if (storedCartItems) {
                    cartItems = JSON.parse(storedCartItems);
                }
            };
        });

        app.directive("cartItems", function () {
            return {
                restrict: "E",
                template: `
                <div class="container">
    <div class="row"  style="max-height: 200px; overflow-y: auto; overflow-x: hidden;">
        <div ng-repeat="item in cartItems"  style="display:flex;">
        <div class="col-lg-3 pb-3 pb-3">
            <img src="{{ item.image }}" alt="{{ item.name }}" width="50px" height="50px">
        </div>
        <div class="col-lg-8 pb-3">
            <div class="row">
                <div class="col-lg-12">
                    <span style="word-break: break-word;">{{ item.name }}</span>

                </div>
            </div>
                <div class="row">

                <div class="col-lg-12">
                    <span>{{ item.quantity }} x \${{ item.price }}</span>

                </div>
            </div>
        </div>
        <div class="col-lg-2">
            <button class="btn btn-danger" ng-click="removeItem(item)">X</button>
        </div>
        </div>
    </div>
    
    
</div>
            `,
                controller: function ($scope, CartService) {
                    $scope.cartItems = CartService.getCartItems();
                    $scope.totalPrice = CartService.getTotalPrice();

                    $scope.calculator = function (item) {
                        $scope.totalPrice = CartService.getTotalPrice();

                    };
                    $scope.removeItem = function (item) {
                        CartService.removeFromCart(item);
                        $scope.totalPrice = CartService.getTotalPrice();

                    };
                }
            };
        });
        app.directive("cartItem", function () {
            return {
                restrict: "E",
                template: `
                    <table class="table">
                <thead>
                  <tr>
                    <th scope="col" class="border-0 bg-light">
                      <div class="p-2 px-3 text-uppercase">Product</div>
                    </th>
                    <th scope="col" class="border-0 bg-light">
                      <div class="py-2 text-uppercase">Price</div>
                    </th>
                    <th scope="col" class="border-0 bg-light">
                      <div class="py-2 text-uppercase">Quantity</div>
                    </th>
                    <th scope="col" class="border-0 bg-light">
                      <div class="py-2 text-uppercase">Remove</div>
                    </th>
                  </tr>
                </thead>
                <tbody ng-repeat="item in cartItems">

                <tr>
                    <th scope="row" class="border-0">
                      <div class="p-2">
                        <img src="{{ item.image }}" alt="" width="70" class="img-fluid rounded shadow-sm">
                        <div class="ml-3 d-inline-block align-middle">
                          <h5 class="mb-0"> <a href="#" class="text-dark d-inline-block align-middle">{{ item.name }}</a></h5><span class="text-muted font-weight-normal font-italic d-block">Category: </span>
                        </div>
                      </div>
                    </th>
                    <td class="border-0 align-middle"><strong>\${{ item.price }}</strong></td>
                    <td class="border-0 align-middle"><strong><input type="number" ng-model="item.quantity" ng-change="updateTotalPrice()" min="1"></strong></td>
                    <td class="border-0 align-middle"><a class="text-dark" ng-click="removeItem(item)"><i class="fa fa-trash"></i></a></td>
                  </tr>

                </tbody>
              </table>
            `,
                controller: function ($scope, CartService) {
                    $scope.cartItems = CartService.getCartItems();
                    $scope.updateTotalPrice = function () {
                // Tính toán lại giá khi số lượng thay đổi
                $scope.totalPrice = CartService.getTotalPrice();
                $scope.totalPrice2 = CartService.getTotalPrice();
            };
                    $scope.totalPrice2 = CartService.getTotalPrice();
                    $scope.applyCoupon = function () {
                        CartService.applyCoupon($scope.couponCode);
                        $scope.totalPrice2 = CartService.getTotalPriceWithDiscount();
                    };
                    $scope.removeItem = function (item) {
                        CartService.removeFromCart(item);
                        $scope.totalPrice2 = CartService.getTotalPrice();
                        $scope.totalPrice = CartService.getTotalPrice();

                    };
                }
            };
        });