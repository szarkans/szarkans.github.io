<script>

function toggleFAQ(id) {
    var element = document.getElementById(id);
    element.classList.toggle('active');
}

</script>

<style>

.faq-container {
    width: 100%;
    max-width: 600px;
    margin: auto;
    border: 1px solid #ccc;
    padding: 10px;
}

.faq-item {
    margin-bottom: 10px;
}

.faq-question {
    width: 100%;
    padding: 10px;
    font-size: 1.2em;
    text-align: left;
    background: #007BFF;
    color: white;
    border: none;
    cursor: pointer;
    transition: background 0.3s;
}

.faq-question:hover {
    background: #0056b3;
}

.faq-answer {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.25s ease-out;
    background: #f8f8f8;
    border-top: 1px solid #ccc;
    padding: 0 10px;
}

.faq-answer p {
    margin: 0; /* Removes default margin from paragraphs */
    /* opacity: 0; */
    transition: opacity 0.5s ease-out;
}

.faq-answer.active {
    max-height: 500px; /* Adjust this value based on content size */
    padding: 10px;
    opacity: 1;
}

</style>

<div class="faq-container">
    <div class="faq-item">
        <button class="faq-question" onclick="toggleFAQ('faq1')">What is Vanilla+ Roleplay?</button>
        <div class="faq-answer" id="faq1">
            <p>Vanilla+ Roleplay is an enhanced version of the standard Minecraft experience with added roleplay elements and community rules to create more depth in gameplay.</p>
        </div>
    </div>
    <div class="faq-item">
        <button class="faq-question" onclick="toggleFAQ('faq2')">How do I join the server?</button>
        <div class="faq-answer" id="faq2">
            <p>You can join the server by entering our IP address in your Minecraft client's multiplayer section. Ensure you have the latest version of the game installed.</p>
        </div>
    </div>
    <!-- Add more FAQ items as needed -->
</div>
