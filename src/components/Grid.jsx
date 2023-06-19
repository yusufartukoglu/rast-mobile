import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaArrowUp,
  FaArrowDown,
  FaPlus,
  FaFilter,
} from "react-icons/fa";
import ChevronLeft from "../assets/ChevronLeft.svg";
import ChevronRight from "../assets/ChevronRight.svg";
import Up from "../assets/Up.svg";
import Down from "../assets/Down.svg";
import { getSocialMedia, addSocialMedia } from "../services/Api";
import AddSocialMediaModal from "./AddSocialMediaModal";

const Grid = () => {
  const [socialMedias, setSocialMedias] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPerPage, setShowPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredSocialMedias, setFilteredSocialMedias] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

  // useEffect hook'u kullanarak sayfa yüklendiğinde API'den sosyal medya verilerini alma

  useEffect(() => {
    const fetchSocialMediaData = async () => {
      try {
        const dummyData = await getSocialMedia();
        setSocialMedias(dummyData);
      } catch (error) {
        console.error("Error fetching social media data:", error);
      }
    };

    fetchSocialMediaData();
  }, []);

  // useEffect hook'u kullanarak sosyal medya verileri veya arama terimi değiştikçe filtrelenmiş sosyal medya verilerini güncelleme

  useEffect(() => {
    const updatedFilteredSocialMedias = socialMedias.filter((socialMedia) => {
      return (
        socialMedia.socialMediaLink
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        socialMedia.socialMediaName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        socialMedia.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredSocialMedias(updatedFilteredSocialMedias);
  }, [socialMedias, searchTerm]);

  useEffect(() => {
    const storedSocialMedias = localStorage.getItem("socialMedias");
    if (storedSocialMedias) {
      setSocialMedias(JSON.parse(storedSocialMedias));
    }
  }, []);

  // useEffect hook'u kullanarak sosyal medya verilerini yerel depolamaya kaydetme ve yüklemeyi gerçekleştirme

  useEffect(() => {
    localStorage.setItem("socialMedias", JSON.stringify(socialMedias));
  }, [socialMedias]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // Yeni sosyal medya hesabı eklemek için kullanılan fonksiyon

  const handleAddSocialMedia = (newSocialMedia) => {
    try {
      addSocialMedia(newSocialMedia);
      setSocialMedias((prevSocialMedias) => [
        ...prevSocialMedias,
        newSocialMedia,
      ]);
    } catch (error) {
      console.error("Error adding social media:", error);
    }
  };

  // Sıralama işlemini gerçekleştiren fonksiyon

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Sayfa numarasını azaltan ve arttıran fonksiyon
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(filteredSocialMedias.length / showPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Sıralanmış sosyal medya verilerini oluşturan işlev

  const handleShowPerPageChange = (event) => {
    setShowPerPage(Number(event.target.value));
  };

  const sortedSocialMedias = [...filteredSocialMedias].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Sayfalama için gerekli hesaplamaları yapan işlevler ve değişkenler

  const indexOfLastSocialMedia = currentPage * showPerPage;
  const indexOfFirstSocialMedia = indexOfLastSocialMedia - showPerPage;
  const currentSocialMedias = sortedSocialMedias.slice(
    indexOfFirstSocialMedia,
    indexOfLastSocialMedia
  );
  const totalPages = Math.ceil(sortedSocialMedias.length / showPerPage);

  //Satır sayısını arttıran ve azaltan fonksiyon

  const increaseRows = () => {
    setShowPerPage((prevValue) => prevValue + 1);
  };

  const decreaseRows = () => {
    if (showPerPage > 1) {
      setShowPerPage((prevValue) => prevValue - 1);
    }
  };

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search objects..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <div className="search-icon">
          <FaSearch />
        </div>
        <div className="filter-box">
          <div className="filter-icon">
            <FaFilter />
          </div>
        </div>
      </div>
      <button className="add-button" onClick={handleModalOpen}>
        <div className="plus-icon">
          <FaPlus />
        </div>
        Yeni Hesap Ekle
      </button>
      <table className="dashboard-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("socialMediaLink")}>
              Sosyal Medya Linki
              {sortConfig.key === "socialMediaLink" && (
                <span className="sort-icon">
                  {sortConfig.direction === "asc" ? (
                    <FaArrowUp />
                  ) : (
                    <FaArrowDown />
                  )}
                </span>
              )}
            </th>
            <th onClick={() => handleSort("socialMediaName")}>
              Sosyal Medya Adı
              {sortConfig.key === "socialMediaName" && (
                <span className="sort-icon">
                  {sortConfig.direction === "asc" ? (
                    <FaArrowUp />
                  ) : (
                    <FaArrowDown />
                  )}
                </span>
              )}
            </th>
            <th onClick={() => handleSort("description")}>
              Açıklama
              {sortConfig.key === "description" && (
                <span className="sort-icon">
                  {sortConfig.direction === "asc" ? (
                    <FaArrowUp />
                  ) : (
                    <FaArrowDown />
                  )}
                </span>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {currentSocialMedias.map((socialMedia) => (
            <tr
              key={socialMedia.id}
              className={socialMedia.id % 2 === 0 ? "white-row" : "eff-row"}
            >
              <td>{socialMedia.socialMediaLink}</td>
              <td>{socialMedia.socialMediaName}</td>
              <td>{socialMedia.description}</td>
            </tr>
          ))}
          {showPerPage > currentSocialMedias.length &&
            Array(showPerPage - currentSocialMedias.length)
              .fill()
              .map((_, index) => (
                <tr
                  key={`empty-${index}`}
                  className={index % 2 === 0 ? "white-row" : "eff-row"}
                >
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              ))}
        </tbody>
      </table>
      <div className="pagination">
        <div className="show-per-page">
          <span className="show">Show:</span>
          <div className="input-wrapper">
            <div className="input-container">
              <input
                type="text"
                value={showPerPage + " rows"}
                onChange={handleShowPerPageChange}
              />
              <div className="show-wrapper">
                <img src={Up} alt="Increase" onClick={increaseRows} />
                <img src={Down} alt="Decrease" onClick={decreaseRows} />
              </div>
            </div>
          </div>
        </div>
        <div className="page-numbers">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`pagination-button ${
              currentPage === 1 ? "disabled" : ""
            } previous`}
          >
            <img src={ChevronLeft} alt="Chevron" />
          </button>
          <div className="current-page-box">
            <span className="current-page">{currentPage}</span>
          </div>
          <span className="of">of</span>
          <span className="total-pages">{totalPages}</span>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`pagination-button ${
              currentPage === totalPages ? "disabled" : ""
            } next`}
          >
            <img src={ChevronRight} alt="Chevron" />
          </button>
        </div>
      </div>
      <AddSocialMediaModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onAddSocialMedia={handleAddSocialMedia}
      />
    </div>
  );
};

export default Grid;
