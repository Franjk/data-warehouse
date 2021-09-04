let activeDropdown;

function hideElement(el) {
  el?.classList.add('display-none');
}

function unHideElement(el) {
  el?.classList.remove('display-none');
}

function toggleElement(el) {
  el.classList.toggle('display-none');
}

function isHidden(el) {
  return el.classList.contains('display-none');
}

function hideAllDropdownContent() {
  document.querySelectorAll('.dropdown-content')
    .forEach(el => hideElement(el));
}

function documentClickHandler(e) {
  const el = e.target;

  // # Dropdowns
  if (el !== activeDropdown) {
    hideElement(activeDropdown);
  }

  if (el.classList.contains('dropdown-toggler')) {
    console.dir(el);
    console.log(el.parentElement);
    if (el.parentElement.classList.contains('dropdown-menu')) {
      const dropdownContent = el.parentElement.querySelector('.dropdown-content');

      if (dropdownContent && dropdownContent !== activeDropdown) {
        activeDropdown = dropdownContent;
        unHideElement(dropdownContent);
      } else {
        hideElement(dropdownContent);
        activeDropdown = null;
      }
     
    }
  }

  // # Hidden Menus
  if (el.classList.contains('hidden-toggler')) {
    if (el.parentElement.classList.contains('hidden-menu')) {
      const hiddenContent = el.parentElement.querySelector('.hidden-content');
      unHideElement(hiddenContent);
      hideElement(el);
    }
  }



  // # Inputs

  // ## Checkbox
  if (el.classList.contains('master-chk')) {
    document.querySelectorAll(`[data-master-chk="${el.id}"]`)
      .forEach(chk => {
        chk.checked = el.checked;
        chk.dispatchEvent(new CustomEvent('update'));
      });
  }

  if (el.dataset.masterChk) {
    const masterChk = document.querySelector(`#${el.dataset.masterChk}`);
    let total = 0;
    let checkedCount = 0;

    document.querySelectorAll(`[data-master-chk="${el.dataset.masterChk}"]`)
      .forEach(chk => {
        total += 1;
        if (chk.checked) checkedCount += 1;
      });

    if(checkedCount === 0) {
      masterChk.indeterminate = false;
      masterChk.checked = false;
    } else if (checkedCount !== total) {
      masterChk.indeterminate = true;
      masterChk.checked = true;
    } else {
      masterChk.indeterminate = false;
      masterChk.checked = true;
    }
  }

  if (el.nodeName === 'INPUT') {
    el.dispatchEvent(new CustomEvent('update'));
  }

}

function styleComponents() {


  document.addEventListener('click', documentClickHandler);

  document.querySelectorAll('.master-chk')
    .forEach(el => {
      console.log(el);
      el.addEventListener('click', () => {
        console.log(el);
        document.querySelectorAll(`[data-master-chk="${el.id}"]`)
          .forEach(chk => {
            console.log(chk);
            chk.checked = el.checked;
            chk.dispatchEvent(new CustomEvent('update'));
          });
      });

      el.addEventListener('check', () => {
        let total = 0;
        let checkedCount = 0;

        document.querySelectorAll(`[data-master-chk="${el.id}"]`)
          .forEach(chk => {
            total += 1;
            if (chk.checked) checkedCount += 1;
          });

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
      });
   
    });


  hideAllDropdownContent();
}

styleComponents();