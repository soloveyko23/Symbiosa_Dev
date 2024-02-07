// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile, _slideUp, _slideDown, _slideToggle, FLS } from "../files/functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";


const clickCreateRipple = () => {
  function createRipple(event) {
    const target = event.currentTarget;

    // Проверяем, если нажали на элемент с классом no-ripple, прекращаем выполнение
    if (event.target.closest('.no-ripple')) {
      return;
    }

    const ripple = document.createElement("span");
    const rect = target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.className = "ripple";

    target.appendChild(ripple);

    ripple.addEventListener("animationend", () => {
      ripple.remove();
    });
  }

  // const menuItems = document.querySelectorAll("[data-ripple]");
  // menuItems.forEach((menuItem) => {
  //   menuItem.addEventListener("click", createRipple);
  // });

  $(document).on('click', '[data-ripple]', createRipple);
};

function copyReferral() {
  document.addEventListener("DOMContentLoaded", function() {

      const inputReferralLink = document.querySelector(".referrals-program__link");

      if (inputReferralLink) {
          const button = document.querySelector(".button-copy-link-referral");
          const inputReferral = document.querySelector(".input-referral");
          inputReferral.value = inputReferral.getAttribute('data-value');
          let clickHandler = function() {
              inputReferral.select();
              document.execCommand("copy");
              window.getSelection().removeAllRanges();

              // Создаем элемент span
              // const span = document.createElement("span");
              // span.className = "text-body-md-light referral-program__link-thank flex items-center gap-2";
              // span.innerHTML = `${inputReferral.getAttribute('data-after-text')} <img width="16" height="16" src="./img/icons-ios/check.png"/>`;
              inputReferral.value = '';
              inputReferral.placeholder = 'Copied!';
              // Вставляем span перед inputReferralLink

              // Удаляем span с задержкой
              setTimeout(()=>{
                  inputReferral.value = inputReferral.getAttribute('data-value');
              

                  // Восстанавливаем обработчик события
                  inputReferralLink.addEventListener("click", clickHandler);
              }
              , 3000);

              // Удаляем обработчик события после первого выполнения
              inputReferralLink.removeEventListener("click", clickHandler);
          };

          inputReferralLink.addEventListener("click", clickHandler);
      }

  });
}

function cardTags() {
  document.addEventListener('DOMContentLoaded', () => {
    const cardTagsList = document.querySelectorAll('.card-tags');

    cardTagsList.forEach((cardTags) => {
        const cardTagSpans = cardTags.querySelectorAll('.card-tag:not(.card-tag-btn--more)');
        const moreButton = cardTags.querySelector('.card-tag-btn--more');
        let dataTags = parseInt(cardTags.getAttribute('data-tags'));

        const showHideTags = () => {
            cardTagSpans.forEach((tag, index) => {
                tag.classList.toggle('!hidden', index >= dataTags);
            });

            const hiddenCount = cardTagSpans.length - dataTags;
            moreButton.querySelector('.hidden-count').textContent = hiddenCount > 0 ? ` +${hiddenCount} more` : '';
            moreButton.classList.toggle('!hidden', dataTags >= cardTagSpans.length);
        };

        showHideTags();
        if(!moreButton.classList.contains('no-click')) {
          moreButton.addEventListener('click', (e) => {
            e.preventDefault();
              dataTags += 2;
              showHideTags();
          });
        }
     
    });
});
}

const filters = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const filters = document.querySelectorAll('.filters-block');
    filters.forEach(filter => {
      const buttonFilter = filter.querySelector('.button-filter');
      const filterMore = filter.querySelector('.filters__more');

      if (buttonFilter && filterMore) {
        buttonFilter.addEventListener('click', () => {
          _slideToggle(filterMore);

          buttonFilter.classList.toggle('active');
        });
      }
    });
  });
};

const removeDividerTextPopup = () => {
  document.addEventListener('DOMContentLoaded', function () {
    var popupContainers = document.querySelectorAll('.popup__text-inner');
  
    popupContainers.forEach(function (popupContainer) {
      popupContainer.addEventListener('scroll', function () {
        var popupText = popupContainer.closest('.popup__text');
        if (popupContainer.scrollTop + popupContainer.clientHeight === popupContainer.scrollHeight) {
          // Конец скролла достигнут для текущего блока
          popupText.classList.add('hide');
        } else {
          // Если скролл не в конце, удаляем класс
          popupText.classList.remove('hide');
        }
      });
    });
  });
};

