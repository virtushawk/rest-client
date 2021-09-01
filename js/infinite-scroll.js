import { getCertificates } from "../js/request.js";

const certificatesEl = document.querySelector(".main-div");
const loader = document.querySelector(".loader");
const input = document.querySelector(".nav__search__input");
const select = document.querySelector(".nav__search__select");
const topButton = document.querySelector(".topButton");
const lastPositionButton = document.querySelector(".lastPositionButton");

let currentPage = 0;
let size = 10;
let lastScroll = 0;

const hideLoader = () => {
  loader.classList.remove("show");
};

const showLoader = () => {
  loader.classList.add("show");
};

function throttle(func, wait, options) {
  var context, args, result;
  var timeout = null;
  var previous = 0;
  if (!options) options = {};
  var later = function () {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function () {
    var now = Date.now();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
}

async function inputSearchEvent(e) {
  try {
    showLoader();
    currentPage = 0;
    size = 10;
    const response = await getCertificatesByQuery(
      currentPage,
      size,
      e.target.value,
      select.value
    );
    clearCertificates();
    showCertificates(response);
  } catch (error) {
    console.log(error.message);
  } finally {
    hideLoader();
  }
}

const clearCertificates = () => {
  certificatesEl.textContent = "";
};

class ViewRenderer {
  static renderCertificate(certificate) {
    return `
            <div class="item-photo">
            <img class="photo" src="${certificate.image}>"</div>
          <a class="item-name" href="item.html">${certificate.name}</a>
          <div class="item-description">
          <div class="item-text">${certificate.description}</div>
        </div>
        <div class="item-date">
          ${certificate.duration} : days
          </div>
          <div class="item-price">
            <div class="item-price-text">
              ${certificate.price}
            </div>
            <button class="item-button" type="button" name="button">Add to Cart</button>
          </div>
        `;
  }
}

// const getCertificates = async (page, size) => {
//   const API_URL = `http://localhost:8080/application/v3/certificates?page=${page}&size=${size}`;
//   const response = await fetch(API_URL);
//   if (!response.ok) {
//     throw new Error(`An error occurred: ${response.status}`);
//   }
//   return await response.json();
// };

const getCertificatesByQuery = async (page, size, text, selector) => {
  console.log(page, size, text, selector);
  const API_URL_tags = `http://localhost:8080/application/v3/certificates?tags=${text}&page=${page}&size=${size}`;
  const API_URL_text = `http://localhost:8080/application/v3/certificates?text=${text}&page=${page}&size=${size}`;
  let response;
  if (selector === "tags") {
    response = await fetch(API_URL_tags);
  } else {
    response = await fetch(API_URL_text);
  }
  if (!response.ok) {
    throw new Error(`An error occurred: ${response.status}`);
  }
  return await response.json();
};

const loadCertificates = async (page, limit) => {
  showLoader();
  try {
    const response = await getCertificates(page, limit);
    showCertificates(response);
  } catch (error) {
    console.log(error.message);
  } finally {
    hideLoader();
  }
};

const showCertificates = (certificates) => {
  certificates.forEach((certificate) => {
    console.log(certificate);
    const certificateEl = document.createElement("div");
    certificateEl.classList.add("item");
    console.log(certificate.description);
    certificateEl.innerHTML = ViewRenderer.renderCertificate(certificate);
    certificatesEl.appendChild(certificateEl);
  });
};

function scrollEvent() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight) {
    currentPage++;
    loadCertificates(currentPage, size);
  }
}

window.addEventListener(
  "scroll",
  throttle(
    scrollEvent,
    {
      passive: true,
    },
    5000,
    {
      trailing: true,
      leading: true,
    }
  )
);

function TopButtonScroll() {
  const { scrollTop } = document.documentElement;
  if (scrollTop > 20) {
    topButton.style.display = "block";
  } else {
    topButton.style.display = "none";
  }
}

function lastPositionFunction() {
  const { scrollTop } = document.documentElement;
  if (scrollTop < lastScroll) {
    lastPositionButton.style.display = "block";
  } else {
    lastPositionButton.style.display = "none";
  }
}

window.addEventListener("scroll", TopButtonScroll);
window.addEventListener("scroll", lastPositionFunction);

function topFunction() {
  lastScroll = document.documentElement.scrollTop;
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function lastFunction() {
  document.documentElement.scrollTop = lastScroll; // For Chrome, Firefox, IE and Opera
}

topButton.addEventListener("click", topFunction);

loadCertificates(currentPage, size);

input.addEventListener("input", inputSearchEvent);

lastPositionButton.addEventListener("click", lastFunction);
