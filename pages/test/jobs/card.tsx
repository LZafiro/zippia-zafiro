import ReactHtmlParser from "react-html-parser";
import styles from "../../../styles/jobsPage.module.css";
import { Job } from "./index";

export default function Card({ job }: { job: Job }): JSX.Element {
  return (
    <div className={styles.card}>
      <a className={styles.cardTitle}> {job.jobTitle} </a>
      <a className={styles.cardCompanyName}> {job.companyName} </a>
      <div className={styles.cardJobDescriptionContainer}>
        <a className={styles.cardJobDescription}>
          {ReactHtmlParser(job.jobDescription)}
        </a>
      </div>
    </div>
  );
}
