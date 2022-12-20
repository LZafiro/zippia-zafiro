/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "../styles/header.module.css";

export default function Header(): JSX.Element {
  return (
    <nav className={styles.wrapper}>
      <div className={styles.content}>
        <img
          width={152}
          height={36}
          src="https://static.zippia.com/ui-router/logo/full.png"
          alt="logo"
        />
        <div className={styles.searchBar}>
          <input
            className={styles.jobSearchBar}
            placeholder="Search for job titles"
          />
          <input className={styles.locationSearchBar} placeholder="Location" />
          <button className={styles.searchButton}>
            <img
              src="https://www.zippia.com/ui-router/images/new-search.svg"
              alt="search icon"
            />
          </button>
        </div>
        <div className={styles.options}>
          <a>JOBS</a>
          <a>CAREERS</a>
          <a>POST JOB</a>
        </div>
        <div className={styles.smallScreenOptions}>
          <a>SIGN IN</a>
          <img
            src="https://www.zippia.com/ui-router/images/new-search.svg"
            alt="search icon"
          />
        </div>
      </div>
    </nav>
  );
}
