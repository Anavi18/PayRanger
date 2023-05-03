import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./employee.css";
import "./employee_db";
//import { employees } from "./employee_db";
import emp_photo from "../pictures/emp_pic.jpeg";
import { v4 as uuid } from 'uuid';
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

function Emp_view({ hour }) {
  const wage = hour * 50;

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

function EmpPayroll() {
  const [viewClicked, setViewClicked] = React.useState(false);
  const [emp_hour, setHour] = React.useState(0);

  const viewEmpSubmit = (event) => {
    event.preventDefault();
    setViewClicked(true);

    setHour(Math.floor(Math.random() * 4000) + 40);
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={3}>
          <DatePicker label="FROM" />
          <DatePicker label="TO" />
        </Stack>

        <div className="btn mt-4 view_emp_payroll_btn" onClick={viewEmpSubmit}>
          View
        </div>
        <div className="mt-4">
          {viewClicked && <Emp_view hour={emp_hour} />}
        </div>
      </LocalizationProvider>
    </div>
  );
}
async function getEmployeeTable() {
    console.log("Here");
    const response = await fetch("http://localhost:8082/getEmployees", {
      method: 'POST',
      body: JSON.stringify({ employeeId: 1, companyId: 1 }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then( (response) => {
      if (response.status != 200) {
        console.log("Error status code", response.status);
        return [];
      }
      return response.json(); 
     });
     console.log(response);
     return response;
}



export default function ViewEmployees() {
  // Make a request to the server
  const [employees, setEmployees] = React.useState([]);
 
  React.useEffect( () => {
    const doRequest = async() => {
      const result = await getEmployeeTable();
      setEmployees(result);
    }
    doRequest();
  }, []);

  const [searchQuery, setSearchQuery] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  let [firstname, setFirstname] = React.useState("")
  let [lastname, setLastname] = React.useState("")
  let [datevalue, setDate] = React.useState("")
  let [empLst, setEmLst] = React.useState(employees)
  let [selectedEmp, setSelectedEmp] = React.useState(null);
  let [count, setCount] = React.useState(empLst.length)



  const filteredEmp = empLst.filter(
    (item) =>
      item.first.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.last.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectEmp = (empId) => {
    const emp = empLst.find((emp) => emp.id === empId)
    setSelectedEmp(emp)
    setIsModalOpen(!isModalOpen);
    
  }

  const handleRemoveEmp = (empId) => {
    const new_lst = empLst.filter(emp => emp.id !== empId)
    setEmLst(new_lst)
    setIsModalOpen(false)
    setCount(count - 1)

  }

  const handleFirstName = (event) => {
    setFirstname(event.target.value)
  }

  const handleLastName = (event) => {
    setLastname(event.target.value)
  }

  const handleDob = (event) => {
    setDate(event.target.value)
  }

  

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

  const handleAddTeammate = (event) => {
    event.preventDefault()
    if (firstname != "" && lastname != ""){
        let new_emp = {id: uuid(), first: firstname, last: lastname, dob: datevalue}
        setEmLst([...empLst, new_emp])
        setCount(count + 1)

    }
    
    
    setFirstname("")
    setLastname("")
    setDate("")
  }

  const closeBtn = (
    <button className="close " onClick={toggleModal} type="button">
      &times;
    </button>
  );

  const closeAddBtn = 
  (
    <button className="close " onClick={toggleAddModal} type="button">
      &times;
    </button>
  );

  return (
    <div className="homebg">
      <div className="container  ">
        <div className="employeeBox ">
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
                      key={emp.id}
                      onClick={() => handleSelectEmp(emp.id)}
                    >
                      <p>
                        {emp.first} {emp.last}
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
                      Teammate Profile
                    </ModalHeader>
                    <ModalBody className="modal-body">
                      <div className="emp_info ">
                        <img
                          src={emp_photo}
                          className="emp-photo"
                          alt="..."
                        ></img>
                        <div className="firstLast">
                          <h4>First name: {selectedEmp.first}</h4>
                          <h4>Last name: {selectedEmp.last}</h4>
                          <h4>DOB: {selectedEmp.dob}</h4>
                        </div>
                      </div>
  
                      <div className="work_info mt-2">
                        <h3 className="mb-3">Payroll & Hours Worked</h3>
                        <EmpPayroll />
                      </div>
                      <div className="mt-3">
                        <button
                                className="btn btn-lg remove-btn"
                                type="submit"
                                
                                onClick={() => handleRemoveEmp(selectedEmp.id)}
                            >
                                Remove
                        </button>

                      </div>
                    </ModalBody>
                  </Modal>

                )}
                
              </div>
            </div>

            <div className="metric">

                <div className=" mt-4 ">
                    <button
                        className="btn count-btn"
                        type="submit"
                     
                    
                    >
                        Teammates Counted: {count}
                    </button>


                </div>


                <div className=" mt-4 ">
                    <button
                        className="btn btn-lg add-btn"
                        type="submit"
                        onClick={toggleAddModal}
                    
                    >
                        Add
                    </button>


                </div>


            </div>

            





            <Modal
                  isOpen={isAddModalOpen}
                  toggle={toggleAddModal}
                  className="my-emp-modal"
                >
                  <ModalHeader
                    toggle={toggleAddModal}
                    className="modal-head"
                    close={closeAddBtn}
                  >
                    Add A Teammate
                  </ModalHeader>
                  <ModalBody className="modal-body">
                    <Form>
                        <FormGroup className="add_teammate">
                            <Label htmlFor="firstname" >First Name</Label>
                            <Input id="firstname" name="firstname" type = "text" value = {firstname} onChange={handleFirstName}/>

                        </FormGroup>
                        <FormGroup className="add_teammate">
                            <Label htmlFor="lastname">Last Name</Label>
                            <Input id="lastname" name="lastname" type = "text"  value = {lastname} onChange={handleLastName} />

                        </FormGroup>
                        <FormGroup className="add_teammate">
                            <Label htmlFor="dob">Date of Birth</Label>
                            <Input id="dob" name="dob" type = "date" value = {datevalue} onChange={handleDob} />

                        </FormGroup>
                     

                            <div className="d-flex justify-content-center mt-3">
                                <button className="btn modal-add-btn" type = "submit" onClick={handleAddTeammate}>Add</button>
                            </div>


               

                       
                        
                    </Form>
                    

                    
                  </ModalBody>
                </Modal>

            
            

          </div>
        </div>
      </div>
    </div>
  );
}
