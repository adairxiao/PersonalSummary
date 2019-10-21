(function (window, undefined) {
    var Pagination = function Pagination() {
        return new Pagination.prototype.init();
    }

    Pagination.prototype = {
        constructor: Pagination,
        init: function () {

        }
        
    }

    Pagination.prototype.init.prototype = Pagination.prototype;
    window.Pagination = Pagination;
})(window);