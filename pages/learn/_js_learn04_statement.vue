<template>
    <NuxtLayout name="article">
        <TempArticle :propValue="48" fileType="learnList" />
<!-- start -->
<div class="text-content">
    <div class="text-catalog">
        <ul>
            <li><a href="#act0">序、前言</a></li>
            <li><a href="#act1">一、條件敘述句</a></li>
            <li><a href="#act2">二、迴圈敘述句</a></li>
            <li><a href="#act3">三、跳躍敘述句</a></li>
            <li><a href="#act4">四、例外處理</a></li>
            <li><a href="#act5">五、總結</a></li>
            <li><a href="#act6">六、參考資料</a></li>
        </ul>
    </div>
    <div class="text-block" id="act0">
        <h2>序、前言</h2>
        <p>程式腳本的每一句指令都可以稱為敘述句（Statement），用來驅使電腦執行我們寫下的規則。一句完整的敘述句會以分號 <em>;</em> 作為結尾，向 JavaScript 表示一段可執行運算的程式。根據這個定義，我們回首複習一下變數是如何做宣告的：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var price = 20;</code></pre>
        </div>
        <p>變數宣告後以 <em>;</em> 分號結尾，沒錯，宣告變數的行為就是一句敘述句。當然啦，不是所有敘述句都這麼單純，不同的需求、不同的邏輯，敘述句的複雜程度也不一樣，有時甚至會結合多個敘述句使其成為一段複合敘述句，而通常這些敘述句逐句讀下來可以發現彼此互有關連，那麼我們就需要將它們群組起來以便識別，這個群組稱為「程式區塊」（Code Block）。</p>
        <p>範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function demo() {
    var name = 'iTrong';
    console.log(name);
}</code></pre>
        </div>
        <p>由一對大括號（或稱花括號）<em>{ }</em> 標示的區塊即為程式區塊，一個程式區塊內可包含一或多個敘述句。此外，程式區塊結尾不需要加上分號。</p>
        <p>有了 <em>;</em> 與 <em>{ }</em> 在程式碼代表意義的認知後，接下來學習各種類型的敘述句表現手法，應該會相對容易閱讀許多。大體而言，敘述句的種類可區分為四種：條件敘述句、迴圈敘述句、跳躍敘述句，以及例外處理。</p>
    </div>
    <div class="text-block" id="act1">
        <h2>一、條件敘述句</h2>
        <p>條件敘述句的語法有兩種：<em>if</em> 與 <em>switch</em>。</p>
        <p><br></p>
        <h3>if：</h3>
        <p>語法格式：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">if (condition) {
    statement;
}</code></pre>
        </div>
        <p>或</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">if (condition) {
    statement1;
}
else {
    statement2;
}</code></pre>
        </div>
        <p><em>if</em> 是很常見的條件判斷式敘述句，基本上會搭配 <em>else</em>，表示「如果符合 <em>if</em> 的條件則執行其指令，若不是則執行 <em>else</em> 裡的指令」的概念。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var a = 5;
var b = 3;

if (a > b) {
    console.log("a 比 b 大");
}
else {
    console.log("a 比 b 小");
}

// a 比 b 大</code></pre>
        </div>
        <p>在上例中我們宣告了變數 <em>a</em> 與 <em>b</em>，並分別指定它們的值為 <em>5</em> 與 <em>3</em>。條件式的程式區塊判斷規則為：如果 <em>a</em> 大於 <em>b</em>，則文件寫下「a 比 b 大」的結果，否則輸出「a 比 b 小」。程式執行判斷時，會判讀小括號 <em>( )</em> 裡的條件是否與變數吻合，若相同則執行寫在它程式區塊裡的敘述句，若不相同則不執行。實際判斷結果 <em>a</em> 數值大於 <em>b</em>，所以程式執行 <em>if</em> 裡的指令。</p>
        <p>儘管這個範例的判斷式乍看之下沒有問題，但其實存在很大的瑕疵──沒有考慮到兩者數值相等的可能性，假設今天我們把 <em>a</em> 的數值改成 <em>3</em>，試問會發生什麼情況？</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var a = 5;
var b = 5;

if (a > b) {
    console.log("a 比 b 大");
}
else {
    console.log("a 比 b 小");
}

