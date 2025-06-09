import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PageHeader.module.css';

export default function PageHeader({ title, showSearch = true }) {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <h2 className={styles.pageTitle}>{title}</h2>
      </div>
      {showSearch && (
        <div className={styles.headerRight}>
          <div className={styles.searchWrapper}>
            <input
              type="text"
              placeholder="Tìm kiếm bài quiz"
              className={styles.searchBar}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearchSubmit}
            />
          </div>
        </div>
      )}
    </header>
  );
}