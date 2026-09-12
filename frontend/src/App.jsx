import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "https://student-management-ti7q.onrender.com";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [courseId, setCourseId] = useState(1);

  const fetchStudents = async () => {
    const response = await fetch(`${API_URL}/students`);
    const data = await response.json();
    setStudents(data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchStudents();
  }, []);

  const addStudent = async (e) => {
    e.preventDefault();

    const response = await fetch(`${API_URL}/students`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        course_id: Number(courseId),
      }),
    });

    if (response.ok) {
      setName("");
      setEmail("");
      setCourseId(1);
      fetchStudents();
    } else {
      alert("Failed to add student");
    }
  };

  return (
    <div className="container">
      <h1>Student Management System</h1>

      <form onSubmit={addStudent} className="form">
        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Student Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <select
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
        >
          <option value={1}>Computer Science</option>
          <option value={2}>Information Technology</option>
        </select>

        <button type="submit">Add Student</button>
      </form>

      <h2>Students</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Course ID</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.course_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;