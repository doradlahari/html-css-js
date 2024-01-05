function handleFileSelect(event) {
  const files = event.target.files;

  for (const file of files) {
    convertImage(file);
  }
}

function convertImage(file) {
  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.src = e.target.result;

    img.onload = function () {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0, img.width, img.height);

      // Convert to JPG
      const jpgDataUrl = canvas.toDataURL("image/jpeg");

      // Convert to PNG
      const pngDataUrl = canvas.toDataURL("image/png");

      // Display converted images 6 times
      displayConvertedImages(file.name, jpgDataUrl, pngDataUrl, 6);
    };
  };

  reader.readAsDataURL(file);
}

function displayConvertedImages(fileName, jpgDataUrl, pngDataUrl, times) {
  const previewsContainer = document.getElementById("previews");

  const originalText = document.createElement("p");
  originalText.textContent = `Original: ${fileName}`;
  previewsContainer.appendChild(originalText);

  for (let i = 0; i < times; i++) {
    const jpgImage = new Image();
    jpgImage.src = jpgDataUrl;
    jpgImage.classList.add("zoomable-image"); // Add zoomable-image class
    previewsContainer.appendChild(jpgImage);

    const jpgText = document.createElement("p");
    jpgText.textContent = `Converted to JPG ${i + 1}`;
    previewsContainer.appendChild(jpgText);

    const pngImage = new Image();
    pngImage.src = pngDataUrl;
    pngImage.classList.add("zoomable-image"); // Add zoomable-image class
    previewsContainer.appendChild(pngImage);

    const pngText = document.createElement("p");
    previewsContainer.appendChild(pngText);

    // Event listeners for zooming
    jpgImage.addEventListener("mouseenter", () => {
      jpgImage.classList.add("zoomed");
    });

    jpgImage.addEventListener("mouseleave", () => {
      jpgImage.classList.remove("zoomed");
      jpgImage.style.transform = "scale(1)";
    });

    jpgImage.addEventListener("mousemove", (event) => {
      if (jpgImage.classList.contains("zoomed")) {
        const rect = jpgImage.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        jpgImage.style.transformOrigin = `${x}% ${y}%`;
        jpgImage.style.transform = "scale(2)"; // Adjust the scale factor as needed
      }
    });

    // Event listeners for zooming
    pngImage.addEventListener("mouseenter", () => {
      pngImage.classList.add("zoomed");
    });

    pngImage.addEventListener("mouseleave", () => {
      pngImage.classList.remove("zoomed");
      pngImage.style.transform = "scale(1)";
    });

    pngImage.addEventListener("mousemove", (event) => {
      if (pngImage.classList.contains("zoomed")) {
        const rect = pngImage.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        pngImage.style.transformOrigin = `${x}% ${y}%`;
        pngImage.style.transform = "scale(2)"; // Adjust the scale factor as needed
      }
    });
  }
}