// a 比 b 小</code></pre>
        </div>
        <p>答對了嗎？畫面最後顯示的結果是「a 比 b 小」。其實程式判定並沒有錯，因為條件式的規則只有定義兩種結果，要嘛 a 大於 b，要嘛「其他」，這個其他同時包含了「a 小於 b」以及「a 等於 b」兩種可能，如果我們要使條件式符合邏輯，最簡單的方法就是將 <em>else</em> 的敘述句結果修改為「a 不比 b 小」，或是「a 小於等於 b」，但這些都是治標不治本的處理方式（除非，你希望等於與小於的條件式是相同的），比較好的方式仍是將兩者數字相等的判斷邏輯自成一格。有些剛開始學程式的人會以為 <em>if</em>、<em>else</em> 只能設定兩種條件，實則不然，<em>if</em> 條件式可同時設定多筆條件，初始條件使用 <em>if</em>，其他條件使用 <em>else if</em>，最終條件（或稱非以上條件的結果）使用 <em>else</em>。</p>
        <p>我們可以將剛才的範例條件式改寫成如下：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">if (a > b) {
    console.log("a 比 b 大");
}
else if (a = b) {
    console.log("a 等於 b");
}
else {
    console.log("a 比 b 小");
}</code></pre>
        </div>
        <p>如此一來，當 <em>a</em> 與 <em>b</em> 數值相等的情況下進入條件式判斷，就能正確輸出「a 等於 b」的結果了。</p>
        <p><br></p>
        <h3>switch：</h3>
        <p>語法格式：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">switch (condition) {
    case value1:
        statement1;
        break;
    
    case value2:
        statement2;
        break;
    
    case valueN:
        statementN;
        break;
    
    default:
        statement;
        break;
}</code></pre>
        </div>
        <p>當我們使用 <em>if</em> 處理超過一個以上的判斷條件式，可以使用 <em>else if</em>，除此之外還有另一種語法，那就是 <em>switch</em>。<em>switch</em> 適用場合多在進行多項條件且規則類似的條件判斷。每一句 <em>case</em> 都代表一個條件，<em>default</em> 則表示預設（或不符合以上條件）的條件。至於 <em>break</em>，它代表的是一種跳出的概念，如果程式讀取到相符的條件，就會停止讀取後方的程式碼。</p>
        <p>假設現在要寫一個判斷函式傳入的值是什麼顏色的條件式，我們可以這樣寫：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function checkColor(e){
    var color = e;
    switch(color){
        case "red":
            console.log("紅色");
            break;

        case "green":
            console.log("綠色");
            break;

        case "blue":
            console.log("藍色");
            break;

        default:
            console.log("不是三原色");
            break;
    }
}

checkColor("blue");    // 藍色</code></pre>
        </div>
        <p><em>switch</em> 與 <em>if</em> 條件的差別在於前者會只讀取跟參數相符條件式裡的敘述句；而後者則讀取所有條件與其敘述句，效能消耗較 <em>switch</em> 來得多，渲染就會比較慢。</p>
    </div>
    <div class="text-block" id="act2">
        <h2>二、迴圈敘述句</h2>
        <p>當我們想重複執行某件事情（敘述句）十遍，直覺想到的可能是直接在編輯器裡面輸入十次內容，例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">console.log("1");
