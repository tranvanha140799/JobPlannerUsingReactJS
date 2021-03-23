import React, { Component } from 'react';

class Search extends Component {
	render() {
		return(
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="input-group">
                    <input
                        name="keyword"
                        type="text"
                        className="form-control"
                        place-holder="Nhập từ khoá..."
                    />
                    <span className="input-group-btn">
                        <button type="button" className="btn btn-primary">Tìm kiếm</button>
                    </span>
                </div>
            </div>
		);
	}
}
export default Search;