import { createTodoApp } from "./createTodoList.js";
import { changeBackground } from "./changeBackground.js";
import { createClock } from "./createClock.js";
import { createWeatherApp } from "./createWeatherApp.js";

const container = document.getElementById('container');
const todoAppContainer = document.createElement('div');
const topBlock = document.createElement('div');

const clock = createClock();
const  weatherApp = await createWeatherApp();
createTodoApp(todoAppContainer, 'Мои задачи', 'todos');

topBlock.classList.add('d-flex', 'justify-content-between', 'p-4');

topBlock.append(clock, weatherApp);
container.append(topBlock, todoAppContainer);
changeBackground();
