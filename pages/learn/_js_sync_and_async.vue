<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="55" fileType="learnList" />
<!-- start -->
<div class="text-content">
    <div class="text-catalog">
        <ul>
            <li><a href="#act0">序、前言</a></li>
            <li><a href="#act1">一、Synchronous（同步）</a></li>
            <li><a href="#act2">二、Asynchronous（非同步）</a></li>
            <li><a href="#act3">三、為什麼需要非同步？</a></li>
            <li><a href="#act4">四、JavaScript 的非同步處裡</a></li>
            <li><a href="#act5">五、阻塞與非阻塞</a></li>
            <li><a href="#act6">六、參考資料</a></li>
        </ul>
    </div>
    <div class="text-block" id="act0">
        <h2>序、前言</h2>
        <p>我們對於「同步」定義的理解，通常是指「同時進行一或多件事情」，或者說「不同事件進行的步調協同一致」，但是在電腦科學領域則不然──同步行為「一次只會做一件事情，做完才繼續做下一件事」；而非同步概念則相反，它可以「同時做很多事情，且不需要等前面的事情完成」。而對 JavaScript 來說，它是一種「單執行緒」（Single-Thread）的程式語言，意思就是程式碼是依序逐一執行的，如果安排很多事件請它執行，後面的事情得等前面事情做完才會被輪到去做，這就是同步的定義：一次只會執行一件事情。</p>
        <p>儘管 JavaScript 係屬單執行緒模式，不過實際上它仍然可以進行非同步處理事件，至於具體是怎麼做到的？為什麼需要非同步？以下將通過同步與非同步的詳細介紹，一一揭開這些謎題的面紗。</p>
    </div>
    <div class="text-block" id="act1">
        <h2>一、Synchronous（同步）</h2>
        <p>電腦程式語言的同步，通常指的是「一次只會做一件事情，做完才繼續做下一件事」，若要打個比方，我們以下用炸雞店作業流程舉例：假設炸雞店只有一名員工，顧客甲點完餐點後，員工開始烹炸，等餐點做完並交給顧客甲後，才會繼續服務顧客乙，點餐、做餐、交餐、下一位...然後重複一樣的流程──後面的顧客永遠不會比前面顧客早拿到自己點的餐點。</p>
        <p>看完上面例子，我們接著來觀察單執行緒的 JavaScript 是如何運行的，以下是範例程式碼片段：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">console.log("執行A任務");
for(let i = 1; i &lt;= 3; i++){
    console.log("執行B" + i + "任務");
}
console.log("執行C任務");
console.log("執行D任務");</code></pre>
        </div>
        <p><em>console</em> 實際輸出的結果：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">"執行A任務"
"執行B1任務"
"執行B2任務"
"執行B3任務"
"執行C任務"
"執行D任務"</code></pre>
        </div>
        <p>如果要用一張圖表示，同步的處理流程會是這樣子的：</p>
        <figure>
            <img src="/images/learn/js/learn-saa-1.jpg">
        </figure>
        <p>不難看出同步處理每一個任務事件都是前面的完成後才會接著去做後面的事件，圖示中特意為每一個任務事件加上耗費時間，以方便後續與「非同步」做比較。</p>
    </div>
    <div class="text-block" id="act2">
        <h2>二、Asynchronous（非同步）</h2>
        <p>非同步，顧名思義就是同步的相反，如果說同步一時間只能做一件事情，那麼非同步不僅能同時做很多事情，而且後面的事情也不用非得等待前面事件完成才能開始執行。</p>
        <p>我們同樣以炸雞店作舉例：當店員接收到顧客甲的訂單後開始進行烹炸，在同步定義下，顧客乙必須等待顧客甲的訂單完成並交餐後才能換他開始點餐。然而如果是非同步行為模式，店員把顧客甲的炸物投入油鍋，烹炸等待的空檔就能回到櫃台，接受顧客乙的點單作業。假設顧客乙的炸物也下鍋但顧客甲的炸物尚未完成，店員便能趁這段空窗期再接著顧客丙、丁、戊......的訂單，直到顧客甲的餐點完成再呼叫顧客甲來索取。</p>
        <p>假設顧客丙的訂單很簡單，興許就只單純買杯冷飲，於是店員收到訂單後立即把飲料盛裝交付給顧客丙，那麼他的訂單就會比顧客甲與顧客乙還早完成。如此一來，炸雞店工作效率不但顯著提升，顧客也不需要非得等候前面的餐點完成才能輪到他們的訂單。</p>
        <p>我們來看程式碼實際演練的部份，由於 JavaScript 單執行緒的特性，本身並沒有提供非同步的語法定義，不過我們可以藉由 Web APIs 的 <em>setTimeout()</em> 方法來達成非同步的目的。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">console.log("執行A任務");
