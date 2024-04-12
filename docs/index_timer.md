---
hide:
  - navigation
  - toc
  - footer
  - path
  - feedback
  - title
icon: fontawesome/solid/house
---

<figure markdown="span">
![cat](./assets/sleepy_cat.png){ width=300 }
  <figcaption></figcaption>
</figure>

<p class="shadow margin-center bigger-text">Встретимся летом!</p>
<p id="timer" class="shadow margin-center bigger-text"></p>

<script>
// JavaScript code as provided earlier
var countDownDate = new Date("Jul 1, 2024 18:00:00").getTime();
var x = setInterval(function() {
  var now = new Date().getTime();
  var distance = countDownDate - now;
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  document.getElementById("timer").innerHTML = days + "дн. " + hours + "ч. "
  + minutes + "мин. " + seconds + "сек. ";
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("timer").innerHTML = "EXPIRED";
  }
}, 1000);
</script>
