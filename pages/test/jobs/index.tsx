import React, { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import styles from "../../../styles/jobsPage.module.css";
import Card from "../../../src/components/card";
import Job from "../../../src/models/job";

const apiURL = "https://www.zippia.com/api/jobs/";

export default function Jobs({ jobs }: { jobs: Job[] }): JSX.Element {
  // We store the jobs in a state variable to be able to filter them
  const [jobList, setJobList] = useState<Job[]>(jobs);
  const [filterLast7Days, setFilterLast7Days] = useState<boolean>(false);
  const [companyNameFilter, setCompanyNameFilter] = useState<string>("");

  useEffect(() => {
    if (filterLast7Days) {
      // We reset the company name filter, that way we can use one filter at a time
      setCompanyNameFilter("");
      // We filter the jobs by last 7 days
      const filteredJobs = jobs.filter((job: Job) => {
        const postingDate = new Date(job.postingDate);
        const today = new Date();
        const diffTime = Math.abs(today.getTime() - postingDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 7;
      });
      setJobList(filteredJobs);
    } else {
      setJobList(jobs);
    }
  }, [filterLast7Days]);

  useEffect(() => {
    if (companyNameFilter) {
      // We reset the 7 days filter, that way we can use one filter at a time
      setFilterLast7Days(false);
      const filteredData = jobs.filter((value: Job) =>
        value.companyName
          .toLowerCase()
          .includes(companyNameFilter.toLowerCase())
      );
      setJobList(filteredData);
    } else {
      setJobList(jobs);
    }
  }, [companyNameFilter]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.actionButtonsContainer}>
        <input
          className={styles.companyNameSearch}
          placeholder="Filter by company name"
          value={companyNameFilter}
          onChange={(e) => setCompanyNameFilter(e.target.value)}
        />
        <div
          onClick={() => setFilterLast7Days((prev) => !prev)}
          className={
            filterLast7Days
              ? styles.customCheckboxContainerSelected
              : styles.customCheckboxContainer
          }
        >
          Filter by last 7 days
        </div>
      </div>
      <div className={styles.cardsContainer}>
        {/** We only want to display the first 10 jobs */}
        {jobList.slice(0, 10).map((job: Job, index: number) => (
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
