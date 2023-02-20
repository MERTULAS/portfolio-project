function customCursorAnimation(element) {
  const customCursor = document.getElementById("custom-cursor");
  element.addEventListener("mouseover", () => {
    customCursor.classList.add("custom-cursor-hovered");
  });

  element.addEventListener("mouseout", () => {
    customCursor.classList.remove("custom-cursor-hovered");
  });
}

export default customCursorAnimation;
