var employees = [{id: new Date().getTime(), name: 'Messi', department: 'IT', phone: '12345678'},{id: new Date().getTime()+1, name: 'Messi1', department: 'IT', phone: '12345678'}];

var DataRow = React.createClass({
    render: function () {
        return (<tr>
            <td>{this.props.data.name}</td>
            <td>{this.props.data.department}</td>
            <td>{this.props.data.phone}</td>
            <td><button type="button" className="btn btn-success-outline btn-sm" onClick={this.onDelete}>
                <i className="fa fa-pencil-square-o"></i> Edit
            </button></td>
        </tr>);
    },
    onDelete: function () {
        this.props.onDelete(this.props.data.id);
    }
});


var Grid = React.createClass({
    render: function () {
        return (<table className="table table table-striped table-hover top-space">
                    <thead className="thead-inverse"><tr>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Phone</th>
                        <th>Action</th>
                    </tr></thead>
                    <tbody>{
                            this.props.data.map(this.eachRow)
                          }
                        </tbody>
                    </table>
            );
    },

    eachRow: function(rowData, index){
        return (<DataRow key={index} data={rowData} onDelete={this.onDelete} />);
    },
    onDelete: function (id) {
        this.props.onDelete(id);
    }
});

var EmployeeForm = React.createClass({
    render: function () {
        return <form>
                  {this.renderTextInput('name', 'Name:')}
                  {this.renderTextInput('department', 'Department:')}
                  {this.renderTextInput('phone', 'Phone:')}
              </form>
    },
    renderField: function(id, label, field) {
      return <fieldset className="form-group">
          <label htmlFor="{id}">{label}</label>
          {field}
      </fieldset>
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
        return <div className="row">
                	<div className="col-md-8">
                		<div className="row">
                			<div className="col-md-6">
                			</div>
                			<div className="col-md-6">
                				<div className="input-group">
                					<input type="text" className="form-control" placeholder="Search for..." />
                					<span className="input-group-btn">
                						<button className="btn btn-secondary" type="button"><i className="fa fa-search"></i></button>
                					</span>
                				</div>
                			</div>
                		</div>
                		<Grid data={this.state.gridData} onDelete={this.deleteEmployee} />
                	</div>
                	<div className="col-md-4">
                	   <EmployeeForm ref="employeeForm" />
                		   <div className="pull-right">
                			   <button type="button" className="btn btn-primary btn-block" onClick={this.handleSubmit}>Save</button>
                		   </div>
                	</div>
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

React.render(<App />, document.getElementById('employeeList'));
