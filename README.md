# bible-api

### API Reference

#### 一つの聖句を取得するには

パス：　GET で `/:book/:chapter/:verse`

例：

```sh
$ curl http://localhost:3000/gen/1/1
{
  "key": "gen.1.1",
  "text": "はじめに神は天と地とを創造された。",
  "book": "創世記",
  "chapter": 1,
  "verse": 1
}
```

#### 一定の範囲の聖句をまとめて取得するには

同じ書内であればa章b節からx章y節までといった取得ができる。

パス：　GET で `/:book/from/:fromChapter/:fromVerse/to/:toChapter/:toVerse`

例：

```sh
$ curl http://localhost:3000/gen/from/1/29/to/2/2
[
  {
    "key": "Gen.1.29",
    "text": "神はまた言われた、「わたしは全地のおもてにある種をもつすべての草と、種のある実を結ぶすべての木とをあなたがたに与える。これはあなたがたの食物となるであろう。",
    "book": "創世記",
    "chapter": 1,
    "verse": 29
  },
  {
    "key": "Gen.1.30",
    "text": "また地のすべての獣、空のすべての鳥、地を這うすべてのもの、すなわち命あるものには、食物としてすべての青草を与える」。そのようになった。",
    "book": "創世記",
    "chapter": 1,
    "verse": 30
  },
  {
    "key": "Gen.1.31",
    "text": "神が造ったすべての物を見られたところ、それは、はなはだ良かった。夕となり、また朝となった。第六日である。",
    "book": "創世記",
    "chapter": 1,
    "verse": 31
  },
  {
    "key": "Gen.2.1",
    "text": "こうして天と地と、その万象とが完成した。",
    "book": "創世記",
    "chapter": 2,
    "verse": 1
  },
  {
    "key": "Gen.2.2",
    "text": "神は第七日にその作業を終えられた。すなわち、そのすべての作業を終って第七日に休まれた。",
    "book": "創世記",
    "chapter": 2,
    "verse": 2
  }
]
```

### 書名一覧

URL の :book 一覧。

| 書名 | 記号 |
|-----|-----|
| 創世記 | gen |
| 出エジプト記 | exod |
| レビ記 | lev |
| 民数記 | num |
| 申命記 | deut |
| ヨシュア記 | josh |
| 士師記 | judg |
| ルツ記 | ruth |
| サムエル記上 | 1sam |
| サムエル記下 | 2sam |
| 列王紀上 | 1kgs |
| 列王紀下 | 2kgs |
| 歴代志上 | 1chr |
| 歴代志下 | 2chr |
| エズラ記 | ezra |
| ネヘミヤ記 | neh |
| エステル記 | esth |
| ヨブ記 | job |
| 詩篇 | ps |
| 箴言 | prov |
| 伝道の書 | eccl |
| 雅歌 | song |
| イザヤ書 | isa |
| エレミヤ書 | jer |
| 哀歌 | lam |
| ダニエル書 | dan |
| エゼキエル書 | ezek |
| ホセア書 | hos |
| ヨエル書 | joel |
| アモス書 | amos |
| オバデヤ書 | obad |
| ヨナ書 | jonah |
| ミカ書 | mic |
| ナホム書 | nah |
| ハバクク書 | hab |
| ゼパニヤ書 | zeph |
| ハガイ書 | hag |
| ゼカリヤ書 | zech |
| マラキ書 | mal |
| マタイによる福音書 | matt |
| マルコによる福音書 | mark |
| ルカによる福音書 | luke |
| ヨハネによる福音書 | john |
| 使徒行伝 | acts |
| ローマ人への手紙 | rom |
| コリント人への第一の手紙 | 1cor |
| コリント人への第二の手紙 | 2cor |
| ガラテヤ人への手紙 | gal |
| エペソ人への手紙 | eph |
| ピリピ人への手紙 | phil |
| コロサイ人への手紙 | col |
| テサロニケ人への第一の手紙 | 1thess |
| テサロニケ人への第二の手紙 | 2thess |
| テモテヘの第一の手紙 | 1tim |
| テモテヘの第二の手紙 | 2tim |
| テトスヘの手紙 | titus |
| ピレモンヘの手紙 | phlm |
| ヘブル人への手紙 | heb |
| ヤコブの手紙 | jas |
| ペテロの第一の手紙 | 1pet |
| ペテロの第二の手紙 | 2pet |
| ヨハネの第一の手紙 | 1john |
| ヨハネの第二の手紙 | 2john |
| ヨハネの第三の手紙 | 3john |
| ユダの手紙 | jude |
| ヨハネの黙示録 | rev |

### ローカルでビルド

`git clone` してから MySQL の Docker コンテナを用意して `npm start` する。

#### 0. 前提

+ Node.js >= 6
+ docker コマンドを使えること

#### 1. MySQL の Docker コンテナ準備。

最初に env/index.js の MYSQL_ROOT_PASSWORD を適当に変えておく。Docker のイメージをビルドしてコンテナを走らせるには、以下を実行すれば良い。

```
$ ./ci/build-db.js
...(略)...
Successfully built 9cbbc1b4880f

$ ./ci/run-db.js
...(略)...
333c404ec801d7638c4b2d60aa1d6567ef8b2e51a76f1902ebd61b398f751a5c

# run-db.sh が成功するとバックグラウンドで数十秒間 MySQL の初期化処理が行われる
# ログを見るには
$ docker logs bible-api-db
...(略)...
# 以下が表示されていれば初期化完了
MySQL init process done. Ready for start up.
```

Docker コンテナの終了などは普通に `docker stop bible-api-db`, `docker rm bible-api-db` など適当に。

#### 2. テストを走らせる

```
$ npm test
```

テストが通ることを確認してください。

### 3. アプリの起動

```
$ npm start
```

ブラウザから `http://localhost:3000/gen/1/1` を開いて創世記1章1節の JSON が表示されれば勝ち。