setTimeout(function () {
    for(let i = 1; i &lt;= 3; i++){
        console.log("執行B" + i + "任務");
    }
},0);
console.log("執行C任務");
console.log("執行D任務");</code></pre>
        </div>
        <p><em>console</em> 實際輸出的結果：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">"執行A任務"
"執行C任務"
"執行D任務"
"執行B1任務"
"執行B2任務"
"執行B3任務"</code></pre>
        </div>
        <p>我們可以看到一個有趣的現象，<em>setTimeout()</em> 方法中最後面的參數 <em>0</em>，表示瀏覽器 Timer 等候的時間，即便設定為 <em>0</em> 秒，它裡頭事件也是排在任務 C 和 D 之後才完成，這不單意味著 <em>setTimeout()</em> 本身屬於非同步機制，同時也代表當 <em>setTimeout()</em> 的 Timer 等候結束被觸發後，裡頭的 B 任務才會「Callback」排入 JavaScript 執行序列中，等待前面事件輪循到它時再執行。</p>
        <blockquote>
            <p><em>setTimeout()</em> 裡面的函式也可稱為「回呼函式」（Callback Function）。</p>
        </blockquote>
        <p>至於非同步的圖解長這樣：</p>
        <figure>
            <img src="/images/learn/js/learn-saa-2.jpg">
        </figure>
        <p>配合前面同步的圖一起看，你會發現任務數數量相同、各別執行時間也相同，但非同步的處理時間卻遠比同步還來的快。這也是為什麼 JavaScript 沒有非同步機制，我們仍需要透過非同步去處理一些特定狀況事件的原因之一。</p>
    </div>
    <div class="text-block" id="act3">
        <h2>三、為什麼需要非同步？</h2>
        <p>試想倘若我們都不導入非同步處理的用法到 JavaScript，單單只有同步機制的話會發什麼事？</p>
        <figure>
            <img src="/images/learn/js/learn-saa-1.jpg">
        </figure>
        <p>回顧同步的示意圖，假設這五個任務是 JavaScript 載入網頁時要做的五件事情，這些事件指令要全部完成，使用者才能對網頁進行動作，換言之，在使用者得以開始操作網頁前，必須要先等候 37 秒，而這還不包含其他外部因素，也許實際等待時間會更長。實務上當然不可能讓使用者空等這麼久，所以才需要非同步處理那些像是向後端伺服器請求與回應這類需要等候且相對較耗時的指令，在他們執行過程同時，JavaScript 也能同步處理其他任務。</p>
    </div>
    <div class="text-block" id="act4">
        <h2>四、JavaScript 的非同步處裡</h2>
        <p>縱使前面已經繁複提及許多遍，但這裡還是要再次強調，JavaScript 屬於單執行緒（Single-Thread）程式語言，所以我們所熟知的那些非同步方法，皆非來自 JavaScript 本身的方法。由於 JavaScript 基本是在瀏覽器內運行的，而瀏覽器本身提供許多 Web APIs，其中包含數種被定義為非同步的處理方法，JavaScript 可以藉由與瀏覽器 Web APIs 的交互行為，實現非同步的事件處理。</p>
        <p>那麼非同步處理的 Web APIs 方法有哪些？以下列出一些常見的語法：</p>
        <p><br></p>
        <h3>1. setTimeout、setInterval：</h3>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var timeoutID = window.setTimeout(( () => console.log("Hello!") ), 3000);
