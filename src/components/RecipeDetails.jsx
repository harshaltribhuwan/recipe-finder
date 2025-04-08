import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./recipeDetails.scss"; // You can style this separately

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

  if (!recipeData) return <div className="loading">Loading...</div>;

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
    <div className="recipe-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

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
            display: isImageLoading ? "none" : "block",
            opacity: isImageLoading ? 0 : 1,
            transition: "opacity 0.5s ease",
          }}
        />
      </div>

      <h1 className="recipe-title">{name}</h1>

      <div className="recipe-meta">
        <p>
          ⭐ {rating} ({reviewCount} reviews) | 🍽 {servings} servings | ⏱️{" "}
          {prepTimeMinutes} min prep • {cookTimeMinutes} min cook
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
        <h2>🧾 Ingredients</h2>
        <ul>
          {ingredients?.map((item, i) => (
            <li key={i}>✔ {item}</li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h2>👨‍🍳 Instructions</h2>
        <ol>
          {instructions?.map((step, i) => (
            <li key={i}>
              {i + 1}. {step}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default RecipeDetails;
