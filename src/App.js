import React from 'react';
import './App.css';
import JobForm from './components/JobForm';
import Control from './components/Control';
import JobList from './components/JobList';
import _ from 'lodash'; // import toàn bộ thư viện lodash vào project

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            isDisplayForm: false, // state ẩn/hiện form thêm, sửa
            jobEditing: null,
            filter: {
                name: '',
                status: -1
            },
            keyword: '',
            sortBy: 'name',
            sortValue: 1
        };
        // this.onGenerateData = this.onGenerateData.bind(this);
        this.s4 = this.s4.bind(this);
        this.generateId = this.generateId.bind(this);
        this.onDisplayForm = this.onDisplayForm.bind(this);
        this.onCloseForm = this.onCloseForm.bind(this);
    }

    componentDidMount() { // hàm được tự động gọi duy nhất 1 lần khi F5 trang web
        if(localStorage && localStorage.getItem('jobs')) {
            var jobs = JSON.parse(localStorage.getItem('jobs'));
            this.setState({jobs: jobs});
        }
    }

    // onGenerateData() {
    //     var jobs = [
    //         {
    //             id: this.generateId(),
    //             name: 'Học tiếng Anh',
    //             status: true
    //         },
    //         {
    //             id: this.generateId(),
    //             name: 'Học lập trình ReactJS',
    //             status: true
    //         },
    //         {
    //             id: this.generateId(),
    //             name: 'Tập thể dục buổi sáng',
    //             status: false
    //         }
    //     ];
    //     console.log(jobs);
    //     this.setState({jobs: jobs});
    //     localStorage.setItem('jobs', JSON.stringify(jobs)); // sử dụng bộ nhớ tạm local storage của trình duyệt để lưu các job( khi F5 trang vẫn ko reset dữ liệu)
    // }

    s4() {
        return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1);
    }

    generateId() {
        return this.s4() + this.s4() + '-' + this.s4() + this.s4() + '-' + this.s4() + this.s4() + '-' + this.s4() + this.s4();
    }

    onDisplayForm() { // hàm đổi giá trị biến điều kiện hiển thị form thêm/sửa
        this.setState({
            isDisplayForm: !this.state.isDisplayForm,
            jobEditing: null
        });
    }

    onCloseForm() {
        this.setState({isDisplayForm: false});
    }

    onSubmit = (data) => {
        var jobs = this.state.jobs;
        if(data.id === '') { // Nếu id = '' thì xác định đây là thêm công việc
            data.id = this.generateId();
            jobs.push(data);
        }
        else {               // Ngược lại => sửa công việc
            var index = this.findIndex(data.id);
            jobs[index] = data;
        }
        this.setState({
            jobs: jobs,
            jobEditing: null
        });
        localStorage.setItem('jobs', JSON.stringify(jobs));
    }

    onUpdateStatus = (id) => {
        var { jobs } = this.state;
        // var index = this.findIndex(id);
        var index = _.findIndex(jobs, (job) => {
            return job.id === id;
        });
        if(index !== -1) {
            jobs[index].status = !jobs[index].status;
        }
        this.setState({jobs: jobs});
        localStorage.setItem('jobs', JSON.stringify(jobs));
    }

    findIndex = (id) => {
        var { jobs } = this.state;
        var result = -1;
        jobs.forEach((job, index) => {
            if(job.id === id)
                result = index;
        });
        return result;
    }

    onDeleteJob = (id) => {
        var { jobs } = this.state;
        var index = this.findIndex(id);
        if(index !== -1) {
            jobs.splice(index, 1);
        }
        this.setState({jobs: jobs});
        localStorage.setItem('jobs', JSON.stringify(jobs));
        this.onCloseForm();
    }

    onUpdate = (id) => {
        var { jobs } = this.state;
        var index = this.findIndex(id);
        var jobEditing = jobs[index];
        this.setState({ jobEditing: jobEditing });
        this.setState({isDisplayForm: true});
    }

    onFilter = (filterName, filterStatus) => {
        filterName = filterName.toLowerCase();
        filterStatus = parseInt(filterStatus);
        this.setState({
            filter: {
                name: filterName,
                status: filterStatus
            }
        });
    }

    onSearch = (keyword) => {
        this.setState({
            keyword: keyword
        });
    }

    onSort = (sortBy, sortValue) => {
        this.setState({
            sortBy: sortBy,
            sortValue: sortValue
        });
    }

    render() {
        var { jobs, isDisplayForm, jobEditing, filter, keyword, sortBy, sortValue } = this.state; // Cú pháp IS6
        var elementDisplayForm = isDisplayForm
        ? <JobForm
            onSubmit={ this.onSubmit }
            onCloseForm={ this.onCloseForm }
            job={ jobEditing }/>
        : '';

        if(filter) {
            if(filter.name) {
                jobs = jobs.filter((job) => {
                    return job.name.toLowerCase().indexOf(filter.name) !== -1;
                });
            }
            if(filter.status !== -1) {
                jobs = jobs.filter((job) => {
                    return job.status === (filter.status === 1 ? true : false);
                });
            }
        }

        if(keyword) {
            // jobs = jobs.filter((job) => {
            //     return job.name.toLowerCase().indexOf(keyword) !== -1;
            // });
            jobs = _.filter(jobs, (job) => {
                return job.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
            });
        }

        if(sortBy === 'name') {
            jobs.sort((a, b) => {
                if(a.name > b.name)
                    return sortValue;
                else if(a.name < b.name)
                    return -sortValue;
                else
                    return 0;
            });
        }
        else {
            jobs.sort((a, b) => {
                if(a.status > b.status)
                    return -sortValue;
                else if(a.status < b.status)
                    return sortValue;
                else
                    return 0;
            });
        }

        return (
            <div className="container">
                <div className="text-center">
                    <h1>Quản lý công việc</h1>
                    <hr/>
                </div>
                <div className="row">
                    <div className={ isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : '' }>
                        {/* Form */}
                        { elementDisplayForm }
                    </div>
                    <div className={ isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12' }>
                        <button type="button" className="btn btn-primary" onClick={ this.onDisplayForm }>
                            <span className="fa fa-plus mr-5"></span>
                            Thêm công việc
                        </button>
                        {/*<button type="button" className="btn btn-danger ml-5" onClick={ this.onGenerateData }>
                            Generate data
                        </button>*/}
                    {/* Search - Sort */}
                        <Control
                            onSearch={ this.onSearch }
                            onSort={ this.onSort }
                            sortBy={ sortBy }
                            sortValue={ sortValue }
                        />
                    {/* List */}
                        <div className="row mt-15">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <JobList
                                    jobs={ jobs }
                                    onUpdateStatus={ this.onUpdateStatus }
                                    onDeleteJob={ this.onDeleteJob }
                                    onUpdate={ this.onUpdate }
                                    onFilter={ this.onFilter }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;