var timeoutID = window.setInterval(( () => console.log("Hello!") ), 3000);</code></pre>
        </div>
        <p><em>setTimeout</em> 與 <em>setInterval</em> 都是瀏覽器的計時器方法，JavaScript 將事件塞到計時器方法中讓瀏覽器進行計數，等計時秒數到了再將事件回傳至 JavaScript 任務序列裡排隊執行。</p>
        <p><em>setTimeout</em> 和 <em>setInterval</em> 差別在於前者只會在計時到點時執行一次，而後者則是會在設定的計時時間不斷循環去做，例如我們設定參數為 3000（三秒），則每三秒就會執行一次 <em>setInterval</em> 裡面的函式。</p>
        <p><br></p>
        <h3>2. XMLHttpRequest：</h3>
        <p><em>XmlHttpRequest</em> 又叫做 XHR，最早原是 IE5 以 ActiveX 元件的形式實現的內建物件，儘管除了 IE 以外的其他瀏覽器將其視為本地的 JavaScript 物件，各大瀏覽器也皆相容並予以支援。XHR 主要用來存取伺服器端的資料，我們可以在以不重新整理頁面為前提下，直接透過指定的 URL 進行資料交換。雖然我們現在可能比較少看到 XHR，然而有一個著名的非同步處理技術仍大量使用它，那就是 AJAX。事實上，AJAX 全名 Asynchronous JavaScript And XML，就同時包含了 Asynchronous（非同步）與 XML（<em>XmlHttpRequest</em>）等詞意。</p>
        <p>建立 <em>XMLHttpRequest</em> 物件的基本語法：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var xhr = new XMLHttpRequest ();</code></pre>
        </div>
        <p><br></p>
        <h3>3. Fetch API：</h3>
        <p>Fetch API 也是 Web APIs 底下一種新標準，屬於 HTML5 的一部份。它和 <em>XmlHttpRequest</em> 有些相似，不過與其相比，Fetch API 提供了更強大且更具彈性的功能。</p>
        <p>Fetch API 的核心方法為 <em>fetch()</em>，其最大特點為使用 Promise 物件而不使用回呼函式（Callback Function），大幅度簡化了程式碼。它的基本結構為：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">fetch(url)
  .then( ... )
  .catch( ... )</code></pre>
        </div>
        <p>舉一個從伺服器端取得 JSON 資料的簡單範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">fetch('https://example.com/users/data')
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(err => console.log('Request Failed', err));</code></pre>
        </div>
        <p>當我們在 JavaScript 使用 <em>fetch()</em> 傳入一段 URL，瀏覽器會返回一個 Promise 物件，接著我們就需要再透過 <em>then()</em> 去取得 Promise 裡面的資料。至於 <em>catch()</em> 則是用於得不到回應時的錯誤應對。</p>
        <p><br></p>
        <h3>4. Promise：</h3>
        <p>在前面 Fetch API 裡有提到 Promise 這個東西，有別於 AJAX 是屬於透過 JavaScript 與 Web APIs 結合的一種技術，<em>promise</em> 則是 JavaScript ES6 新增的其中一個物件，雖說兩者都專門用來處理非同步行為，但本質上並不相同。其實也正是為了改善 JavaScript 屬於同步執行指令的單執行緒程式語言，ES6 才會特意新增 Promise 這個方法來應對非同步行為的需求。</p>
        <p>以下是 <em>promise</em> 基本的語法結構：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">const promise = new Promise(function(resolve, reject) {
    // 成功時
    resolve(value)
    // 失敗時
    reject(reason)
});

promise.then(
    function(value) {
        // on fulfillment（已實現時）
    },
    function(reason) {
        // on rejection（已拒絕時）
    }
)</code></pre>
        </div>
        <p>一個 Promise 可以處於以下三種狀態之一：</p>
        <ul>
            <li>Pending（待定）：初始狀態，當 Promise 被建立但尚未被解決（完成或拒絕）時。</li>
            <li>Fulfilled（已完成）：表示操作成功完成。</li>
            <li>Rejected（已拒絕）：表示操作失敗。</li>
        </ul>
        <p>當 Promise 被解決時，它將返回一個值（對於已完成狀態）或一個錯誤（對於已拒絕狀態）。</p>
        <p>以下是 一個 Promise 的基本使用示範：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">// 建立一個 Promise
