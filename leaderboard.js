const BIN_ID = "69bfae0eaa77b81da9094648";
const API_KEY = "$2a$10$kdOZx4k.rpSG1LKRbT5Nv.ZvFjcptNzcdFvyN9qybV/B9n1vyjylK";
const BIN_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

function loadLeaderboard() {
  const panel = document.getElementById("leaderboard-list");
  panel.textContent = "Loading";

  fetch(BIN_URL + "/latest", {
    headers: { "X-Master-Key": API_KEY }
  })
    .then((res) => res.json())
    .then((data) => {
      const scores = data.record.scores;

      if (scores.length === 0) {
        panel.innerHTML = "<p>No scores yet — be the first!</p>";
        return;
      }

      scores.sort((a, b) => b.score - a.score);

      panel.innerHTML = scores
        .slice(0, 10)
        .map((entry, i) => `
          <div class="leaderboard-row">
            <span class="lb-rank">${i + 1}</span>
            <span class="lb-name">${entry.name}</span>
            <span class="lb-score">${entry.score}</span>
          </div>
        `)
        .join("");
    })
    .catch(() => {
      panel.textContent = "Couldn't load scores.";
    });
}

function saveScore() {
  const name = prompt("Enter your baker name:");
  if (!name || name.trim() === "") return;

  fetch(BIN_URL + "/latest", {
    headers: { "X-Master-Key": API_KEY }
  })
    .then((res) => res.json())
    .then((data) => {
      const scores = data.record.scores;

      const existing = scores.find((s) => s.name === name.trim());
      if (existing) {
        if (totalClickCount > existing.score) {
          existing.score = totalClickCount;
        }
      } else {
        scores.push({ name: name.trim(), score: totalClickCount });
      }
      return fetch(BIN_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": API_KEY
        },
        body: JSON.stringify({ scores })
      });
    })
    .then(() => {
      alert("Score saved!");
      loadLeaderboard();
    })
    .catch(() => alert("Couldn't save score, try again."));
}

loadLeaderboard();