import {
  createButton, createCard, formatFirebaseDate, createInputFile, getStorage, removeStorate,
} from '../lib/utils';
import {
  getPosts, insert, upadate, remove, addLike, removeLike,
} from '../firebase/firestore';
import { uploadFile } from '../firebase/storage';

export const Home = (navigate) => {
  const user = getStorage('auth');
  const body = document.createElement('div');

  const setUpHeader = (node) => {
    const header = document.createElement('header');
    header.classList.add('home_header');

    const logOutSection = document.createElement('div');
    logOutSection.classList.add('log-out-section');
    const logOutIcon = document.createElement('span');
    logOutIcon.classList.add('mdi', 'icon', 'mdi-logout');
    logOutSection.append(logOutIcon);

    logOutIcon.addEventListener('click', () => {
      removeStorate('auth');
      navigate('/');
    });

    header.append(logOutSection);

    const label = document.createElement('label');
    label.innerText = 'Que estas pensando?';
    label.classList.add('label');
    const textArea = document.createElement('textarea');
    textArea.classList.add('textarea', 'is-info');

    const buttonsSection = document.createElement('div');
    buttonsSection.classList.add('home_header_buttons');
    const [fileButton, fileInput] = createInputFile('file-input');
    const handlerPostButton = async () => {
      const file = fileInput.files[0];
      const data = {
        authorEmail: user.email,
        authorId: user.id,
        created: new Date(),
        text: textArea.value,
        likes: [],
      };
      if (file) {
        const fileName = `${new Date().getTime()}-${file.name}`;
        data.image = await uploadFile(file, fileName);
      }
      await insert(data);
    };
    const postButton = createButton('Publicar', 'post', handlerPostButton);
    buttonsSection.append(fileButton, postButton);

    header.append(label, textArea, buttonsSection);
    node.append(header);
  };

  const setUpMainSection = (node) => {
    const section = document.createElement('section');
    section.classList.add('home_section');
    const clear = () => { section.innerHTML = ''; };
    getPosts((data) => {
      const likes = data.likes ? data.likes.length : 0;
      const isLiked = !data.likes ? false : data.likes.includes(user.id);
      const saveAction = async (text) => {
        await upadate(data.id, text);
      };
      const deleteAction = async () => {
        await remove(data.id);
      };
      const likeAction = async () => {
        if (isLiked) {
          await removeLike(data.id, user.id);
        } else {
          await addLike(data.id, user.id);
        }
      };
      const card = createCard({
        id: data.id,
        email: data.authorEmail,
        text: data.text,
        created: formatFirebaseDate(data.created),
        image: data.image,
        isLiked,
        likes,
        isOwn: data.authorId === user.id,
        deleteAction,
        saveAction,
        likeAction,
      });
      section.append(card);
    }, clear);

    node.append(section);
  };

  setUpHeader(body);
  setUpMainSection(body);

  return body;
};
