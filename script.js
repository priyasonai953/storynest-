/* =========================================================
   TINYTALES — MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------------------------------------------------------
     ELEMENTS
  --------------------------------------------------------- */

  const typeCards = document.querySelectorAll(".type-card");
  const occasionButtons = document.querySelectorAll(".occasion-btn");
  const productButtons = document.querySelectorAll(".product-btn");

  const createType = document.getElementById("createType");
  const createOccasion = document.getElementById("createOccasion");
  const createLanguage = document.getElementById("createLanguage");
  const createPages = document.getElementById("createPages");

  const storyTitle = document.getElementById("storyTitle");
  const personalMessage = document.getElementById("personalMessage");

  const photoInput = document.getElementById("photoInput");
  const photoCount = document.getElementById("photoCount");

  const createPreviewBtn =
    document.getElementById("createPreviewBtn");


  /* ---------------------------------------------------------
     CURRENT TINYTALES SELECTION
  --------------------------------------------------------- */

  const state = {
    type: createType ? createType.value : "Baby / Child",
    occasion: createOccasion ? createOccasion.value : "Birthday",
    product: "Storybook",
    language: createLanguage ? createLanguage.value : "English",
    pages: createPages ? createPages.value : "8",
    title: "",
    message: "",
    photos: []
  };


  /* ---------------------------------------------------------
     TYPE CARDS
  --------------------------------------------------------- */

  typeCards.forEach(card => {

    card.addEventListener("click", () => {

      const type = card.dataset.type;

      if (!type) return;

      state.type = type;

      if (createType) {
        createType.value = type;
      }

      typeCards.forEach(item => {
        item.classList.remove("selected");
      });

      card.classList.add("selected");

      document.getElementById("create")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

    });

  });


  /* ---------------------------------------------------------
     OCCASION BUTTONS
  --------------------------------------------------------- */

  occasionButtons.forEach(button => {

    button.addEventListener("click", () => {

      const occasion = button.dataset.occasion;

      if (!occasion) return;

      state.occasion = occasion;

      occasionButtons.forEach(item => {
        item.classList.remove("selected");
      });

      button.classList.add("selected");

      if (createOccasion) {
        createOccasion.value = occasion;
      }

    });

  });


  /* ---------------------------------------------------------
     PRODUCT BUTTONS
  --------------------------------------------------------- */

  productButtons.forEach(button => {

    button.addEventListener("click", () => {

      const product = button.dataset.product;

      if (!product) return;

      state.product = product;

      productButtons.forEach(item => {
        item.classList.remove("selected");
      });

      button.classList.add("selected");

      if (product === "Gift Card") {

        document.getElementById("create")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

      }

    });

  });


  /* ---------------------------------------------------------
     FORM SYNC
  --------------------------------------------------------- */

  createType?.addEventListener("change", () => {
    state.type = createType.value;
  });

  createOccasion?.addEventListener("change", () => {
    state.occasion = createOccasion.value;
  });

  createLanguage?.addEventListener("change", () => {
    state.language = createLanguage.value;
  });

  createPages?.addEventListener("change", () => {
    state.pages = createPages.value;
  });

  storyTitle?.addEventListener("input", () => {
    state.title = storyTitle.value.trim();
  });

  personalMessage?.addEventListener("input", () => {
    state.message = personalMessage.value.trim();
  });


  /* ---------------------------------------------------------
     PHOTO UPLOAD
  --------------------------------------------------------- */

  photoInput?.addEventListener("change", () => {

    const files = Array.from(photoInput.files || []);

    state.photos = files;

    if (!photoCount) return;

    if (files.length === 0) {

      photoCount.textContent =
        "Original photos are used temporarily for personalization.";

      return;
    }

    const total = files.length;

    photoCount.textContent =
      `${total} photo${total > 1 ? "s" : ""} selected — `
      + "original photos are used temporarily for personalization.";

  });


  /* ---------------------------------------------------------
     CREATE FULL PREVIEW
  --------------------------------------------------------- */

  createPreviewBtn?.addEventListener("click", () => {

    state.type = createType?.value || state.type;
    state.occasion = createOccasion?.value || state.occasion;
    state.language = createLanguage?.value || state.language;
    state.pages = createPages?.value || state.pages;
    state.title = storyTitle?.value.trim() || "";
    state.message = personalMessage?.value.trim() || "";

    if (!state.title) {

      alert(
        "Please enter a story title before creating your preview."
      );

      storyTitle?.focus();

      return;
    }

    if (state.photos.length === 0) {

      const proceed = confirm(
        "No photos have been selected. Continue with your storybook preview?"
      );

      if (!proceed) return;

    }

    /*
      IMPORTANT:
      This button currently prepares the order data only.

      Real AI generation, full book preview,
      payment verification and HD PDF generation
      will be connected through the secure backend.
    */

    const previewData = {
      type: state.type,
      occasion: state.occasion,
      product: state.product,
      language: state.language,
      pages: Number(state.pages),
      title: state.title,
      message: state.message,
      photoCount: state.photos.length
    };

    sessionStorage.setItem(
      "tinytalesPreviewData",
      JSON.stringify(previewData)
    );

    alert(
      "Your TinyTales preview request has been prepared.\n\n"
      + "Next step: the secure AI preview system will generate "
      + "your personalized book."
    );

  });


  /* ---------------------------------------------------------
     HEADER LANGUAGE
  --------------------------------------------------------- */

  const languageSelector =
    document.getElementById("language");

  languageSelector?.addEventListener("change", () => {

    const selectedLanguage = languageSelector.value;

    localStorage.setItem(
      "tinytalesLanguage",
      selectedLanguage
    );

  });


  /* ---------------------------------------------------------
     LOAD SAVED LANGUAGE
  --------------------------------------------------------- */

  const savedLanguage =
    localStorage.getItem("tinytalesLanguage");

  if (
    savedLanguage &&
    languageSelector
  ) {

    languageSelector.value = savedLanguage;

  }


  /* ---------------------------------------------------------
     INITIAL OCCASION / TYPE VISUAL STATE
  --------------------------------------------------------- */

  const initialOccasion =
    createOccasion?.value;

  occasionButtons.forEach(button => {

    if (
      button.dataset.occasion === initialOccasion
    ) {

      button.classList.add("selected");

    }

  });


  typeCards.forEach(card => {

    if (
      card.dataset.type === state.type
    ) {

      card.classList.add("selected");

    }

  });


  /* ---------------------------------------------------------
     ESCAPE-SAFE CONSOLE STATUS
  --------------------------------------------------------- */

  console.log(
    "TinyTales frontend loaded successfully."
  );

});
    

