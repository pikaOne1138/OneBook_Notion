# Git 專案更新與協作指南 (含 Antigravity 輔助)

這份文件記錄了如何從頭開始建立專案，以及如何利用 AI 助手 (Antigravity) 協助您將 NotionNext 專案從原始作者 (upstream) 更新到最新版本。

## 1. 初始準備 (Initial Setup)

如果您是第一次接觸這個專案，請依照以下步驟操作：

### 步驟 A: Fork (在 GitHub 上)
1.  前往原始專案頁面 (例如 `tangly1024/NotionNext`)。
2.  點擊右上角的 **Fork** 按鈕。
3.  這會將整個專案複製一份到您自己的 GitHub 帳號下 (Origin)。

### 步驟 B: Clone (下載到本地)
將您 Fork 出來的專案下載到電腦上：

```bash
# 請將 URL 換成您自己的 GitHub 儲存庫網址
git clone https://github.com/您的帳號/OneBook_Notion.git
cd OneBook_Notion
```

---

## 2. 如何使用 Antigravity 協助更新

您不需要背下複雜的 Git 指令，可以直接請 Antigravity 幫您處理。

### 呼叫指令
您可以直接對我說：
> "幫我從上游更新專案，但保留我的設定"
> "Check for upstream updates and merge them"

### Antigravity 會幫您執行的工作
1.  **分析狀態**: 檢查您的 Git 設定與檔案狀態。
2.  **設定上游**: 自動連結原始作者的儲存庫。
3.  **執行合併**: 抓取最新程式碼並合併。
4.  **處理衝突**:
    *   如果遇到衝突，我會分析檔案。
    *   我會嘗試自動保留您的設定 (如 `config.js`)。
    *   如果無法決定，我會停下來請您手動檢查 (如本次的 `Footer.js`)。
5.  **完成更新**: 協助您提交 (Commit) 並推送到 GitHub (Push)。

---

## 3. 手動更新流程 (技術細節參考)

如果您想了解背後發生了什麼，或是想手動操作，流程如下：

### 3.1 設定上游 (Configure Remote)
```bash
git remote add upstream https://github.com/tangly1024/NotionNext.git
```

### 3.2 抓取更新 (Fetch)
```bash
git fetch upstream
```

### 3.3 合併更新 (Merge)
```bash
git merge upstream/main
```

### 3.4 解決衝突 (Resolve Conflicts)
當出現 `CONFLICT` 時：
1.  尋找 `<<<<<<< HEAD` (您的) 與 `>>>>>>> upstream/main` (新的)。
2.  決定保留哪部分。
3.  修正後執行：
    ```bash
    git add .
    git commit -m "Resolve merge conflicts"
    ```

### 3.5 更新與推送 (Update & Push)
```bash
npm install
git push origin main
```

### 3.6 檢查部署狀態 (Check Deployment)
推送到 GitHub 後，Vercel 會自動偵測變更並重新佈署。
1.  前往您的 Vercel Dashboard。
2.  檢查最新的 Deployment 狀態是否為 **Ready** (綠色)。
3.  如果顯示 **Error** (紅色)，請點擊進入查看 Build Logs 以確認錯誤原因。
