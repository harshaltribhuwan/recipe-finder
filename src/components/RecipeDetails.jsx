import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./recipeDetails.scss";

const RecipeDetails = () => {
  const [recipeData, setRecipeData] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchApi = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/recipes/${id}`);
      const result = await response?.json();
      setRecipeData(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  if (!recipeData) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
      </div>
    );
  }

  const {
    name,
    image,
    ingredients,
    instructions,
    prepTimeMinutes,
    cookTimeMinutes,
    servings,
    difficulty,
    cuisine,
    caloriesPerServing,
    rating,
    reviewCount,
    tags,
    mealType,
  } = recipeData;

  return (
    <motion.div
      className="recipe-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <span className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </span>

      <div className="recipe-image">
        {isImageLoading && (
          <div className="image-skeleton">
            <div className="spinner" />
          </div>
        )}
        <img
          src={image}
          alt={name}
          onLoad={() => setIsImageLoading(false)}
          style={{
            opacity: isImageLoading ? 0 : 1,
            transition: "opacity 0.5s ease",
          }}
        />
      </div>

      <h1 className="recipe-title">{name}</h1>

      <div className="recipe-meta">
        <p>
          Rating: {rating} ({reviewCount} reviews) | Servings: {servings} |
          Prep: {prepTimeMinutes} min • Cook: {cookTimeMinutes} min
        </p>
        <p>
          <strong>Difficulty:</strong> {difficulty} | <strong>Cuisine:</strong>{" "}
          {cuisine} | <strong>Meal:</strong> {mealType?.join(", ")}
        </p>
        <p>
          <strong>Tags:</strong> {tags?.join(", ")}
        </p>
        <p>
          <strong>Calories per Serving:</strong> {caloriesPerServing} kcal
        </p>
      </div>

      <div className="section">
        <h2>Ingredients</h2>
        <ul>
          {ingredients?.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h2>Instructions</h2>
        <ol>
          {instructions?.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </div>
    </motion.div>
  );
};

export default RecipeDetails;
