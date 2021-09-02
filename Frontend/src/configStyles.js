export default () => {
  document.querySelectorAll('input-indeterminate')
    .forEach(el => el.indeterminate = true);
}