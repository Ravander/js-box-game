<?php

  $db = parse_ini_file("./conf/db.ini");
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

  $sql = "SELECT * FROM highScores ORDER BY score DESC LIMIT 5";
  $result = $conn->query($sql);

  if ($result->num_rows > 0) {

    $index = 1;

    while($row = $result->fetch_assoc()) {
      echo "<li class='w3-hover-opacity'>" . $index++ . ". " . $row["name"] . " / " . $row["score"] . " / " . $row["date"] . "</li>";
    }

  } else {
    echo "<br> tyhjät tilastot! <br>";
  }

  $conn->close();
?>
