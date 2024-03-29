# Личный проект «Шесть городов»

Разработка SPA приложения для поиска отелей с использованием React + Redux.

«Шесть городов» — сервис для путешественников по аренде жилья. Выбирайте один из шести популярных городов для путешествий и получайте актуальный список предложений по аренде. Подробная информация о жилье, показ объекта на карте.

## Используемые технологии

- JavaScript
- React (Hooks, React Route)
- Redux (Redux Toolkit, Redux Thunk)
- Typescript
- Axios
- Jest
- Faker
- Node.js
- Npm
- Leaflet
- Сборка: webpack

Данный проект создан с помощью [Create React App](https://github.com/facebook/create-react-app).

## В проекте реализовано:

Приложение состоит из нескольких страниц: Main (/), Sign In (/login), Favorites (/favorites), Property (/offer).  
Получение данных с сервера.  
Предложения отображаются на карте в виде синих маркеров.  
Пользователь может менять сортировку списка предложений. При смене варианта сортировки список предложений перерисовывается. Карта также обновляется в соответствии с обновлённым списком предложений.  
На странице предложения (/offer) представлена расширенная информация об объекте для аренды.  
Кнопка «Избранное». Клик по кнопке «Избранное» добавляет карточку в избранное. Если пользователь не авторизирован, то выполняется редирект на страницу Sign In.  
Каждое предложение содержит отзывы. Реализовано ограничение вывода отзывов на страницу.  
Реализовано добавление отзывов на страницу.  
Страница «Sign in» доступна по адресу /login. Для входа в сервис пользователь вводит логин (email) и пароль, который сохраняется в localStorage.  

# Руководство по работе с проектом

Данный проект создан с помощью [Create React App](https://github.com/facebook/create-react-app).

## Для запуска:

    Клонировать
    Перейти в папку /project
    Установить зависимости: - npm install

### public
Директория для размещения статичных ресурсов (шрифты, стили, изображения и так далее). Корневая директория проекта.

### src
В директории размещаются исходный код проекта: компоненты, файлы с тестами, модули и так далее.

## Сценарии
После создания проекта вам доступны следующие сценарии. Обратите внимание, для запуска сценария, вы должны находится в директории проекта (`./project`).

### Запуск проекта
```bash
npm start
```

После запуска, приложение доступно для просмотра в браузере по адресу [http://localhost:3000](http://localhost:3000).

При сохранении изменений, проект перезапускается и обновляется в браузере. Таким образом, вы можете следить за разработкой проекта в режиме реального времени.

### Запуск тестов

```bash
npm test
```
В данном случае, имеются в виду тесты, которые вынесены в отдельные файлы, в имени которых присутствует суффикс `*.test.*`. Например, `app.test.tsx`.

Подробную информацию вы можете найти на странице [Запуск тестов](https://facebook.github.io/create-react-app/docs/running-tests).

### Проверка линтером

```bash
npm run lint
```

Запуск проверки проекта статическим анализатором кода **ESLint**.

Анализ кода производится только в файлах, которые находятся в директории `src`.

**Обратите внимание**, при запуске данной команды, ошибки выводятся в терминал.

### Сборка проекта

```bash
npm run build
```

Запуск сборки приложения.

В процессе сборки приложения, код приложения оптимизируется и минимизируется, для достижения наилучшей производительности.

Во время выполнения инструкций по сборке проекта, в корне проекта создается директория `build`, в которую будут помещены результирующие файлы. После сборки проект готов к публикации.

Подробную информацию вы можете найти на странице [Развертывание проекта](https://facebook.github.io/create-react-app/docs/deployment).

### Извлечение конфигурации проекта

```bash
npm run eject
```

**Обратите внимание**, при запуске команды `npm run eject` нет возможности вернуть внесённые изменения обратно!

Выполнение данной команды, `react-scripts` скопирует все конфигурационные файлы и скрипты в корень проекта. Данный процесс позволяет получить полный контроль над конфигурацией проекта.

Не используйте данную команду, если не уверены как именно она работает или к какому результату приведёт ее выполнение.


<a href="https://htmlacademy.ru/intensive/react"><img align="left" width="50" height="50" title="HTML Academy" src="https://up.htmlacademy.ru/static/img/intensive/react/logo-for-github.png"></a>

Репозиторий создан для обучения на профессиональном онлайн‑курсе «[React. Разработка сложных клиентских приложений](https://htmlacademy.ru/intensive/react)» от [HTML Academy](https://htmlacademy.ru).


* Студент: [Ольга](https://up.htmlacademy.ru/react/9/user/772841).
* Наставник: `Михаил Кислый`.
