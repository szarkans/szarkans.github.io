# ЛООЛ

<style>

/* Crafting grid styles */
.crafting-container {
    width: 80%;
    max-width: 400px; /* Adjust this for the desired max width */
    background-image: url('../../assets/crafttemplate.png'); /* Replace with your image path */
    background-size: cover; /* Cover the entire area of the container */
    background-position: center; /* Center the background image */
    padding: 20px; /* Add padding to ensure the grid doesn't touch the edges of the background */
    box-shadow: 0 4px 8px rgba(0,0,0,0.1); /* Optional: adds a subtle shadow for depth */
}

.crafting-grid {
    width: 100%;
    border-collapse: collapse;
}

.crafting-grid td {
    width: 33.33%;
    padding: 10px;
    border: 1px solid #ccc;
}

.crafting-grid img {
    width: 100%;
    display: block;
}

/* Responsive styles */
@media (max-width: 600px) {
    .crafting-grid td {
        padding: 5px;
    }
    .output-item {
        width: 70%;
    }
}

.output-container {
    margin-top: 20px;
    text-align: center;
}

.output-item {
    width: 50%;
    max-width: 200px; /* Adjust this for the desired output size */
    margin: 0 auto; /* Centering the item */
}


</style>

<div class="crafting-container">
    <table class="crafting-grid">
        <tr>
            <td><a href="#"><img src="#" alt="Diamond"></a></td>
            <td><a href="#"><img src="#" alt="Diamond"></a></td>
            <td><a href="#"><img src="#" alt="Diamond"></a></td>
        </tr>
        <tr>
            <td><a href="#"><img src="#" alt="Stick"></a></td>
            <td><a href="#"><img src="#" alt="Stick"></a></td>
            <td><a href="#"><img src="#" alt="Empty"></a></td>
        </tr>
        <tr>
            <td><a href="#"><img src="#" alt="Empty"></a></td>
            <td><a href="#"><img src="#" alt="Empty"></a></td>
            <td><a href="#"><img src="#" alt="Empty"></a></td>
        </tr>
    </table>
    <div class="output-container">
        <a href="#"><img src="#" alt="Diamond Pickaxe" class="output-item"></a>
    </div>
</div>