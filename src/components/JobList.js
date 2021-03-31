import React, { Component } from 'react';
import JobItem from './JobItem';

class JobList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterName: '',
            filterStatus: -1 // tất cả: -1; kích hoạt: 1; ẩn: 0
        };
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.props.onFilter(
            name === 'filterName' ? value : this.state.filterName,
            name === 'filterStatus' ? value : this.state.filterStatus
        );
        this.setState({
            [name]: value
        });
    }

	render() {
		var jobs = this.props.jobs; // var { jobs } = this.prop;
        var { filterName, filterStatus } = this.state;
		var elementJobs = jobs.map((job, index) => {
			return <JobItem key={ job.id } index={ index } job={ job } onUpdateStatus={ this.props.onUpdateStatus } onDeleteJob={ this.props.onDeleteJob } onUpdate={ this.props.onUpdate }/>
		});
		return (
			<table className="table table-bordered table-hover mt-15">
                <thead>
                    <tr>
                        <th className="text-center">STT</th>
                        <th className="text-center">Tên</th>
                        <th className="text-center">Trạng thái</th>
                        <th className="text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td>
                            <input
                                type="text"
                                className="form-control"
                                name="filterName"
                                value={ filterName }
                                onChange={ this.onChange }
                            />
                        </td>
                        <td>
                            <select
                                name="filterStatus"
                                className="form-control"
                                value={ filterStatus }
                                onChange={ this.onChange }
                                >
                                <option value={-1}>Tất cả</option>
                                <option value={0}>Ẩn</option>
                                <option value={1}>Kích hoạt</option>
                            </select>
                        </td>
                        <td></td>
                    </tr>
                    { elementJobs }
                </tbody>
            </table>
		);
	}
}
export default JobList;