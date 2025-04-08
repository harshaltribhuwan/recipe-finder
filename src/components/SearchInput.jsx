import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./searchInput.scss";

const SearchInput = () => {
  const [inputSearch, setInputSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [cache, setCache] = useState({});
  const navigate = useNavigate();

  const fetchApi = async () => {
    try {
      if (cache[inputSearch]) {
        setSearchResult(cache[inputSearch]);
        return;
      }
      const response = await fetch(
        `https://dummyjson.com/recipes/search?q=${inputSearch}`
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
    return () => clearTimeout(time);
  }, [inputSearch]);

  return (
    <div className="search-wrapper">
      <motion.div
        className="search-box"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h3>Search Recipe...</h3>

        <div className="search-input-container">
          <input
            type="text"
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
            onFocus={() => setShowSearch(true)}
            onBlur={() => setTimeout(() => setShowSearch(false), 150)}
          />
        </div>

        <AnimatePresence>
          {showSearch && searchResult?.length > 0 && (
            <motion.div
              className="search-result-container"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              {searchResult?.map(({ name, id }) => (
                <motion.span
                  className="result"
                  key={id}
                  onMouseDown={() => navigate(`/recipe/${id}`)}
                  whileTap={{ scale: 0.97 }}
                >
                  {name}
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default SearchInput;
