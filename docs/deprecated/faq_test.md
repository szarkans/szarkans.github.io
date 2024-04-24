---
hide:
  - navigation
  - footer
  - path
search:
  exclude: true
---

<style>
    
#tab-interface {
    width: 100%;
    max-width: 1200px;
    margin: auto;
    padding: 20px;
    box-sizing: border-box;
}

#tab-buttons {
    text-align: right;
    margin-bottom: 20px;
}

.tab-button {
    background-color: #333;
    border-radius: 15px;
    color: white;
    border: none;
    padding: 13px 60px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    display: inline-block;
    margin: 1px;
}

.tab-button:hover {
    background-color: #555;
}

.tab-button.active {
    background-color: #777;
}

.tab-content {
    display: none; /* Initially hide all tab content */
    padding: 20px;
    background-color: #222;
    border-radius: 8px;
    box-sizing: border-box;
    margin: 10px 0;
    height: 250px;
    overflow: hidden;
}

/* Large screens layout */
@media (min-width: 1200px) {
    .tab-content {
        display: block; /* Override to show all tab content */
        width: calc(33.333% - 20px); /* Subtract margin */
        box-sizing: border-box;
        float: left; /* Float elements to align them in a row */
        margin: 10px;
    }
}

/* Small screens layout */
@media (max-width: 1199px) {
    .tab-content {
        display: block; /* Override to show all tab content */
        width: auto; /* Full width */
        margin: 10px 0;
        height: auto; /* Allow it to expand to fit content on small screens */
        overflow: visible; /* Default behavior */
    }
}

/* If you need to apply to both h1 and h2, you can chain the selectors */
#tab-interface .md-typeset h1,
#tab-interface .md-typeset h2 {
    margin: 0; /* Reset the margin only for h1 and h2 inside the FAQ */
}
</style>

<body>
    <div id="tab-interface">
        <div id="tab-buttons">
            <button class="tab-button active" onclick="switchTab('season')">Сезон</button>
            <button class="tab-button" onclick="switchTab('progress')">Проходка</button>
            <button class="tab-button" onclick="switchTab('server')">Сервер</button>
        </div>
        <!-- Season Tabs -->
        <div class="tab-content season" style="display:block;">
            <h2>Когда был вайп?</h2>
            <p>Седьмой сезон начался 30 декабря 2023 года.</p>
        </div>
        <div class="tab-content season" style="display:block;">
            <h2>Когда новый сезон?</h2>
            <p>Когда мы поймем что это нужно. Следите за новостями в нашем Discord.</p>
        </div>
        <div class="tab-content season" style="display:block;">
            <h2>Сколько длится сезон?</h2>
            <p>Восьмой сезон сервера продлится с 19 августа 2023 до конца мая 2024 года.</p>
        </div>

        <div class="tab-content progress" style="display:none;">
            <h2>Пример вопроса про проходку 1</h2>
            <p>Ответ на вопрос про проходку 1.</p>
        </div>
        <div class="tab-content progress" style="display:none;">
            <h2>Пример вопроса про проходку 2</h2>
            <p>Ответ на вопрос про проходку 2.</p>
        </div>
        <div class="tab-content progress" style="display:none;">
            <h2>Пример вопроса про проходку 3</h2>
            <p>Ответ на вопрос про проходку 3.</p>
        </div>

        <div class="tab-content server" style="display:none;">
            <h2>Пример вопроса про сервер 1</h2>
            <p>Ответ на вопрос про сервер 1.</p>
        </div>
        <div class="tab-content server" style="display:none;">
            <h2>Пример вопроса про сервер 2</h2>
            <p>Ответ на вопрос про сервер 2.</p>
        </div>
        <div class="tab-content server" style="display:none;">
            <h2>Пример вопроса про сервер 3</h2>
            <p>Ответ на вопрос про сервер 3.</p>
        </div>
    </div>
    <script src="script.js"></script>
</body>

<script>

function switchTab(category) {
    var i, tabcontent, tabbuttons;
    
    // Hide all tabs
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    
    // Show tabs for the selected category
    tabcontent = document.getElementsByClassName(category);
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "block";
    }
    
    // Update the button active state
    tabbuttons = document.getElementsByClassName("tab-button");
    for (i = 0; i < tabbuttons.length; i++) {
        tabbuttons[i].className = tabbuttons[i].className.replace(" active", "");
    }
    document.querySelector('.tab-button[onclick="switchTab(\'' + category + '\')"]').className += " active";
}

// Initialize the first tab of each



</script>