<!DOCTYPE html>
<html>
<head>

  <title>tuomasravander.esy.es v6.66</title>

  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta charset="UTF-8">

  <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

  <link rel="stylesheet" type="text/css" href="css/style.css">
    
</head>
<body class="w3-dark-grey">

  <aside id="highScores" class="w3-sidebar w3-card w3-animate-right w3-blue w3-text-khaki w3-mobile">
    <button class="sidebarCloseButton w3-button w3-khaki w3-text-blue w3-hover-khaki w3-hover-text-blue w3-hover-shadow w3-xlarge" onclick="w3.hide('#highScores');w3.show('#headerButtons')">&times;</button>
    <div class="w3-container">
      <p class="w3-center w3-xlarge w3-wide">tilastot</p>
      <p class="w3-large w3-center w3-border-bottom"># / nimi / pisteet / päiväys</p>
      <ul class="w3-ul w3-large w3-center">
        <?php include "php/highscores.php" ?>
      </ul>
    </div>
  </aside>

  <aside id="info" class="w3-sidebar w3-card w3-animate-top w3-blue w3-text-khaki w3-mobile">
    <button class="sidebarCloseButton w3-button w3-khaki w3-text-blue w3-hover-khaki w3-hover-text-blue w3-hover-shadow w3-xlarge" onclick="w3.hide('#info');w3.show('#headerButtons')">&times;</button>
    <div class="w3-container">
      <p class="w3-center w3-xlarge w3-wide">ohjeet</p>
      <ul class="w3-ul w3-large w3-center">
        <li class="w3-hover-opacity">selviä mahdollisimman pitkään osumatta vihuihin.</li>
        <li class="w3-hover-opacity">liiku nuolinäppäimillä tai wasd!</li>
        <li class="w3-hover-opacity">älä myöskään kompuroi seiniin...</li>
      </ul>
    </div>
  </aside>

  <header class="w3-bar w3-dark-grey w3-xlarge w3-animate-top">
    <div id="heading" class="w3-bar-item w3-text-khaki w3-wide w3-animate-opacity w3-hide-small">
      <span class="w3-text-blue">t</span>uomas<span class="w3-text-blue">r</span>avander<span class="w3-text-blue">.</span>esy<span class="w3-text-blue">.</span>es <span class="w3-text-blue">v</span>6<span class="w3-text-blue">.</span>66
    </div>
    <div id="headerButtons" class="w3-right w3-animate-opacity">
      <button id="infoOpenButton" class="w3-bar-item w3-margin-right w3-button w3-card w3-blue w3-text-khaki w3-hover-khaki w3-hover-text-blue" onclick="w3.show('#info');w3.hide('#headerButtons')">
        <i class="fa fa-fw fa-info"></i>
      </button>
      <button id="hsOpenButton" class="w3-bar-item w3-button w3-card w3-blue w3-text-khaki w3-hover-khaki w3-hover-text-blue" onclick="w3.show('#highScores');w3.hide('#headerButtons')">
        <i class="fa fa-fw fa-trophy"></i>
      </button>
    </div>
  </header>

  <main class="w3-container w3-dark-grey w3-animate-opacity w3-hide-small">

    <canvas id="gameCanvas" class="w3-card-4 w3-animate-zoom" width="640px" height="480px">jokin on pielessä!</canvas>

    <div id="gameButtons" class="w3-center">
      <button class="w3-button w3-card w3-blue w3-text-khaki w3-hover-khaki w3-hover-text-blue" onclick="init()">aloita</button>
      <button class="w3-button w3-card w3-blue w3-text-khaki w3-hover-khaki w3-hover-text-blue" onclick="pauseAndResume()">tauko / jatka</button>
    </div>

  </main>
    
  <script src="js/game.js"></script>
  <script src="https://www.w3schools.com/lib/w3.js"></script>

</body>
</html>
