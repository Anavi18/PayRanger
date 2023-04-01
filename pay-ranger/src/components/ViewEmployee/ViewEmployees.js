import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./employee.css";
import "./employee_db";
import { employees } from "./employee_db";

export default function ViewEmployee() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const filteredEmp = employees.filter(
    (item) =>
      item.first.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.last.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="homebg">
      <div className="container">
        <div className="employeeBox">
          <div>
            <div
              className="mb-4 d-flex justify-content-center"
              style={{ color: "#BD5327" }}
            >
              <h2>Manage Your Team</h2>
            </div>
            <form className="d-flex srch-parent" role="search">
              <input
                className="form-control me-2 em_search"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchQuery}
                onChange={handleSearchQueryChange}
              ></input>
              <button className="btn srch-btn" type="submit">
                Search
              </button>
            </form>
            <div className="  d-flex justify-content-center ">
              <div className="list-container">
               
                <ul className="list-group em_list">
                    {filteredEmp.map((item) => (
                        <li className="list-group-item em" key = {item.id}>
                            <p>{item.first} {item.last}</p>
                            
                        </li>
                    
                    ))}
                  
                  {/* <li className="list-group-item em">
                    Dapibus ac facilisis in
                  </li>
                  <li className="list-group-item em">Morbi leo risus</li>
                  <li className="list-group-item em">
                    Porta ac consectetur ac
                  </li>
                  <li className="list-group-item em">Vestibulum at eros</li>
                  <li className="list-group-item em">Cras justo odio</li>
                  <li className="list-group-item em">
                    Dapibus ac facilisis in
                  </li>
                  <li className="list-group-item em">Morbi leo risus</li>
                  <li className="list-group-item em">
                    Porta ac consectetur ac
                  </li>
                  <li className="list-group-item em">Vestibulum at eros</li>
                  <li className="list-group-item em">
                    Dapibus ac facilisis in
                  </li>
                  <li className="list-group-item em">Morbi leo risus</li>
                  <li className="list-group-item em">
                    Porta ac consectetur ac
                  </li>
                  <li className="list-group-item em">Vestibulum at eros</li>
                  <li className="list-group-item em">Cras justo odio</li>
                  <li className="list-group-item em">
                    Dapibus ac facilisis in
                  </li>
                  <li className="list-group-item em">Morbi leo risus</li>
                  <li className="list-group-item em">
                    Dapibus ac facilisis in
                  </li>
                  <li className="list-group-item em">Morbi leo risus</li>
                  <li className="list-group-item em">
                    Porta ac consectetur ac
                  </li>
                  <li className="list-group-item em">Vestibulum at eros</li>
                  <li className="list-group-item em">Cras justo odio</li>
                  <li className="list-group-item em">
                    Dapibus ac facilisis in
                  </li>
                  <li className="list-group-item em">Morbi leo risus</li> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
