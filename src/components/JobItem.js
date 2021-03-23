import React, { Component } from 'react';

class JobItem extends Component {

    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.job.id);
    }

    deleteJob = () => {
        this.props.onDeleteJob(this.props.job.id);
    }

    onUpdate = () => {
        this.props.onUpdate(this.props.job.id);
    }

	render() {
		var index = this.props.index + 1;
		var job = this.props.job;
		//var jobStatus = { job.status } === true ? 'Kích hoạt' : 'Ẩn';
		return (
			<tr>
                <td>{ index }</td>
                <td>{ job.name }</td>
                <td className="text-center">
                    <span
                        className={ job.status === true ? 'label label-success' : 'label label-danger' }
                        onClick={ this.onUpdateStatus }>
                        { job.status === true ? 'Kích hoạt' : 'Ẩn' }
                    </span>
                </td>
                <td className="text-center">
                    <button
                        type="button"
                        className="btn btn-warning"
                        onClick={ this.onUpdate }>
                        <span className="fa fa-pencil mr-5">Sửa</span>
                    </button>&nbsp;
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={ this.deleteJob }>
                        <span className="fa fa-trash mr-5">Xoá</span>
                    </button>
                </td>
            </tr>
		);
	}
}

export default JobItem;