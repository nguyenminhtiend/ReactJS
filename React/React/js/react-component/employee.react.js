
var EmployeePanel = React.createClass({
    render: function () {
        return <div>
                <EmloyeeForm ref="employeeForm" />
                <div className="pull-right">
                    <button type="button" className="btn btn-primary btn-block" onClick={this.handleSubmit}>Submit</button>
                </div>
                <Grid data={this.state.gridData} onDelete={this.deleteEmployee} />
            </div>
    }
});

var EmployeeTableRow = React.createClass({
    render: function() {
        return (
            <tr>
                <td>{this.props.data.name}</td>
                <td>{this.props.data.department}</td>
                <td>{this.props.data.phone}</td>
                <td><a href='#'>Edit</a></td>
            </tr>
        );
    }
});

var EmployeeTable = React.createClass({
  render: function () {
    var rows = [];
        this.props.books.forEach(function(book) {
            rows.push(<BookTableRow key={book.id} book={book} />);
        });
      return  <table className="table table-striped table-hover table-bordered">
                  <thead><tr>
                      <th>Name</th>
                      <th>Department</th>
                      <th>Phone</th>
                      <th>Action</th>
                  </tr></thead>
                  <tbody>{rows}</tbody>
              </table>
  }
});
