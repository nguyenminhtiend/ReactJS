var employees = [{ firstName: 'Lionel', lastName: 'Messi', email: 'messizip@gmail.com', phone: '12345498', department: 'Football', birthday: '02/03/1991' }];

var TableHeader = React.createClass({
    render: function () {
        var sort = '';
        if (this.props.data.sortAble == true) {
            if (this.props.sortColumn != this.props.data.name) {
                return (<th onClick={this.sort}>{this.props.data.display}<i className='fa fa-sort'></i></th>);
            } else {
                if (this.props.isAscending) {
                    return (<th onClick={this.sort}>{this.props.data.display}<i className='fa fa-sort-asc'></i></th>);
                } else {
                    return (<th onClick={this.sort}>{this.props.data.display}<i className='fa fa-sort-desc'></i></th>);
                }
            }
        } else {
            return <th>{this.props.data.display}</th>
        }
    },
    sort: function () {
        var isAscending = false;
        if (this.props.sortColumn == this.props.data.name) {
            isAscending = !this.props.isAscending;
        } else {
            isAscending = true;
        }
        this.props.sort(this.props.data.name, isAscending);
    }
});


var TableRow = React.createClass({
    render: function () {
        return (<tr>
                    <td></td>
                    <td>{this.props.data.firstName}</td>
                    <td>{this.props.data.lastName}</td>
                    <td>{this.props.data.email}</td>
                    <td>{this.props.data.phone}</td>
                    <td>{this.props.data.birthday}</td>
                    <td>{this.props.data.department}</td>
                    <td><button type="button" className="btn btn-success-outline btn-sm"><i className="fa fa-pencil-square-o"></i> Edit</button></td>
                </tr>);
    }
});

var Table = React.createClass({
    getInitialState: function () {
        return {
            sortColumn: 'FirstName',
            isAscending: true,
            pageInfo: {
                currentPage: 3,
                totalPage: 4
            }
        }
    },
    eachHeader: function (header, index) {
        return (<TableHeader key={index} data={header} sortColumn={this.state.sortColumn} sort={this.sort} isAscending={this.state.isAscending} />);
    },
    eachRow: function (dataRow, index) {
        return (<TableRow data={dataRow} key={index} />);
    },
    sort: function (sortColumn, isAscending) {
        this.setState({ sortColumn: sortColumn, isAscending: isAscending });
    },
    pageChange: function(page){
        var pageInfo = this.state.pageInfo;
        pageInfo.currentPage = page;
        this.setState({ pageInfo: pageInfo });
    },
    search: function(){
        alert('gasgagag');
    },
    render: function () {
        var headers = [
                        { name: '', display: '', sortAble: false },
                        { name: 'FirstName', display: 'First Name', sortAble: true },
                        { name: 'LastName', display: 'Last Name', sortAble: true },
                        { name: 'Email', display: 'Email', sortAble: true },
                        { name: 'Phone', display: 'Phone', sortAble: true },
                        { name: 'Birthday', display: 'Birthday', sortAble: true },
                        { name: 'Department', display: 'Department', sortAble: true },
                        { name: '', display: '', sortAble: false }
                    ];
        return (<div>
                    <div className="row">
	                    <div className="col-md-6">
		                    <SearchCriteria search={this.search} />
	                    </div>
	                    <div className="col-md-6">
		                    <select className="form-control">
			                    <option>10</option>
			                    <option>25</option>
			                    <option>50</option>
			                    <option>100</option>
		                    </select>
	                    </div>
                    </div>
                    <table className="table table table-striped table-hover top-space">
                        <tr>
                            {
                            headers.map(this.eachHeader)
                            }
                        </tr>
                        <tr>
                            {
                            employees.map(this.eachRow)
                            }
                        </tr>
                    </table>
                    <Pagination totalPage={this.state.pageInfo.totalPage} currentPage={this.state.pageInfo.currentPage} pageChange={this.pageChange} />
                </div>
            );
    }
});

var SearchCriteria = React.createClass({
    render: function () {
        return (
                <div className="input-group">
                    <input type="text" className="form-control" onKeyDown={this.search} placeholder="Searching for First Name and Last Name" />
                    <span className="input-group-btn" onClick={this.props.search}>
                	    <button className="btn btn-secondary" type="button"><i className="fa fa-search"></i></button>
                    </span>
		        </div>
            );
    },
    search: function (e) {
        if (e.keyCode == 13) {
            this.props.search();
        }
    }
});

var Page = React.createClass({
    render: function () {
        if (this.props.isActive) {
            return (<li className="active"><a>{this.props.page}</a></li>)
        }
        else {
            return (<li><a onClick={this.onClick}>{this.props.page}</a></li>)
        }
    },
    onClick: function () {
        this.props.pageChange(this.props.page);
    }
});

var Pagination = React.createClass({
    render: function () {
        var pageItems = [];
        for (var i = 1; i <= this.props.totalPage; i++) {
            if (i == this.props.currentPage) {
                pageItems.push(<Page key={i} isActive={true} page={i} />)
            } else {
                pageItems.push(<Page key={i} page={i} pageChange={this.pageChange} />)
            }
        }
        return (<ul className="pagination pagination-sm">
                    {this.props.currentPage == 1 ?
                    <li className="disabled"><a><i className="fa fa-step-backward"></i></a></li> :
                    <li><a onClick={this.previousPage}><i className="fa fa-step-backward"></i></a></li>}
                    {pageItems}
                    {this.props.currentPage == this.props.totalPage ?
                    <li className="disabled"><a><i className="fa fa-step-forward"></i></a></li> :
                    <li><a onClick={this.nextPage}><i className="fa fa-step-forward"></i></a></li>}
                </ul>);
    },
    pageChange: function (page) {
        this.props.pageChange(page);
    },
    nextPage: function () {
        this.props.pageChange(this.props.currentPage + 1);
    },
    previousPage: function () {
        this.props.pageChange(this.props.currentPage - 1);
    }
});

React.render(<Table />, document.getElementById('employeeList'));