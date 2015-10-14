﻿var employees = [{ id: new Date().getTime(), name: 'Messi11', departmentId: 1, department: 'IT', phone: '12345678' }];
var departments = [{ id: 1, name: 'IT' }, { id: 2, name: 'Sale' }, { id: 3, name: 'Consultant' }];

var $ = require('jquery');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('./actions/employeeAction.js').AppDispatcher;
var EmployeeConstant = require('./constants/employeeConstant.js');

var state = {
    gridData: employees,
    employee: {},
    departments: departments,
    pageInfo: {
        currentPage: 3,
        totalPage: 6
    }
};

var EmployeeStore = $.extend({}, EventEmitter.prototype, {
    getState: function() {
        return state;
    },
    emitChange: function() {
        this.emit('change');
    },
    addChangeListener: function(callback) {
        this.on('change', callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    }
});

AppDispatcher.register(function (action) {
    switch (action.actionType) {
        case EmployeeConstant.BOOK_EDIT:
            editEmployee(action.employeeId);
            break;
        case EmployeeConstant.BOOK_CANCEL:
            state.employee = {};
            EmployeeStore.emitChange();
            break;
        case EmployeeConstant.BOOK_SAVE:
            _saveBook(action.book);
            break;
        case EmployeeConstant.BOOK_DELETE:
            deleteEmployee(action.employeeId);
            break;
    }
    return true;
});

var deleteEmployee = function(employeeId){
    var listEmployees = state.gridData;
    for (var i in listEmployees) {
        if (listEmployees[i].id == action.employeeId) {
            listEmployees.splice(i, 1);
            break;
        }
    }
    state.gridData = listEmployees;
    EmployeeStore.emitChange();
};

var saveEmployee = function(employee){
    if(employee.id){
      var employees = state.gridData;
      for (var i in employees) {
          if (employees[i].id == employee.id) {
              employees[i] = employee;
              state.gridData = employees;
              break;
          }
      }
    }
    else{
      employee.id = new Date().getTime();
      employee.department = getDepartmentName(employee.departmentId);
      state.gridData.push(employee);
    }
    state.employee = {};
    EmployeeStore.emitChange();
};

var editEmployee = function(employeeId){
  var employees = state.gridData;
  for (var i in employees) {
      if (employees[i].id == employeeId) {
        state.employee = employees[i];
        EmployeeStore.emitChange();
        break;
      }
  }
};

var getDepartmentName = function(departmentId){
    for (var i in departments) {
        if (departments[i].id == departmentId) {
            return departments[i].name;
        }
    }
    return '';
};

module.exports = EmployeeStore;
