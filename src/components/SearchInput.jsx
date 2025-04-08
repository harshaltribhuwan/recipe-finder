import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./searchInput.scss";

const SearchInput = () => {
  const [inputSearch, setInputSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [cache, setCache] = useState({});

  const navigate = useNavigate()

  const fetchApi = async () => {
    try {
      if (cache[inputSearch]) {
        setSearchResult(cache[inputSearch]);
        return;
      }
      const response = await fetch(
        `https://dummyjson.com/recipes/search?q=` + inputSearch
      );

      const result = await response?.json();

      setSearchResult(result?.recipes);
      setCache((prev) => ({ ...prev, [inputSearch]: result?.recipes }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const time = setTimeout(fetchApi, 300);

    return () => {
      clearTimeout(time);
    };
  }, [inputSearch]);

  return (
    <div className="container">
      <h3>Search Recipe...</h3>
      <div className="search-input-container">
        <input
          type="text"
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
          onFocus={() => setShowSearch(true)}
          onBlur={() =>
            setTimeout(() => {
              setShowSearch(false);
            }, 150)
          }
        />
      </div>
      {showSearch && (
        <div className="search-result-container">
          {(searchResult || [])?.map(({ name, id }) => (
            <span
              className="result"
              key={id}
              onMouseDown={() => navigate(`/recipe/${id}`)}
            >
              {name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
