var employees = [{name: 'Messi', department: 'IT', phone: '12345678'}];

var Cell = React.createClass({   
    render: function () {
        return <td>{this.props.data}</td>
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
        </tr>);
    }
});

var HeaderTable = React.createClass({
    render: function () {
        return (<thead><tr>
            <CellHeader data={this.props.data.name} />
            <CellHeader data={this.props.data.department} />
            <CellHeader data={this.props.data.phone} />
        </tr></thead>);
}
});

var Grid = React.createClass({
    render: function () {
        var dataHeader = {
            name: 'Name',
            department: 'Department',
            phone: 'Phone'
        };

        var header = (<HeaderTable data={dataHeader} />);

        var body =  (<tbody>{
            this.props.data.map(function (rowData, index) {
                return <Row key={index} data={rowData} />;
            })}</tbody>);

        return (<div>
                    <table className="table table-striped table-hover table-bordered">
                    {header}{body}
                    </table>
                </div>
            );
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
            phone: this.refs.phone.getDOMNode().value
        };
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
                <Grid data={this.state.gridData} />
            </div>
    },
    handleSubmit: function() {
        this.setState({ gridData: this.state.gridData.concat([this.refs.employeeForm.getFormData()]) })
    }
});

React.render(<App  />, document.getElementById('employeeList'));