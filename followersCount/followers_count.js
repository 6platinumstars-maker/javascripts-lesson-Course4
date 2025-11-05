let count = 0; // Initialize count to 0

function increaseCount() {
  count++; // カウントを1増やす
  displayCount(); // カウントを表示
  checkCountValue(); // カウントの値をチェックしてメッセージを表示
}

function ResetCount() {
    count = 0 ;
    displayCount(); // カウントを表示
}

function displayCount() {
document.getElementById('countDisplay').innerHTML=count; // HTMLにカウントを表示
}

function checkCountValue() {
  if (count === 10) {
    alert("あなたのInstagram投稿が10人のフォロワーを獲得しました!おめでとうございます!");
  } else if (count === 20) {
    alert("あなたのInstagram投稿が20人のフォロワーを獲得しました!その調子です!");
  }
}


