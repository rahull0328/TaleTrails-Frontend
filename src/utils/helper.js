import ADD_TO_STORY from '../assets/add_to_story.png'
import NO_SEARCH from '../assets/no_search.png'
import NO_FILTER from '../assets/no_filter.png'

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const getInitials = (name) => {
  if (!name) return "";

  const words = name.split(" ");
  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }

  return initials.toUpperCase();
};

export const getEmptyCardMessage = (filterType) => {
  switch (filterType) {
    case "search":
      return `Oops! No Tales found matching your search !`;

    case "date":
      return `No Tales found in the given date range !`;

    default:
      return `Start creating your first tale! Click the 'Add' button to jot down your thoughts or ideas`;
  }
};

export const getEmptyCardImg = (filterType) => {
  switch (filterType) {
    case "search":
      return NO_SEARCH

    case "date":
      return NO_FILTER

    default:
      return ADD_TO_STORY
  }
};