const customSelectCheckbox = () => {
  document.addEventListener('DOMContentLoaded', () => {
      const selects = document.querySelectorAll('.custom-select');

      selects.forEach((select) => {
          const title = select.querySelector('.select__title');
          const options = select.querySelector('.select__options');
          const badge = select.querySelector('.badge--numeric');
          const checkboxes = select.querySelectorAll('.select__option input');

          options.hidden = true;
          title.addEventListener('click', () => {
              _slideToggle(options, 150);
              select.classList.toggle('_select-open');
          });

          checkboxes.forEach((checkbox) => {
              checkbox.addEventListener('change', updateBadge);
          });

          function updateBadge() {
              const selectedCount = Array.from(checkboxes).filter((checkbox) => checkbox.checked).length;
              badge.textContent = selectedCount;
              if (selectedCount === 0) {
                  badge.hidden = true;
              } else {
                  badge.hidden = false;
              }
          }

          // Initialize badge based on initial checkbox state
          updateBadge();
      });

      // Close custom-select when clicking outside
      document.addEventListener('click', (event) => {
          selects.forEach((select) => {
              const isClickInsideSelect = select.contains(event.target);
              if (!isClickInsideSelect && select.classList.contains('_select-open')) {
                  select.classList.remove('_select-open');
                  _slideUp(select.querySelector('.select__options'), 150);
              }
          });
      });
  });
};

const checklistProjectPopupCount = () => {
  document.addEventListener("DOMContentLoaded", function () {
    const deliverablesProject = document.querySelector('.checklist-project');
  
    if (deliverablesProject) {
      const checklistRequired = deliverablesProject.querySelector('.checklist-required span');
      const checklistSelected = deliverablesProject.querySelector('.checklist-selected span');
  
      const updateChecklistCounts = () => {
        const requiredItems = deliverablesProject.querySelectorAll('.deliverables-project__item.item-required');
        const selectedItemsAll = deliverablesProject.querySelectorAll('.deliverables-project__item input[type="checkbox"]');
        const selectedItems = deliverablesProject.querySelectorAll('.deliverables-project__item input[type="checkbox"]:checked');
  
        if (checklistRequired) {
          checklistRequired.textContent = requiredItems.length;
        }
  
        if (checklistSelected) {
          checklistSelected.textContent = `${selectedItems.length} / ${selectedItemsAll.length}`;
        }
      };
  
      deliverablesProject.addEventListener('change', (event) => {
        if (event.target.type === 'checkbox') {
          updateChecklistCounts();
        }
      });
  
      // Инициализация при загрузке страницы
      updateChecklistCounts();
    }
  });
}


const onlyNumInputs = document.querySelectorAll('.only-num');
if (onlyNumInputs) {
  onlyNumInputs.forEach(input => {
    input.addEventListener('input', function (event) {
      // Заменяем все нецифровые символы на пустую строку
      const sanitizedValue = event.target.value.replace(/\D/g, '');

      // Устанавливаем очищенное значение в поле ввода
      event.target.value = sanitizedValue;
    });
  });
}


const popupOfferFormCheck = () => {
  document.addEventListener('DOMContentLoaded', function () {
      const form = document.querySelector('form.popup-offer-form');
      if (form) {
          const submitButton = form.querySelector('button[type="submit"]');

          function checkFields() {
              let allRequiredFilled = true;

              form.querySelectorAll('[data-required]').forEach(field => {
                  if (field.type === 'checkbox') {
                      // If it's a checkbox, check if it's checked
                      if (!field.checked) {
                          allRequiredFilled = false;
                      }
                  } else {
                      // For other fields, check that the value is not empty or <= 0
                      if (field.value.trim() === '' || parseFloat(field.value) <= 0) {
                          allRequiredFilled = false;
                      }
                  }
              });

              return allRequiredFilled;
          }

          function updateSubmitButton() {
            if(submitButton) {
              submitButton.disabled = !checkFields();
            }
         
          }

          form.addEventListener('input', updateSubmitButton);

          updateSubmitButton();

          const buttonResetInputs = () => {
              const inputLines = document.querySelectorAll('.input-line');

              inputLines.forEach(function (inputLine) {
                  const resetButton = inputLine.querySelector('.button-reset');

                  if (resetButton) {
                      resetButton.addEventListener('click', function (e) {
                          e.preventDefault();
                          const inputField = inputLine.querySelector('input');
                          if (inputField) {
                              inputField.value = '';
                              updateSubmitButton(); // Update button state after reset
                          }
                      });
                  }
              });
          };

          buttonResetInputs();
      }

  });
};

