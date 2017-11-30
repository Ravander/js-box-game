<?php

  $db = parse_ini_file("../conf/db.ini");
  $servername = $db["host"];
  $username = $db["user"];
  $password = $db["pw"];
  $dbname = $db["dbname"];

  $conn = new mysqli($servername, $username, $password, $dbname);

  if ($conn->connect_error) {
    die("<br> tietokantaan ei voida yhdistää <br>");
  }

  $sql = "SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'";
  $conn->query($sql);
  
  if (isset($_POST["name"]) && isset($_POST["score"])) {
    $name = "'" . $_POST["name"] . "'";
    $score = $_POST["score"];
    $sql = "SELECT * FROM highScores WHERE name=" . $name . " AND score=" . $score;
    $query = $conn->query($sql);
    if ($query->num_rows < 1) {
      $sql = "INSERT INTO highScores (name, score, date) VALUES ($name, $score, CURDATE())";
      $conn->query($sql);
    }
  }

  $conn->close();
?>
