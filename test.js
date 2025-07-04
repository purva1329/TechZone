<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Image Gallery</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      text-align: center;
      background-color: #f4f4f4;
      padding: 30px;
    }
    #gallery-img {
      width: 400px;
      height: 300px;
      object-fit: cover;
      border-radius: 12px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.3);
      margin-bottom: 20px;
    }
    .btn-container {
      display: flex;
      justify-content: center;
      gap: 15px;
    }
    .btn-container button {
      padding: 10px 15px;
      border: none;
      border-radius: 8px;
      background-color: #ff6347;
      color: white;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.3s ease;
    }
    .btn-container button:hover {
      background-color: #e5533c;
    }
  </style>
</head>
<body>

  <h2>Image Gallery</h2>
  <img id="gallery-img" src="https://via.placeholder.com/400x300?text=Image+1" alt="Gallery Image" />

  <div class="btn-container">
    <button onclick="showImage(1)">Image 1</button>
    <button onclick="showImage(2)">Image 2</button>
    <button onclick="showImage(3)">Image 3</button>
    <button onclick="showImage(4)">Image 4</button>
    <button onclick="showImage(5)">Image 5</button>
  </div>

  <script>
    function showImage(number) {
      const img = document.getElementById("gallery-img");
      img.src = `https://via.placeholder.com/400x300?text=Image+${number}`;
    }
  </script>

</body>
</html>
