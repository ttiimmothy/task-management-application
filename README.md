# Task Management Application
[![ci](https://github.com/ttiimmothy/task-management-application/actions/workflows/ci.yml/badge.svg)](https://github.com/ttiimmothy/task-management-application/actions/workflows/ci.yml)
[![cd](https://github.com/ttiimmothy/task-management-application/actions/workflows/cd.yml/badge.svg)](https://github.com/ttiimmothy/task-management-application/actions/workflows/cd.yml)
[![pages-build-deployment](https://github.com/ttiimmothy/task-management-application/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/ttiimmothy/task-management-application/actions/workflows/pages/pages-build-deployment)

A task management application uses `Typescript`, `React` amd `Vite`. It uses `React Bootstrap` and `Tailwind CSS` for simplifying CSS usage. It uses `Formik` and `Yup` to make the create task form and uses `react-dnd` so the tasks can be dragged and dropped to different **status**. The task management application uses `react-redux` and `@redux/toolkit` for state management.

## 🎯 Features

- add task with due date, category and task title
- remove task
- display tasks in a ***Kanban*** board
- switch task status using ***drag and drop*** function
- move status column order using ***drag and drop*** function

## 🖥 Prerequisites

- Node.js (version 12.0 or above)
- npm (which comes with Node.js) or Yarn (version 1.22.0 or above)

## 🔧 Usage
### Build and Run

```TypeScript
npm install
npm run dev
```

## 🖼 Preview
![preview1](/public/preview1.png)

## :scroll: Icon Library

- from **<https://css.gg/>**

```HTML
https://css.gg/css
```

## License

Task Manager Application is licensed under [GNU General Public License v3.0](LICENSE).