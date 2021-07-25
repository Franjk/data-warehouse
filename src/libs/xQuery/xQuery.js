import Component from './Component.js';

function $(query) {
  const el = document.querySelector(query);
  if (el) return new Component(el);
  return null;
}

function $$(query) {
  const els = document.querySelectorAll(query);
  const arr = [];
  if (els) {
    els.forEach(el => arr.push(new Component(el)))
  }
  return arr;
}

export {
  Component,
  $,
  $$
}