import { getCertificates } from "../js/request";

const certificatesEl = document.querySelector(".main-div");
let currentPage = 0;
let size = 10;

const loadCertificates = async (page, limit) => {
  try {
    const response = await getCertificates(page, limit);
    showCertificates(response);
  } catch (error) {
    console.log(error.message);
  }
};

const showCertificates = (certificates) => {
  certificates.forEach((certificate) => {
    const certificateEl = document.createElement("div");
    certificateEl.classList.add("item");

    certificateEl.innerHTML = `
            <div class="item-photo"></div>
          <a class="item-name" href="item.html">${certificate.name}</a>
          <div class="item-description">
          <div class="item-text"${certificate.description}</div>
          <div class="item-date">
          ${certificate.duration}
          </div>
        </div>
          <div class="item-price">
            <div class="item-price-text">
              ${certificate.price}
            </div>
            <button class="item-button" type="button" name="button">Add to Cart</button>
          </div>
        `;

    certificatesEl.appendChild(certificateEl);
  });
};

loadCertificates(currentPage, size);
