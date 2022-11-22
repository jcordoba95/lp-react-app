import React, { useState, useEffect } from "react";

export function RecordsTable({ auth }) {
  const [limit, setLimit] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState("");
  const [sort, setSort] = useState("");
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
      setLoading(false);
    }
    getRecords();
  }, [search, limit, page, sort]);

  if (loading) return <div className="spinner-border spinner-border-sm"></div>;
  // TODO: Add inputs for search, limit, page and sort. Create handleDelete function.
  return (
    <div id="wrap">
			<div className="container">
        <h3>User Records</h3>
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
                <td><button className="btn btn-danger" onClick={() => console.log(`deleted: ${record.ID}`)}>Delete</button></td>
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