import React from "react";
import { GetServerSideProps } from "next";
import styles from "../../../styles/jobsPage.module.css";
import Card from "../../../components/card";

const apiURL = "https://www.zippia.com/api/jobs/";

export interface Job {
  jobTitle: string;
  companyName: string;
  jobDescription: string;
  postingDate: string;
}

export default function Jobs({ jobs }: { jobs: Job[] }): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <div className={styles.cardsContainer}>
        {/** We only want to display the first 10 jobs */}
        {jobs.slice(0, 10).map((job: Job, index: number) => (
          <Card key={index} job={job} />
        ))}
      </div>
    </div>
  );
}

// This method is responsible for fetching data from the API, at server side
export const getServerSideProps: GetServerSideProps = async (context) => {
  // First we fetch
  const res = await fetch(apiURL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      companySkills: true,
      dismissedListingHashes: [],
      fetchJobDesc: true,
      jobTitle: "Business Analyst",
      locations: [],
      numJobs: 20,
      previousListingHashes: [],
    }),
  });
  // Then we parse the response as JSON
  let data = await res.json();
  // Then we map the data to our interface (With necessary type assertion)
  // In the case of not retrieving any job data (some api error), we return an empty array
  const jobs: Job[] =
    data.jobs?.map(
      (job: any): Job => ({
        jobTitle: job.jobTitle,
        companyName: job.companyName,
        jobDescription: job.jobDescription,
        postingDate: job.postingDate,
      })
    ) ?? [];
  // Return the result as props to the page
  return {
    props: { jobs },
  };
};
