var employees = [{id: new Date().getTime(), name: 'Messi', department: 'IT', phone: '12345678'},{id: new Date().getTime()+1, name: 'Messi1', department: 'IT', phone: '12345678'}];

var Cell = React.createClass({
    render: function () {
        return <td>{this.props.data}</td>;
    }
});

var CellAction = React.createClass({
    render: function () {
        return <td><button type="button" className="btn btn-danger btn-xs" onClick={this.onDelete}>
            <span className="glyphicon glyphicon-remove" aria-hidden="true"></span> Delete
        </button></td>
    },
    onDelete: function () {
        this.props.onDelete(this.props.data);
    }
});

var CellHeader = React.createClass({
    render: function () {
        return <th>{this.props.data}</th>
    }
});

var Row = React.createClass({
    render: function () {
        return (<tr>
            <Cell data={this.props.data.name} />
            <Cell data={this.props.data.department} />
            <Cell data={this.props.data.phone} />
            <CellAction data={this.props.data.id} onDelete={this.onDelete} />
        </tr>);
    },
    onDelete: function (id) {
        this.props.onDelete(id);
    }
});

var HeaderTable = React.createClass({
    render: function () {
        return (<thead><tr>
            <CellHeader data={this.props.data.name} />
            <CellHeader data={this.props.data.department} />
            <CellHeader data={this.props.data.phone} />
            <CellHeader data={this.props.data.action} />
        </tr></thead>);
}
});

var Grid = React.createClass({
    render: function () {
        var dataHeader = {
            name: 'Name',
            department: 'Department',
            phone: 'Phone',
            action: 'Action'
        };

        var header = (<HeaderTable data={dataHeader} />);

        var body =  (<tbody>{
                this.props.data.map(this.eachRow)
              }
            </tbody>);

        return (<div>
                    <table className="table table-striped table-hover table-bordered">
                    {header}{body}
                    </table>
                </div>
            );
    },
    eachRow: function(rowData, index){
        return (<Row key={index} data={rowData} onDelete={this.onDelete} />);
    },
    onDelete: function (id) {
        this.props.onDelete(id);
    }

});

var EmloyeeForm = React.createClass({
    render: function () {
        return (<div className="panel panel-primary">
                    <div className="panel-heading">Employee Management</div>
                    <div className="panel-body">
                        <form className="form-horizontal">
                            {this.renderTextInput('name', 'Name:')}
                            {this.renderTextInput('department', 'Department:')}
                            {this.renderTextInput('phone', 'Phone:')}
                        </form>
                    </div>
                </div>
        )
    },
    renderField: function(id, label, field) {
        return <div className="form-group col-xs-6">
                <label htmlFor="{id}" className="col-sm-4 control-label">{label}</label>
                <div className="col-sm-8">
                    {field}
                </div>
            </div>
    },
    renderTextInput: function(id, label) {
        return this.renderField(id, label, <input type="text" className="form-control" id={id} ref={id}/>)
    },
    getFormData: function() {
        return {
            name: this.refs.name.getDOMNode().value,
            department: this.refs.department.getDOMNode().value,
            phone: this.refs.phone.getDOMNode().value,
            id: new Date().getTime()
        };
    },
    clearData: function() {
        this.refs.name.getDOMNode().value = '';
        this.refs.department.getDOMNode().value = '';
        this.refs.phone.getDOMNode().value = '';
    }

});

var App = React.createClass({
    getInitialState: function() {
        return {
            gridData: employees
        }
    },
    render: function () {
        return <div>
                <EmloyeeForm ref="employeeForm" />
                <div className="pull-right">
                    <button type="button" className="btn btn-primary btn-block" onClick={this.handleSubmit}>Submit</button>
                </div>
                <Grid data={this.state.gridData} onDelete={this.deleteEmployee} />
            </div>
    },
    handleSubmit: function() {
        this.setState({ gridData: this.state.gridData.concat([this.refs.employeeForm.getFormData()]) });
        this.refs.employeeForm.clearData();
    },
    edit: function(id) {

    },
    deleteEmployee: function(id) {
      var listEmployees = this.state.gridData;
      for (i in listEmployees) {
            if (listEmployees[i].id == id) {
                listEmployees.splice(i, 1);
            }
        }
      this.setState({gridData: listEmployees});
    }
});

var Table = React.createClass({
    onDelete: function () {
        alert('sss')
    },
    render: function () {
        return  <table className="table table-striped table-hover table-bordered">
                    <thead><tr>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Phone</th>
                        <th>Action</th>
                    </tr></thead>
                    <tbody>
                        {
                        this.props.data.map(function (rowData, index) {
                        return <tr key={index}>
                            <td>{rowData.name}</td>
                            <td>{rowData.department}</td>
                            <td>{rowData.phone}</td>
                            <td><button type="button" className="btn btn-danger btn-xs" onClick={this.onDelete}>
                                <span className="glyphicon glyphicon-remove" aria-hidden="true"></span> Delete
                            </button></td>
                        </tr>
                        })}
                    </tbody>
                </table>
    }
});


React.render(<App ref="employeeApp" />, document.getElementById('employeeList'));
