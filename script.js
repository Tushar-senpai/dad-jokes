const jokeEl = document.getElementById("joke");
const jokeBtn = document.getElementById("jokeBtn");

const generateJoke = async () => {
  const config = {
    headers: { Accept: "application/json" },
  };

  // Show loading state
  jokeEl.textContent = "🤔 Thinking of a joke...";
  jokeBtn.disabled = true;

  try {
    const res = await fetch("https://icanhazdadjoke.com/", config);
    if (!res.ok) throw new Error("Network error");

    const data = await res.json();
    jokeEl.textContent = data.joke;
  } catch (error) {
    console.error("Error fetching joke:", error);
    jokeEl.textContent = "😢 Oops! Couldn't fetch a joke right now.";
  } finally {
    jokeBtn.disabled = false;
  }
};

// Fetch one joke on page load
generateJoke();

// Fetch new joke on button click
jokeBtn.addEventListener("click", generateJoke);
// Add keyboard support for generating jokes
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    generateJoke();
  }
});