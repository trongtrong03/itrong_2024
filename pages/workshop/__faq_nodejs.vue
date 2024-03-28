<template>
    <NuxtLayout name="workshop">
        <hgroup class="text-heading">
            <h1>Node.js 常見錯誤訊息問題、除錯建議以及各種疑難雜症彙整</h1>
        </hgroup>
<!-- start -->
<div class="text-content">
    <div class="text-catalog">
        <ul>
            <li><a href="#act1">一、錯誤訊息</a></li>
            <li><a href="#act2">二、警告提示</a></li>
            <li><a href="#act3">三、其他疑難雜症</a></li>
        </ul>
    </div>
    <div class="text-block" id="act1">
        <h2>一、錯誤訊息</h2>
        <div class="text-accordin is-error">
        </div>
    </div>
    <div class="text-block" id="act2">
        <h2>二、警告提示</h2>
        <div class="text-accordin is-warning">
        </div>
    </div>
    <div class="text-block" id="act3">
        <h2>三、其他疑難雜症</h2>
        <div class="text-accordin is-others">
            <div class="accordin-item" :class="isActive==3001 ? 'is-active' : ''">
                <div class="accordin-title" @click="isActive = 3001;">
                    <p>如何切換 Node 之間的版本？</p>
                </div>
                <div class="accordin-content">
                    <p>Node.js 迄今已進入 v20.x 版本，倘若我們時常將本機的 Node 更新到最新版本，有些早期開發的專案可能會因此無法順利執行編譯，假如我們希望電腦能兼容不同的全域版本，讓專案依據各自當時開發環境所使用的版本順利運行，我們可以使用一套名為「NVM」（Node Version Manager）的工具。NVM 是一個用來管理 Node.js 版本的指令工具，我們可以透過它安裝指定版本的 Node.js，並進行切換等管理行為。以下列出安裝及使用步驟：</p>
                    <h6>1. 下載 NVM 安裝程式並執行安裝：</h6>
                    <p>NVM（Windows）網址：<a href="https://github.com/coreybutler/nvm-windows" target="_blank">https://github.com/coreybutler/nvm-windows</a></p>
                    <p>在 README.md 中找到 NVM for Windows 裡面的 <a href="https://github.com/coreybutler/nvm-windows/releases" target="_blank">Download Now</a> 連結，點擊開啟，下載想要安裝的方式（例如 nvm-setup.exe ）並執行安裝。</p>
                    <p><br></p>
                    <h6>2. 開啟命令提示字元</h6>
                    <p>打開電腦的命令提示字元，輸入指令 <em>nvm -v</em> 確認 NVM 是否已成功安裝在電腦內。</p>
                    <p><br></p>
                    <h6>3. 安裝需要的 Node.js 版本</h6>
                    <p>我們可以透過 NVM 去安裝想要的 Node.js 版本，例如想要安裝 16.x 的版本，則輸入以下指令：</p>
                    <div class="text-code" v-pre>
                        <pre><code class="language-bash">nvm install 16</code></pre>
                    </div>
                    <p><br></p>
                    <h6>4. 切換指定的 Node.js 版本</h6>
                    <p>承襲上一步驟，安裝完 16.x 的 Node.js 版本後，我們可以透過下方指令進行版本上的切換：</p>
                    <div class="text-code" v-pre>
                        <pre><code class="language-bash">nvm use 16</code></pre>
                    </div>
                    <p>如此便會將目前作業系統裡的 Node.js 運行版本指定為 16.x 的版本，而我們也可以透過 <em>nvm list</em> 來查看目前電腦總共安裝了多少版本。</p>
                    <figure>
                        <img src="/images/learn/js/nodejs-faq-1.jpg">
                    </figure>
                    <p>例如我的電腦目前已經安裝 12、16、17、18 等版本，而由於稍早已將版本切換為 16，所以可以看到截圖裡 NVM 告知目前電腦使用的版本為 16。</p>
                    <p>或是我們也可以直接用 <em>node -v</em> 來確認電腦目前 Node.js 版本為多少。</p>
                </div>
                <button class="accordin-close" @click="isActive = 0;"></button>
            </div>
        </div>
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

    const isActive = ref(0);
</script>