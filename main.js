
"use strict";
{
  const gallery = document.querySelector('.gallery')
  const track = document.querySelector('.gallery-track');
  const originalWidth = track.scrollWidth;

  track.innerHTML += track.innerHTML;

  let position = 0;
  const speed = 1;

  function autoSlide() {

    position -= speed;
    track.style.transform = `translateX(${position}px)`;

    if (Math.abs(position) >= originalWidth) {
      position += originalWidth;
    }
    requestAnimationFrame(autoSlide);
  }
  autoSlide();

  const menus = document.querySelectorAll('.menu-block');
  const menuSelect = document.getElementById('menu');

  menuSelect.addEventListener('change', () => {
    menus.forEach(menu => {
      const inputs = menu.querySelectorAll('input, select')

      if (menu.id === menuSelect.value) {
        menu.classList.add('menu-action');
        inputs.forEach(i => i.required = true);
      } else {
        menu.classList.remove('menu-action')
        inputs.forEach(i => i.required = false);
      }
    })
  })
  const form = document.getElementById('reserve-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('送信しました')
  })

  const open = document.getElementById('open');
  const close = document.getElementById('close');
  const modal = document.querySelector('.modal');
  const lists = document.querySelectorAll('.modal li');

  open.addEventListener('click', () => {
    modal.classList.add('show');
  })
  close.addEventListener('click', () => {
    modal.classList.remove('show');
  })

  lists.forEach((list) => {
    list.addEventListener('click', () => {
      modal.classList.remove('show');
    })
  })

  const dots = document.querySelectorAll('.dot');
  const slider = document.querySelector('.slider');

  slider.addEventListener('scroll', () => {
    const index = Math.round(
      slider.scrollLeft / slider.clientWidth
    );
    dots.forEach(dot => {
      dot.classList.remove('active');
      dots[index]?.classList.add('active');
    })
  })
}