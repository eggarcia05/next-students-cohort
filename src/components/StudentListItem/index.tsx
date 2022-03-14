import Link from "next/link";
import styles from "./styles.module.css";


const StudentItem = (props: any) => {
  const student = props.student;
  return (
    <Link href={`/student/${student.id}`}> 
    <div className={styles.card}>
      <img src="https://www.getbillage.com/files/user/avatar/58c685d4796d2_AlejandroDruran.png" alt="Avatar" style={{ width: "13%", height:"13%" }} />
      <div className={styles.container}>
        <h4>
          <b style={{fontSize:"1.2em"}}>
            {student?.first_name ?? ""} {student?.last_name ?? ""}
          </b>
        </h4>
        { student?.description ? <p><b> &nbsp; Description:</b> {student?.description}</p> : ""}
        { student?.description ? <p><b> &nbsp; Years Of Experience:</b> {student?.years_experience} ages</p> : ""}
        { student?.description ? <p><b> &nbsp; Tech Skills:</b> {student?.tech_skills} </p> : ""}
        { student?.description ? <p><b> &nbsp; Soft Skills:</b> {student?.soft_skills} </p> : ""}


        <p></p>
      </div>
    </div>
    </Link>
  );
};

export default StudentItem;
