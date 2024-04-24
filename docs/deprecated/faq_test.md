---
hide:
  - navigation
  - footer
  - path
search:
  exclude: true
---

<div id="tab-interface">
    <div id="tab-buttons">
        <button class="tab-button active" onclick="switchTab('season')">Сервер</button>
        <button class="tab-button" onclick="switchTab('progress')">Сезон</button>
        <button class="tab-button" onclick="switchTab('server')">Геймплей</button>
    </div>
    <!-- Season Tabs -->
    <div class="tab-content season" style="display:block;">
        <h2>Как попасть на сервер?</h2>
        <p>Пока что никак - мы на межсезонье! Но ты можешь зайти в наш <a href="discord.gg/23XJyDGJaH" target="_blank">Дискорд</a>!</p>
    </div>
    <div class="tab-content season" style="display:block;">
        <h2>Когда новый сезон?</h2>
        <p>В середине лета 2024 года!</p>
    </div>
    <div class="tab-content season" style="display:block;">
        <h2>Нужна лицензия?</h2>
        <p>Нет! Ты можешь зайти как с пиратки, так и с лицензии!.</p>
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

<style>

  #tab-interface {
    width: 100%;
    /* max-width: 1200px; */
    margin: auto;
    padding: 20px;
    box-sizing: border-box;
}

#tab-buttons {
    text-align: right;
    margin-bottom: 20px;
    margin-right: 1em;
}

.tab-button {
    background-color: #333;
    border-radius: 15px;
    color: white;
    border: none;
    padding: 13px 5%;
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
    display: block; /* Initially hide all tab content */
    width: 18rem; /* Subtract margin */
    padding: 0 1rem 0 1rem;
    background-color: #222;
    border-radius: 14px;
    box-sizing: border-box;
    float: left;
    margin: 10px 10px;
    height: 250px;
    overflow: hidden;
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