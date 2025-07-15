import React, { useEffect, useState } from "react";
import "./EmployeeTable.css"; // optional, if you add CSS

const supabaseUrl = "https://ongldqocyjecvmywsbkr.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9uZ2xkcW9jeWplY3ZteXdzYmtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1MDYxODQsImV4cCI6MjA2ODA4MjE4NH0.9DsQX2EC-O2Khd1t4xA-9aJrBpCp9Cqz6X-iNexhA6A";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    employee_number: "",
    name: "",
    email_id: "",
    phone_number: "",
    gender: "",
  });

  const fetchEmployees = async () => {
    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/employees`, {
        headers: {
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${supabaseAnonKey}`,
        },
      });
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const sendEmail = async (email) => {
    try {
      const response = await fetch("http://localhost:5000/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error("Failed to send");
      alert("✅ Email sent successfully!");
    } catch (error) {
      console.error("❌ Error sending email:", error);
      alert("❌ Failed to send email.");
    }
  };

  const openForm = (employee = null) => {
    if (employee) {
      setFormData(employee);
    } else {
      setFormData({
        employee_number: "",
        name: "",
        email_id: "",
        phone_number: "",
        gender: "",
      });
    }
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setFormData({
      employee_number: "",
      name: "",
      email_id: "",
      phone_number: "",
      gender: "",
    });
  };

  const submitForm = async () => {
    const isEdit = !!formData.id;
    const url = isEdit
      ? `${supabaseUrl}/rest/v1/employees?id=eq.${formData.id}`
      : `${supabaseUrl}/rest/v1/employees`;
    const method = isEdit ? "PATCH" : "POST";

    const { id, ...body } = formData;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${supabaseAnonKey}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error("Failed to submit data: " + JSON.stringify(errorBody));
      }

      closeForm();
      fetchEmployees();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("⚠️ " + error.message);
    }
  };

  const deleteEmployee = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (!confirm) return;

    try {
      const response = await fetch(
        `${supabaseUrl}/rest/v1/employees?id=eq.${id}`,
        {
          method: "DELETE",
          headers: {
            apikey: supabaseAnonKey,
            Authorization: `Bearer ${supabaseAnonKey}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to delete");
      fetchEmployees();
    } catch (error) {
      console.error("❌ Error deleting:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="employee-container">
      <h2 className="head-title">Employee Details</h2>
      <button className="add-btn" onClick={() => openForm()}>
        Add Employee
      </button>
      <table className="employee-table">
        <thead>
          <tr>
            <th>Emp No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Send Mail</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.employee_number}</td>
              <td>{emp.name}</td>
              <td>{emp.email_id}</td>
              <td>{emp.phone_number}</td>
              <td>{emp.gender}</td>
              <td>
                <button onClick={() => sendEmail(emp.email_id)}>Send</button>
              </td>
              <td>
                <button onClick={() => openForm(emp)}>Edit</button>
              </td>
              <td>
                <button onClick={() => deleteEmployee(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <div className="form-modal">
          <div className="form-box">
            <h3>{formData.id ? "Edit Employee" : "Add Employee"}</h3>
            <input
              type="number"
              placeholder="Employee Number"
              value={formData.employee_number}
              onChange={(e) =>
                setFormData({ ...formData, employee_number: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email_id}
              onChange={(e) =>
                setFormData({ ...formData, email_id: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={formData.phone_number}
              onChange={(e) =>
                setFormData({ ...formData, phone_number: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Gender"
              value={formData.gender}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
            />
            <div className="form-actions">
              <button onClick={submitForm}>
                {formData.id ? "Update" : "Add"}
              </button>
              <button onClick={closeForm}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;