console.log("2");
console.log("3");
console.log("4");
console.log("5");
console.log("6");
console.log("7");
console.log("8");
console.log("9");
console.log("10");</code></pre>
        </div>
        <p>雖然程式依然能跑出我們要的結果，但這種作法既浪費效能，看起來也很不專業，是那種令明眼工程師啞然的程度。但如果使用迴圈那就不一樣了，不僅將要重複執行多次的敘述句大幅輕量化，整體程式碼也變得簡潔乾淨，儘管迴圈在資深工程師的眼裡依然是很基本的概念，但起碼菜味已經沒有那麼濃郁。在 JavaScript 世界裡，有關迴圈敘述句的語法有兩種：<em>for</em> 與 <em>while</em>。</p>
        <p><br></p>
        <h3>for：</h3>
        <p>語法格式：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">for ([initialExpression]; [condition]; [incrementExpression]) {
    statement;
}</code></pre>
        </div>
        <p>在 <em>for</em> 迴圈裡，通常以計數器作為條件，以決定迴圈要運行的次數。我們直接沿用前面的例子，如果要用 <em>for</em> 迴圈表示的話，程式碼為下：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">for(var i = 1; i &lt;= 10; i++){
    console.log(i);
}</code></pre>
        </div>
        <p>由小括號 <em>( )</em> 囊括起來的程式碼我們稱之為條件，通常以使用計數器為多，而此條件裡又包含了三個敘述句，分別是：初始化（<em>var i = 0</em>）、條件（<em>i &lt;= 10</em>）以及結束時的更新（<em>i++</em>）。</p>
        <p>初始化：建立（宣告）一個變數，通常只有在第一次迴圈運行時才會被建立。有些人習慣將宣告寫在迴圈外部，初始化部分則只有單純指定數值。</p>
        <p>條件：迴圈會重複執行，直到次數滿足設定的條件（例如十次）。需要注意的是，條件除了常見的計數之外，也可以使用變數，那麼迴圈運行的條件次數將會是變數指定的值。</p>
        <p>結束時的更新：每次迴圈執行完大括號 <em>{ }</em> 裡的敘述句，迴圈就會累計一次計數，至於是遞增還是遞減，則要看此處使用的運算子，例如 <em>++</em> 就是遞增，<em>--</em> 則是遞減。</p>
        <p>了解迴圈條件裡各個敘述句的用途後，再來看看範例裡迴圈程式運作的邏輯──我們宣告了一個變數 <em>i</em>，並且指定數值 <em>1</em> 作為它的初始值，每次執行迴圈時，均會檢測 <em>i</em> 的數值是否「小於等於 10」？若是（true），則執行迴圈程式區塊裡的敘述句，當敘述句執行完畢後，<em>i</em> 的數值會遞增 <em>1</em>，然後再次進行 <em>i</em> 是否小於等於 <em>10</em> 的檢測，如果符合，則再次執行迴圈 <em>{ }</em>裡的敘述句，直到條件不符合（當 <em>i</em> > <em>10</em>）時終止迴圈。</p>
        <p>範例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">for (var i = 1; i &lt;= 10; i++) {
    console.log(i);
}

// 1 2 3 4 5 6 7 8 9 10</code></pre>
        </div>
        <p><br></p>
        <h3>while：</h3>
        <p>語法格式：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">while (condition) {
    statement;
}</code></pre>
        </div>
        <p>同樣的範例，來瞧瞧如果是用 <em>while</em> 迴圈會怎麼寫：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var i = 1;
while (i &lt;= 10) {
    console.log(i);
    i++;
}

// 1 2 3 4 5 6 7 8 9 10</code></pre>
        </div>
        <p>寫法其實與 <em>for</em> 大同小異，主要是 <em>while</em> 在小括弧 <em>( )</em> 內僅需定義「執行迴圈的條件」，變數則在外部進行宣告，當變數滿足條件（結果為 <em>true</em>）時，程式會執行程式區塊大括號 <em>{ }</em> 裡頭的敘述句。</p>
        <p><em>for</em> 與 <em>while</em> 的差別在於是否確定迴圈執行的次數。倘若不甚了解這句話的意思，那麼以下將兩者的迴圈條件裡的成份單獨拆出來看：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">// for
for(var i = 0; i &lt; n; i++){ ... }

// while
while (i &lt; n) { ... }</code></pre>
        </div>
        <p><em>n</em> 是已知數，那麼 <em>for</em> 迴圈執行的次數便一目了然，但 <em>while</em> 卻不一定，只知道當 <em>i</em> 大於或等於 <em>n</em> 的時候，迴圈才會停止。簡單來說，當我們明確知道迴圈執行次數時，用 <em>for</em>，反之則使用 <em>while</em>。所有的 <em>for</em> 迴圈皆可以改寫成 <em>while</em>，但並非所有的 <em>while</em> 都能用 <em>for</em> 取代。</p>
        <p>無論如何，不管是 <em>for</em> 還是 <em>while</em>，都務必要定義好結束的條件，否則迴圈可能發生無限執行的情況，這種情況通常被稱為無窮迴圈。</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">// for
for(var i = 0; i >= 0; i++){ ... }

