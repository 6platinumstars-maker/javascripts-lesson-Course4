// health_article.js

document.addEventListener('DOMContentLoaded', function () {
  var xhr = new XMLHttpRequest();
  var url = './health_article.json';

  xhr.open('GET', url, true);
  xhr.responseType = 'json';

  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 400) {
      var data = xhr.response;

      // JSONのトップレベルに "articles" 配列がある前提
      var articles = data.articles;
      var articlesDiv = document.getElementById('articles');

      articles.forEach(function (article) {
        var articleDiv = document.createElement('div');
        articleDiv.classList.add('article');

        // タイトル
        var title = document.createElement('h2');
        title.textContent = article.title;

        // 説明
        var description = document.createElement('p');
        description.textContent = article.description;

        // 達成方法
        var waysHeader = document.createElement('h3');
        waysHeader.textContent = '達成方法:';

        var waysList = document.createElement('ul');
        // ここで article.ways_to_achieve は **配列** である必要があります
        article.ways_to_achieve.forEach(function (way) {
          var listItem = document.createElement('li');
          listItem.textContent = way;
          waysList.appendChild(listItem);
        });

        // 利点
        var benefitsHeader = document.createElement('h3');
        benefitsHeader.textContent = '利点:';

        var benefitsList = document.createElement('ul');
        // ここで article.benefits も **配列**
        article.benefits.forEach(function (benefit) {
          var listItem = document.createElement('li');
          listItem.textContent = benefit;
          benefitsList.appendChild(listItem);
        });

        // articleDiv に要素を追加
        articleDiv.appendChild(title);
        articleDiv.appendChild(description);
        articleDiv.appendChild(waysHeader);
        articleDiv.appendChild(waysList);
        articleDiv.appendChild(benefitsHeader);
        articleDiv.appendChild(benefitsList);

        // 最後に articles のコンテナに追加
        articlesDiv.appendChild(articleDiv);
      });
    } else {
      console.error('JSONの読み込みに失敗しました。ステータス:', xhr.status);
    }
  };

  xhr.onerror = function () {
    console.error('リクエスト中にネットワークエラーが発生しました');
  };

  xhr.send();
});
