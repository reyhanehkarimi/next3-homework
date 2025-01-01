"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import RecipeCard from '../components/RecipeCard'

function RecipesList() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const resRecipes = await fetch("https://dummyjson.com/recipes");
        if (!resRecipes.ok) throw new Error("Failed to fetch recipes");
        const recipesData = await resRecipes.json(); 
        setRecipes(recipesData.recipes);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4 bg-gradient-to-r from-red-50 via-white to-red-50 text-center">
      <h1 className="text-2xl font-bold mb-4 text-red-900">Recipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

export default RecipesList;