// while
var i = 0;
while (i &lt; 10) { ... }</code></pre>
        </div>
        <p>這兩個迴圈因為條件會永遠成立，迴圈將永遠不會結束。</p>
        <p><br></p>
        <h3>do...while：</h3>
        <p>語法格式：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">do {
    statement;
}
while (condition)</code></pre>
        </div>
        <p>除了 <em>while</em> 單一敘述句用法外，還有另一種名叫 <em>do...while</em> 的敘述句，它的使用時機與 <em>while</em> 相似，對比單一 <em>whihe</em>適用時機在於不確定需要執行多少次數相比，多了個 <em>do</em> 乃是要表示它至少，也只會執行一次動作。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var i = 5;
while (i &lt; 3){
    i++;
    console.log(i);
}</code></pre>
        </div>
        <p>由於指定給變數 i 的值比 <em>while</em> 迴圈設定的條件來得大，故這個迴圈裡的程式不會被執行，但如果加入 <em>do</em>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var i = 5;
do {
    i++;
    console.log(i);
}
while (i &lt; 3);

// 6</code></pre>
        </div>
        <p>你會發現輸出為 6，而這個數字便是從 <em>do</em> 必定執行一次而產生的結果。</p>
        <p><br></p>
        <p>稍微整理一下 <em>for</em>、<em>while</em>、<em>do...while</em> 這三者使用的適當時機：</p>
        <ul>
            <li>重複動作直到指定次數──使用 <em>for</em>。</li>
            <li>動作被重複執行到滿足某個條件──使用 <em>while</em>。</li>
            <li>動作希望至少被執行一次時──使用 <em>do...while</em>。</li>
        </ul>
    </div>
    <div class="text-block" id="act3">
        <h2>三、跳躍敘述句</h2>
        <p>跳躍敘述句也有人稱跳出敘述句，用途如其名，指在程式執行到某種情況時，利用跳躍句迫使程式退出。看到這裡，腦海是否馬上浮現出了什麼？是的，<em>switch</em> 條件式裡使用到的 <em>break</em> 即是跳躍敘述句的一員。<em>break</em> 不僅可以使用在 <em>switch</em>，也可以用於迴圈。除了 <em>break</em> 之外，常見的跳躍句尚有：<em>continue</em>、<em>return</em>。</p>
        <p><br></p>
        <h3>break：</h3>
        <p>條件式 <em>switch</em> 的 <em>break</em> 用法就不再重述，這裡只談它如何運用於迴圈。在預設情況，迴圈只有條件以滿足時才會結束執行，而透過加入 <em>break</em>，就可以在迴圈抵達指定條件下就強制結束，譬如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">var i = 1;
while (i &lt;= 10) {
    console.log(i);
    i++;
    if (i > 5) {
        break;
    }
}

// 1 2 3 4 5</code></pre>
        </div>
        <p>原本還沒加入 <em>break</em> 時，<em>while</em> 迴圈條件表示當 <em>i</em> 小於等於 <em>10</em> 之前，都會反覆執行條件裡的程式。但在範例中我們加入了一條判斷規則：「當 <em>i</em> 大於 <em>5</em> 的時候，<em>break</em> 將直接跳離迴圈」。所以你將會看到最後迴圈只會輸出到 <em>5</em> 便強制結束了。</p>
        <p><br></p>
        <h3>continue：</h3>
        <p><em>continue</em> 只能使用在迴圈裡，它與 <em>break</em> 的差別在於 <em>break</em> 強制從迴圈跳出之後就不會再繼續執行迴圈了，但 <em>continue</em> 只是滿足條件後跳出，略過之後要執行的程式，但仍會繼續執行下一次的迴圈內容。什麼意思？我們直接上實例：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">for (var i = 1; i &lt;= 10; i++) {
    if (i % 2 == 0) {
        break;
    }
    console.log(i);
}

// 1</code></pre>
        </div>
        <p><em>continue</em> 跳出的條件為：當 <em>i</em> 除於 <em>2</em> 的餘數等於 <em>0</em> 的時候，迴圈將跳出，不執行後續的程式敘述。假如我們使用 <em>break</em>，當 <em>i</em> 數值是 <em>2</em> 時，就會因為滿足跳出條件而強行直接結束迴圈，後續的迴圈將不會再執行。</p>
        <p>但通常我們會希望迴圈能執行到 <em>i</em> 大於 <em>10</em> 為止才結束，這時我們應該使用 <em>continue</em>：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">for (var i = 1; i &lt;= 10; i++) {
    if (i % 2 == 0) {
        continue;
    }
    console.log(i);
}

