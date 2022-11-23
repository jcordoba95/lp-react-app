import React, { useState, useEffect } from "react";

export function RecordsTable({ auth }) {
  const [limit, setLimit] = useState("5");
  const [search, setSearch] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState("1");
  const [totalPages, setTotalPages] = useState("1");
  const [sort, setSort] = useState("date");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = `${process.env.REACT_APP_API_URL}`;

  useEffect(() => {
    async function getRecords() {
      setLoading(true);
      const response = await fetch(`${baseUrl}/v1/records?` + new URLSearchParams({
        like: search,
        limit,
        page,
        sort,
      }),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`,
        },
      });
      const data = await response.json();
      setRecords(data.records);
      const maxPages = Math.ceil(data.total / limit);
      setTotalPages(maxPages);
      setSearchValue(search);
      setLoading(false);
    }
    getRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, limit, page, sort]);

  function handleSortChange(event) {
    const val = event.target.value;
    setSort(val);
  }

  function handleLimitChange(event) {
    const val = event.target.value;
    setLimit(val);
    setPage("1")
  }

  function handlePageChange(event) {
    const val = event.target.value;
    setPage(val);
  }

  function handleSearchChange(event) {
    const val = event.target.value;
    setSearchValue(val);
  }

  function handleSearch() {
    setSearch(searchValue);
  }

  async function handleDeleteRecord(id) {
    if(window.confirm(`Are you sure you want to delete record ID: ${id}? This action cannot be undone.`)) {
      async function deleteRecord() {
        setLoading(true);
        await fetch(`${baseUrl}/v1/records/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.token}`,
          },
        });
        setLoading(false);
      }
      deleteRecord();
      window.location.reload(false);
    }
  }

  if (loading) return <div className="spinner-border spinner-border-sm"></div>;

  return (
    <div id="wrap">
			<div className="container">
        <h3>User Records</h3>
        <div className="container" style={{ margin: "10px 10px", display: "flex", justifyContent: "space-around" }}>
          <div>
            <p style={{ textAlign: "center" }}>Sort by</p>
            <select value={sort} className="form-select" aria-label="Default select example" onChange={handleSortChange}>
              <option value="id">ID</option>
              <option value="amount">Amount</option>
              <option value="user_balance">User Balance</option>
              <option value="operation_response">Operation Response</option>
              <option value="date">Date</option>
            </select>
          </div>
          <div>
            <p style={{ textAlign: "center" }}>Per Page</p>
            <select value={limit} className="form-select" aria-label="Default select example" onChange={handleLimitChange}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
          <div>
            <p style={{ textAlign: "center" }}>Page</p>
            <select value={page} className="form-select" aria-label="Default select example" onChange={handlePageChange}>
              {[...Array(totalPages)].map((_, i) => (
                <option key={i+1} value={i+1}>{i+1}</option>
              ))}
            </select>
          </div>
          <div>
            <p style={{ textAlign: "center" }}>Search</p>
            <div style={{ display: "flex" }}>
              <input className="form-control" id="search" placeholder="Search..." onChange={handleSearchChange} value={searchValue}/>
              <button type="submit" className="btn btn-primary" onClick={handleSearch}>Search</button>
            </div>
          </div>
        </div>
				<table cellPadding="0" cellSpacing="0" border="0" className="datatable table table-striped table-bordered">
					<thead>
						<tr>
							<th className="th-sm">ID</th>
							<th className="th-sm">Amount</th>
							<th className="th-sm">User Balance</th>
							<th className="th-sm">Operation Response</th>
							<th className="th-sm">Date</th>
							<th className="th-sm">Actions</th>
						</tr>
					</thead>
					<tbody>
            {records?.length > 0 && records.map(record => (
              <tr key={record.ID}>
                <td>{record.ID}</td>
                <td className="center">{record.Amount}</td>
                <td className="center">{record.UserBalance}</td>
                <td className="center">{record.OperationResponse}</td>
                <td>{record.Date}</td>
                <td><button className="btn btn-danger" onClick={() => handleDeleteRecord(record.ID)}>Delete</button></td>
              </tr>
            ))}
					</tbody>
					<tfoot>
						<tr>
              <th className="th-sm">ID</th>
							<th className="th-sm">Amount</th>
							<th className="th-sm">User Balance</th>
							<th className="th-sm">Operation Response</th>
							<th className="th-sm">Date</th>
							<th className="th-sm">Actions</th>
						</tr>
					</tfoot>
				</table>
			</div>
		</div>
  )
}