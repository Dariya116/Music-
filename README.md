# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
#   m u s i c 
 
 
HW8 6 часов выполнела за 18 часов
HW9 11 часов - 12 часов
HW RTK Query 13 часов - 20 часов


Работает вход, выход и регистрация:
1. Пользователь может зарегистрироваться в приложении:
 Если не заполнена почта или пароль, то после клика на «Зарегистрироваться» отображается сообщение об ошибке «Укажите почту/пароль», запрос в API не происходит.
 Если введенные пароли не совпадают, то после клика на «Зарегистрироваться» отображается сообщение об ошибке «Пароли не совпадают», запрос в API не происходит.
 Если пользователь указал неверные данные, то после клика на «Зарегистрироваться» отображается ошибка от API, например «Пользователь с таким именем уже существует».
 На время запроса кнопка «Зарегистрироваться» блокируется.
 Если запрос на авторизацию выполнился успешно, пользователь попадает на форму входа.
 2. Пользователь может войти в приложение.
 Если не заполнена почта или пароль, то после клика на «Войти» отображается сообщение об ошибке «Укажите почту/пароль», запрос в API не происходит.
 Если пользователь указал неверные данные, то после клика на «Войти» отображается ошибка от API «Пользователь с таким email или паролем не найден».
 На время запроса кнопка «Войти» блокируется.
 Если запрос на авторизацию выполнился успешно, пользователь попадает на «Главную» в режиме «Авторизованный пользователь».
 Приложение переходит в режим «Авторизованный пользователь» после успешного входа.
 В правом верхнем углу приложения отображается username текущего пользователя.
 После обновления страницы приложение остается в режиме «Авторизованный пользователь», данные о текущем пользователе хранятся в Local Storage.
 Приложение остается в режиме «Авторизованный пользователь» до тех пор, пока пользователь явно не сделает выход.
 При клике на иконку выхода в правом верхнем углу приложения происходит переход в режим «Неавторизованный пользователь».
 При клике на кнопку «Выйти» в левом меню приложения происходит переход в режим «Неавторизованный пользователь».
 Приложение работает в режиме «Неавторизованный пользователь».
 Неавторизованному пользователю доступны только страницы входа и регистрации.
 При попытке перейти на страницы, доступные только для авторизованного пользователя, происходит редирект на страницу входа.

Работает страница "Главное":
1. При открытии приложения отображаются скелетоны, после загрузки отображается список треков.
2. Если произошла ошибка при выполнении запроса, пользователь вместо списка треков должен увидеть надпись «Не удалось загрузить плейлист, попробуйте позже».
3. При запуске приложения аудиоплеер скрыт.
4. При клике на название трека в плейлисте в нижней части экрана появляется аудиоплеер, в нём отображается название и автор трека, на который кликнул пользователь.
5. В плейлисте на странице «Главное» текущий трек отмечен фиолетовой точкой. Если текущий трек проигрывается, то фиолетовая точка пульсирует. Если он на паузе, то точка статичная.

Бургер меню:
1. При клике на бургер открывается левое меню, при повторном клике закрывается

Работает поиск и фильтрация на странице "Главное":
 1. Кнопка с фильтром показывает цветом активное и неактивное состояние.
 2. Когда выбран фильтр или сортировка отображается фиолетовый кружок с количеством выбранных элементов
 3. Когда выбран фильтр, в списке отображаются только треки выбранного исполнителя\жанра
 4. Когда выбрана сортировка, треки в списке сортируются по возрастанию\убыванию даты релиза
 5. Если в поиске введено значение, то в списке отображаются только треки, в названии которых есть введенное значение

 Бар:
 1. При клике на кнопку Pause воспроизведение трека останавливается, кнопка меняется на кнопку Play.
 2. При клике на кнопку Play воспроизведение трека продолжается, кнопка меняется на кнопку Pause.
 3. Работает механика «повтор трека»:
 если повтор включен, то кнопка Loop светится белым, при клике на нее повтор трека выключается;
 если повтор выключен, то кнопка Loop серая, при клике на нее повтор трека включается;
 если повтор включен, то, когда трек проигрывается до конца, он автоматически начинается сначала;
 если повтор выключен, то, когда трек проигрывается до конца, ничего не происходит.
 4. В плеере отображается прогресс трека:
 фиолетовая полоска над плеером заполняется по мере воспроизведения трека;
 справа сверху отображается текущее время воспроизведения и общее время воспроизведения;
 я могу кликнуть на полоску прогресса, и трек перемотается на выбранное время.
5. В плеере работает регулировка громкости трека.
6. Кнопка «Следующий трек» включает следующий трек из текущего плейлиста:
 Если текущий трек — последний трек плейлиста, то при клике на кнопку «Следующий трек» ничего не происходит.
 7. Кнопка «Предыдущий трек» включает предыдущий трек из текущего плейлиста.
 8. При клике на кнопку «Перемешать» включается режим «Перемешать», иконка становится белой. При повторном клике режим выключается, иконка снова становится серой.
 Если включен режим «Перемешать», то кнопки «Следующий трек» и «Предыдущий трек» включают случайную песню из текущего плейлиста.
 9. Если текущий трек — первый трек плейлиста, то при клике на кнопку «Предыдущий трек» ничего не происходит.
 10. Когда заканчивается воспроизведение текущего трека, автоматически включается следующий трек из текущего плейлиста, если он там есть.
 11. Аудиоплеер должен работать при переходах между страницами «Главное», «Мои треки» и «Категории»:
 Трек продолжает играть при переходе между страницами.
 Плейлист должен сохраняться при переходе между страницами: если нажать «Следующий трек» — включится следующая песня из плейлиста, который изначально включали.

 Лайк:
 1. Клик по пустому сердечку в плейлисте «Главное» лайкает трек:
  Сердечко закрашивается.
  Трек появляется на странице «Мои треки».
  Лайкнутый трек сохраняется в API, то есть если пользователь авторизуется в приложении на другом устройстве, то увидит треки, которые он лайкал. 
 2. Клик по закрашенному сердечку в плейлисте «Главное» дизлайкает трек:
  Сердечко закрашивается.
  Трек появляется на странице «Мои треки».
  Лайкнутый трек удаляется из API.
 3. Если лайкнуть трек в списке, то трек должн стать лайкнутым и в аудиоплеере и наборот.


 Работает страница «Мои треки»:
 1. На странице отображаются лайкнутые треки.
 2. Клик по закрашенному сердечку дизлайкает трек, то есть убирает его из списка.
  Если API «Избранного» («Список треков», «Добавить трек», «Удалить трек») возвращает 401-й код ответа,  происходит обновление «протухшего» access-токена через API обновления токена.

  Работают страницы с подборками:
1. Клик по баннеру открывает соовтетствующую страницу с подборкой
2. Плейлист на странице подборок работает также, как и на других страницах: можно включать треки, ставить лайки etc.