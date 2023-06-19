import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const AddSocialMediaModal = ({ isOpen, onClose, onAddSocialMedia }) => {
  const [newSocialMedia, setNewSocialMedia] = useState({
    socialMediaLink: "",
    socialMediaName: "",
    description: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewSocialMedia((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddSocialMedia = () => {
    onAddSocialMedia(newSocialMedia);
    setNewSocialMedia({
      socialMediaLink: "",
      socialMediaName: "",
      description: "",
    });
  };

  return (
    isOpen && (
      <div className="modal-container">
        <div className="modal-overlay" onClick={onClose} />
        <div className="modal">
          <div className="modal-content">
            <div className="cross-icon">
              <FaTimes onClick={onClose} />
            </div>
            <label>Sosyal Medya Linki:</label>
            <input
              type="text"
              name="socialMediaLink"
              value={newSocialMedia.socialMediaLink}
              onChange={handleInputChange}
            />
            <label>Sosyal Medya Adı:</label>
            <input
              type="text"
              name="socialMediaName"
              value={newSocialMedia.socialMediaName}
              onChange={handleInputChange}
            />
            <label>Açıklama:</label>
            <input
              type="text"
              name="description"
              value={newSocialMedia.description}
              onChange={handleInputChange}
            />
            <div className="buttons-container">
              <button className="button-cancel" onClick={onClose}>
                Vazgeç
              </button>
              <button className="button-add" onClick={handleAddSocialMedia}>
                Ekle
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default AddSocialMediaModal;
