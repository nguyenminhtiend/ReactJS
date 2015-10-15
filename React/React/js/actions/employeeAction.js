var EmployeeConstant = require('../constants/employeeConstant');
var AppDispatcher = require('../dispatcher/AppDispatcher');

var EmployeeActions = {
    search: function (query) {
        AppDispatcher.dispatch({
            actionType: EmployeeConstant.BOOK_SEARCH,
            query: query
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