// 1 3 5 7 9</code></pre>
        </div>
        <p>如此一來，<em>i</em> 後續到 <em>10</em> 為止前不能被 <em>2</em> 除盡的奇數才能透過後續的敘述句顯示在文件上。</p>
        <p><br></p>
        <h3>return：</h3>
        <p><em>return</em> 用來回覆函式（function）呼叫的變數，它只能出現在函式裡，若用在迴圈將會造成程式錯誤。關於 <em>return</em> 的介紹，在 <a href="/learn/_js_learn02_function" target="_blank">〈重新認識 JavaScript（二）──函式 Function〉</a> 一文中已有著墨，這裡就不再重複贅述。</p>
    </div>
    <div class="text-block" id="act4">
        <h2>四、例外處理</h2>
        <p>JavaScript 有一組詞彙術語，名叫「Control flow and error handling」，Control flow 中文翻譯為「流程控制」，指的是我們可以透過各種敘述句以增加程式的互動性，前面介紹的條件、迴圈、跳躍等敘述句皆屬於此類。至於「error handling」就是本章節的主角──例外處理，然而相信多數人這時會產生疑惑了，Error 不是應該翻作「錯誤」嗎？語意和「例外」不該劃上等號的。事實上根據程式語言的釋義，在程式語言世界裡只有「Exception Handling」的說法，也就是例外處理，而不存在「Error handling」，因為錯誤在定義上是無法被處理的。只是對 JavaScript 而言，Error handling 是比較廣泛、直觀的說法，它暗示了對錯誤和例外情況的處理，無論這些錯誤是由錯誤的程式碼還是外部因素引起的，在某些情況下，例外和錯誤這兩個術語可能被用來表示不同類型的問題，但在許多場合下它們是通用的。因此，在程式設計的上下文中，通常使用 Error handling 這個術語來描述處理錯誤和例外的機制。</p>
        <p>說了這麼多，究竟錯誤在開發程式的過程什麼時候會發生呢？以下列舉一些常見錯誤狀況：</p>
        <ol>
            <li>非預期的錯誤情況：例如，數據庫連接失敗、文件無法讀取或寫入等。</li>
            <li>不正確的用戶輸入：例如，用戶提供的數據格式錯誤、範圍超出預期等。</li>
            <li>外部資源失敗：例如，網絡請求失敗、服務器無法訪問等。</li>
            <li>邏輯錯誤：例如，在程式邏輯中發現無法處理的情況，可能需要引發例外。</li>
        </ol>
        <p>這裡我們就先撇開 <em>Error</em> 物件──JavaScript 中內建的用於處理錯誤的物件不談（留到日後物件篇），僅先介紹例外處理所使用的敘述句。通常包括以下幾個步驟：</p>
        <p><br></p>
        <h3>拋出（Throw）：</h3>
        <p>語法格式：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">throw expression;</code></pre>
        </div>
        <p>拋出在程式中的作用是明確地指示某個情況下程式無法繼續執行，進而導致例外的發生。這樣的做法可以讓開發者在程式中精確地標識出錯誤，並且在需要時進行適當的處理。舉凡以下這些狀況都可能會需要使用拋出：</p>
        <ol>
            <li>錯誤檢查：當檢測到某些不符合預期的條件或錯誤時，可以使用拋出來通知程式的其他部分發生了錯誤。這樣可以使程式更加明確和易於理解。</li>
            <li>無法處理的情況：當程式遇到無法處理的情況時，例如數據庫連接失敗、文件不存在等，可以使用拋出來向上層程式（可能是調用該程式的函數或模組）報告這個問題。</li>
            <li>自定義錯誤：在開發過程中，有時可能需要定義一些自定義的錯誤類型來表示特定的錯誤情況，這時可以使用拋出來生成這些錯誤。</li>
            <li>終止程式：在某些情況下，如果發生了無法恢復的錯誤，則需要立即終止程式的執行，這時可以使用拋出來終止程式的執行。</li>
        </ol>
        <p>JavaScript 中的任何物件（Object）都可以被拋出，其敘述句的關鍵字為 <em>throw</em>，當要拋出例外時，我們需要指定包含在要拋出物件中的值。例如：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">throw "阿比";    // 字串
