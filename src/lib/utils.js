export const createButton = (text, id, clickevent) => {
  const element = document.createElement('button');
  element.innerText = text;
  element.id = id;
  if (clickevent) element.addEventListener('click', clickevent);
  element.classList.add('button', 'is-info', 'block');
  return element;
};

export const createInput = (text, id, type = 'text') => {
  const container = document.createElement('div');
  container.classList.add('mg-top');
  const label = document.createElement('label');
  label.innerText = text;
  label.classList.add('label');
  const input = document.createElement('input');
  input.type = type;
  input.id = id;
  input.classList.add('input', 'is-info');
  container.append(label, input);
  return [container, input];
};

export const createGoogleButton = () => {
  const googleButton = document.createElement('div');
  googleButton.classList.add('google_button');

  const googleIconWrapper = document.createElement('div');
  googleIconWrapper.classList.add('google_button_icon_wrapper');

  const imageIcon = document.createElement('img');
  imageIcon.classList.add('google_button_icon');
  imageIcon.src = 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg';

  const text = document.createElement('p');
  text.classList.add('google_button_tex');
  text.innerHTML = '<b>Ingresar</b>';

  googleIconWrapper.appendChild(imageIcon);
  googleButton.appendChild(googleIconWrapper);
  googleButton.appendChild(text);
  return googleButton;
};

export const setStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getStorage = (key) => JSON.parse(localStorage.getItem(key));

export const removeStorate = (key) => localStorage.clear(key);

export const createCard = ({
  email, text, created, image, likes, isLiked, isOwn, deleteAction, saveAction, likeAction,
}) => {
  const card = document.createElement('div');
  card.classList.add('card');
  if (image) {
    card.innerHTML = `
    <div class="card-image">
      <figure class="image is-16by9">
        <img src="${image}" alt="Placeholder image">
      </figure>
    </div>`;
  }
  const cardContent = document.createElement('div');
  cardContent.classList.add('card-content');
  const content = document.createElement('div');
  content.classList.add('content');

  const textArea = document.createElement('textarea');
  textArea.classList.add('disable-text-area', 'text-area');
  textArea.innerText = text;

  const emailNode = document.createElement('p');
  emailNode.classList.add('subtitle', 'footer-text', 'card_footer_label');
  emailNode.innerText = email;
  const dateNode = document.createElement('p');
  dateNode.classList.add('subtitle', 'footer-text', 'card_footer_label');
  dateNode.innerText = created;

  content.append(textArea, emailNode, dateNode);
  cardContent.append(content);
  const iconImage = isLiked ? 'mdi-heart' : 'mdi-heart-outline';
  const likeIcon = document.createElement('span');
  likeIcon.classList.add('mdi', 'icon');
  likeIcon.classList.add(iconImage);
  likeIcon.innerText = likes;
  likeIcon.addEventListener('click', () => {
    likeAction();
  });

  cardContent.append(likeIcon);

  if (isOwn) {
    const cardEdit = document.createElement('div');
    cardEdit.classList.add('card-edit');

    const saveIcon = document.createElement('span');
    saveIcon.classList.add('mdi', 'mdi-content-save', 'icon', 'hiden');
    const deleteIcon = document.createElement('span');
    deleteIcon.classList.add('mdi', 'mdi-delete', 'icon');
    const editIcon = document.createElement('span');
    editIcon.classList.add('mdi', 'mdi-pencil', 'icon');

    saveIcon.addEventListener('click', () => {
      textArea.classList.toggle('disable-text-area');
      saveIcon.classList.toggle('hiden');
      editIcon.classList.toggle('hiden');
      saveAction(textArea.value);
    });

    editIcon.addEventListener('click', () => {
      textArea.classList.toggle('disable-text-area');
      saveIcon.classList.toggle('hiden');
      editIcon.classList.toggle('hiden');
    });

    deleteIcon.addEventListener('click', () => {
      deleteAction();
    });

    cardEdit.append(editIcon, deleteIcon, saveIcon);
    cardContent.append(cardEdit);
  }

  card.append(cardContent);
  return card;
};

export const formatFirebaseDate = (date) => new Date(date.seconds * 1000).toLocaleDateString('en-US');

export const createInputFile = (idInput) => {
  const container = document.createElement('div');
  container.classList.add('file', 'has-name', 'is-fullwidth');
  container.style.width = '100%';

  const label = document.createElement('label');
  label.classList.add('file-label');

  const input = document.createElement('input');
  input.id = idInput;
  input.type = 'file';
  input.classList.add('file-input');

  const icon = document.createElement('span');
  icon.classList.add('file-cta');
  icon.innerHTML = '<span class="mdi mdi-cloud-upload"></span><span class="file-label"></span>';

  const name = document.createElement('span');
  name.classList.add('file-name');

  label.append(input, icon, name);
  container.append(label);

  input.addEventListener('change', (e) => {
    const file = e.target.files[0];
    name.innerText = file.name;
  });

  return [container, input];
};
