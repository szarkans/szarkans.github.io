---
hide:
    - path
    - navigation
---

<div class="faq-container">
    <!-- FAQ Section with Dropdowns -->
    <div class="faq-section">
        <div class="faq-dropdown">
            <button class="dropdown-btn">Как к вам попасть?</button>
            <div class="dropdown-content">
                <p>Пока что никак - мы на межсезонье! Но пока что ты можешь зайти в наш <a href="https://discord.gg/23XJyDGJaH" target="_blank">Дискорд</a>!</p>
            </div>
        </div>
        <!-- Add additional dropdowns as needed -->
        <div class="faq-dropdown">
            <button class="dropdown-btn">Какая версия?</button>
            <div class="dropdown-content">
                <p>Планируем открыться через месяц после выхода 1.21 на Java Edition. Играть на Bedrock нельзя.<br></p>
            </div>
        </div>
        <div class="faq-dropdown">
            <button class="dropdown-btn">Нужна лицензия?</button>
            <div class="dropdown-content">
                <p>Нет! Можно играть как с пиратки, так и с лицензии! Но игроки с лицензией могут заходить без пароля.</p>
            </div>
        </div>
        <div class="faq-dropdown">
            <button class="dropdown-btn">Какая валюта сервера?</button>
            <div class="dropdown-content">
                <p><b>АРы</b> - Алмазная руда, в основном глубиносланцевая. Это намного лучше алмазов, ведь у "старичков" с Удачей нет приемущества над новичками!</p>
            </div>
        </div>
        <div class="faq-dropdown">
            <button class="dropdown-btn">Какие ограничения фарма?</button>
            <div class="dropdown-content">
                <p>Прорисовка и симуляция - 8 чанков. Кол-во мобов на игрока - на 10 меньше чем в ванилле. Дюпы сыпучих блоков, рельс и ковров включёны и разрешены</p>
            </div>
        </div>
        <div class="faq-dropdown">
            <button class="dropdown-btn">Почему "Кошкокрафт"? Няняня?</button>
            <div class="dropdown-content">
                <p>У этого названия есть <a href="../server-history/1season.md">целая история</a>!</p>
            </div>
        </div>
    </div>

    <!-- Discord Link Box -->
    <div class="discord-box">
        <a href="https://discord.gg/23XJyDGJaH" target="_blank" style="color: inherit; text-decoration: none;">
        <div class="discord-box-top">
            <svg class="discord-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127.14 96.36"><defs></defs><g id="图层_2" data-name="图层 2"><g id="Discord_Logos" data-name="Discord Logos"><g id="Discord_Logo_-_Large_-_White" data-name="Discord Logo - Large - White"><path class="cls-1" d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/></g></g></g></svg>
            
            <svg class="discord-box-link" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M3.75 2h3.5a.75.75 0 0 1 0 1.5h-3.5a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-3.5a.75.75 0 0 1 1.5 0v3.5A1.75 1.75 0 0 1 12.25 14h-8.5A1.75 1.75 0 0 1 2 12.25v-8.5C2 2.784 2.784 2 3.75 2Zm6.854-1h4.146a.25.25 0 0 1 .25.25v4.146a.25.25 0 0 1-.427.177L13.03 4.03 9.28 7.78a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042l3.75-3.75-1.543-1.543A.25.25 0 0 1 10.604 1Z"/></svg>
        </div>
        <div class="discord-text">
            <h4>Есть ещё вопросы?</h4>
            <p>Заходи к нам в Discord!<br>С радостью ответим >3<</p>
        </div>
        </a>
    </div>
</div>

<script>

document.addEventListener('DOMContentLoaded', function() {
    var dropdowns = document.getElementsByClassName("dropdown-btn");
    for (var i = 0; i < dropdowns.length; i++) {
        dropdowns[i].addEventListener("click", function() {
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    }
});

</script>