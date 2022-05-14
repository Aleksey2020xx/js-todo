(function () {

  function createAppTitle(appTitle) {
    let title = document.createElement('h1')
    title.innerHTML = appTitle;

    return title;
  }

  function createTodoForm() {
    let form = document.createElement('form');
    let input = document.createElement('input');
		let buttonWrapper = document.createElement('div');
    let button = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
		input.classList.add('form-control');
		input.placeholder = 'Введите название нового дела';
		buttonWrapper.classList.add('input-group-append');
		button.classList.add('btn', 'btn-primary');
		button.textContent = 'Добавить дело';

    buttonWrapper.append(button);
		form.append(input);
		form.append(buttonWrapper);

    return {
      form,
      input,
      button,
    };
  }

  function createTodoList() {
    let list = document.createElement('ul');

    return list;
  }

  function createTodoListItem(el) {
    // создаем группу для кнопок
		let item = document.createElement('li')

		let buttonGroup = document.createElement('div');
		let buttonDone = document.createElement('button');
		let buttonDelete = document.createElement('button');

		// устанавливаем стили для элемента списка, а также для размещения кнопок,
		// а так же для размещения его справа с помощью flex
		item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

    buttonGroup.classList.add('btn-group', 'btn-group-sm');
		buttonDone.classList.add('btn', 'btn-success');
		buttonDone.textContent = 'Готово';
		buttonDelete.classList.add('btn', 'btn-danger');
		buttonDelete.textContent = 'Удалить';
    item.innerHTML = el;

    buttonGroup.append(buttonDone);
		buttonGroup.append(buttonDelete);
		item.append(buttonGroup);
    
    return {
      buttonDelete,
      buttonDone,
      item,
    };	
  }

  function createTodoContainer(containerBody, appTitle = 'Мои дела', obj) {

    let titleBody = createAppTitle(appTitle);
    let formBody = createTodoForm();
    let listBody = createTodoList();

		function createTodoArray(obj) {
			for (let i in obj) {
				let listItem = createTodoListItem(obj[i].name);
				
				if (obj[i].done === true) {
					listItem.item.classList.add('list-group-item-success')
				}
				listBody.append(listItem.item); 	         
			}
		}

		createTodoArray(obj)
    
		formBody.button.disabled = true;
			formBody.input.addEventListener('input', function () {
				if(formBody.input.value === '') {
					formBody.button.disabled = true;
				} else {
					formBody.button.disabled = false;
				}
			});

    containerBody.append(titleBody);
    containerBody.append(formBody.form);
    containerBody.append(listBody);

		function appTodoArr(el) {
			let max = 100;
			let min = 0;
			arrayItemValue.push({value: formBody.input.value, id: Math.round(Math.random() * (max - min) + min)})

			let listItem = createTodoListItem(formBody.input.value);
			listBody.append(listItem.item)

			for (let i in arrayItemValue) {
				
				listItem.item.setAttribute('id', arrayItemValue[i].id);

				listItem.buttonDone.onclick = function () {
					listItem.item.classList.toggle('list-group-item-success')
					
					if (listItem.item.classList.contains('list-group-item-success')) {
						listItem.item.setAttribute('done', 'done')
						arrayItemValue[i].done = listItem.item.getAttribute('done')
						localStorage.setItem(el, JSON.stringify(arrayItemValue))
					} else {
						listItem.item.removeAttribute('done')
						arrayItemValue[i].done = '';
						localStorage.setItem(el, JSON.stringify(arrayItemValue))
					}	
				}
				
				listItem.buttonDelete.onclick = function (event) {
					if(confirm('Вы уверены, что хотите удалить дело?')) {
						listItem.item.remove()
						let idItem = event.target.parentNode.parentNode.id
						let strId = String(idItem)
						
						let idItems = arrayItemValue.map(el => el.id)
						let stringIdItems = [];
						for (let i in idItems) {
							let stringIdItem = String(idItems[i])
							stringIdItems.push(stringIdItem)
						}

						let itemIndexRemove = stringIdItems.indexOf(strId);
						arrayItemValue.splice(itemIndexRemove, 1)
						idItems.splice(itemIndexRemove, 1)
						
						localStorage.setItem(el, JSON.stringify(arrayItemValue))
					}
				}	
			}
			localStorage.setItem(el, JSON.stringify(arrayItemValue))
		}
    
    let arrayItemValue = [];

    formBody.form.addEventListener('submit', function (e) {
      e.preventDefault();

			if (appTitle === 'Мои дела') {
				appTodoArr('listMy')
			} else if (appTitle === 'Дела мамы') {
				appTodoArr('listMom')
			} else {
				appTodoArr('listDad')
			}

      formBody.input.value = '';
			formBody.button.disabled = true;
    })


    if (appTitle === 'Мои дела') {
			restoredList = JSON.parse(localStorage.getItem('listMy'))
		} else if (appTitle === 'Дела мамы') {
			restoredList = JSON.parse(localStorage.getItem('listMom'))
		} else {
			restoredList = JSON.parse(localStorage.getItem('listDad'))
		}

    function appTodoRestoredArr(el) {
			for (let i in restoredList) {

				let listItem = createTodoListItem(restoredList[i].value)
				listItem.item.setAttribute('id', restoredList[i].id)
				listBody.append(listItem.item)
				arrayItemValue.push(restoredList[i])
				if(arrayItemValue[i].done === 'done') {    
					listItem.item.classList.toggle(('list-group-item-success'))
				}

				listItem.buttonDone.addEventListener('click', function () {
					listItem.item.classList.toggle(('list-group-item-success'))

					if (listItem.item.classList.contains('list-group-item-success')) {
						listItem.item.setAttribute('done', 'done')
						arrayItemValue[i].done = listItem.item.getAttribute('done')
						localStorage.setItem(el, JSON.stringify(arrayItemValue))
					} else {
						listItem.item.removeAttribute('done')
						arrayItemValue[i].done = '';
						
						localStorage.setItem(el, JSON.stringify(arrayItemValue))
					}
				}) 

				listItem.buttonDelete.onclick = function (event) {
					
					if(confirm('Вы уверены, что хотите удалить дело?')) {
						listItem.item.remove();
						let idItemLS = event.target.parentNode.parentNode.id
						console.log(idItemLS)
						let strIdLS = String(idItemLS)
						
						let idItemsls = arrayItemValue.map(el => el.id)
						console.log(idItemsls)
						let stringIdItemsLS = [];
						for (let i in idItemsls) {
							let stringIdItemLS = String(idItemsls[i])
							stringIdItemsLS.push(stringIdItemLS)
						}

						let itemIndexRemove = stringIdItemsLS.indexOf(strIdLS);
						console.log(itemIndexRemove)
						arrayItemValue.splice(itemIndexRemove, 1)
						idItemsls.splice(itemIndexRemove, 1)
						localStorage.setItem(el, JSON.stringify(arrayItemValue))
					}
				}
    	}
		}

		if(appTitle === 'Мои дела') {
			appTodoRestoredArr('listMy')
		} else if (appTitle === 'Дела мамы') {
			appTodoRestoredArr('listMom')
		} else {
			appTodoRestoredArr('listDad')
		}
  }

	window.createTodoContainer = createTodoContainer;
})();