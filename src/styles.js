function hideElement(el) {
  el.classList.add('display-none');
}

function unHideElement(el) {
  el.classList.remove('display-none');
}

function hideAllDropdownContent() {
  document.querySelectorAll('.dropdown-content')
    .forEach(el => hideElement(el));
}

function styleComponents() {

  document.querySelectorAll('.dropdown-content')
      .forEach(el => el.addEventListener('click', (e) => {
        e.stopPropagation();
      }));

  document.querySelectorAll('.dropdown-toggler')
    .forEach(el => {
      const $content = el.parentElement.querySelector('.dropdown-content');
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        $content.classList.toggle('display-none');
      })
    })

  document.addEventListener('click', hideAllDropdownContent)

  document.querySelectorAll('.master-chk')
    .forEach(el => {
      el.addEventListener('click', () => {
        document.querySelectorAll(`[data-master-chk="${el.id}"]`)
          .forEach(chk => {
            chk.checked = el.checked;
            chk.dispatchEvent(new CustomEvent('highlight'));
          })
      })

      el.addEventListener('check', () => {
        let total = 0;
        let checkedCount = 0;

        document.querySelectorAll(`[data-master-chk="${el.id}"]`)
          .forEach(chk => {
            total += 1;
            if (chk.checked) checkedCount += 1;
          })

        if(checkedCount === 0) {
          el.indeterminate = false;
          el.checked = false;
        } else if (checkedCount !== total) {
          el.indeterminate = true;
          el.checked = true;
        } else {
          el.indeterminate = false;
          el.checked = true;
        }
      })
   
    })


  hideAllDropdownContent();
}

styleComponents();