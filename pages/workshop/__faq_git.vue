<script setup lang="ts">
    // layout
    definePageMeta({
        layout: false
    });

    // 目錄
    const catalog = reactive([
        { id: 1, title: '一、錯誤訊息' },
        { id: 2, title: '二、警告提示' },
        { id: 3, title: '三、其他疑難雜症' },
    ]);

    // avtive
    const isActive = ref(0);
</script>

<template>
    <NuxtLayout name="workshop">
        <hgroup class="text-heading">
            <h1>Git 常見錯誤訊息問題、除錯建議以及各種疑難雜症彙整</h1>
        </hgroup>
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
        <div class="text-accordin is-error">
            <div class="accordin-item" :class="isActive==1001 ? 'is-active' : ''">
                <div class="accordin-title" @click="isActive = 1001;">
                    <p>error: Your local changes to the following files would be overwritten by checkout:...Please commit your changes or stash them before you switch branches.</p>
                </div>
                <div class="accordin-content">
                    <p>這個錯誤信息表示你在嘗試切換到 master 分支時，Git 發現你當前工作目錄中的一些文件有未提交的變更，而這些變更會在切換分支的過程中被覆蓋。為了保護你的未提交變更，Git 阻止了這次分支切換操作。以下有三種處理方案：</p>
                    <h5>1. 提交變更：</h5>
                    <p>如果你希望保留並提交這些變更，你可以將它們添加到暫存區並進行提交。</p>
                    <div class="text-code" v-pre>
                        <pre><code class="language-powershell">git add .
git commit -m "版本名稱"</code></pre>
                    </div>
                    <p>提交後就可以藉由 <em>git checkout master</em> 切換到主分支或其他分支。</p>
                    <p><br></p>
                    <h5>2. 暫存（stash）變更：</h5>
                    <p>如果你不想現在提交這些變更，但希望保留它們以便稍後使用，你可以使用 <em>git stash</em> 將它們存起來。</p>
                    <div class="text-code" v-pre>
                        <pre><code class="language-powershell">git stash</code></pre>
                    </div>
                    <p>這會保存你的工作目錄中的變更並允許你切換到 master 分支或其他分支。</p>
                    <p>後續當你想應用剛剛存起來的變更，可以在任何需要的分支上使用：</p>
                    <div class="text-code" v-pre>
                        <pre><code class="language-powershell">git stash apply</code></pre>
                    </div>
                    <p><br></p>
                    <h5>3. 放棄變更：</h5>
                    <p>如果你確定這些變更不需要保存，可以使用以下命令放棄它們：</p>
                    <div class="text-code" v-pre>
                        <pre><code class="language-powershell">git reset --hard</code></pre>
                    </div>
                    <p>這樣會放棄所有未提交的變更，然後你就可以切換到 master 或其他分支。</p>
                </div>
                <button class="accordin-close" @click="isActive = 0;"></button>
            </div>
        </div>
    </div>
    <div class="text-block" :id="'act' + catalog[1].id">
        <h2 v-text="catalog[1].title"></h2>
        <div class="text-accordin is-warning">
        </div>
    </div>
    <div class="text-block" :id="'act' + catalog[2].id">
        <h2 v-text="catalog[2].title"></h2>
        <div class="text-accordin is-others">
            <div class="accordin-item" :class="isActive==3001 ? 'is-active' : ''">
                <div class="accordin-title" @click="isActive = 3001;">
                    <p>如何捨棄本地 master 分支的更改，並強制更新成遠端 master 分支的最新版本？</p>
                </div>
                <div class="accordin-content">
                    <h6>1. 確保目前在 master 分支上：</h6>
                    <div class="text-code" v-pre>
                        <pre><code class="language-powershell">git checkout master</code></pre>
                    </div>
                    <h6>2. 從遠端獲取最新的分支訊息：</h6>
                    <div class="text-code" v-pre>
                        <pre><code class="language-powershell">git fetch origin</code></pre>
                    </div>
                    <h6>3. 重置本地 master 分支到遠端 master 分支：</h6>
                    <div class="text-code" v-pre>
                        <pre><code class="language-powershell">git reset --hard origin/master</code></pre>
                    </div>
                    <p>重置本地 master 分支，使其與遠端 master 分支完全一致，捨棄所有本地的更改。</p>
                </div>
                <button class="accordin-close" @click="isActive = 0;"></button>
            </div>
        </div>
    </div>
</div>
<!-- end -->
    </NuxtLayout>
</template>