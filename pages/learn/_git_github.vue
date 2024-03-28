<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="28" fileType="learnList" />
<!-- start -->
<div class="text-content">
    <div class="text-catalog">
        <ul>
            <li><a href="#act0">序、前言</a></li>
            <li><a href="#act1">一、建立流程</a></li>
            <li><a href="#act2">二、參考資料</a></li>
        </ul>
    </div>
    <div class="text-block" id="act0">
        <h2>序、前言</h2>
        <p>在上一章我們已經順利學會 Git 在本機端進行版本控制的方法，儘管已經可以對專案建立一套備份機制，但這也僅止於個人工作電腦內，一旦工作電腦損壞，所有版控都會連同專案檔案一同付諸東流。因此，除了將變更、維護後的專案定期提交到版本庫儲存之外，同時將檔案一併推送到遠端的儲存庫亦是分散式管理系統很重要的一環。有關本機端檔案推送（Push）的方式筆者將發表於下一篇學習筆記，為了讓之後遠端相關操作的練習得以更快速進行，遂決定先講講建立遠端儲存庫的方法。</p>
    </div>
    <div class="text-block" id="act1">
        <h2>一、建立流程</h2>
        <p>建立遠端儲存庫的平台或方法不少，本篇採用的對象是 <a href="https://github.com/" target="_blank">GitHub</a>──不單單只是一個透過 Git 進行版本控制的軟體原始碼代管服務，它同時也是一個被稱為開發者作品集的開源社群平台。如果你還沒有 GitHub 帳號，趕緊去辦理帳戶吧！註冊用戶之後，便可以開始進行遠端版本儲存庫的建置了。</p>
        <h6>1. 點選右上角工具列的「+」按鈕，選擇「New repository」</h6>
        <figure>
            <img src="/images/learn/dev/git-github-1.jpg">
        </figure>
        <p><br></p>
        <h6>2. 賦予此儲存庫（Repository）名稱</h6>
        <figure>
            <img src="/images/learn/dev/git-github-2.jpg">
        </figure>
        <p>「<b>Initialize this repository with a README</b>」此欄用意在於詢問是否要於儲存庫建立之後，一併建立一個「<b>README</b>」的文件。</p>
        <p><br></p>
        <h6>3. 按下「Create repository」完成創建</h6>
        <p>假設有勾選「<b>Initialize this repository with a README</b>」的話，你會看到你的儲存庫頁面是這樣子的畫面：</p>
        <figure>
            <img src="/images/learn/dev/git-github-3.jpg">
        </figure>
        <p><br></p>
        <p>如果沒有打勾，畫面則會是這個樣子的：</p>
        <figure>
            <img src="/images/learn/dev/git-github-4.jpg">
        </figure>
        <p>或許很多初學者會看到這些不知所云的程式碼便暈了一晌，但其實上面資訊只是在告訴使用者要如何將專案推送到這裡，並提供此儲存庫遠端連結及連線金鑰。</p>
        <p><br></p>
        <p>有關 GitHub 建立遠端儲存庫的流程就寫到這裡，本篇內容較短，與 Git 本身指令的操作也沒有直接關聯，若你或你的團隊已經有其他例如 GitLab 之類的遠端儲存庫，就可以直接忽略本篇內容。這篇主要重點在於取得一個遠端儲存庫的連結，以方便後續我們進行本機與遠端互動的練習。</p>
    </div>
    <div class="text-block" id="act2">
        <h2>二、參考資料</h2>
        <dl>
            <dd><a href="https://github.com/" target="_blank">GitHub</a></dd>
        </dl>
    </div>
</div>
<!-- end -->
    </NuxtLayout>
</template>

<script setup lang="ts">
    // layout
    definePageMeta({
        layout: false
    });
</script>