throw 33;    // 數字
throw true;    // 布林值
throw function() {
    return "我是函式!";
};    // 函式
throw {
    toString: function () {
        return "我是物件!";
    },
};    // 物件</code></pre>
        </div>
        <p>需要注意的是，一旦我們自定義的 <em>throw</em> 敘述句被執行，它便會立即中斷目前程式的執行流程，並將控制權「轉移」給最近的 <em>catch</em> 區塊（如果有的話）或者上一層的例外處理機制，在該 <em>throw</em> 敘述句之後的其他任何敘述句將不會繼續執行。</p>
        <p><br></p>
        <h3>捕捉（Catch）：</h3>
        <p>語法格式：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">try {
    statement;
}
catch (catchID) {
    statement;
}</code></pre>
        </div>
        <p>前面有提到，當例外被拋出時，最近的 <em>catch</em> 就會嘗試去「捕捉」它，以進行其內部的例外處理機制程式。捕捉的語法結構由 <em>try...catch</em> 構成，大意是在例外拋出被捕捉後，會先經過 <em>try</em> 嘗試看看是否能成功解決，倘若不能，該例外控制權會繼續移轉給後方的 <em>catch</em> 區塊；假如 <em>try</em> 區塊內的敘述句沒有拋出例外，則 <em>catch</em> 區塊將被跳過。由此可知，一個捕捉敘述句的定義，至少會存在一個 <em>try</em>，<em>catch</em> 則不一定會有。</p>
        <p><em>catch</em> 區塊通常用來保存 <em>throw</em> 拋出的標識符（<em>catchID</em>），這個標識符僅在 <em>catch</em> 區塊執行持續時間存在，一旦區塊完成執行後便不再可用。以下列舉一個例子：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function getMonthName(mo) {
    mo = mo - 1;
    var months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    if (months[mo]) {
        return months[mo];
    }
    else {
        throw "InvalidMonthNo";    // throw 關鍵字在這裏被使用
    }
}

try {
    monthName = getMonthName(myMonth);    // 函式可以丟出例外
}
catch (e) {
    monthName = "unknown";
    logMyErrors(e);    // 將例外傳至例外處理機制
}</code></pre>
        </div>
        <p>假如傳遞給 <em>getMonthName</em> 函式的參數 <em>mo</em> 不在 1 至 12 的範圍，則函式就會發生錯誤，並 <em>throw</em> 拋出 <em>"InvalidMonthNo"</em> 的值，而這個值經過 <em>try</em> 處理未果，將控制權轉移給 <em>catch</em>，其標識符 <em>e</em> 指的便是 <em>"InvalidMonthNo"</em>。</p>
        <p>其實除了 <em>catch</em> 區塊，還有一個 <em>finally</em> 區塊，既然稱作 finally，就表示它會放在整個程式碼片段的最末端，和 <em>catch</em> 區塊一樣，並非一定要定義的區塊，但當程式碼片段存在 <em>finally</em> 區塊，不管有沒有拋出例外，它都會被執行，即使程式拋出例外且沒有 <em>catch</em> 區塊進行例外處理，<em>finally</em> 區塊也依然會處理它裡面的敘述句。</p>
        <p>簡而言之，<em>finally</em> 區塊可以確保在發生異常或不發生異常的情況下都執行某些必要的清理操作，例如釋放資源、關閉文件或清理暫存的數據。</p>
        <p>因此上面 <em>getMonthName</em> 這個函式，我們可以為其添加 <em>finally</em> 區塊使其更完整圓滿：</p>
        <div class="text-code" v-pre>
            <pre><code class="language-javascript">function getMonthName(mo) {
    mo = mo - 1;
    var months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    if (months[mo]) {
        return months[mo];
    }
    else {
        throw "InvalidMonthNo";    // throw 關鍵字在這裏被使用
    }
}

