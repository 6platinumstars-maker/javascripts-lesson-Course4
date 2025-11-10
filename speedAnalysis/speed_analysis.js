let testText = "The quick brown fox jumps over the lazy dog.";
let startTime, endTime;

//1.テスト開始ボタンを押したときの関数
 function startTest() {
        // テストテキストを設定
        document.getElementById("inputText").value = testText;

        // ユーザー入力と出力をリセット
        let userInput = document.getElementById("userInput");
        userInput.value = "";
        userInput.readOnly = false;
        userInput.focus();

        document.getElementById("output").innerHTML = "";

        // タイマーを開始
        startTime = new Date().getTime();
        }

//2.テスト終了ボタンを押したときの関数
 function endTest() {
        endTime = new Date().getTime();

        // ユーザー入力を無効にする
        document.getElementById("userInput").readOnly = true;



        // 経過時間と分あたりの単語数 (WPM) を計算
        var timeElapsed = (endTime - startTime) / 1000; // 秒単位
        var userTypedText = document.getElementById("userInput").value;

        // 総文字数を計算
        var TypedTextlength = userTypedText.replace(/\s+/g, '').length;

        // 正しく単語をカウントするために正規表現を使用してテキストを分割
        var typedWords = userTypedText.split(/\s+/).filter(function (word) {
            return word !== "";
        }).length;

        var wpm = 0; // デフォルト値

        if (timeElapsed !== 0 && !isNaN(typedWords)) {
            wpm = Math.round((typedWords / timeElapsed) * 60);
        }

        // 結果を表示
        var outputDiv = document.getElementById("output");
        outputDiv.innerHTML = "<h2>タイピングテストの結果:</h2>" +
            "<p>総文字数: " + TypedTextlength + "</p>" +
            "<p>入力した単語数: " + typedWords + "</p>" +
            "<p>経過時間: " + timeElapsed.toFixed(2) + " 秒</p>" +
            "<p>分あたりの単語数 (WPM): " + wpm + "</p>";
            }