# Marsiees Website (JP / EN)

マーシーズ株式会社のHPに、英語ページを追加したデモです。
今のHPのデザインはそのままに、ヘッダーの「JP / EN」で日本語と英語を切り替えられます。

## ページ構成

| URL | 内容 | 日本語側の対応ページ |
| --- | --- | --- |
| `/` | 日本語トップ（今のHPを再現） | ― |
| `/en/` | 英語トップ | `/` |
| `/en/services/` | サービス | `/service/` |
| `/en/pricing/` | 料金 | `/pricing/` |
| `/en/about/` | 会社概要 | `/about/` |
| `/en/contact/` | お問い合わせ | `/contact/` |

日本語側の下層ページは、今のHPの各ページにリンクしています。

## ファイル構成

```
index.html        日本語トップ
en/               英語ページ
css/style.css     日英共通のCSS
js/main.js        メニュー、スライド、フォームの入力チェック
images/           画像（WebP）
404.html          日英併記の404ページ
sitemap.xml       日英の対応つきサイトマップ
robots.txt
vercel.json       Vercel用の設定
```

## Vercel で見る

ビルドは不要です。

1. Vercel の「Add New → Project」からこのリポジトリを選ぶ
2. Framework Preset は「Other」のまま Deploy

`vercel.json` で `noindex` にしているので、確認用のURLは検索に出ません。

## 今のHP（WordPress）に組み込むとき

1. **英語ページの置き場所**
   `marsiees.com/en/` の下に置きます。
   別ドメインにするより、これまでのサイトの評価をそのまま活かせます。
2. **ヘッダーの言語切り替え**
   今のHPのヘッダーに「JP / EN」を追加します。CSSは `.lang` の部分をそのまま使えます。
3. **hreflang**
   日本語側の各ページの `<head>` にも、対応する英語ページとのペアを入れます。例：トップページ

   ```html
   <link rel="alternate" hreflang="ja" href="https://marsiees.com/">
   <link rel="alternate" hreflang="en" href="https://marsiees.com/en/">
   <link rel="alternate" hreflang="x-default" href="https://marsiees.com/">
   ```

4. **フォーム**
   `/en/contact/` のフォームは `action` が空で、今は送信されません（プレビューの案内が出ます）。
   今のHPのフォーム（Contact Form 7 など）につなぎます。
5. **公開時**
   `vercel.json` の `noindex` は確認用なので、本番では使いません。

## 確認が必要なこと

- 英語での対応範囲（「24時間以内に英語で返信」の文言）
- 英語の文章のネイティブチェック
- 取引先の英語表記（RISPO Inc. など）
- 会社概要に載せる項目（設立年・代表者名など）
