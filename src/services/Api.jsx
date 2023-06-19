import socialMediaData from '../data/social-media.json';

export const getSocialMedia = async () => {
  return socialMediaData;
};

export const addSocialMedia = async (newSocialMedia) => {
  socialMediaData.push(newSocialMedia);
};
