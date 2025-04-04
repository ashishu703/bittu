<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Anocab® LAN Cable</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
  <style>
    table tbody tr td {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    .download-btn {
      display: inline-block;
      padding: 10px 20px;
      font-size: 16px;
      font-weight: bold;
      text-decoration: none;
      color: #ffffff;
      background-color: #000000;
      border-radius: 5px;
      text-align: center;
      float: right;
      margin-top: 20px;
    }
    .container {
      position: relative;
    }
    
  </style>
</head>

<body>
  <div class="container my-5">
    <div class="text-center ">
      <img class="" src="https://anocab.com/wp-content/uploads/2024/07/Anocab-logo-1.png" alt="Bootstrap" width="300" height="90">
    </div>
    <h2 class=" text-center mb-4">Anocab® LAN Cable</h2>

    <div class="table-responsive-xxl">
      <?php

      include 'dbconfig.php';

      $result = $conn->query("SELECT * FROM lan") or die($mysqli->error);
     
      ?>
      <table class="table  table-hover border border-3  table-bordered shadow">
        <thead class="text-center">

          <tr class="align-middle ">
            <th rowspan="2">Name/No.of Pair</th>
            <th colspan="1">No. of Wires & Dia. of Each Wire</th>
            <th colspan="2">Transmission Parameter (Insertion Loss DB/100 M)</th>
            <th colspan="1">CR @ 20 C</th>
            <th rowspan="2">MRP</th>
          </tr>
          <tr class="align-middle ">
          <th>MM</th>
          <th>100 MHZ</th>
          <th>250 MHZ</th>
          <th>Km</th>
          </tr>
        </thead>
        <tbody class="text-center">
          <?php while ($row = $result->fetch_assoc()) {  ?>
            <tr>
              <th scope="row"><?php echo $row['Pair']; ?></th>
              <td><?php echo $row['DIA-MM']; ?></td>
              <td><?php echo $row['100MHZ']; ?></td>
              <td><?php echo $row['250MHZ']; ?></td>
              <td><?php echo $row['CR']; ?></td>
              <th scope="row"><?php echo $row['MRP']; ?></th>


            </tr>
          <?php } ?>
        </tbody>
      </table>
      <h6 class=" text-left mb-6">ANOCAB SUPPORT : 18002700075</h6>
      
    </div>
    
    <a  class="download-btn" download>STOCK NOT AVAILABLE</a>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-u1OknCvxWvY5kfmNBILK2hRnQC3Pr17a+RTT6rIHI7NnikvbZlHgTPOOmMi466C8" crossorigin="anonymous"></script>
</body>

</html>