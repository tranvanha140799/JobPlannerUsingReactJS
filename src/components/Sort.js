import React, { Component } from 'react';

class Sort extends Component {
	render() {
		return(
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="dropdown">
                    <button
                        type="button"
                        className="btn btn-primary dropdown-toggle"
                        id="dropdownMenu"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="true"
                        >
                        Sắp xếp
                        <span className="fa fa-sort-alpha-asc pr-5">Tên A-Z</span>

                    </button>
                    <ul className="dropdown-menu" area-labelledby="dropdownmenu">
                        <li>
                            <a role="button" className="sort-selected">
                                <span className="fa fa-sort-alpha-asc pr-5">
                                    Tên A-Z
                                </span>
                            </a>
                        </li>
                        <li>
                            <a role="button" className="sort-selected">
                                <span className="fa fa-sort-alpha-desc pr-5">
                                    Tên Z-A
                                </span>
                            </a>
                        </li>
                        <li role="separator" className="divider"></li>
                        <li>
                            <a role="button">
                                Trạng thái kích hoạt
                            </a>
                        </li>
                        <li>
                            <a role="button">
                                Trạng thái ẩn
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
		);
	}
}
export default Sort;