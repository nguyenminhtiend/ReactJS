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
                  {this.renderTextInput('name', 'Name:', this.props.data.name)}
                  {this.renderTextInput('department', 'Department:', this.props.data.department)}
                  {this.renderTextInput('phone', 'Phone:', this.props.data.phone)}
                  <button type="button" className="btn btn-warning-outline btn-sm" onClick={this.handleSubmit}><i className="fa fa-ban"></i> Cancel</button>
                  <button type="button" className="btn btn-success-outline btn-sm" onClick={this.props.onUpdate}><i className="fa fa-floppy-o"></i> Update</button>
                  <button type="button" className="btn btn-danger-outline btn-sm" onClick={this.onDelete}><i className="fa fa-minus-circle"></i> Delete</button>
                  <button type="button" className="btn btn-success-outline btn-sm" onClick={this.handleSubmit}><i className="fa fa-plus-circle"></i> Save</button>
              </form>
    },
    renderField: function(id, label, field) {
      return <fieldset className="form-group">
          <label htmlFor="{id}">{label}</label>
          {field}
      </fieldset>
    },
    renderTextInput: function(id, label, value, onChange) {
        return this.renderField(id, label, <input type="text" className="form-control" onChange={this.onChange} value={value} id={id} ref={id}/>)
    },
    onChange: function(){
        var employee = {
            id: this.props.data.id,
            name: this.refs.name.getDOMNode().value,
            department: this.refs.department.getDOMNode().value,
            phone: this.refs.phone.getDOMNode().value
        };
        this.props.onChange(employee);
    },
    getFormData: function() {
        return {
            name: this.refs.name.getDOMNode().value,
            department: this.refs.department.getDOMNode().value,
            phone: this.refs.phone.getDOMNode().value,
            id: new Date().getTime()
        };
    }
});

var App = React.createClass({
    getInitialState: function() {
        return {
            gridData: employees,
            employeeEdit: {}
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
                		<Grid data={this.state.gridData} onDelete={this.edit} />
                	</div>
                	<div className="col-md-4">
                	   <EmployeeForm ref="employeeForm" data={this.state.employeeEdit}
                      onChange={this.onFormChange} onUpdate={this.update}
                      onDelete={this.delete}  />
                	</div>
                </div>
    },
    handleSubmit: function() {
        this.setState({ gridData: this.state.gridData.concat([this.refs.employeeForm.getFormData()]) });
        this.refs.employeeForm.getFormData();
    },
    edit: function(id) {
      var employees = this.state.gridData;
      for (var i in employees) {
            if (employees[i].id == id) {
              this.setState({ employeeEdit: employees[i] });
              break;
            }
        }
    },
    update: function(){
      var employees = this.state.gridData;
      var employee = this.state.employeeEdit;
      for (var i in employees) {
            if (employees[i].id == employee.id) {
              employees[i] = employee;
              this.setState({ gridData: employees });
              break;
            }
        }
    },
    onFormChange: function(employee){
        this.setState({ employeeEdit: employee });
    },
    delete: function() {
      var listEmployees = this.state.gridData;
      for (var i in listEmployees) {
            if (listEmployees[i].id == this.state.employeeEdit.id) {
                listEmployees.splice(i, 1);
                break;
            }
        }
      this.setState({gridData: listEmployees});
    }
});

React.render(<App />, document.getElementById('employeeList'));
