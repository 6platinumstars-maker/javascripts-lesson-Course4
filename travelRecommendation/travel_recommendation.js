// travel_recommendation.js

// JSONデータを保持する変数
let travelData = null;

// ------------------------
// 国ごとのタイムゾーン設定（Task 10）
// ------------------------
const countryTimeZones = {
  australia: "Australia/Sydney",
  japan: "Asia/Tokyo",
  brazil: "America/Sao_Paulo",
};

// 国名から現地時刻の文字列を返す
function getLocalTimeString(countryName) {
  if (!countryName) return null;
  const key = countryName.toLowerCase();
  const timeZone = countryTimeZones[key];

  if (!timeZone) return null;

  const options = {
    timeZone,
    hour12: true,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  return new Date().toLocaleTimeString("en-US", options);
}

// ------------------------
// JSONを読み込む（Task 6）
// ------------------------
async function loadTravelData() {
  try {
    const response = await fetch("travel_recommendation_api.json");
    if (!response.ok) {
      throw new Error("HTTP error! status: " + response.status);
    }

    travelData = await response.json();
    console.log("Travel data loaded:", travelData); // 動作確認用
  } catch (error) {
    console.error("Failed to load travel data:", error);
  }
}

// ------------------------
// 検索結果を画面に表示する関数
// ------------------------
function renderResults(places, keywordLabel, timeString) {
  const resultsContainer = document.getElementById("results");
  if (!resultsContainer) return;

  // 一度結果をクリア
  resultsContainer.innerHTML = "";

  if (!places || places.length === 0) {
    resultsContainer.innerHTML = `<p>No results found for "<strong>${keywordLabel}</strong>".</p>`;
    return;
  }

  // タイトル行
  const title = document.createElement("h2");
  title.textContent = `Results for "${keywordLabel}"`;
  resultsContainer.appendChild(title);

  // 国検索の場合、時間があれば表示
  if (timeString) {
    const timeP = document.createElement("p");
    timeP.innerHTML = `Current local time: <strong>${timeString}</strong>`;
    resultsContainer.appendChild(timeP);
  }

  // 少なくとも2件表示したい → 2件に制限
  const toShow = places.slice(0, 2);

  toShow.forEach((place) => {
    const card = document.createElement("div");
    card.className = "result-card";

    card.innerHTML = `
      <h3>${place.name}</h3>
      ${
        place.imageUrl
          ? `<img src="${place.imageUrl}" alt="${place.name}" style="max-width: 100%; border-radius: 8px; margin-bottom: 10px;" />`
          : ""
      }
      <p>${place.description || ""}</p>
    `;

    resultsContainer.appendChild(card);
  });
}

// ------------------------
// キーワード検索ロジック（Task 7, 8, 10）
// ------------------------
function handleSearch() {
  const input = document.getElementById("searchInput");
  if (!input) return;

  const rawKeyword = input.value.trim();
  if (!rawKeyword) {
    alert("Please enter a keyword (e.g. beach, temple, or a country name).");
    return;
  }

  const keyword = rawKeyword.toLowerCase();

  if (!travelData) {
    alert("Travel data is not loaded yet. Please try again in a moment.");
    return;
  }

  let results = [];
  let label = rawKeyword;
  let timeString = null; // Task 10 用

  // 1) beach, beaches, BEACH, Beach etc.
  if (keyword.includes("beach")) {
    results = travelData.beaches || [];
    label = "Beaches";
    // ビーチは国時間表示なし
  }
  // 2) temple, temples etc.
  else if (keyword.includes("temple")) {
    results = travelData.temples || [];
    label = "Temples";
    // 寺院も国時間表示なし
  }
  // 3) 国・都市検索
  else {
    const countries = travelData.countries || [];

    let matchedCountry = null;

    // まず国名（Australia, Japan, Brazil）で探す
    matchedCountry = countries.find((country) =>
      country.name && country.name.toLowerCase().includes(keyword)
    );

    // 国名で見つからない場合は都市名（Tokyo, Sydneyなど）で探す
    if (!matchedCountry) {
      countries.forEach((country) => {
        if (!Array.isArray(country.cities)) return;

        const hasMatchedCity = country.cities.some((city) =>
          city.name && city.name.toLowerCase().includes(keyword)
        );

        if (hasMatchedCity && !matchedCountry) {
          matchedCountry = country;
        }
      });
    }

    if (matchedCountry && Array.isArray(matchedCountry.cities)) {
      // 国の中の cities をおすすめとして表示
      results = matchedCountry.cities.map((city) => ({
        name: city.name,
        imageUrl: city.imageUrl,
        description: city.description,
      }));
      label = matchedCountry.name;

      // ★ 国時間の取得（Task 10）
      timeString = getLocalTimeString(matchedCountry.name);
    } else {
      results = [];
    }
  }

  // 結果を表示（国検索のときだけ timeString が表示される）
  renderResults(results, label, timeString);
}

// ------------------------
// Resetボタン（Task 9）
// ------------------------
function handleReset() {
  const input = document.getElementById("searchInput");
  const resultsContainer = document.getElementById("results");

  if (input) input.value = "";
  if (resultsContainer) resultsContainer.innerHTML = "";
}

// ------------------------
// ページ読み込み時の初期化
// ------------------------
document.addEventListener("DOMContentLoaded", () => {
  // JSONデータをロード
  loadTravelData();

  const searchBtn = document.getElementById("searchBtn");
  const resetBtn = document.getElementById("resetBtn");

  if (searchBtn) {
    searchBtn.addEventListener("click", handleSearch);
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", handleReset);
  }
});
