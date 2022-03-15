import {useEffect, useState} from "react";
import axios from "axios";

import StudentListItem from "../StudentListItem";

import styles from "./styles.module.css";
import Config from "../../config";

const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(Config.studentsApi)
      .then((response) => {
        setStudents(response.data);
        setError("");
      })
      .catch((error) => {
        console.error("There was an error getting students from API", error);
        setStudents([]);
        setError("Ups, there was an error getting students info! Please try it again later");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className={styles.studentsListContainer}>
        {
          loading &&
          <progress className="progress is-small is-primary" max="100">15%</progress>
        }
        {
          !loading &&
            error &&
          <div className="container">
            <div className="notification">
              {error}
            </div>
          </div>
        }
        <div className={styles.gridList}> 
        {
          !loading && students.map((student: any) => {
            if(student?.status_st === "Active")
            return (
              <StudentListItem key={student.id} student={student}/>
            );
          })
        }

        </div>
      </div>
      <div className="block"/>
      <div>
        <a className="button is-link" href={"/student/new"}>Add</a>
      </div>
    </>
  );
}


export default StudentsList;
