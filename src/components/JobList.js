import React, { Component } from 'react';
import JobItem from './JobItem';

class JobList extends Component {
	render() {
		var jobs = this.props.jobs; // var { jobs } = this.prop;
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
                            />
                        </td>
                        <td>
                            <select name="filterStatus" className="form-control">
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