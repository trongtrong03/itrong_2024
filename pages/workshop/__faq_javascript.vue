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
            <div class="accordin-item" :class="isActive==1001 ? 'is-active' : ''">
                <div class="accordin-title" @click="isActive = 1001;">
                    <p>Uncaught ReferenceError: dog is not defined.</p>
                </div>
                <div class="accordin-content">
                    <p>意思是變數 <em>dog</em> 沒有經過定義（宣告），檢查回傳錯誤的程式所呼叫的作用域內是否有宣告 <em>dog</em> 變數。</p>
                </div>
                <button class="accordin-close" @click="isActive = 0;"></button>
            </div>
            <div class="accordin-item" :class="isActive==1002 ? 'is-active' : ''">
                <div class="accordin-title" @click="isActive = 1002;">
                    <p>Uncaught ReferenceError: Cannot access 'dog' before initialization.</p>
                </div>
                <div class="accordin-content">
                    <p>這個問題通常發生在我們使用 <em>let</em>、<em>const</em> 宣告變數，但在該變數（例如 <em>dog</em>）宣告前我們就嘗試透過程式引用它，因而發生錯誤。</p>
                    <p>錯誤範例：</p>
                    <div class="text-code" v-pre>
                        <pre><code class="language-javascript">console.log(dog);
let dog = "阿比";</code></pre>
                    </div>
                    <p>正確範例：</p>
                    <div class="text-code" v-pre>
                        <pre><code class="language-javascript">let dog = "阿比";
console.log(dog);</code></pre>
                    </div>
                </div>
                <button class="accordin-close" @click="isActive = 0;"></button>
            </div>
            <div class="accordin-item" :class="isActive==1003 ? 'is-active' : ''">
                <div class="accordin-title" @click="isActive = 1003;">
                    <p>Uncaught SyntaxError: Identifier 'dog' has already been declared.</p>
                </div>
                <div class="accordin-content">
                    <p>意思是變數 <em>dog</em> 已經在相同作用域內被宣告過了，而現在又重複宣告了它。這項錯誤主要發生在我們用 <em>let</em>、<em>const</em> 關鍵字於同一個作用域範圍內宣告重複名稱的變數而產生。</p>
                    <p>錯誤範例：</p>
                    <div class="text-code" v-pre>
                        <pre><code class="language-javascript">function Animal() {
    let dog = "阿比";
    // ...其他程式
    let dog = "咪咪";    // &lt;-- 重複宣告相同的變數名而發生錯誤
}</code></pre>
                    </div>
                </div>
                <button class="accordin-close" @click="isActive = 0;"></button>
            </div>
            <div class="accordin-item" :class="isActive==1004 ? 'is-active' : ''">
                <div class="accordin-title" @click="isActive = 1004;">
                    <p>Missing initializer in const declaration.</p>
                </div>
                <div class="accordin-content">
                    <p>這個錯誤警示是在說宣告關鍵字 <em>const</em> 在宣告時缺少初始化程序，通常是當我們使用的 <em>const</em> 只有宣告變數名稱，而沒有賦值給它的情況產生的錯誤，因為 <em>const</em> 宣告的同時就必須指定它的值。</p>
                    <p>錯誤範例：</p>
                    <div class="text-code" v-pre>
                        <pre><code class="language-javascript">const dog;</code></pre>
                    </div>
                    <p>正確範例：</p>
                    <div class="text-code" v-pre>
                        <pre><code class="language-javascript">const dog = "阿比";</code></pre>
                    </div>
                </div>
                <button class="accordin-close" @click="isActive = 0;"></button>
            </div>
            <div class="accordin-item" :class="isActive==1005 ? 'is-active' : ''">
                <div class="accordin-title" @click="isActive = 1005;">
                    <p>Uncaught TypeError: Assignment to constant variable.</p>
                </div>
                <div class="accordin-content">
                    <p>意思是我們嘗試對一個透過 <em>const</em> 宣告的變數（<em>dog</em>）重新賦值給它，經由 <em>const</em> 宣告的變數又稱為常數，常數不能被重新賦值。</p>
                    <p>錯誤範例：</p>
                    <div class="text-code" v-pre>
                        <pre><code class="language-javascript">const dog = "阿比";
dog = "咪咪";    // &lt;-- 發生錯誤</code></pre>
                    </div>
                </div>
                <button class="accordin-close" @click="isActive = 0;"></button>
            </div>
            <div class="accordin-item" :class="isActive==1006 ? 'is-active' : ''">
                <div class="accordin-title" @click="isActive = 1006;">
                    <p>Uncaught SyntaxError: Unexpected token 'var'.</p>
                </div>
                <div class="accordin-content">
                    <p>此錯誤訊息是在告知我們在不允許的位置使用了 <em>var</em> 這個關鍵字。不只是 <em>var</em>，任何 JavaScript 存在的關鍵字（例如 <em>if</em>、<em>for</em>、<em>function</em>...）如果在不合乎規則的地方被使用，就會產生這個錯誤。</p>
                    <p>錯誤範例：</p>
                    <div class="text-code" v-pre>
                        <pre><code class="language-javascript">var var = "阿比";</code></pre>
                    </div>
                </div>
                <button class="accordin-close" @click="isActive = 0;"></button>
            </div>
            <div class="accordin-item" :class="isActive==1007 ? 'is-active' : ''">
                <div class="accordin-title" @click="isActive = 1007;">
                    <p>Uncaught SyntaxError: Unexpected number.</p>
                </div>
                <div class="accordin-content">
                    <p>此錯誤訊息通常發生在我們使用數字當作變數宣告命名的開頭。</p>
                    <p>錯誤範例：</p>
                    <div class="text-code" v-pre>
                        <pre><code class="language-javascript">var 9547 = "阿比";</code></pre>
                    </div>
                </div>
                <button class="accordin-close" @click="isActive = 0;"></button>
            </div>
            <div class="accordin-item" :class="isActive==1008 ? 'is-active' : ''">
                <div class="accordin-title" @click="isActive = 1008;">
                    <p>Uncaught SyntaxError: Invalid or unexpected token.</p>
                </div>
                <div class="accordin-content">
                    <p>這類錯誤訊息通常都是在說宣告的變數名稱中，包含不允許的字符或特殊符號。</p>
                    <p>錯誤範例：</p>
                    <div class="text-code" v-pre>
                        <pre><code class="language-javascript">var &dog = "阿比";    // Uncaught SyntaxError: Unexpected token '&'