try {
    monthName = getMonthName(myMonth);    // 函式可以丟出例外
}
catch (e) {
    monthName = "unknown";
    logMyErrors(e);    // 將例外傳至例外處理機制
}
finally {
    console.log("無論是否發生異常都會執行。");
}</code></pre>
        </div>
    </div>
    <div class="text-block" id="act5">
        <h2>五、總結</h2>
        <p>回顧本篇文章，精簡總結一下我們從變數身上學到哪些東西：</p>
        <h5>1. 條件敘述句</h5>
        <ul>
            <li><em>if...else</em> 會讀取所有條件中的敘述句。</li>
            <li><em>switch</em> 只讀取跟參數相符條件式裡的敘述句。</li>
        </ul>
        <h5>2. 迴圈敘述句</h5>
        <ul>
            <li><em>for</em> 主要用於重複動作直到指定次數。</li>
            <li><em>while</em> 主要用於動作被重複執行到滿足某個條件。</li>
            <li><em>do...while</em> 主要用於動作希望至少被執行一次時。</li>
        </ul>
        <h5>3. 跳躍敘述句</h5>
        <ul>
            <li><em>break</em> 在迴圈抵達指定條件下就強制結束。</li>
            <li><em>continue</em> 滿足條件後跳出，略過之後要執行的程式，但仍會繼續執行下一次的迴圈內容。</li>
            <li><em>return</em> 用來回傳函式呼叫的變數。</li>
        </ul>
        <h5>4. 例外處理</h5>
        <ul>
            <li><em>throw</em> 用來拋出程式發生錯誤或例外時的值。</li>
            <li><em>try</em> 在拋出例外時應該要做哪些事情，至少要定義一或多個才能處理例外狀況。</li>
            <li><em>catch</em> 用於當 <em>try</em> 不能成功解決例外，取得該例外的控制權繼續執行區塊內的程式。可定義一或多個也可以不定義。</li>
            <li><em>finally</em> 用於程式在發生例外時如何結束，以釋放程式綁定的資源，一但定義 <em>finally</em> 不管程式是否發生例外都會執行。可省略不定義。</li>
        </ul>
        <p><br></p>
        <p>至於本篇文章提到的 JavaScript 常見名詞術語有以下這些，但有些術語所代表的技術或知識已經超過本篇主題的範疇，礙於篇幅因此沒有辦法太深入探討，如有需要可以循著原詞單字順藤摸瓜去搜尋更專業、完整的教學文章：</p>
        <div class="text-flex">
            <div class="f-width">
                <div class="f-head">
                    <div class="f-f1">名詞</div>
                    <div class="f-f1">中譯</div>
                    <div class="f-f3">說明</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">Control flow</div>
                    <div class="f-f1">流程控制</div>
                    <div class="f-f3">程式在運行時根據條件和結果的不同而採取不同的執行路徑的能力，可以藉由條件、迴圈、跳躍等敘述句來控制。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">Error Handling</div>
                    <div class="f-f1">錯誤處理</div>
                    <div class="f-f3">錯誤通常是由程式本身產生的，並且可以通過程式內置的錯誤代碼或錯誤對象來表示，例如文件未找到、無效的輸入、網絡連接失敗等。</div>
                </div>
                <div class="f-row">
                    <div class="f-f1">Exception<br> Handling</div>
                    <div class="f-f1">例外處理 / 異常處理</div>
                    <div class="f-f3">異常通常是由於程序運行時發生了一些無法處理的情況，這些情況通常不能在編譯時檢測到，而是在運行時發生。</div>
                </div>
            </div>
        </div>
    </div>
    <div class="text-block" id="act6">
        <h2>六、參考資料</h2>
        <dl>
            <dd><a href="https://www.books.com.tw/products/0010744702" target="_blank">《JavaScript & JQuery：網站互動設計程式進化之道》</a></dd>
            <dd><a href="https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Statements/if...else" target="_blank">MDN web docs</a></dd>
            <dd><a href="http://www.kangting.tw/2013/12/javascript-5-if.html" target="_blank">康廷數位 JavaScript 快速入門（5/10）－ 敘述句 if / switch</a></dd>
            <dd><a href="https://ithelp.ithome.com.tw/articles/10211560" target="_blank">JavaScript 基礎知識-switch 判斷式</a></dd>
            <dd><a href="https://ithelp.ithome.com.tw/articles/10218218" target="_blank">Day 5: 述句(Statements)</a></dd>
            <dd><a href="https://ithelp.ithome.com.tw/articles/10191453" target="_blank">重新認識 JavaScript: Day 09 流程判斷與迴圈</a></dd>
            <dd><a href="https://www.itread01.com/content/1548601025.html" target="_blank">for迴圈和while迴圈的區別</a></dd>
            <dd><a href="https://medium.com/when-you-feel-like-quitting-think-about-why-you/javascript-15-%E4%BE%8B%E5%A4%96%E8%99%95%E7%90%86-try-catch-finally-error-handling-5ac2b4ced527" target="_blank">JavaScript # 15 —例外處理 ( try catch finally Error Handling )</a></dd>
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