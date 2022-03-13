import Link from "next/link";
import styles from "./styles.module.css";

const StudentItem = (props: any) => {
  const student = props.student;
  return (
    <Link href={`/student/${student.id}`}> 
    <div className={styles.card}>
      <img src="https://www.getbillage.com/files/user/avatar/58c685d4796d2_AlejandroDruran.png" alt="Avatar" style={{ width: "4%" }} />
      <div className={styles.container}>
        <h4>
          <b>
            {student?.first_name ?? ""} {student?.last_name ?? ""}
          </b>
        </h4>
        <p>"eggarci"</p>
      </div>
    </div>
    </Link>
  );
};

export default StudentItem;