const validationCurrencyInput = () => {
  const formatCurrency = amount => amount.toLocaleString('en-US', { maximumFractionDigits: 0 });

  const currencyInputs = document.querySelectorAll('input.input-currency');
  currencyInputs.forEach(input => {
    input.addEventListener('input', event => {
      let commission = Number($(event.target).attr('data-commission')),
          value = Number($(event.target).val().replace(/,/g, '')); // Исправлено для замены всех запятых

      let offerFee = value * commission / 100;
      let total = value * ((100 - commission) / 100);

      $('.offer-fee').text(`-${commission}% (Tier ${$(event.target).attr("data-level")} Fee) = $${formatCurrency(offerFee)}`);
      $('.offer-total').text(`$${formatCurrency(total)}`);

      // Установка значения в value элемента #currency_total
      $('#currency_total').val(total);
    });    
  });
};





const autoHeightForTextarea = () => {
  const textareas = document.querySelectorAll('textarea[data-autoheight]');
  if (textareas.length) {
    textareas.forEach(textarea => {
      const startHeight = textarea.hasAttribute('data-autoheight-min') ?
        Number(textarea.dataset.autoheightMin) : Number(textarea.offsetHeight);
      const maxHeight = textarea.hasAttribute('data-autoheight-max') ?
        Number(textarea.dataset.autoheightMax) : Infinity;
      setHeight(textarea, Math.min(startHeight, maxHeight))
      textarea.addEventListener('input', () => {
        if (textarea.scrollHeight > startHeight) {
          textarea.style.height = `auto`;
          setHeight(textarea, Math.min(Math.max(textarea.scrollHeight, startHeight), maxHeight));
        }
      });
    });
    function setHeight(textarea, height) {
      textarea.style.height = `${height}px`;
    }
  }
};

window.onload = function() {
  var activeTab = document.querySelector('.tabs__navigation .tabs__title._tab-active');
  if (activeTab) {
      activeTab.scrollIntoView({ behavior: 'instant', block: 'center', inline: 'start' });
  }
};


class StarRating {
  constructor(qs) {
    this.el = document.querySelector(qs);

    // Ensure the main element exists
    if (!this.el) {
      return;
    }

    this.ratings = [
      { id: 1, name: "Terrible" },
      { id: 2, name: "Bad" },
      { id: 3, name: "OK" },
      { id: 4, name: "Good" },
      { id: 5, name: "Excellent" },
    ];
    this.rating = null;

    // Ensure the submit button exists
    this.submitButton = document.getElementById("submit-buttonReview");
    if (!this.submitButton) {
      return;
    }

    this.initButtonState();
    this.init();
  }

  init() {
    document.addEventListener("input", this.handleInputChange.bind(this));

    try {
      this.el.reset();
    } catch (err) {}
  }

  initButtonState() {
    this.submitButton.disabled = true;

    // Event listener for input fields and textarea to enable the button when typing
    const inputFields = this.el.querySelectorAll("input, textarea");
    inputFields.forEach((field) => {
      field.addEventListener("input", () => {
        this.submitButton.disabled = !this.isFormValid();
      });
    });
  }

  handleInputChange(e) {
    this.updateRating(e);
  }

  isFormValid() {
    const inputFields = this.el.querySelectorAll("textarea");

    // Check if at least one input field is not empty
    for (const field of inputFields) {
      if (field.value.trim() !== "") {
        return this.rating !== null;
      }
    }

    return false;
  }

  updateRating(e) {
    if (e.target.matches("[name^='rating']")) {
      const ratingValue = parseInt(e.target.value, 10); // Ensure the value is an integer
      const ratingObject = this.ratings.find((r) => r.id === ratingValue);

      // Check if the ratingObject is valid
      if (!ratingObject) {
        return; // Early return on invalid rating
      }

      this.rating = ratingObject;
      this.updateLabels(ratingValue);
      this.submitButton.disabled = !this.isFormValid(); // Enable/disable submit button based on form validity
    }
  }

  updateLabels(selectedRatingId) {
    const labels = this.el.querySelectorAll(`[for*="rating"]`);
    labels.forEach((label) => (label.className = "rating__label")); // Reset classes

    let delay = 0;
    this.ratings.forEach((rating) => {
      const label = this.el.querySelector(`[for="rating-${rating.id}"]`);
      const textEl = this.el.querySelector(`[data-rating="${rating.id}"]`);

      if (rating.id > selectedRatingId) {
        delay++;
        label.classList.add(`rating__label--delay${delay}`);
      }

      if (textEl) {
        textEl.hidden = rating.id !== selectedRatingId;
      }
    });
  }
}

// Initialization of StarRating when the DOM content is loaded
window.addEventListener("DOMContentLoaded", () => {
  const starRating = new StarRating("form.popup-review-form");
});