var do@g = "阿比";    // Uncaught SyntaxError: Unexpected token 'do'
var dog# = "阿比";    // Uncaught SyntaxError: Invalid or unexpected token
var do.g = "阿比";    // Uncaught SyntaxError: Unexpected token 'do'
var d+o+g = "阿比";    // Uncaught SyntaxError: Unexpected token '+'</code></pre>
                    </div>
                </div>
                <button class="accordin-close" @click="isActive = 0;"></button>
            </div>
            
        </div>
    </div>
    <div class="text-block" id="act2">
        <h2>二、警告提示</h2>
        <div class="text-accordin is-warning">
        </div>
    </div>
    <div class="text-block" id="act3">
        <h2>三、問題集錦</h2>
        <div class="text-accordin is-others">
            <div class="accordin-item" :class="isActive==3001 ? 'is-active' : ''">
                <div class="accordin-title" @click="isActive = 3001;">
                    <p>介紹一些專有名詞以及其繁體、簡體中文的對應翻譯說法</p>
                </div>
                <div class="accordin-content">
                    <div class="text-flex">
                        <div class="f-width">
                            <div class="f-head">
                                <div class="f-f1">原詞</div>
                                <div class="f-f1">繁中</div>
                                <div class="f-f1">簡中</div>
                                <div class="f-f3">說明</div>
                            </div>
                            <div class="f-row">
                                <div class="f-f1">Scope</div>
                                <div class="f-f1">作用域</div>
                                <div class="f-f1">作用域 / 范围</div>
                                <div class="f-f3">
                                    <p>變數在程式中可以被存取的範圍，可分為區域變數，全域變數。</p>
                                </div>
                            </div>
                            <div class="f-row">
                                <div class="f-f1">Object</div>
                                <div class="f-f1">物件</div>
                                <div class="f-f1">对象</div>
                                <div class="f-f3">
                                    <p>物件是構成 Javascript 的基本要素之一，除了原始型別（數字、布林值、字串），其餘東西都是物件。</p>
                                </div>
                            </div>
                            <div class="f-row">
                                <div class="f-f1">Function</div>
                                <div class="f-f1">函數 / 函式</div>
                                <div class="f-f1">函数</div>
                                <div class="f-f3">
                                    <p>函式是構成 Javascript 的基本要素之一，它將一系列的敘述句組合起來，以執行一項特定的工作。</p>
                                </div>
                            </div>
                            <div class="f-row">
                                <div class="f-f1">Invoke / Call</div>
                                <div class="f-f1">呼叫</div>
                                <div class="f-f1">调用</div>
                                <div class="f-f3">
                                    <p>表示我們想「使用」函式時的一種動詞行為。</p>
                                </div>
                            </div>
                            <div class="f-row">
                                <div class="f-f1">Callback</div>
                                <div class="f-f1">回調函數 / 回調函式</div>
                                <div class="f-f1">回调</div>
                                <div class="f-f3">
                                    <p>通常指的是一個函式，該函式作為參數傳遞給另一個函式，並且在某個特定事件發生或異步操作完成時被調用。</p>
                                </div>
                            </div>
                            <div class="f-row">
                                <div class="f-f1">Closure</div>
                                <div class="f-f1">閉包</div>
                                <div class="f-f1">闭包</div>
                                <div class="f-f3">
                                    <p>指的是捕捉外部函式變數（或使之繼續存活）的函式，它包含了一個函式，以及函式被建立時所在的環境。</p>
                                </div>
                            </div>
                            <div class="f-row">
                                <div class="f-f1">Data</div>
                                <div class="f-f1">資料</div>
                                <div class="f-f1">数据</div>
                                <div class="f-f3">
                                    <p>通常是變數，指的是各種型別的資訊或資訊的集合，包含數字、字串、布林值、物件、陣列...等等。</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="accordin-close" @click="isActive = 0;"></button>
            </div>
            <div class="accordin-item" :class="isActive==3002 ? 'is-active' : ''">
                <div class="accordin-title" @click="isActive = 3002;">
                    <p>注意日期的格式</p>
                </div>
                <div class="accordin-content">
                    <p>如果不是直接使用 JavaScript 內建的時間格式，而是自行建立的時間物件，格式最好遵循 ISO 8601 格式，也就是 YYYY-MM-DD，盡量不要是其他寫法例如 YYYY.MM.DD 或 YYYY/MM/DD 之類的，因為這可能導致不同瀏覽器或裝置設備無法正確地作出解析，唯有 ISO 8601 是跨平台公認的標準格式。</p>
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