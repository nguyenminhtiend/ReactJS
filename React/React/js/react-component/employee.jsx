var employees = [{id: new Date().getTime(), name: 'Messi11', departmentId: 1, department: 'IT', phone: '12345678'}];
var departments = [{id: 1, name: 'IT'}, {id: 2, name: 'Sale'}, {id: 3, name: 'Consultant'}];

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
                    <tbody>
                        {
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
                  {this.renderSelect('department', 'Department:', this.props.data.departmentId, this.props.departments)}
                  {this.renderTextInput('phone', 'Phone:', this.props.data.phone)}
                  {this.props.data.id?<button type="button" className="btn btn-warning-outline btn-sm" onClick={this.props.onCancel}><i className="fa fa-ban"></i> Cancel</button>:null}
                  {this.props.data.id?<button type="button" className="btn btn-success-outline btn-sm" onClick={this.props.onUpdate}><i className="fa fa-floppy-o"></i> Update</button>:null}
                  {this.props.data.id?<button type="button" className="btn btn-danger-outline btn-sm" onClick={this.props.onDelete}><i className="fa fa-minus-circle"></i> Delete</button>:null}
                  {this.props.data.id?null:<button type="button" className="btn btn-success-outline btn-sm" onClick={this.props.onCreate}><i className="fa fa-plus-circle"></i> Save</button>}
              </form>
    },
    renderField: function(id, label, field) {
      return <fieldset className="form-group">
          <label htmlFor={id}>{label}</label>
          {field}
      </fieldset>
    },
    renderTextInput: function(id, label, value, onChange) {
        return this.renderField(id, label, <input type="text" className="form-control" onChange={this.onChange} value={value} id={id} ref={id}/>)
    },
    renderSelect: function(id, label, value, dataSource) {
       var options = dataSource.map(function(item) {
           return <option key={item.id} value={item.id}>{item.name}</option>
       });
       return this.renderField(id, label,
         <select className="form-control" value={value} onChange={this.onChange} id={id} ref={id}>
            <option></option>
            {options}
         </select>
       )
     },
    onChange: function(){
        var employee = {
            id: this.props.data.id,
            name: this.refs.name.getDOMNode().value,
            departmentId: this.refs.department.getDOMNode().value,
            department: this.props.data.department,
            phone: this.refs.phone.getDOMNode().value
        };
        this.props.onChange(employee);
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
                      onDelete={this.delete} onCreate={this.create}
                      onCancel={this.cancel} departments={departments} />
                	</div>
                </div>
    },
    create: function(){
      var employee = this.state.employeeEdit;
      employee.id = new Date().getTime();
      employee.department = this.getDepartmentName(employee.departmentId);
      this.setState({ gridData: this.state.gridData.concat([employee]) });
      this.setState({ employeeEdit: {} });
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
              this.setState({ employeeEdit: {} });
              break;
            }
        }
    },
    onFormChange: function(employee){
        employee.department = this.getDepartmentName(employee.departmentId);
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
    },
    cancel: function(){
        this.setState({ employeeEdit: {} });
    },
    getDepartmentName: function(departmentId){
      for (var i in departments) {
            if (departments[i].id == departmentId) {
                return departments[i].name;
            }
        }
        return '';
    }
});

React.render(<App />, document.getElementById('employeeList'));
