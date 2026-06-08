// Fade-in ao rolar
const elements = document.querySelectorAll("section");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
    }
  });
});

elements.forEach(el => {
  el.style.opacity = 0;
  el.style.transform = "translateY(30px)";
  el.style.transition = "0.6s";
  observer.observe(el);
});

// Scrolling IMG ao rolar
const frameCount = 4; // quantidade de imagens

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

canvas.width = 1280;
canvas.height = 720;

// gera caminho das imagens
const currentFrame = index => {
  return `images/frame_${String(index).padStart(4, '1')}.png`;
};

const images = [];
const imageObj = new Image();

// pré-carregar imagens
for (let i = 1; i <= frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

// desenha primeira imagem
images[0].onload = () => {
  context.drawImage(images[0], 0, 0);
};

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;

  const scrollFraction = scrollTop / maxScroll;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.floor(scrollFraction * frameCount)
  );

  context.drawImage(images[frameIndex], 0, 0);
});