let myPromise = new Promise((resolve, reject) => {
    // 一些非同步操作，例如從伺服器取得資料

    // 假設這裡的非同步操作成功完成
    let success = true;

    if (success) {
        // 成功時，呼叫 resolve，將結果傳遞給 then 方法
        resolve("操作成功");
    } else {
        // 失敗時，呼叫 reject，將錯誤傳遞給 catch 方法
        reject("操作失敗");
    }
});

// 使用 Promise
myPromise.then((result) => {
    // 操作成功時的處理邏輯
    console.log(result); // 輸出："操作成功"
}).catch((error) => {
    // 操作失敗時的處理邏輯
    console.error(error); // 輸出："操作失敗"
});</code></pre>
        </div>
        <p>在此範例中，當 myPromise 被建立時，它處於待定狀態。根據非同步操作的結果，它將解決為已完成狀態（使用 <em>resolve</em>）或已拒絕狀態（使用 <em>reject</em>）。接著，我們使用 <em>then</em> 方法來處理操作成功的情況，使用 <em>catch</em> 方法來處理操作失敗的情況。</p>
    </div>
    <div class="text-block" id="act5">
        <h2>五、阻塞與非阻塞</h2>
        <p>最後稍微談談阻塞（blocking）與非阻塞（non-blocking），它們的概念並不難理解，如果以本文舉的炸雞店案例來看，阻塞與非阻塞其實就是以顧客的角度來看待店員同步與非同步的行為模式。假如顧客甲點完餐到店員出餐的過程，除了等待不能有其他動作，這就是阻塞；但如果在店員處理訂單的期間，顧客可以去做其他事情（例如滑滑手機，或去隔壁買別的東西），等到店員呼叫後再回來拿餐點，這就是非阻塞。</p>
        <p>對 JavaScript 來說，阻塞代表程式執行時，會卡在當下正在處理的事件，直到結果產生，才會繼續進行下一個事件。而非阻塞則代表程式不會卡在當下正在執行的事件，當下事件的結果也不會馬上回傳給程式，而是需要回呼函式來接收結果。</p>
        <blockquote>
            <p>在很多JavaScript 文章裡，同步與阻塞通常會劃上等號，非同步則與非阻塞相當。</p>
        </blockquote>
    </div>
    <div class="text-block" id="act6">
        <h2>六、參考資料</h2>
        <dl>
            <dd><a href="https://blog.huli.tw/2019/10/04/javascript-async-sync-and-callback/#sync" target="_blank">JavaScript 中的同步與非同步（上）：先成為 callback 大師吧！</a></dd>
            <dd><a href="https://shawnlin0201.github.io/JavaScript/JavaScript-synchronous-and-asynchronous/" target="_blank">JavaScript 深入淺出 Synchronous & Asynchronous 同步與非同步</a></dd>
            <dd><a href="https://medium.com/@mts40110/js-%E5%90%8C%E6%AD%A5-%E7%95%B0%E6%AD%A5-%E9%98%BB%E5%A1%9E-%E9%9D%9E%E9%98%BB%E5%A1%9E-29e1e1c0193e" target="_blank">JS 同步、異步、阻塞、非阻塞</a></dd>
            <dd><a href="https://medium.com/itsems-frontend/javascript-sync-async-22e75e1ca1dc" target="_blank">[JavaScript] 一次搞懂同步與非同步的一切：一次做幾件事情 — 同步(Sync)與非同步(Async)</a></dd>
            <dd><a href="https://www.casper.tw/development/2020/02/16/all-new-promise/" target="_blank">JavaScript Promise 全介紹</a></dd>
            <dd><a href="https://www.ithome.com.tw/node/74544" target="_blank">程式設計該同步還是非同步？</a></dd>
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