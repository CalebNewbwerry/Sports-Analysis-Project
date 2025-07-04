const apiKey = "4e342da8f5b7e0095825abfb99ea195c";
const apiUrl = `https://api.the-odds-api.com/v4/sports/baseball_mlb/odds/?regions=us&markets=h2h&dateFormat=iso&oddsFormat=decimal&apiKey=${apiKey}`;

document.getElementById("loadGamesBtn").addEventListener("click", () => {
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      displayGames(data);
      pickRandomGame(data);
    })
    .catch(err => {
      console.error("Error fetching game data:", err);
    });
});

function displayGames(games) {
  const gamesList = document.getElementById("gamesList");
  gamesList.innerHTML = "";

  games.forEach(game => {
    const div = document.createElement("div");
    div.textContent = `${game.home_team} vs ${game.away_team}`;
    gamesList.appendChild(div);
  });
}

function pickRandomGame(games) {
  if (games.length === 0) return;

  const randomIndex = Math.floor(Math.random() * games.length);
  const game = games[randomIndex];

  document.getElementById("randomGame").textContent = `${game.home_team} vs ${game.away_team}`;

  // Find odds
  const odds = game.bookmakers[0]?.markets[0]?.outcomes;
  if (odds) {
    const [team1, team2] = odds;
    const underdog = team1.price > team2.price ? team1 : team2;

    document.getElementById("underdogPick").textContent = `The underdog is: ${underdog.name} (Odds: ${underdog.price})`;
  } else {
    document.getElementById("underdogPick").textContent = "No odds available.";
  }
}