validationCurrencyInput();
cardTags();
filters();
customSelectCheckbox();
copyReferral();
removeDividerTextPopup();
clickCreateRipple();
checklistProjectPopupCount();
popupOfferFormCheck();
autoHeightForTextarea();
$(document).ready(function () {
  if (typeof flatpickr === "function") {
    document.querySelectorAll('.input-date').forEach(function (inputDate) {
      var dateInput = inputDate.querySelector('.date-input');
    
      if (dateInput) {
        flatpickr(dateInput, {
          dateFormat: 'Y-m-d',
          minDate: 'today',
          appendTo: inputDate, // Указываем явно контейнер для вставки
          position: 'custom', // Установим custom для вручную заданного позиционирования
        });
      }
    });
    
    
    
    
    
    
    
    
    
    
    
  
    if($('.date-input-without-time').length) {
   
      jQuery('.date-input-without-time').flatpickr({
        dateFormat: 'Y-m-d',
        enableTime: false,
        time_24hr: false, 
        maxDate:  new Date().fp_incr(-365 * 16), 
      });
    }
  } 

  if (typeof Fancybox === "function") {
    if($('[data-fancybox="gallery"]')) {
      Fancybox.bind('[data-fancybox="gallery"]', {
      });
    }
  } 

});



document.addEventListener("DOMContentLoaded", function() {
  const maxDeliverables = 10; // Максимальное количество пунктов
  let deliverablesCount = 0; // Текущее количество пунктов
  if(document.querySelector('.checklist-delivarables')) {
    const addButton = document.querySelector('.add-button'); // Кнопка добавления

  function updateDeliverables() {
    const items = document.querySelectorAll(".checklist-delivarables__item");
    items.forEach((item, index) => {
      // Обновление текста
      if(item) {
        item.querySelector('p').innerText = `Deliverable #${index + 1}`;
  
        // Получение и обновление чекбокса и лейбла
        let checkbox = item.querySelector('.checkbox__input');
        let label = item.querySelector('.checkbox__label');
    
        // Генерируем новый уникальный ID на основе индекса
        let newId = `isRequiredDeliverable_${index + 1}`;
    
        // Обновляем ID чекбокса и 'for' атрибут лейбла
        checkbox.id = newId;
        label.setAttribute('for', newId);  
      }
      
    });
  
    // Обновляем количество и текст
    deliverablesCount = items.length;
    document.querySelector('.checklist-delivarables span').innerText = `${deliverablesCount} / ${maxDeliverables}`;
  
    // Обновляем состояние кнопки добавления
    if(deliverablesCount >= maxDeliverables) {
      addButton.disabled = true;
    } else {
      addButton.disabled = false;
    }
  }

  // Функция для добавления шаблона
  function addTemplate() {
    if(deliverablesCount < maxDeliverables) {
      let templateHtml = `
      <div class="checklist-delivarables__item">
        <div class="flex items-center justify-between w-full flex-wrap gap-3">
          <p class="text-body-md-medium text-secondary">
            Deliverable #${deliverablesCount + 1}
          </p>
          <div class="item-controls">
            <div class="checkbox">
              <input id="isRequiredDeliverable_${deliverablesCount + 1}" class="checkbox__input" type="checkbox" value="1" name="form[]">
              <label for="isRequiredDeliverable_${deliverablesCount + 1}" class="checkbox__label"><span class="checkbox__text">Required</span></label>
            </div>
            <button type="button" class="link link--large link--red delete-button">Remove</button>
          </div>
        </div>
        <div class="form__line">
          <label for="deliverablesTitle_${deliverablesCount + 1}" class="form__label form__label-required">Title</label>
          <input autocomplete="off" type="text" name="form[]" id="deliverablesTitle_${deliverablesCount + 1}" placeholder="Enter the deliverable title" class="input">
        </div>
        <div class="form__line">
          <label for="deliverablesDesc_${deliverablesCount + 1}" class="form__label">Description</label>
          <textarea autocomplete="off" name="form[]" id="deliverablesDesc_${deliverablesCount + 1}" placeholder="Enter the description" class="input"></textarea>
        </div>
      </div>`;

      let container = document.querySelector(".checklist-delivarables__list");
      container.insertAdjacentHTML('beforeend', templateHtml);
      updateDeliverables();
    }
  }

  // Обработчик нажатия на кнопку добавления
  addButton.addEventListener('click', addTemplate);

  // Обработчик нажатия на кнопку удаления
  document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('delete-button')) {
      const item = e.target.closest('.checklist-delivarables__item');
      item.classList.add('removing');
      item.addEventListener('animationend', () => {
        item.remove();
        updateDeliverables();
      });
    }
  });
  }
  
});








