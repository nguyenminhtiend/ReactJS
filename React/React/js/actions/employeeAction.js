var EmployeeConstant = require('../constants/employeeConstant');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var http = require('../services/http');

var EmployeeActions = {
    search: function (query) {
        http.get('/api/categories')
            .then(function (categories) {

                // Dispatch an action containing the categories.
                AppDispatcher.dispatch({
                    actionType: EmployeeConstant.BOOK_SEARCH,
                    query: query
                });
            });
    },
    save: function (employee) {
        AppDispatcher.dispatch({
            actionType: EmployeeConstant.BOOK_SAVE,
            employee: employee
        });
    },
    edit: function (employeeId) {
        AppDispatcher.dispatch({
            actionType: EmployeeConstant.BOOK_EDIT,
            employeeId: employeeId
        });
    },
    cancel: function () {
        AppDispatcher.dispatch({
            actionType: EmployeeConstant.BOOK_CANCEL
        });
    },
    delete: function (employeeId) {
        AppDispatcher.dispatch({
            actionType: EmployeeConstant.BOOK_DELETE,
            employeeId: employeeId
        });
    }
};

module.exports = EmployeeActions;
