# マッチングアプリ

## アプリケーションのイメージ
![matching-app](https://github.com/yuto-ueno/matching-app/assets/131337925/434b4670-f52a-47be-8f3a-a31f4455256d)

## 開発目的
**WEBアプリの仕組みの理解**  
自分が欲しいと思ったサービスを形として表現できることへの憧れを持った。
開発の第1歩の練習として作成している。

## 使用技術
<img src="https://img.shields.io/badge/-Node.js-000000.svg?logo=node.js&style=for-the-badge">
<img src="https://img.shields.io/badge/-React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
<img src="https://img.shields.io/badge/-Django-092E20.svg?logo=django&style=for-the-badge">
<img src="https://img.shields.io/badge/-Python-F2C63C.svg?logo=python&style=for-the-badge">

## ディレクトリ構造
```
matching-app
├─backend
│  ├─matchingappapi
│  │  ├─__init__.py
│  │  ├─asgi.py
│  │  ├─setting.py
│  │  ├─urls.py
│  │  └─wsgi.py
│  │
│  ├─myapp
│  │  ├─migrations
│  │  ├─__init__.py
│  │  ├─admin.py
│  │  ├─apps.py
│  │  ├─models.py
│  │  ├─serializers.py
│  │  ├─tests.py
│  │  ├─urls.py
│  │  └─views.py
│  ├─.env
│  ├─.gitignore
│  ├─db.sqlite3
│  └─manage.py
│
├─frontend
│    ├─node_modules
│    ├─public
│    ├─src
│    │  ├─components
│    │  ├─App.js    
│    │  └─index.js
│    ├─.gitignore
│    ├─package.json
│    └─package-lock.json
│  
└─README.md  
```

## 今後の展望
### 仕様面のアップデート
・出身学校の記入を選択形式に変える  
・接点のあるユーザーとだけマッチング

### 技術面のアップデート
・dockerを利用した開発  
・WEBアプリの公開

## 解説ブログ
詳細は以下の解説ブログをご参照ください
https://ueccchi.hatenablog.com/entry/2024/03/16/164510?_gl=1*1y779wt*_gcl_au*MjEyODc3NDk4LjE3MDM2OTI0NTA.
