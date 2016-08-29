# bible-api

### API Reference

#### 一つの聖句を取得するには

パス：　`/api/:book/:chapter/:verse`

例：

```sh
$ curl http://localhost:3000/api/gen/1/1
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

パス：　`/api/:book/from/:fromChapter/:fromVerse/to/:toChapter/:toVerse`

例：

```sh
$ curl http://localhost:3000/api/gen/from/1/29/to/2/2
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
