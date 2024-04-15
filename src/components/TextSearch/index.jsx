import "./styles.css";

export const TextSearch = ({ handleChange, searchQuery }) => {
  return (
    <input
      className="text-input"
      onChange={handleChange}
      value={searchQuery}
      type="search"
      placeholder="Type your search"
    />
  );
};
