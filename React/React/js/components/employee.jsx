var React = require('react');
var EmployeeStore = require('../stores/employeeStore');
var EmployeeActions = require('../actions/employeeAction');

var DataRow = React.createClass({
    render: function () {
        return (<tr>
            <td>{this.props.data.name}</td>
            <td>{this.props.data.department}</td>
            <td>{this.props.data.phone}</td>
            <td><button type="button" className="btn btn-success-outline btn-sm" onClick={this.onEdit}>
                <i className="fa fa-pencil-square-o"></i> Edit
            </button></td>
        </tr>);
    },
    onEdit: function () {
        EmployeeActions.edit(this.props.data.id);
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
        return (<DataRow key={index} data={rowData}/>);
    }
});

var EmployeeForm = React.createClass({
    getInitialState: function() {
        return {
            data: {}
        };
    },
    componentWillReceiveProps: function(props) {
      this.setState({ data: props.employee });
    },
    render: function () {
        return <form>
                  {this.renderTextInput('name', 'Name:', this.state.data.name)}
                  {this.renderSelect('department', 'Department:', this.state.data.departmentId, this.props.departments)}
                  {this.renderTextInput('phone', 'Phone:', this.state.data.phone)}
                  {this.state.data.id?<button type="button" className="btn btn-warning-outline btn-sm" onClick={this.onCancel}><i className="fa fa-ban"></i> Cancel</button>:null}
                  {this.state.data.id?<button type="button" className="btn btn-success-outline btn-sm" onClick={this.onSave}><i className="fa fa-floppy-o"></i> Update</button>:null}
                  {this.state.data.id?<button type="button" className="btn btn-danger-outline btn-sm" onClick={this.onDelete}><i className="fa fa-minus-circle"></i> Delete</button>:null}
                  {this.state.data.id?null:<button type="button" className="btn btn-success-outline btn-sm" onClick={this.onSave}><i className="fa fa-plus-circle"></i> Save</button>}
              </form>
    },
    onCancel: function(){
        EmployeeActions.cancel();
    },
    onSave: function(){
        EmployeeActions.save(this.state.data);
    },
    onDelete: function(){
        EmployeeActions.delete(this.state.data.id);
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
        var employee = this.state.data;
        employee.name = this.refs.name.getDOMNode().value;
        employee.departmentId = this.refs.department.getDOMNode().value
        employee.phone = this.refs.phone.getDOMNode().value;
        this.setState({data: employee});
    }
});

var App = React.createClass({
    getInitialState: function() {
        return EmployeeStore.getState();
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
                		<Grid data={this.state.gridData} />
                    <Pagination totalPage={this.state.pageInfo.totalPage} currentPage={this.state.pageInfo.currentPage} pageChange={this.pageChange} />
                	</div>
                	<div className="col-md-4">
                	   <EmployeeForm employee={this.state.employee} departments={this.state.departments} />
                </div>
            </div>
    },
    componentWillUnmount: function() {
        EmployeeStore.removeChangeListener(this._onChange);
    },
    componentDidMount: function() {
        EmployeeStore.addChangeListener(this._onChange);
    },
    _onChange: function() {
        this.setState( EmployeeStore.getState() );
    },
    pageChange: function(page){
        var pageInfo = this.state.pageInfo;
        pageInfo.currentPage = page;
        this.setState({ pageInfo: pageInfo });
    }
});

var Pagination = React.createClass({
    render: function () {
          var pageItems = [];
          for(var i = 1; i <= this.props.totalPage; i++){
              if(i == this.props.currentPage){
                  pageItems.push(<Page key={i} isActive={true} page={i} />)
              }
              else{
                pageItems.push(<Page key={i} page={i} pageChange={this.pageChange} />)
              }
          }
          return (<ul className="pagination pagination-sm">
                  {this.props.currentPage == 1 ? <li className="disabled"><a><i className="fa fa-step-backward"></i></a></li> : <li><a onClick={this.previousPage}><i className="fa fa-step-backward"></i></a></li>}
                  {pageItems}
                  {this.props.currentPage == this.props.totalPage ? <li className="disabled"><a><i className="fa fa-step-forward"></i></a></li> : <li><a onClick={this.nextPage}><i className="fa fa-step-forward"></i></a></li>}
                </ul>);
    },
    pageChange: function(page){
        this.props.pageChange(page);
    },
    nextPage: function(){
        this.props.pageChange(this.props.currentPage + 1);
    },
    previousPage: function(){
        this.props.pageChange(this.props.currentPage - 1);
    }
});

var Page = React.createClass({
    render: function () {
        if(this.props.isActive){
            return (<li className="active"><a>{this.props.page}</a></li>)
        }
        else
        {
            return (<li><a onClick={this.onClick}>{this.props.page}</a></li>)
        }
      },
    onClick: function(){
        this.props.pageChange(this.props.page);
    }
});

module.exports = App;
