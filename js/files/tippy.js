// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile, FLS } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

// Підключення з node_modules
import tippy from 'tippy.js';

// Підключення стилів з src/scss/libs
import "../../scss/libs/tippy.scss";
// Підключення стилів з node_modules
//import 'tippy.js/dist/tippy.css';

// Запускаємо та додаємо в об'єкт модулів
// Wait for the DOM to be fully loaded
// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
  // Initialize Tippy with the appropriate configuration
  flsModules.tippy = tippy('.progress-step', {
    content(reference) {
      const id = reference.getAttribute('data-template');
      const template = document.getElementById(id);

      // Check if the template element exists before accessing its innerHTML
      if (template) {
        return template.innerHTML;
      } else {
        return 'Template not found';
      }
    },
    allowHTML: true,
    onShow(instance) {
      const isActive = instance.reference.classList.contains('actived');
      instance.popper.classList.add('levelbar-tooltip');
      // Add a custom class based on the presence of the 'actived' class
      if (isActive) {
        instance.popper.classList.add('type-done');
      }
    },
  });
});

