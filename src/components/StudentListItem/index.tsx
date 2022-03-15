import Link from "next/link";
import styles from "./styles.module.css";


const StudentItem = (props: any) => {
  const student = props.student;
  return (
    <Link href={`/student/${student.id}`}> 
    <div className={styles.card}>
      <img src={student?.picture ?? "https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png"} alt="Avatar" style={{ width: "13%", height:"13%", }} />
      <div className={styles.container}>
        <h4>
          <b style={{fontSize:"1.2em"}}>
            {student?.first_name ?? ""} {student?.last_name ?? ""}
          </b>
        </h4>
        { student?.description ? <p><b> &nbsp; Description:</b> {student?.description}</p> : ""}
        { student?.years_experience ? <p><b> &nbsp; Years Of Experience:</b> {student?.years_experience} ages</p> : ""}
        { student?.tech_skills ? <p><b> &nbsp; Tech Skills:</b> {student?.tech_skills} </p> : ""}
        { student?.soft_skills ? <p><b> &nbsp; Soft Skills:</b> {student?.soft_skills} </p> : ""}

      </div>
    </div>
    </Link>
  );
};

export default StudentItem;
