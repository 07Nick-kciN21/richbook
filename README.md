# richbook

## 專案結構

!["app 結構"](/public/app結構.png)

## 安裝

```
npn install
npm run dev
```

## 08/10

完成單筆資料上傳功能、點選月曆查看單日資料

## 08/11

優化`Date/Detail`與`Add`的呼應

> 當新增紀錄時，`Detail` 組件將自動刷新以顯示最新的資料。  
> 重構了`Add`表單中的 useState 使用方式，將所有輸入欄位整合到單一的 formData 狀態管理中

新增編輯資料功能

> `Edit`表單會與`Add`表單切換

## 08/12

完善`Edit`功能
完成刪除功能

## 08/15

資料儲存改用`indexedDB`，將`interface`拉出來放在一個目錄下

## 08/18

修改 db 資料結構，新增`totalCluster`，統計每日收入與支出總和。  
圖表分析頁面`MonthlySummary`開發

> 長條圖查看每日支出  
> 圓餅圖顯示各項支出占比與總和  
> 顯示每日記錄

## 08/20

新增記錄表單切換月份功能
