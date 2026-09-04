import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://3.108.235.190:8080/api/employees";

function App() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
  });

  const [loading, setLoading] = useState(false);

  // Fetch employees
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(API_URL);
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      alert("Unable to fetch employees");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Add employee
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.department) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await axios.post(API_URL, form);

      alert("Employee added successfully!");

      setForm({
        name: "",
        email: "",
        department: "",
      });

      fetchEmployees();
    } catch (error) {
      console.error("Error adding employee:", error);
      alert("Unable to add employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Employee Management System.</h1>

      {/* Add Employee */}
      <div className="card">
        <h2>Add Employee</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Employee Name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Employee Email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="department"
            placeholder="Department"
            value={form.department}
            onChange={handleChange}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Employee"}
          </button>
        </form>
      </div>

      {/* Employee List */}
      <div className="card">
        <h2>Employees</h2>

        {employees.length === 0 ? (
          <p>No employees found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
              </tr>
            </thead>

            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.department}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;