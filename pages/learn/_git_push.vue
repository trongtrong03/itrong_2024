<script setup lang="ts">
    // layout
    definePageMeta({
        layout: false
    });

    // 目錄
    const catalog = reactive([
        { id: 0, title: '序、前言' },
        { id: 1, title: '一、remote' },
        { id: 2, title: '二、push' },
        { id: 3, title: '三、補充' },
        { id: 4, title: '四、參考資料' },
    ]);
</script>

<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="29" fileType="learnList" />
<!-- start -->
<div class="text-content">
    <div class="text-catalog">
        <ul>
            <li v-for="item in catalog" :key="item.id">
                <a :href="'#act' + item.id" v-text="item.title"></a>
            </li>
        </ul>
    </div>
    <div class="text-block" :id="'act' + catalog[0].id">
        <h2 v-text="catalog[0].title"></h2>
        <p>除了在本機端版控檔案外，同步推送到遠端儲存庫進行備份也是 Git 價值所在之一，本篇文章將來談談如何把自己電腦裡的專案備份到遠端儲存庫中，這裡主要會使用到兩種指令：<em>remote</em> 與 <em>push</em>，分別用來處理遠端的操作，以及將檔案推送至遠端儲存庫上。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[1].id">
        <h2 v-text="catalog[1].title"></h2>
        <p>在前一篇文章 <a href="git_github" target="_blank">Git 筆記（三）：使用 GitHub 建立遠端儲存庫（repository）</a> 裡，我們已透過 GitHub 建立帳戶並新增了一個可提供本機端 Git 專案進行遠端備份的遠端儲存庫，接下來我們將透過 <em>remote</em> 指令將這個遠端儲存庫與本機端欲同步備份的專案進行連結。</p>
        <figure>
            <img src="/images/learn/dev/git-github-4.jpg">
            <figcaption>於 GitHub 建立的全新遠端儲存庫。</figcaption>
        </figure>
        <p><br></p>
        <p>首先，我們可以先在專案 Git Bash 視窗中輸入以下指令：</p>
        <div class="text-code is-bash" v-pre>
            <div class="text-pre">
            <pre><code>$git remove -v</code></pre>
            </div>
            <button class="text-copy"><span></span></button>
        </div>
        <figure>
            <img src="/images/learn/dev/git-remote-1.jpg">
        </figure>
        <p>這個指令並非必要的流程，其目的是用來檢視目前所在專案版控資料中所有的遠端資料庫，由於目前這個專案還沒有添加任何遠端儲存庫，因此指令送出後得到的回饋是一片空白。</p>
        <p><br></p>
        <p>首次將專案與目的遠端儲存庫連結，我們得確認該遠端儲存庫的 HTTPS 網址或 SSH 金鑰，在 GitHub 中通常已顯示在指定遠端儲存庫頁面上且容易找到，本次練習我們以 HTTPS 的方式進行連結。</p>
        <figure>
            <img src="/images/learn/dev/git-remote-2.jpg">
        </figure>
        <p>複製其網址，並貼入到底下指令 URL 位置：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-git">$git remove add origin URL</code></pre>
        </div>
        <p>例如：</p>
        <figure>
            <img src="/images/learn/dev/git-remote-3.jpg">
        </figure>
        <p>再次輸入 <em>reomote -v</em> 指令，查看目前專案遠端儲存庫的資訊：</p>
        <figure>
            <img src="/images/learn/dev/git-remote-4.jpg">
        </figure>
        <p>可以發現指令返回的結果多了一筆我們從 GitHub 新增的遠端儲存庫，其主機名稱為「origin」。也就是說，原本 <em>remote add</em> 那一串指令裡有一個 <em>origin</em> 的字串，指的便是新增遠端儲存庫的主機名稱，這個名稱可以隨個人偏好或團隊要求而變更。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[2].id">
        <h2 v-text="catalog[2].title"></h2>
        <p>建立好遠端與本機端儲存庫的連結後，我們就可以將專案版控同步備份到遠端上了，其核心指令為 <em>push</em>，因此我們在看 Git 相關中文文件時，常常會看到作者將同步備份的行為稱作「推送」。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-git">$git push -u origin master</code></pre>
        </div>
        <p><em>origin</em> 指的是主機名稱，而 <em>master</em> 則是指 Git 版控樹狀節點結構中的主分支。如果嫌字太多麻煩，也可以用 <em>--all</em> 指令取代：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-git">$git push -all</code></pre>
        </div>
        <p>按下確認鍵，此時 GitHub 會要求使用者輸入他的帳號密碼，倘若資料皆正確便可成功執行推送。</p>
        <figure>
            <img src="/images/learn/dev/git-remote-5.jpg">
        </figure>
        <figure>
            <img src="/images/learn/dev/git-remote-6.jpg">
            <figcaption>推送成功。</figcaption>
        </figure>
        <blockquote class="is-warning">
            <p>自 2021 年 8 月 13 日起，GitHub 資安政策有了改變，HTTPS 不再支援密碼驗證的機制，使用者若要與遠端儲存庫進行推送、拉取動作，必須先向 GitHub 申請 Token。</p>
        </blockquote>
        <p><br></p>
        <figure>
            <img src="/images/learn/dev/git-remote-7.jpg">
        </figure>
        <p>返回 GitHub 遠端儲存庫的網頁，確認本機端的檔案已成功推送上去，如此便完成了本機端與遠端儲存庫的同步備份工作。</p>
        <p><br></p>
        <p>也許有些人會好奇或有需求：一個本機端版控的專案能否同時擁有多個遠端儲存庫？答案是可以的，添加指令一樣是透過 <em>remote add</em> 去執行，但要注意的是遠端主機名稱不能重複（假設專案連結的遠端儲存庫已存在 <em>origin</em> 的主機名稱，那你新增的名稱就不能叫做 <em>origin</em>），以下是增加多筆遠端儲存庫後的示範畫面：</p>
        <figure>
            <img src="/images/learn/dev/git-remote-8.jpg">
        </figure>
        <p>推送資料時再指定主機名稱對象即可，例如我要將檔案推送至 <em>origin2</em>，指令就這樣下：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-git">$git push -u origin2 master</code></pre>
        </div>
        <p>使用者可能以為 <em>push --all</em> 會將版控檔案推送到全部的遠端儲存庫，經實際測試後得到的結果並不然。<em>push --all</em> 指令會以前次使用者推送遠端儲存庫為依據執行推送。</p>
    </div>
    <div class="text-block" :id="'act' + catalog[3].id">
        <h2 v-text="catalog[3].title"></h2>
        <p>以下繼續補充一些有關遠端儲存庫的指令操作：</p>
        <p><br></p>
        <h3>顯示遠端儲存庫主機名稱：</h3>
        <div class="text-code" v-pre>
            <pre><code class="language-git">$git remote</code></pre>
        </div>
        <p><br></p>
        <h3>刪除遠端儲存庫：</h3>
        <div class="text-code" v-pre>
            <pre><code class="language-git">$git remote rm 名稱</code></pre>
        </div>
        <p>例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-git">$git remote rm origin</code></pre>
        </div>
        <p><br></p>
        <h3>更改遠端儲存庫主機名稱：</h3>
        <div class="text-code" v-pre>
            <pre><code class="language-git">$git remote rename 舊名 新名</code></pre>
        </div>
        <p>例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-git">$git remote rename origin2 itrong</code></pre>
        </div>
    </div>
    <div class="text-block" :id="'act' + catalog[4].id">
        <h2 v-text="catalog[4].title"></h2>
        <dl>
            <dd><a href="https://git-scm.com/" target="_blank">Git</a></dd>
            <dd><a href="https://github.com/" target="_blank">GitHub</a></dd>
        </dl>
    </div>
</div>
<!-- end -->
    </NuxtLayout>
</template>