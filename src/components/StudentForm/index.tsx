import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Config from "../../config";

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
          <div className={styles.column1}>
            <img
              src="https://www.getbillage.com/files/user/avatar/58c685d4796d2_AlejandroDruran.png"
              alt="Avatar"
              style={{ width: "25%" }}
            />
          </div>
          <div>
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
            <div>
              <input
                className={`button is-primary ${loading ? "is-loading" : ""}`}
                type="submit"
                value="Submit"
                disabled={loading}
                onClick={handleSaveStudent}
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
          </div>
        </div>
      </form>
    );
  };

  return <>{renderForm()}</>;
};

export default StudentForm;
