import * as React from "react";
import { useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./employee.css";
import "./employee_db";
import { employees } from "./employee_db";
import emp_photo from "../pictures/emp_pic.jpeg";
import { v4 as uuid } from "uuid";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";




function Emp_view({ hour, wage }) {
  return (
    <div>
      <div
        className="btn d-flex justify-content-center btn-lg text-dark mb-2"
        style={{ background: "#E6986B" }}
      >
        {hour.toString()} hour(s) worked
      </div>
      <div className="btn btn-success text-dark d-flex justify-content-center btn-lg ">
        ${wage.toString()} earned
      </div>
    </div>
  );
}


function getCompanyId(){ //checks cookies to see if manager 
  let cookieValue = Cookies.get('userLoggedIn');
  let userLoggedIn = JSON.parse(decodeURIComponent(cookieValue));
  let id = userLoggedIn.companyId;
  return id;
}


function EmpPayroll(props) {
  const [viewClicked, setViewClicked] = React.useState(false);
  const [start, setStart] = React.useState();
  const [end, setEnd] = React.useState();
  const [wage, setWage] = React.useState(0);
  const [hour, setHour] = React.useState(0);
  const { emp } = props;

  const handleViewPayroll = async () => {
    setViewClicked(true);
   
    if (start > end) {
      setViewClicked(false);
      alert("Invalid range");
      return
    }
    const response = await fetch("http://localhost:8082/getHoursWorked", {
      method: "POST",
      body: JSON.stringify({
        employeeId: emp.employeeId,
        companyId: getCompanyId(),
        startDate: start,
        endDate: end,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        if (JSON.stringify(res) != "{}") {
          setHour(res.numHours);
          setWage(res.earned.toFixed(2));
        }
      });
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={3}>
          <DatePicker
            label="FROM"
            value={start}
            onChange={(newValue) => setStart(newValue)}
          />

          <DatePicker
            label="TO"
            value={end}
            onChange={(newValue) => setEnd(newValue)}
          />
        </Stack>

        <div
          className="btn mt-4 view_emp_payroll_btn"
          onClick={handleViewPayroll}
        >
          View
        </div>
        <div className="mt-4">
          {viewClicked && <Emp_view hour={hour} wage={wage} />}
        </div>
      </LocalizationProvider>
    </div>
  );
}

export default function ViewEmployee(props) {
  const { user } = props;

  const [searchQuery, setSearchQuery] = React.useState("");

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  let [firstname, setFirstname] = React.useState("");
  let [lastname, setLastname] = React.useState("");
  let [datevalue, setDate] = React.useState("");
  let [empLst, setEmpLst] = React.useState([]);
  let [selectedEmp, setSelectedEmp] = React.useState(null);
  let [count, setCount] = React.useState(empLst.length);

  function isManager() {
    //checks cookies to see if manager
    let cookieValue = Cookies.get("userLoggedIn");
    let userLoggedIn = JSON.parse(decodeURIComponent(cookieValue));
    let isManager = userLoggedIn.isManager;
    return isManager;
  }

  //if not mananger go to /home
  //from there if not logged-in then it will redirect to login
  //therefore cannot access /employee if not logged-in or not a manager

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8082/getEmployees", {

          method: 'POST',
          body: JSON.stringify({ employeeId: user.employeeId, companyId: user.companyId}),

          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((res) => {
            if (res.length > 0) {
              setEmpLst(res);
              setCount(res.length);
            }
          });
      } catch (error) {}
    }

    fetchData();
  }, [user]);
  if (!document.cookie.includes("isLoggedIn=true") || !isManager()) {
    return <Navigate to="/home" replace />;
  }

  if (!document.cookie.includes("isLoggedIn=true")) {
    return <Navigate to="/" replace />;
  }

  const filteredEmp = empLst.filter(
    (item) =>
      item.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.lastName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectEmp = (empId, firstName, lastName) => {
    setSelectedEmp({
      employeeId: empId,
      firstName: firstName,
      lastName: lastName,
    });
    setIsModalOpen(!isModalOpen);
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleAddModal = () => {
    setIsAddModalOpen(!isAddModalOpen);
  };

  const closeBtn = (
    <button className="close " onClick={toggleModal} type="button">
      &times;
    </button>
  );

  return (
    <div className="homebg">
      <div className="container  ">
        <div className="employeeBox justify-content-center align-items-center ">
          <div>
            <div
              className="mb-4 d-flex justify-content-center"
              style={{ color: "#162938" }}
            >
              <h2>Team Name</h2>
            </div>

            <form className="d-flex srch-parent" role="search">
              <input
                className="form-control me-2 em_search"
                type="search"
                placeholder="Search a teammate"
                aria-label="Search"
                value={searchQuery}
                onChange={handleSearchQueryChange}
              ></input>
              <button
                className="btn srch-btn"
                type="submit"
                onClick={handleSearchSubmit}
              >
                Search
              </button>
            </form>

            <div className="  d-flex justify-content-center ">
              <div className="list-container">
                <ul className="list-group em_list">
                  {filteredEmp.map((emp) => (
                    <li
                      className="list-group-item em btn"
                      key={emp.employeeId}
                      onClick={() =>
                        handleSelectEmp(
                          emp.employeeId,
                          emp.firstName,
                          emp.lastName
                        )
                      }
                    >
                      <p>
                        {emp.firstName} {emp.lastName}
                      </p>
                    </li>
                  ))}
                </ul>

                {selectedEmp && (
                  <Modal
                    isOpen={isModalOpen}
                    toggle={toggleModal}
                    className="my-emp-modal"
                  >
                    <ModalHeader
                      toggle={toggleModal}
                      className="modal-head"
                      close={closeBtn}
                    >
                      {selectedEmp.firstName + " " + selectedEmp.lastName}
                    </ModalHeader>
                    <ModalBody className="modal-body">
                      <div className="work_info mt-2">
                        <h3 className="mb-3">Payroll & Hours Worked</h3>
                        <EmpPayroll emp={selectedEmp} />
                      </div>
                    </ModalBody>
                  </Modal>
                )}
              </div>
            </div>

            <div className="metric mt-5 ">
              <button className="btn count-btn" type="submit">
                Teammates Counted: {count}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
