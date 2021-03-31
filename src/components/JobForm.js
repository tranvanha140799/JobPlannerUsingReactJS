import React, { Component } from 'react';

class JobForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            status: false
        };
    }

    componentDidMount() { // Hàm lifecycle chỉ chạy 1 lần duy nhất khi form được mở lên
        if(this.props.job) {
            this.setState({
                id: this.props.job.id,
                name: this.props.job.name,
                status: this.props.job.status
            });
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) { // Hàm lifecycle chạy liên tục khi form vẫn còn được mở (đang dần dần bị loại bỏ)
        if(nextProps && nextProps.job) {
            this.setState({
                id: nextProps.job.id,
                name: nextProps.job.name,
                status: nextProps.job.status
            });
        }
    }

    // static getDerivedStateFromProps(nextProps, currentState) { // Hàm lifecycle tự động điền thông tin cho các trường từ thêm công việc thành sửa công việc
    //     if(nextProps.id !== currentState.id && nextProps.job) {
    //         return {
    //             id: nextProps.job.id,
    //             name: nextProps.job.name,
    //             status: nextProps.job.status
    //         };
    //     }
    //     return null;
    // }

    // componentDidUpdate(currentProps, currentState) {
    //     if(currentProps.name !== this.state.name || currentProps.status !== this.state.status)
    //         this.setState({
    //             name: currentProps.name,
    //             status: currentProps.status
    //         });
    // }

    onCloseForm = () => {
        this.props.onCloseForm();
    }

    onClear = () => {
        this.setState({
            name: '',
            status: false
        });
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if(name === 'status')
            value = target.value === 'true' ? true : false;
        this.setState({
            [name] : value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state);
        // Sau khi submit thành công => clear các trường & đóng form
        this.onClear();
        this.onCloseForm();
    }

    render() {
        var { id } = this.state;

        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        { id !== '' ? 'Cập nhật công việc' : 'Thêm công việc' }
                        <span
                            className="fa fa-times-circle text-right"
                            onClick={ this.onCloseForm }>
                        </span>
                    </h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={ this.onSubmit }>
                        <div className="form-group">
                            <label>Tên: </label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={ this.state.name }
                                onChange={ this.onChange }/>
                        </div>
                        <div className="form-group">
                            <label>Trạng thái: </label>
                            <select
                                className="form-control"
                                name="status"
                                value={ this.state.status }
                                onChange={ this.onChange }>
                                <option value={ true }>Kích hoạt</option>
                                <option value={ false }>Ẩn</option>
                            </select>
                            <br/>
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="btn btn-success"
                                    >
                                    <span className="fa fa-plus mr-5"></span>
                                    Lưu lại
                                </button>&nbsp;
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={ this.onClear }>
                                    <span className="fa fa-close mr-5"></span>
                                    Huỷ bỏ
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
export default JobForm;