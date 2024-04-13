const elButton = document.querySelector('.site-header__dark-mode-button')

if(elButton) {
  elButton.addEventListener('click', () => {
    document.querySelector('body').classList.toggle('dark-mode')
  })
}