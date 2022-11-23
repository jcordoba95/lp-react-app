import React, { useState, useEffect } from "react";
import { authAtom } from '../../state/auth';
import { useRecoilValue } from 'recoil';

function getType(val) {
  switch(val) {
    case 'addition':
    case 'subtraction':
    case 'division':
    case 'multiplication':
      return val[0].toUpperCase() + val.substring(1);
    case 'square_root':
      return 'Square Root';
    case 'random_string':
      return 'Random String';
    default:
      return val;
  }
}
export function OperationForm() {
  const auth = useRecoilValue(authAtom);
  const [operation, setOperation] = useState("");
  const [operations, setOperations] = useState([]);
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [warning, setWarning] = useState("");
  const [operationResult, setOperationResult] = useState({});
  const [loading, setLoading] = useState(true);
  const [disableNumbers, setDisableNumbers] = useState(false);
  const baseUrl = `${process.env.REACT_APP_API_URL}`;

  useEffect(() => {
    async function getOperations() {
      setLoading(true);
      const response = await fetch(`${baseUrl}/v1/operations?`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`,
        },
      });
      const data = await response.json();
      setOperations(data.operations);
      setOperation(data.operations[0].ID);
      setLoading(false);
    }
    getOperations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleOperationChange(event) {
    setDisableNumbers(false);
    const val = event.target.value.ID;
    if (operations.find(el => el.ID === parseInt(event.target.value)).Type === "random_string") setDisableNumbers(true);
    setOperation(val);
  }

  function handleCalculate() {
    if (!value1 || !value2 || !operation) {
      setWarning("Please verify your operation is valid.");
      return;
    }
    setWarning("");
    async function getOperations() {
      setLoading(true);
      const response = await fetch(`${baseUrl}/v1/records?`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`,
        },
        body: JSON.stringify({
          operationId: parseInt(operation),
          val1: parseInt(value1),
          val2: parseInt(value2),
        }),
      });
      const data = await response.json();
      setOperationResult(data.record);
      setLoading(false);
    }
    getOperations();
  }

  function handleFirstValueChange(event) {
    const val = event.target.value;
    setValue1(val);
  }

  function handleSecondValueChange(event) {
    const val = event.target.value;
    setValue2(val);
  }

  if (loading) return <div className="spinner-border spinner-border-sm"></div>;

  return (
    <div id="wrap">
			<div className="container">
        <h3>New Operation</h3>
        {!!warning && (
          <div className="alert alert-danger" role="alert">
            {warning}
          </div>
        )}
				<div className="container" style={{ margin: "10px 10px", display: "flex", justifyContent: "space-around" }}>
          <input disabled={disableNumbers} type="number" className="form-control" id="value1" placeholder="First value" onChange={handleFirstValueChange} />
          <select value={operation} className="form-select" aria-label="Default select example" onChange={handleOperationChange}>
            {operations.map(op => (
              <option key={op.ID} value={op.ID}>{getType(op.Type)}</option>
            ))}
          </select>
          <input disabled={disableNumbers} type="number" className="form-control" id="value2" placeholder="Second value" onChange={handleSecondValueChange} />
          <button disabled={(!value1 || !value2) && !disableNumbers} type="submit" className="btn btn-primary" onClick={handleCalculate}>Calculate</button>
        </div>
        {!!operationResult?.OperationResponse && (
          <div className="alert alert-success" role="alert">
            Result: {operationResult.OperationResponse}
          </div>
        )}
			</div>
		</div>
  )
}