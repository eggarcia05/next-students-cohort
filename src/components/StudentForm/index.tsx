import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Config from "../../config";
import Router from 'next/router'

import styles from "./styles.module.css";

type StudentFormProp = {
  student?: any;
  isNew?: boolean;
};

const StudentForm = (props: StudentFormProp) => {
  const studentId = props?.student?.id;
  const [student, setStudent] = useState(props.student);
  const [isNew, setIsNew] = useState(props?.isNew ?? false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setStudent(props.student);    
    console.log(student);
  }, [studentId]);

  const handleInputsValues = (event: any) => {
    const { name, value } = event.target;
    setStudent({ ...student, [name]: value });
    
  };

  const handleSetMessage = (message: string) => {
    setMessage(message);
    const interval = setInterval(() => {
      setMessage("");
      clearInterval(interval);
    }, 3000);
  };

  const handleDeleteStudent = (event: any) => {
    event.preventDefault();
    setLoading(true);

    axios
    .delete(Config.studentsApi, { data: { id: studentId }, headers: { "Authorization": "***" } })
    .then((response) => {
      handleSetMessage("User Deleted!");
      console.log("Delete user response", response);
      setTimeout(() => {
        Router.push('/')
      }, 1500);
    })
    .catch((error) => {
      console.log("There was an error deleting a student.", error);
    })
    .finally(() => {
      setLoading(false);
    });

  }

  const handleSaveStudent = (event: any) => {
    event.preventDefault();
    setLoading(true);

    if (isNew) {
      console.log("Creating a new student...", student);
      axios
        .post(Config.studentsApi, student)
        .then((response) => {
          handleSetMessage("User created!");
          setStudent({
            id: "",
            first_name: "",
            last_name: "",
          });
          console.log("Create user response", response.data);
        })
        .catch((error) => {
          console.error("There was an error creating a student.", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      console.log("Updating student info...", student);
      axios
        .put(`${Config.studentsApi}/${student.id}`, student)
        .then((response) => {
          handleSetMessage("User updated!");
          console.log("Create user response", response.data);
        })
        .catch((error) => {
          console.error("There was an error updating the student", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const renderForm = () => {
    return (
      <form className="box">
        <div className={styles.card}>
          <div className={styles.columnLeft}>
            <img
              src="https://www.getbillage.com/files/user/avatar/58c685d4796d2_AlejandroDruran.png"
              alt="Avatar"
              style={{ width: "13.6%", height: "13.6%" }}
            />
          </div>
          <div className={styles.columnRight}>
            <label className="label">First name</label>
            <input
              className="input"
              type="text"
              id="first_name"
              name="first_name"
              placeholder="First name"
              value={student?.first_name ?? ""}
              onChange={handleInputsValues}
              disabled={loading}
            />
            <br />
            <br />
            <label className="label">Last name</label>
            <input
              className="input"
              type="text"
              id="last_name"
              name="last_name"
              value={student?.last_name ?? ""}
              onChange={handleInputsValues}
              placeholder="Last name"
              disabled={loading}
            />
            <br />
            <br />
          </div>
        </div>
        <div className={styles.columnRight}>
          <label className="label">Identification Number</label>
          <input
            className="input"
            type="text"
            id="id"
            name="id"
            placeholder="Identification number"
            value={student?.id ?? ""}
            onChange={handleInputsValues}
            disabled={loading}
          />
          <br />
          <br />
          <label className="label">Age</label>
          <input
            className="input"
            type="text"
            id="age"
            name="age"
            value={student?.age ?? ""}
            onChange={handleInputsValues}
            placeholder="age"
            disabled={loading}
          />
          <br />
          <br />
        
              <label className="label">Status</label>
              <input
            className="input"
            type="text"
            id="status"
            name="status"
            value={student?.status ?? ""}
            onChange={handleInputsValues}
            placeholder="Active | Inactive"
            disabled={loading}
          />
          
          <br />
          <br />
          <label className="label">Work Experience</label>
          <input
            className="input"
            type="text"
            id="work_experience"
            name="work_experience"
            value={student?.work_experience ?? ""}
            onChange={handleInputsValues}
            placeholder="Work Experience"
            disabled={loading}
          />
          <br />
          <br />
          <label className="label">Year of Experience</label>
          <input
            className="input"
            type="number"
            id="years_experience"
            name="years_experience"
            value={student?.years_experience ?? 0}
            onChange={handleInputsValues}
            placeholder="Year of Experience"
            disabled={loading}
          />
          <br />
          <br />
          <label className="label">Tech Skills</label>
          <input
            className="input"
            type="text"
            id="tech_skills"
            name="tech_skills"
            value={student?.tech_skills ?? []}
            onChange={handleInputsValues}
            placeholder="Skill 1, Skill 2, ..."
            disabled={loading}
          />
          <br />
          <br />
          <label className="label">Soft Skills</label>
          <input
            className="input"
            type="text"
            id="soft_skills"
            name="soft_skills"
            value={student?.soft_skills ?? ""}
            onChange={handleInputsValues}
            placeholder="Skill 1, Skill 2, .."
            disabled={loading}
          />
          <br />
          <br />
          <label className="label">Description</label>
          <input
            className="input"
            type="text"
            id="description"
            name="description"
            value={student?.description ?? ""}
            onChange={handleInputsValues}
            placeholder="Description"
            disabled={loading}
          />
          <br />
          <br />
          <label className="label">Observations</label>
          <input
            className="input"
            type="text"
            id="observations"
            name="observations"
            value={student?.observations ?? ""}
            onChange={handleInputsValues}
            placeholder="Observations"
            disabled={loading}
          />
        </div>

        <div className={styles.bottomCard}>
          <input
            className={`button is-primary ${loading ? "is-loading" : ""}`}
            type="submit"
            value="Submit"
            disabled={loading}
            onClick={handleSaveStudent}
          />
          <input
            className={`button is-danger ${loading ? "is-loading" : ""}`}
            type="submit"
            value="Delete"
            disabled={loading}
            onClick={handleDeleteStudent}
          />
          <Link href={"/"}>
            <a className={`button`} style={{ marginLeft: "0.5rem" }}>
              Go to Students List
            </a>
          </Link>
          {!!error && <span className={styles.errorMessage}>{error}</span>}
          {!!message && (
            <span className={styles.successMessage}>{message}</span>
          )}
        </div>
      </form>
    );
  };

  return <>{renderForm()}</>;
};

export default StudentForm;
